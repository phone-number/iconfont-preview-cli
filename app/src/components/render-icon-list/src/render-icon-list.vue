<template>
  <div class="render-icon-list">
    <slot :iconsInfo="iconsInfo" :renderIcon="RenderIcon" />
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import RenderIcon from "./components/render-icon";
import { renderIconListProps } from "./render-icon-list";
import type { IconInfo, InnerIconInfo } from "./render-icon-list";

const props = defineProps(renderIconListProps);

/** 后端返回图标相关信息数据（缓存，用于前端搜索） */
const iconsInfoRes = ref<IconInfo[]>();
/** 前端页面渲染数据 */
const iconsInfo = ref<InnerIconInfo[]>();
/** 折叠面板展开项 */
const activeNames = ref<string[]>([]);
/** 模糊搜索Fuse实例列表 */
const fuseList = ref<
  {
    iconInfo: InnerIconInfo;
    fuse: Fuse<string>;
  }[]
>([]);

/**
 * @description 初始化数据
 * @param data 图标相关信息数据
 */
const initData = (data: IconInfo[]) => {
  iconsInfoRes.value = data;
  iconsInfo.value = data;
  activeNames.value = data.map((item) => item.filePath);
  fuseList.value = data.map((item) => {
    return {
      iconInfo: item,
      fuse: new Fuse(item.classNames, {
        /**
         * 搜索结果是否包含匹配的相关性分数，开启后会额外包含一个 score 字段，表示匹配的相似度分数
         * 0 表示完全匹配
         * 越接近 1 表示匹配度越低
         */
        includeScore: true,
        findAllMatches: true, // 即使字符串中已经找到了完美匹配，匹配函数也会持续到搜索模式的末尾
        includeMatches: true, // ✅ 必须开启！用于高亮
        threshold: 0.3, // 模糊匹配容错度
        minMatchCharLength: 1, // 长度超过此值的匹配项才会返回
        shouldSort: true // 是否按分数对结果列表进行排序
      })
    };
  });
};

/**
 * @description 添加图标样式表链接
 * @param data 图标相关信息数据
 */
const addCssLink = (data: IconInfo[]) => {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return;
  }
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    if (!item.filePath) return;
    const href = props.cssLinkFormat(item.filePath);
    if (document.querySelector(`link[rel='stylesheet'][href='${href}']`)) return
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href
    fragment.appendChild(link);
  });
  head.appendChild(fragment);
};

onMounted(async () => {
  const iconsInfo = (await props.getIconsInfo?.()) || [];
  addCssLink(iconsInfo);
  initData(iconsInfo);
});

/**
 * @description 搜索图标
 */
const onSearch = (val: string) => {
  const query = val.trim();
  if (!iconsInfoRes.value) return;
  if (!query) {
    activeNames.value = iconsInfoRes.value.map((item) => item.filePath);
    iconsInfo.value = iconsInfoRes.value;
    return;
  }
  const data: InnerIconInfo[] = [];
  // 遍历模糊搜索Fuse实例列表
  fuseList.value.forEach(({ iconInfo, fuse }) => {
    const results = fuse.search(query);
    if (results.length) {
      // 创建匹配项索引map映射
      const matchesMap: InnerIconInfo["matchesMap"] = new Map();
      // 图标class名集合
      const classNames: string[] = [];
      // 遍历模糊搜索返回结果
      results.forEach((res) => {
        const matches = res.matches || [];
        const matchesIndex: [number, number][] = [];
        // 遍历匹配字符的索引
        matches.forEach((match) => {
          matchesIndex.push(...match.indices);
        });
        matchesMap.set(res.item, matchesIndex);
        classNames.push(res.item);
      });
      data.push({
        ...iconInfo,
        matchesMap,
        classNames
      });
    }
  });
  iconsInfo.value = data;
  activeNames.value = data.map((item) => item.filePath);
};

defineExpose({
  onSearch
});
</script>
