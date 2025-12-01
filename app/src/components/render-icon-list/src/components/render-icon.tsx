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
    copyHandler: Function as PropType<
      (iconName: string) => void | Promise<void>
    >
  },
  setup(props) {
    /**
     * @description 复制内容
     * @param content 要复制的内容
     */
    const copyContent = async (content: string) => {
      if (props.copyHandler) {
        props.copyHandler(content);
        return;
      }
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

    const iconName = computed(() => {
      return props.iconInfo.baseClassName
        ? `${props.iconInfo.baseClassName} ${props.iconClass}`
        : props.iconClass;
    });

    return () => (
      <span class="render-icon" onClick={() => copyContent(iconName.value)}>
        {props.iconInfo.renderIcon ? (
          props.iconInfo.renderIcon(iconName.value)
        ) : (
          <i class={[props.iconInfo.baseClassName, props.iconClass]} />
        )}
        <RenderIconClass
          iconClass={props.iconClass}
          highlight-chunks={props.iconInfo.matchesMap?.get(props.iconClass)}
        />
      </span>
    );
  }
});
