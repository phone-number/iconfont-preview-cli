<template>
  <div class="icon-page">
    <div class="icon-page__header">
      <el-input
        v-model="keyword"
        class="icon-page__header-search"
        placeholder="输入关键字，回车搜索"
        clearable
        @change="onSearch"
      />
    </div>
    <div class="icon-page__main">
      <el-scrollbar>
        <RenderIconList
          :get-icons-info="getIconsInfo"
          :css-link-format="cssLinkFormat"
          ref="RenderIconListRef"
        >
          <template #default="{ iconsInfo, renderIcon }">
            <el-collapse
              :model-value="iconsInfo?.map((iconInfo) => iconInfo.filePath)"
            >
              <el-collapse-item
                v-for="(iconInfo, index) in iconsInfo"
                :key="index"
                class="icon-page__row"
                :title="iconInfo.filePath"
                :name="iconInfo.filePath"
              >
                <ul class="icon-page__icon-list">
                  <li
                    v-for="(iconClass, subIndex) in iconInfo.classNames"
                    :key="subIndex"
                    class="icon-page__icon-li"
                  >
                    <component
                      :is="renderIcon"
                      class="icon-page__icon-item"
                      :icon-class="iconClass"
                      :iconInfo="iconInfo"
                    />
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </template>
        </RenderIconList>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { getIconsInfoApi } from "/@/api/css";
import { RenderIconList } from "/@/components";
import "/@/theme-chalk/index.scss";
import type {
  RenderIconListInstance,
  RenderIconListProps
} from "/@/components";

/** 搜索关键字 */
const keyword = ref("");
const RenderIconListRef = ref<RenderIconListInstance>();

const getIconsInfo: RenderIconListProps["getIconsInfo"] = async () => {
  const res = await getIconsInfoApi();
  return res.data;
};

const onSearch = (val: string) => {
  RenderIconListRef.value?.onSearch(val);
};

const cssLinkFormat = (href: string) => {
  /** 是否为开发环境dev */
  const isDev = import.meta.env.MODE === "development";
  return `${isDev ? "/dev" : ""}${href}`;
};
</script>

<style lang="scss">
.icon-page {
  --border-color: #ebebeb;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.icon-page__header {
  margin-bottom: 12px;
  padding: 12px;
  box-sizing: border-box;
}

.icon-page__header-search {
  width: 300px;
}

.icon-page__main {
  flex: 1;
  box-sizing: border-box;
  height: 0;
  .el-scrollbar__view {
    padding: 0 12px;
  }
}

.icon-page__row {
  .el-collapse-item__header {
    font-size: 16px;
    font-weight: bold;
    padding-right: 0;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
}
.icon-page__icon-list {
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  border-radius: 4px;
  list-style: none;
}
.icon-page__icon-li {
  height: 90px;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

@media screen and (max-width: 1200px) {
  .icon-page__icon-list {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
  }
}

@media screen and (max-width: 992px) {
  .icon-page__icon-list {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .icon-page__icon-list {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}

@media screen and (max-width: 376px) {
  .icon-page__icon-list {
    grid-template-columns: repeat(1, minmax(120px, 1fr));
  }
}
</style>
