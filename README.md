# iconfont-cli

一个用于预览本地字体图标的命令行工具。它可以扫描指定目录下的 CSS 文件，解析出图标类名，并提供一个可视化的 Web 界面来预览、搜索和复制图标代码。

## ✨ 功能特性

- 🔍 **自动扫描**: 递归扫描指定目录下的所有 CSS 文件。
- 🎨 **可视化预览**: 解析 CSS 中的 `content` 属性，展示图标及其类名。
- 📋 **一键复制**: 点击图标即可复制类名到剪贴板。
- ⚡ **即时搜索**: 支持通过类名关键词快速筛选图标。
- 🛠 **Vite 插件集成**: 提供 Vite 插件，方便在开发环境中直接集成图标预览服务。

## 🚀 快速开始

### 安装

```bash
# 全局安装
npm install -g iconfont-cli


# 或者在项目中安装
npm install -D iconfont-cli
```

### 命令行使用 (CLI)

在项目根目录下，你可以通过以下命令启动预览服务：

```bash
# 预览指定目录下的字体图标
iconfont-cli --dir ./path/to/your/fonts


# 指定端口 (默认 3000)
iconfont-cli --dir ./path/to/your/fonts --port 8080
```

### 参数说明

| 参数     | 简写 | 描述                                         | 默认值 |
| -------- | ---- | -------------------------------------------- | ------ |
| `--dir`  | `-d` | **(必填)** 包含字体图标 CSS 文件的文件夹路径 | -      |
| `--port` | `-p` | 服务启动端口                                 | `3000` |

## 📦 安装与集成

### 作为 Vite 插件使用

如果你正在开发一个 Vite 项目，可以将此工具作为插件集成，在开发服务器中同时提供图标预览功能。

```typescript
// vite.config.ts
import { iconfontServer } from "iconfont-cli/server";

export default {
  plugins: [
    iconfontServer({
      iconDir: "./src/assets/fonts", // 字体图标存放目录
      urlPrefix: "/iconfont-proxy" // 代理路径前缀 (可选)
    })
  ]
};
```

### 组件

除了 CLI 工具，本项目还导出了核心组件 `RenderIconList`，方便你在自己的 Vue 项目中定制图标预览页面。

### 引入

```typescript
import { RenderIconList } from "iconfont-cli/components";
// 引入样式
import "iconfont-cli/components/index.css";
import axios from "axios";
```

### 基本用法

```vue
<template>
  <div class="local-icon-demo">
    <div class="local-icon-demo__header">
      <el-input
        v-model="keyword"
        placeholder="输入关键字，回车搜索"
        clearable
        @change="onSearch"
      />
    </div>
    <RenderIconList
      ref="renderIconListRef"
      :get-icons-info="getIconsInfo"
      :css-link-format="cssLinkFormat"
    >
      <template #default="{ iconsInfo, renderIcon }">
        <div v-for="info in iconsInfo" :key="info.filePath">
          <h3>{{ info.filePath }}</h3>
          <ul class="local-icon-demo__icon-list">
            <li
              v-for="className in info.classNames"
              :key="className"
              class="local-icon-demo__icon-li"
            >
              <!-- 使用 renderIcon 组件渲染图标 -->
              <component
                :is="renderIcon"
                :icon-class="className"
                :iconInfo="info"
              />
            </li>
          </ul>
        </div>
      </template>
    </RenderIconList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RenderIconList } from "iconfont-cli/components";
// 引入样式
import "iconfont-cli/components/index.css";
import axios from "axios";
import type { RenderIconListInstance, IconInfo } from "iconfont-cli/components";

/** 搜索关键字 */
const keyword = ref("");
const renderIconListRef = ref<RenderIconListInstance>();

// 获取图标数据的函数
const getIconsInfo = async (): Promise<IconInfo[]> => {
  // 这里请求接口前缀替换为vite插件iconfontServer中urlPrefix的值
  const res = await axios.get("/iconfont-proxy/api/iconsInfo");
  const iconsInfo = res.data.data;
  return iconsInfo;
};

// 动态加载字体样式
const cssLinkFormat = (href: string) => {
  // 这里根据需求替换为字体样式的路径
  return href && `/@/assets/font-icon${href}`;
};

// 调用搜索
const onSearch = (query: string) => {
  renderIconListRef.value?.onSearch(query);
};
</script>

<style>
.local-icon-demo__header {
  margin-bottom: 12px;
}

.local-icon-demo__icon-list {
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  list-style: none;
}
.local-icon-demo__icon-li {
  height: 120px;
  border-right: 1px solid getCssVar(border-color);
  border-bottom: 1px solid getCssVar(border-color);
}
</style>
```

### API

#### Props

| 属性名          | 类型                                      | 必填 | 描述                                              |
| --------------- | ----------------------------------------- | ---- | ------------------------------------------------- |
| `getIconsInfo`  | `() => Promise<IconInfo[]> \| IconInfo[]` | 是   | 获取图标信息的函数，返回图标数据数组。            |
| `cssLinkFormat` | `(href: string) => string`                | 否   | 格式化 CSS 文件链接的函数，用于动态加载字体样式。 |

#### Methods (Exposed)

| 方法名     | 参数              | 描述                                  |
| ---------- | ----------------- | ------------------------------------- |
| `onSearch` | `(query: string)` | 执行模糊搜索，过滤 `iconsInfo` 数据。 |

#### Slots

| 插槽名    | 参数                                                    | 描述                                                            |
| --------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| `default` | `{ iconsInfo: InnerIconInfo[], renderIcon: Component }` | 自定义渲染列表内容。`renderIcon` 是一个用于渲染单个图标的组件。 |

### renderIcon API

#### Props

| 属性名        | 类型                                          | 必填 | 描述               |
| ------------- | --------------------------------------------- | ---- | ------------------ |
| `copyHandler` | `(iconName: string) => void \| Promise<void>` | 否   | 自定义图标点击复制 |

#### Type Definitions

```typescript
interface IconInfo {
  /** CSS 文件相对路径 */
  filePath: string;
  /** 基础类名 (如 iconfont) */
  baseClassName: string;
  /** 图标类名列表 */
  classNames: string[];
  /** 自定义渲染图标的函数，返回一个组件 */
  renderIcon?: (iconName: string) => Component;
}
```

### ts 类型支持

```ts
// tsconfig.json
{
  "compilerOptions": {
     "types": [
      "iconfont-cli/components/types/global"
    ]
  }
}
```

## 🛠 本地开发

本项目采用 Monorepo 结构，使用 pnpm workspace 管理。

### 目录结构

- **`app/`**: 前端预览应用 (Vue 3 + Element Plus)
- **`server/`**: 服务端核心逻辑、CLI 实现及 Vite 插件 (Koa + Commander)
- **`font-icon/`**: 示例字体图标文件

### 开发命令

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **启动开发环境**

   同时启动服务端和前端应用的开发模式：

   ```bash
   pnpm dev
   ```

   - Server 运行在 `http://localhost:3000` (默认)
   - App 运行在 Vite 开发服务器端口

3. **构建项目**

   ```bash
   pnpm build
   ```

### FAQ

1. 报错：Error: Cannot find module '@rolldown/binding-darwin-universal'

```shell
pnpm i -f
```
