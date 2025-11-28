import type RenderIconList from './render-icon-list.vue'
import type { Component, ExtractPropTypes } from 'vue'

/** 图标相关信息 */
export type IconInfo = {
  /** 文件地址（相对地址） */
  filePath: string;
  /** 图标的基础类名 */
  baseClassName: string;
  /** 图标的类名集合 */
  classNames: string[];
  /** 自定义渲染图标的函数，返回一个组件 */
  renderIcon?: (iconName: string) => Component
}

/** 前端页面时候的图标信息 （包含高亮信息）  */
export interface InnerIconInfo extends IconInfo {
  /** 匹配项map映射，
   * key为图标class类名
   * value为符合要求的索引位子集合，每项都包含开始索引、结束索引
   */
  matchesMap?: Map<string, Array<[number, number]>>;
}

export const renderIconListProps = {
  getIconsInfo: {
    type: Function as PropType<() => Promise<IconInfo[]> | IconInfo[]>,
    required: true
  },
  cssLinkFormat: {
    type: Function as PropType<(href: string) => string>,
    default: (href: string) => href
  }
}

export type RenderIconListProps = ExtractPropTypes<typeof renderIconListProps>
export type RenderIconListInstance = InstanceType<typeof RenderIconList>
