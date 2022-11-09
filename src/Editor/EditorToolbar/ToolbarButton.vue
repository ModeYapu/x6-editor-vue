<!--  -->
<template>
  <div class="tool-bar">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Undo</span>
      </template>
      <button @click="$emit('onUndo')" :class="{ 'disabled': !historyState.canUndo }">
        <IconFont type="icon-undo"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Redo</span>
      </template>
      <button @click="$emit('onRedo')" :class="{ 'disabled': !historyState.canRedo }">
        <IconFont type="icon-redo"></IconFont>
      </button>
    </a-tooltip>
    |
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Copy</span>
      </template>
      <button @click="$emit('copyCells')" :class="{ 'disabled': !hasSelected }">
        <IconFont type="icon-copy"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Paste</span>
      </template>
      <button @click="$emit('pasteCells')" :class="{ 'disabled': !hasSelected }">
        <IconFont type="icon-paste"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Delete</span>
      </template>
      <button @click="$emit('deleteCells')" :class="{ 'disabled': !hasSelected }">
        <IconFont type="icon-remove"></IconFont>
      </button>
    </a-tooltip>
    |
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Zoon In</span>
      </template>
      <button @click="$emit('zoonIn')">
        <IconFont type="icon-zoomOut"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Zoon Out</span>
      </template>
      <button @click="$emit('zoonOut')">
        <IconFont type="icon-zoomIn"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Fit Map</span>
      </template>
      <button @click="$emit('fitToContent')">
        <IconFont type="icon-fit-map"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Actual Size</span>
      </template>
      <button @click="$emit('scaleContentToFit')">
        <IconFont type="icon-actual-size"></IconFont>
      </button>
    </a-tooltip>
    |
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>To Back</span>
      </template>
      <button @click="$emit('toFront')" :class="{ 'disabled': !hasSelected }">
        <IconFont type="icon-to-back"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>To Front</span>
      </template>
      <button @click="$emit('toBack')" :class="{ 'disabled': !hasSelected }">
        <IconFont type="icon-to-front"></IconFont>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Multi Select</span>
      </template>
      <button @click="$emit('multiple')">
        <IconFont type="icon-multi-select"></IconFont>
      </button>
    </a-tooltip>
    |
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Json View</span>
      </template>
      <button @click="$emit('showJson')">
        <IconFontExt type="iconjson"></IconFontExt>
      </button>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Designer View</span>
      </template>
      <button @click="$emit('showDesigner')">
        <IconFontExt type="icondesign"></IconFontExt>
      </button>
    </a-tooltip>
    |
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>Save</span>
      </template>
      <button @click="$emit('save')">
        <a-icon type="save" />
      </button>
    </a-tooltip>
  </div>
</template>

<script>
import Vue from "vue"
import ref from 'vue-ref';
import { EventBus } from '../../eventBus'
import Icon from 'ant-design-vue/lib/icon'
import 'ant-design-vue/lib/icon/style/css'
import Tooltip from 'ant-design-vue/lib/tooltip'
import 'ant-design-vue/lib/tooltip/style/css'
Vue.use(ref, { name: 'ant-ref' });

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1101588_01zniftxm9yp.js',
})
const IconFontExt = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1529997_6nr9bramkvp.js',
});

export default {
  components: {
    IconFont: IconFont,
    IconFontExt: IconFontExt,
    'a-tooltip': Tooltip,
    'a-icon': Icon
  },
  props: ['historyState'],
  data() {
    return {
      hasSelected: false
    }
  },

  computed: {},

  mounted() {
    EventBus.$on('hasSelected', (selected) => {
      this.hasSelected = selected.length > 0
    })
  },

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

  .disabled {
    cursor: default;

    i {
      color: #d9d9d9;
    }
  }

  .disabled:hover {
    border: 1px solid #fff;
  }

}
</style>