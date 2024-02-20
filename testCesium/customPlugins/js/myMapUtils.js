/*
 *********************时间:2018.4.17 wxt********************
 **更新时间:2020.12.02
 *************************插件概述************************
 *该插件封装了一个myMapUtils对象，该对象包含着地图实用工具的相关方法
 *************************方法*************************
 *coordinateToAddress_gd(gmap,lon_g,lat_g,callback):封装根据经纬度进行高德地图的地址的解析(高德)
 *geojson2WktStr(geojson):geojson转wkt字符串
 *************************说明*************************
 *
 *   
 *    
 *    
 *************************注意*************************
 * 
 *
 *
 * */

/*const wkx = require('./wkx/wkx');
const hexarray = require('./hex-array');
let AMap={};*/

let myMapUtils={};

window.myMapUtils=myMapUtils;
let wkx=hexarray={};




/**************************geojson转wkt字符串***************
 *参数:geojson(json):geojson对象
 *返回值:wkb_str(String):wkb字符串,postgis数据库格式
 *注意:要引入coordinateTransform.js文件  coordinateTransform对象才能使用
 *var GDmap = new AMap.Map("b_map");//可以不需要创建高德地图对象   只要要引入高德api文件 
 */
myMapUtils.geojson2WktStr=function(geojson){
let wkb_str=null;
if(geojson){
let wkb_blob=wkx.Geometry.parseGeoJSON(geojson).toWkb();//Uint8Array
wkb_str=hexarray.toString(wkb_blob);//"01010000003D0AD7A3708D594085EB51B81E053840"
}
return wkb_str;
}//e

/**************************封装根据经纬度进行高德地图的地址的解析(高德)***************
 *参数:GDLon[number]:高德地图坐标系下的经度   火星坐标
 *****GDLat[number]:高德地图坐标系下的纬度
 *****lyr(GraphicsLayer):GraphicsLayer将要添加定位点的图层
 *****gisPoint(Point):arcgis中创建的Point对象
 *无返回值
 *注意:要引入coordinateTransform.js文件  coordinateTransform对象才能使用
 *var GDmap = new AMap.Map("b_map");//可以不需要创建高德地图对象   只要要引入高德api文件 
 */
myMapUtils.coordinateToAddress_gd=function(gmap,lon_g,lat_g,callback){
let adress="";
if(!gmap||!lon_g||!lat_g)return "";
callback=callback||function(){};
let geoc = new AMap.Geocoder({city:"全国",extensions:"all"});
let gdPoint = new AMap.LngLat(lon_g,lat_g);//高德点
geoc.getAddress(gdPoint,function(status, result){
if(status === "complete" && result.info === "OK"){
var addComp = result.regeocode.addressComponent; //地址组成成分
var province=addComp.province?addComp.province:0;//省份
var city=addComp.city?addComp.city:0;//城市
var district=addComp.district?addComp.district:0;//地区
var township=addComp.township?addComp.township:0;//乡镇
var street=addComp.street?addComp.street:0;//街道
var streetNumber=addComp.streetNumber?addComp.streetNumber:0//街道号
var dz=[province,city,district,township,street,streetNumber];	
for(var i=0;i<dz.length-1;i++){//通过遍历检查哪个变量没有地址名，即变量值为0
if(dz[i]==0){
continue;//如果值为0,继续下一个循环	
}
else{
var b=dz[i]+",";
adress=adress+b;
var adress2=adress.substring(0, adress.length-1);//去除最后一个字符
}
}
}
callback(adress2);//添加地址标注到指定的图层
});
}//e

//export default myMapUtils;//暴露出去
