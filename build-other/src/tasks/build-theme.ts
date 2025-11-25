// import path from 'path'
// import { dest, parallel, src } from 'gulp'
// import gulpSass from 'gulp-sass'
// import dartSass from 'sass'
// import autoprefixer from 'gulp-autoprefixer'
// import cleanCss from 'gulp-clean-css'
// import { themeChalkInput, themeChalkOutput } from '@iconfont-cli/constants'
// import { withTaskName } from '../utils'
// function compile() {
//   const sass = gulpSass(dartSass)
//   return src(path.resolve(themeChalkInput, 'src/*.scss'))
//     .pipe(
//       sass.sync({
//         silenceDeprecations: ['legacy-js-api'],
//         includePaths: [path.resolve(epRoot, 'node_modules')]
//       })
//     )
//     .pipe(autoprefixer())
//     .pipe(cleanCss())
//     .pipe(dest(path.resolve(epOutput, 'theme-chalk')))
// }

// function copyfullScss() {
//   return src(path.resolve(themeRoot, 'src/**')).pipe(
//     dest(path.resolve(epOutput, 'theme-chalk/src'))
//   )
// }

// export const buildTheme = parallel(
//   withTaskName('compile-theme', compile),
//   withTaskName('copy-full-scss', copyfullScss)
// )
