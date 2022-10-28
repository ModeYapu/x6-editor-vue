<!--  -->
<template>
  <div class="tool-bar">
    <button @click="$emit('onUndo')">
      <IconFont type="icon-undo"></IconFont>
    </button>
    <button @click="$emit('onRedo')">
      <IconFont type="icon-redo"></IconFont>
    </button>
    |
    <button @click="$emit('copyCells')">
      <IconFont type="icon-copy"></IconFont>
    </button>
    <button @click="$emit('pasteCells')">
      <IconFont type="icon-paste"></IconFont>
    </button>
    <button @click="$emit('deleteCells')">
      <IconFont type="icon-remove"></IconFont>
    </button>
    |
    <button @click="$emit('zoonIn')">
      <IconFont type="icon-zoomOut"></IconFont>
    </button>
    <button @click="$emit('zoonOut')">
      <IconFont type="icon-zoomIn"></IconFont>
    </button>
    <button @click="$emit('fitToContent')">
      <IconFont type="icon-fit-map"></IconFont>
    </button>
    <button @click="$emit('scaleContentToFit')">
      <IconFont type="icon-actual-size"></IconFont>
    </button>
    |
    <button @click="$emit('toFront')">
      <IconFont type="icon-to-back"></IconFont>
    </button>
    <button @click="$emit('toBack')">
      <IconFont type="icon-to-front"></IconFont>
    </button>

    <button @click="$emit('multiple')">
      <IconFont type="icon-multi-select"></IconFont>
    </button>
    |
    <button @click="() => {
      $emit('showJson')
    }">
      <IconFontExt type="iconjson"></IconFontExt>
    </button>
    <button @click="() => {
      $emit('showDesigner')
    }">
      <IconFontExt type="icondesign"></IconFontExt>
    </button>
    |
    <button @click="$emit('save')">save</button>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1101588_01zniftxm9yp.js',
})

const IconFontExt = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1529997_6nr9bramkvp.js',
});

export default {
  components: {
    IconFont: IconFont,
    IconFontExt: IconFontExt
  },
  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='less' scoped>
.tool-bar {
  padding: 8px;
  border: 1px solid #e6e9ed;

  button {
    background: #fff;
    border: 1px solid #fff;
    margin: 0 6px;
    cursor: pointer;
  }

  button:hover {
    border: 1px solid #e6e9ed;
  }
}
</style>