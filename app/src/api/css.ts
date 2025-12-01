import { service } from '/@/utils/request'

/** 图标相关信息 */
export interface IconInfo {
  /** 文件地址（相对地址） */
  filePath: string;
  /** 图标的基础类名 */
  baseClassName: string;
  /** 图标的类名集合 */
  classNames: string[];
}

export interface IconInfoRes {
  /** 图标相关信息 */
  data: IconInfo[]
  /** 图标所在目录相对地址 */
  dir: string
  /** 图标所在目录绝对地址 */
  absDir: string
}

/** 获取解析出来的图标相关信息 */
export const getIconsInfoApi = () => {
  return service.get<IconInfoRes>('/iconsInfo')
}