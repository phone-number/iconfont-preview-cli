import { service } from '/@/utils/request'

/** 图标相关信息 */
export type IconInfo = {
  /** 文件地址（相对地址） */
  filePath: string;
  /** 图标的基础类名 */
  baseClassName: string;
  /** 图标的类名集合 */
  classNames: string[];
}

/** 获取解析出来的图标相关信息 */
export const getIconsInfoApi = () => {
  return service.get<IconInfo[]>('/iconsInfo')
}