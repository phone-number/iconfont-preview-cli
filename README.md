# iconfont-preview-cli

[中文文档](./README_zh.md) | [English](./README.md)

A command-line tool for previewing local font icons. It scans CSS files in a specified directory, extracts icon class names, and provides a web interface to preview, search, and copy icon codes.

## Features

- **Auto Scan**: Recursively scans all CSS files in the specified directory.
- **Visual Preview**: Parses `content` properties in CSS to display icons and their class names.
- **One-Click Copy**: Click any icon to copy its class name to the clipboard.
- **Instant Search**: Quickly filter icons by class name keywords.
- **Vite Integration**: Includes a Vite plugin to integrate icon preview into the development environment.

## Quick Start

### Installation

```bash
# Global installation
npm install -g iconfont-preview-cli


# Or install as a dev dependency
npm install -D iconfont-preview-cli
```

### CLI Usage

Run the preview server from your project root:

```bash
# Preview font icons in a specific directory
iconfont-preview-cli --dir ./path/to/your/fonts


# Specify a custom port (default: 3000)
iconfont-preview-cli --dir ./path/to/your/fonts --port 8080
```

### Options

| Option   | Alias | Description                                      | Default |
| -------- | ----- | ------------------------------------------------ | ------- |
| `--dir`  | `-d`  | **(Required)** Path to the folder containing CSS | -       |
| `--port` | `-p`  | Server port                                      | `3000`  |

## Installation & Integration

### Using as a Vite Plugin

For Vite projects, use the plugin to enable icon preview with the dev server.

```typescript
// vite.config.ts
import { iconfontServer } from "iconfont-preview-cli/server";

export default {
  plugins: [
    iconfontServer({
      iconDir: "./src/assets/fonts", // Directory containing font icons
      urlPrefix: "/iconfont-proxy" // Proxy path prefix (optional)
    })
  ]
};
```

### Components

The project also exports the `RenderIconList` component for custom Vue integrations.

### Import

```typescript
import { RenderIconList } from "iconfont-preview-cli/components";
// Import styles
import "iconfont-preview-cli/components/index.css";
import axios from "axios";
```

### Basic Usage

```vue
<template>
  <div class="local-icon-demo">
    <div class="local-icon-demo__header">
      <el-input
        v-model="keyword"
        placeholder="Enter keyword to search"
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
              <!-- Render icon using the renderIcon component -->
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
import { RenderIconList } from "iconfont-preview-cli/components";
// Import styles
import "iconfont-preview-cli/components/index.css";
import axios from "axios";
import type {
  RenderIconListInstance,
  IconInfo
} from "iconfont-preview-cli/components";

/** Search keyword */
const keyword = ref("");
const renderIconListRef = ref<RenderIconListInstance>();

// Function to fetch icon data
const getIconsInfo = async (): Promise<IconInfo[]> => {
  // Replace the request prefix with the urlPrefix defined in the Vite plugin
  const res = await axios.get("/iconfont-proxy/api/iconsInfo");
  const iconsInfo = res.data.data;
  return iconsInfo;
};

// Dynamically load font styles
const cssLinkFormat = (href: string) => {
  // Adjust the path to your font styles as needed
  return href && `/@/assets/font-icon${href}`;
};

// Trigger search
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
}
</style>
```

### API

#### Props

| Prop Name       | Type                                      | Required | Description                                                                  |
| --------------- | ----------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `getIconsInfo`  | `() => Promise<IconInfo[]> \| IconInfo[]` | Yes      | Function to retrieve icon data. Returns an array of icon info.               |
| `cssLinkFormat` | `(href: string) => string`                | No       | Function to format CSS file links, used for dynamically loading font styles. |

#### Methods (Exposed)

| Method Name | Parameters        | Description                                    |
| ----------- | ----------------- | ---------------------------------------------- |
| `onSearch`  | `(query: string)` | Performs a fuzzy search to filter `iconsInfo`. |

#### Slots

| Slot Name | Parameters                                              | Description                                                                           |
| --------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `default` | `{ iconsInfo: InnerIconInfo[], renderIcon: Component }` | Customizes the list content. `renderIcon` is a component for rendering a single icon. |

### renderIcon API

#### Props

| Prop Name     | Type                                          | Required | Description                                |
| ------------- | --------------------------------------------- | -------- | ------------------------------------------ |
| `copyHandler` | `(iconName: string) => void \| Promise<void>` | No       | Custom handler for icon click/copy action. |

#### Type Definitions

```typescript
interface IconInfo {
  /** Relative path to the CSS file */
  filePath: string;
  /** Base class name (e.g., iconfont) */
  baseClassName: string;
  /** List of icon class names */
  classNames: string[];
  /** Custom render function returning a component */
  renderIcon?: (iconName: string) => Component;
}
```

## Local Development

This project is a Monorepo managed by pnpm workspaces.

### Directory Structure

- **`app/`**: Frontend preview application (Vue 3 + Element Plus)
- **`server/`**: Server-side core logic, CLI implementation, and Vite plugin (Koa + Commander)
- **`font-icon/`**: Example font icon files

### Development Commands

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Start Development Environment**

   Starts both the server and the frontend application in development mode:

   ```bash
   pnpm dev
   ```

   - Server runs at `http://localhost:3000` (default)
   - App runs on the Vite dev server port

3. **Build Project**

   ```bash
   pnpm build
   ```

### FAQ

1. Error: Cannot find module '@rolldown/binding-darwin-universal'

```shell
pnpm i -f
```
