export default defineComponent({
  name: "RenderIconClass",
  props: {
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
    const renderContent = () => {
      const { iconClass: text, highlightChunks: chunks } = props;

      if (!text || chunks.length === 0) {
        return text;
      }

      const result: (string | Component)[] = [];
      let lastIndex = 0;

      for (const [start, end] of chunks) {
        // 添加非高亮部分
        if (start > lastIndex) {
          result.push(text.slice(lastIndex, start));
        }

        // 添加高亮部分（end 是包含的）
        result.push(
          <span class="highlight">{text.slice(start, end + 1)}</span>
        );

        lastIndex = end + 1;
      }

      // 添加剩余部分
      if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
      }

      return result;
    };

    return () => <span class="render-icon-class">{renderContent()}</span>;
  }
});
