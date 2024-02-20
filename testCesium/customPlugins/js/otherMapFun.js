/*
 ***********************时间:2018.10.15  wxt****************
 *更新时间:2018.10.15
 *************************一、插件概述************************
 *该插件封装了一个otherMapFun对象，该对象包含着关于其它地图api实用方法
 *************************二、方法*************************
 *drapMarkerQueryDZ(gMap,drapSuccessFun,drapErrorFun,renewBtnId):封装通过拖动地图要素图标查询当前的位置信息(定位坐标为高德坐标)
 *drapMarkerQueryDZ_wgs84(gMap,drapSuccessFun,drapErrorFun,renewBtnId):封装通过拖动地图要素图标查询当前的位置信息(定位坐标为wgs84)
 *dwMyPosition(gMap,dwSuccessFun):通过高德地图定位到我的当前位置(定位坐标为高德坐标,有偏移)
 *dwMyPosition_wgs84(gMap,dwSuccessFun):通过高德地图定位到我的当前位置(定位坐标为wgs84,无偏移偏移)
 *************************三、说明*************************
 * 
 *   
 *    
 *    
 **************************四、注意*************************
 * 
 *
 *
 * */


var otherMapFun={};
window.otherMapFun=otherMapFun;


/******************通过高德地图定位到我的当前位置(定位坐标为wgs84,无偏移偏移)****************
 *参数:gMap(AMap):高德地图的地图对象
 *****dwSuccessFun(funcition):定位成功回调函数，回调函数中包含位置信息的positionResult参数
 *无返回值
 *注解:使用该方法时必须要引入相应的api,坐标无偏移
 *1.高德api web端key:"//webapi.amap.com/maps?v=1.4.10&key=440b58e2e1a277fabb2847ec037a806f"
 *2.要引入coordinateTransform.js文件，该方法中的坐标转换才可以使用
 */
