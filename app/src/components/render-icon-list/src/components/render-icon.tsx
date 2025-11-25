import RenderIconClass from "./render-icon-class";
import clipboardCopy from "clipboard-copy";
import type { InnerIconInfo } from "../render-icon-list";

export default defineComponent({
  name: "RenderIcon",
  props: {
    iconInfo: {
      type: Object as PropType<InnerIconInfo>,
      default: ""
    },
    iconClass: {
      type: String,
      required: true
    },
    highlightChunks: {
      type: Array as PropType<Array<[number, number]>>,
      default: () => []
    }
  },
  setup(props) {
    /**
     * @description 复制内容
     * @param content 要复制的内容
     */
    const copyContent = async (content: string) => {
      let messageType = "";
      try {
        await clipboardCopy(content);
        messageType = "success";
      } catch {
        messageType = "error";
      }
      ElMessage({
        message: `copy ${messageType} [${content}]`,
        type: messageType
      } as any);
    };

    return () => (
      <span
        class="render-icon"
        onClick={() =>
          copyContent(`${props.iconInfo.baseClassName} ${props.iconClass}`)
        }
      >
        <i class={[props.iconInfo.baseClassName, props.iconClass]} />
        <RenderIconClass
          iconClass={props.iconClass}
          highlight-chunks={props.iconInfo.matchesMap?.get(props.iconClass)}
        />
      </span>
    );
  }
});
