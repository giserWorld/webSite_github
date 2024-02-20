/*
 *********************时间:2021.02.28 wxt********************
 **更新时间:2020.02.28
 *************************插件概述************************
 *该插件封装了一个cesiumUtils对象，该对象包含着cesium源码分析
 *************************方法*************************
 *
 *************************说明*************************
 *
 *************************注意*************************
 *defined(value):判断值是否为空
 *defaultValue(a,b):给定默认值
 *
 * */

let cesiumUtils={};

window.cesiumUtils=cesiumUtils;


/*************************给定默认值************************
 * @param {*} a:第一个参数值
 * @param {*} b:默认参数值
 * @returns {Boolean}:如果第一个参数有值，则返回第一个参数，否则返回第二个参数
 */
cesiumUtils.defaultValue=function(a,b){
  if(a !== undefined && a !== null){
    return a;
  }
  return b;
}//e


/*************************判断值是否为空************************
 * @param {*} value:判断是否为空
 * @returns {Boolean} :如果有值则返回true
 */
cesiumUtils.defined=function(value){
	return value !== undefined && value !== null;
}//e


//export default cesiumUtils;//暴露出去