otherMapFun.dwMyPosition_wgs84=function(gMap,dwSuccessFun){
dwSuccessFun=dwSuccessFun||function(result){};
if(gMap){
AMap.plugin("AMap.Geolocation",function(){/* 异步加载插件 */
var geolocation=new AMap.Geolocation({//地理定位
enableHighAccuracy:true,//是否使用高精度定位，默认:true
timeout:10000,//超过10秒后停止定位，默认：5s
buttonPosition:'RB',//定位按钮部件的停靠位置
buttonOffset:new AMap.Pixel(10,20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
zoomToAccuracy:false,//定位成功后是否自动调整地图视野到定位点 
convert:true,//是否使用坐标偏移坐标（true为偏移坐标即高德坐标）,false:为浏览器定位坐标
showMarker:false,//定位成功后在定位到的位置显示点标记，默认：true
showCircle:false,//定位成功后用圆圈表示定位精度范围，默认：true
markerOptions:{//位置符号的设置
icon:new AMap.Icon({image:"utilityIcons/dwPosition2.png",imageSize:new AMap.Size(32,32)}),
draggable:false
}
});
gMap.addControl(geolocation);//添加定位控件到地图
geolocation.on("error",function(GeolocationError){//定位失败回调函数
if(GeolocationError.info=="NOT_SUPPORTED"){
alert("当前浏览器不支持定位功能，请更换浏览器！");	
}
else{
message=GeolocationError.message || "定位失败！";
alert(message);	
}
});
geolocation.getCurrentPosition(function(status,result){
if(status=="complete"){//定位成功
var position=result.position;//定位位置
var lon=position.lng;//经度
var lat=position.lat;//纬度
var addressComponent=result.addressComponent;//地址组件
var dwAdress=result.formattedAddress;//定位地址解析
var dwXZDM=result.addressComponent.adcode;//定位地区的行政代码
var dwType=result.location_type;//定位的类型，
var lon=coordinateTransform.GCJ02ToWGS84(lon,lat)[0];//wgs84坐标
var lat=coordinateTransform.GCJ02ToWGS84(lon,lat)[1];
var pt=new AMap.Marker({
position:[lon,lat],
icon:new AMap.Icon({image:"utilityIcons/dwPosition2.png",imageSize:new AMap.Size(32,32)})
})
gMap.add(pt);
gMap.setZoom(18);
window.setTimeout(function(){
gMap.setCenter([lon,lat]);	
},100);
dwSuccessFun(result);
}
});
});	
}
}//e


/******************通过高德地图定位到我的当前位置(定位坐标为高德坐标,有偏移)****************
 *参数:gMap(AMap):高德地图的地图对象
 *****dwSuccessFun(funcition):定位成功回调函数，回调函数中包含位置信息的positionResult参数
 *无返回值
 *注解:使用该方法时必须要引入相应的api,坐标有偏移
 *1.高德api web端key:"//webapi.amap.com/maps?v=1.4.10&key=440b58e2e1a277fabb2847ec037a806f"
 */
otherMapFun.dwMyPosition=function(gMap,dwSuccessFun){
dwSuccessFun=dwSuccessFun||function(result){};
if(gMap){
AMap.plugin("AMap.Geolocation",function(){/* 异步加载插件 */
var geolocation=new AMap.Geolocation({//地理定位
enableHighAccuracy:true,//是否使用高精度定位，默认:true
timeout:10000,//超过10秒后停止定位，默认：5s
buttonPosition:'RB',//定位按钮部件的停靠位置
buttonOffset:new AMap.Pixel(10,20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
zoomToAccuracy:true,//定位成功后是否自动调整地图视野到定位点 
convert:true,//是否使用坐标偏移坐标（true为偏移坐标即高德坐标）,false:为浏览器定位坐标
showMarker:true,//定位成功后在定位到的位置显示点标记，默认：true
showCircle:true,//定位成功后用圆圈表示定位精度范围，默认：true
markerOptions:{//位置符号的设置
icon:new AMap.Icon({image:"utilityIcons/dwPosition2.png",imageSize:new AMap.Size(32,32)}),
draggable:false
}
});
gMap.addControl(geolocation);//添加定位控件到地图
geolocation.on("error",function(GeolocationError){//定位失败回调函数
if(GeolocationError.info=="NOT_SUPPORTED"){
alert("当前浏览器不支持定位功能，请更换浏览器！");	
}
else{
message=GeolocationError.message || "定位失败！";
alert(message);	
}
});
geolocation.getCurrentPosition(function(status,result){
if(status=="complete"){//定位成功
var position=result.position;//定位位置
var lon=position.lng;//经度
var lat=position.lat;//纬度
var addressComponent=result.addressComponent;//地址组件
var dwAdress=result.formattedAddress;//定位地址解析
var dwXZDM=result.addressComponent.adcode;//定位地区的行政代码
var dwType=result.location_type;//定位的类型，
dwSuccessFun(result);
}
});
});	
}
}//e

/**************封装通过拖动地图要素图标查询当前的位置信息(定位坐标为wgs84)*****************
 *参数:gMap(AMap):高德地图的地图对象
 *****drapSuccessFun(function):拖拽拾取位置成功回调函数，回调函数中包含位置信息的positionResult参数
 *****drapErrorFun(function):拖拽拾取位置失败回调函数，回调没有参数
 *****renewBtnId(string);点击重新定位的按钮id值,如果为"",则不会应用重新定位的功能
 *无返回值
 *注解:使用该方法时必须要引入相应的api,坐标无偏移
 *1.高德api web端key:"//webapi.amap.com/maps?v=1.4.10&key=440b58e2e1a277fabb2847ec037a806f"
 *2.引入UI组件库:"//webapi.amap.com/ui/1.0/main.js"
 *3.要引入coordinateTransform.js文件，该方法中的坐标转换才可以使用
 */
otherMapFun.drapMarkerQueryDZ_wgs84=function(gMap,drapSuccessFun,drapErrorFun,renewBtnId){
var positionPicker;
var geolocation;
drapSuccessFun=drapSuccessFun||function(){};
drapErrorFun=drapErrorFun||function(){};
renewBtnId=renewBtnId||"";
if(gMap){
AMapUI.loadUI(["misc/PositionPicker"],function(PositionPicker){//加载位置拾取部件
positionPicker = new PositionPicker({//位置拾取对象
mode:"dragMarker",//拖拽模式
map:gMap,//依赖地图对象
iconStyle:{
url:"utilityIcons/dwPosition2.png",//图片地址
size:[32,32],//要显示的点大小，将缩放图片
ancher:[24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
}
});
positionPicker.on("success",drapSuccessFun); //拖拽拾取位置成功事件
positionPicker.on("fail",drapErrorFun);//拖拽拾取位置失败事件	
if(renewBtnId){
var cxBtn=document.getElementById(renewBtnId);
if(cxBtn){
cxBtn.onclick=function(){
getCurrentWZ();	
}	
}
}
AMap.plugin("AMap.Geolocation",function(){
geolocation=new AMap.Geolocation({//地理定位
enableHighAccuracy:true,//是否使用高精度定位，默认:true
timeout:10000,//超过10秒后停止定位，默认：5s
showButton:false,//是否显示定位按钮
buttonPosition:'RB',//定位按钮部件的停靠位置
buttonOffset:new AMap.Pixel(10,20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
zoomToAccuracy:false,//定位成功后是否自动调整地图视野到定位点 
convert:true,//是否使用坐标偏移坐标（true为偏移坐标即高德坐标）,false:为浏览器定位坐标
showMarker:false,//定位成功后在定位到的位置显示点标记，默认：true
showCircle:false,//定位成功后用圆圈表示定位精度范围，默认：true
});
geolocation.on("error",function(GeolocationError){//定位失败回调函数
if(GeolocationError.info=="NOT_SUPPORTED"){
alert("当前浏览器不支持定位功能，请更换浏览器！");	
}
else{
message=GeolocationError.message || "定位失败！";
alert(message);	
}
});
gMap.addControl(geolocation);//添加定位控件到地图 必有
getCurrentWZ();
});
});
/*函数*/
function getCurrentWZ(){
geolocation.getCurrentPosition(function(status,result){
if(status=="complete"){//定位成功
var position=result.position;//定位位置
var lon=position.lng;//经度
var lat=position.lat;//纬度
var addressComponent=result.addressComponent;//地址组件
var dwAdress=result.formattedAddress;//定位地址解析
var dwXZDM=result.addressComponent.adcode;//定位地区的行政代码
var dwType=result.location_type;//定位的类型
var lon=coordinateTransform.GCJ02ToWGS84(lon,lat)[0];//wgs84坐标
var lat=coordinateTransform.GCJ02ToWGS84(lon,lat)[1];
gMap.setZoom(18);
window.setTimeout(function(){
gMap.setCenter([lon,lat]);	
},100);
positionPicker.stop();
positionPicker.start([lon,lat]);//创建位置拾取部件
}
});	
}//e1
}
}//e


/**************封装通过拖动地图要素图标查询当前的位置信息(定位坐标为高德坐标)*****************
 *参数:gMap(AMap):高德地图的地图对象
 *****drapSuccessFun(function):拖拽拾取位置成功回调函数，回调函数中包含位置信息的positionResult参数
 *****drapErrorFun(function):拖拽拾取位置失败回调函数，回调没有参数
 *****renewBtnId(string);点击重新定位的按钮id值,如果为"",则不会应用重新定位的功能
 *无返回值
 *注解:使用该方法时必须要引入相应的api,坐标有偏移
 *1.高德api web端key:"//webapi.amap.com/maps?v=1.4.10&key=440b58e2e1a277fabb2847ec037a806f"
 *2.引入UI组件库:"//webapi.amap.com/ui/1.0/main.js"
 */
otherMapFun.drapMarkerQueryDZ=function(gMap,drapSuccessFun,drapErrorFun,renewBtnId){
var positionPicker;
var geolocation;
drapSuccessFun=drapSuccessFun||function(){};
drapErrorFun=drapErrorFun||function(){};
renewBtnId=renewBtnId||"";
if(gMap){
AMapUI.loadUI(["misc/PositionPicker"],function(PositionPicker){//加载位置拾取部件
positionPicker = new PositionPicker({//位置拾取对象
mode:"dragMarker",//拖拽模式
map:gMap,//依赖地图对象
iconStyle:{
url:"utilityIcons/dwPosition2.png",//图片地址
size:[32,32],//要显示的点大小，将缩放图片
ancher:[24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
}
});
positionPicker.on("success",drapSuccessFun); //拖拽拾取位置成功事件
positionPicker.on("fail",drapErrorFun);//拖拽拾取位置失败事件	
if(renewBtnId){
var cxBtn=document.getElementById(renewBtnId);
if(cxBtn){
cxBtn.onclick=function(){
getCurrentWZ();	
}	
}
}
AMap.plugin("AMap.Geolocation",function(){
geolocation=new AMap.Geolocation({//地理定位
enableHighAccuracy:true,//是否使用高精度定位，默认:true
timeout:10000,//超过10秒后停止定位，默认：5s
showButton:false,//是否显示定位按钮
buttonPosition:'RB',//定位按钮部件的停靠位置
buttonOffset:new AMap.Pixel(10,20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
zoomToAccuracy:true,//定位成功后是否自动调整地图视野到定位点 
convert:true,//是否使用坐标偏移坐标（true为偏移坐标即高德坐标）,false:为浏览器定位坐标
showMarker:false,//定位成功后在定位到的位置显示点标记，默认：true
showCircle:true,//定位成功后用圆圈表示定位精度范围，默认：true
});
geolocation.on("error",function(GeolocationError){//定位失败回调函数
if(GeolocationError.info=="NOT_SUPPORTED"){
alert("当前浏览器不支持定位功能，请更换浏览器！");	
}
else{
message=GeolocationError.message || "定位失败！";
alert(message);	
}
});
gMap.addControl(geolocation);//添加定位控件到地图 必有
getCurrentWZ();
});
});
/*函数*/
function getCurrentWZ(){
geolocation.getCurrentPosition(function(status,result){
if(status=="complete"){//定位成功
var position=result.position;//定位位置
var lon=position.lng;//经度
var lat=position.lat;//纬度
var addressComponent=result.addressComponent;//地址组件
var dwAdress=result.formattedAddress;//定位地址解析
var dwXZDM=result.addressComponent.adcode;//定位地区的行政代码
var dwType=result.location_type;//定位的类型
positionPicker.stop();
positionPicker.start([lon,lat]);//创建位置拾取部件
}
});	
}//e1
}
}//e