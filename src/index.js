import Editor from './components/Editor/Editor.vue'

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('Editor', Editor)
}
//为组件添加 install 方法
Editor.install = function(Vue){
    Vue.component(Editor.name, Editor)
}
export default Editor

// export {default as Editor} from './editorInstall'