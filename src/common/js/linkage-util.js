/*
    地区选择控件的选项文档说明
    具体网址： https://github.com/AppianZ/multi-picker/tree/master/MultiPicker
*/
import MultiPicker from 'mob-multi-picker'
import 'common/stylus/selectArea.styl'
export function linkage (triggerId, containerId, jsonData, callback) {
    /* eslint-disable no-new */
    new MultiPicker({
        input: triggerId, // 点击触发插件的input框的id
        container: containerId, // 插件插入的容器id
        jsonData: jsonData,
        success: callback
    })
}