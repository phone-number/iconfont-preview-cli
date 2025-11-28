import css from 'css'
import { readdir, readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'



/**
 * 异步读取目录下所有CSS文件，返回完整路径
 * @param {string} dirPath 要遍历的目录路径（绝对路径）
 * @returns {Promise<Array>} 包含所有CSS文件路径的数组
 */
export async function readCssFilesAsync(dirPath: string) {
  const cssFiles: string[] = [];

  async function traverseDirectory(currentPath: string) {
    const items = await readdir(currentPath);

    for (const item of items) {
      const fullPath = resolve(currentPath, item);
      let fileStat;

      try {
        fileStat = await stat(fullPath);
      } catch (error) {
        console.error(`无法访问文件: ${fullPath}`, error);
        continue;
      }

      if (fileStat.isDirectory()) {
        await traverseDirectory(fullPath);
      } else {
        const ext = extname(fullPath).toLowerCase();
        if (ext === '.css') {
          cssFiles.push(fullPath);
        }
      }
    }
  }

  await traverseDirectory(dirPath);
  return cssFiles;
}

/**
 * 提取类名
 * @param cssFilePath css文件路径（绝对路径）
 * @param basePath 基础路径（绝对路径）
 */
export async function extractClassNames(cssFilePath: string, basePath: string) {
  try {
    // 读取CSS文件内容
    const cssContent = await readFile(cssFilePath, 'utf8')

    // 解析CSS
    const ast = css.parse(cssContent)


    let baseClassName = ''
    const classNames = new Set<string>()

    // 找到字体图标的字体名
    const fontFamilyRule = ast.stylesheet?.rules.find(rule => rule.type === 'font-face')
    const fontFamilyDeclaration = (fontFamilyRule?.declarations as css.Declaration[])?.find(declaration => declaration.property === 'font-family')
    const fontFamily = fontFamilyDeclaration?.value?.replaceAll(/["']/g, '')

    // 遍历所有规则
    const rules = ast.stylesheet?.rules || []
    for (const rule of rules) {
      if (rule.type === 'rule') {
        const declarations = (rule.declarations as css.Declaration[]) || []
        const selectors = rule.selectors || []
        // 找到字体图标的基础类名
        if (!baseClassName && fontFamily && declarations.some(declaration => declaration.value?.includes(fontFamily))) {
          baseClassName = selectors.join(' ').replaceAll('.', '')
        }
        // 找到有content属性的选择器及为图标
        if (declarations.some(declaration => declaration.property === 'content')) {
          // 遍历所有选择器
          for (const selector of selectors) {
            // 匹配类选择器（以.开头但不包含:before、:after等伪类）
            const classSelectorMatch = selector.match(/^\.([\w-]+)(?::before)?$/)
            if (classSelectorMatch) {
              const className = classSelectorMatch[1]
              classNames.add(className)
            }
          }
        }
      }
    }
    return { filePath: cssFilePath.replace(basePath, ''), baseClassName, classNames: [...classNames] }
  } catch (error: any) {
    console.error('提取类名时出错:', error.message)
  }
}

/**
 * 获取图标信息
 * @param dirPath 图标文件夹路径（绝对路径）
 */
export async function getCssInfo(dirPath: string) {
  const filePaths = await readCssFilesAsync(dirPath)

  const data: Array<NonNullable<Awaited<ReturnType<typeof extractClassNames>>>> = []
  await Promise.all(filePaths.map(async filePath => {
    const res = await extractClassNames(filePath, dirPath)
    res && data.push(res)
  }))

  return data
}