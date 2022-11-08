import Editor from './components/Editor/Editor.vue'

//为组件添加 install 方法
export function install(Vue) {
    Vue.component(Editor.name, Editor)
}
export {
  Editor
} 