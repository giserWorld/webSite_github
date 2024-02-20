/*
 ************************时间:2018.3.20 wxt******************
 *更新时间:2018.3.20
 *************************一、插件概述*************************
 *该插件封装了一个queryAdressAndCoordinate对象，该对象包含着关于地址、解析地址逆解析相关方法
 *************************二、方法*************************
 *1.queryAdress_bd(BLon,BLat,lyr,gisPoint):封装根据经纬度进行百度地图的地址的解析
 *2.queryAdress_gd(GDLon,GDLat,lyr,gisPoint):封装根据经纬度进行高德地图的地址的解析
 *3.jwdTypeTansformMenu(coordinateDivId):封装鼠标移动时显示经纬度类型的转换菜单
 *4.showCoordinate(mappoint,showCoordinateId):封装鼠标移动显示当前坐标
 *5.showCoordinate_er(containerId,mappoint):封装在mapview视图中显示鼠标移动的坐标
 *6.addressToBdDw(inputSearchTextId,bMapId,bdLyr):封装输入框智能提示地址，百度地址解析定位
 *7.coordinateToDfb(coordinateValue):十进制坐标转度分秒坐标函数
 *************************三、说明*************************
 * 
 *    
 *   
 **************************四、注意*************************
 *1.注意：引入百度api地址，该文件的引用要在coordinateTransform.js文件后面，
 *  否则使用不了坐标转换的方法
 *
 *
 *
 * */



var queryAdressAndCoordinate={};
window.queryAdressAndCoordinate=queryAdressAndCoordinate;




/******************十进制坐标转度分秒坐标函数************
 * 参数:coordinateValue(number):经度或纬度值
 * 返回值:dfm:返回一个值的度分秒的形式
 */
window.jwd_show_Type="";//默认的经纬度格式  (102.31度 ,24.02度)
queryAdressAndCoordinate.coordinateToDfb=function(coordinateValue){
var value2=Math.abs(coordinateValue);//绝对值    
var du=parseInt(value2);//取整值为度
var v1=(coordinateValue-du)*60;//小数转为分
var fen;
var dfm;
if(v1!=0){
fen=parseInt(v1);//取整值为分    
}
var v2=Math.round((v1-fen)*60); //秒   四舍五入
if(jwd_show_Type=="1"){
dfm=du+"度"+fen+"分"+v2+"秒";
}
else if(jwd_show_Type=="2"){
dfm=du+"°"+fen+"″"+v2+"′";
}
else{
dfm=coordinateValue+"度";
}
return dfm;
}//e


/*********************封装在mapview视图中显示鼠标移动的坐标*************
 *参数 :containerId(string):显示移动坐标的div容器id
 ******mappoint(Point):获取去的地图的点
 *无返回值
 *注解:mapview视图中没有海拔信息
 */
queryAdressAndCoordinate.showCoordinate_er=function(containerId,mappoint){
if(mappoint){
var lon1=mappoint.longitude;//经度
var lat1=mappoint.latitude;//纬度
var lon=lon1.toFixed(6);
var lat=lat1.toFixed(6);
var res="当前经度为:"+lon+"&nbsp;&nbsp"+"纬度为:"+lat;
document.getElementById(containerId).innerHTML=res;
}
}//e 

/**********封装输入框智能提示地址，百度地址解析定位********
 *参数:inputSearchTextId(string):地址智能提示的输入框Id
 *****bMapId(string):百度地图容器，用来创建百度地图对象
 *****bdLyr(graphicLayer):百度地址解析定位的图层
 * 无返回值
 *注意：引入百度api地址，该文件的引用要在coordinateTransform.js文件后面，
 *否则使用不了坐标转换的方法
 */
queryAdressAndCoordinate.addressToBdDw=function(inputSearchTextId,bMapId,bdLyr){
var myModel=window.myModel;//模块存储对象
var sceneview=window.mapRelatedObj.sceneview;//场景视图
bd_dzSearchEnter(inputSearchTextId);//给输入框绑定Enter
var inputAddress="";//智能补全的位置名称
var labelValue="";//用于定位点显示的标注
var bmap=new BMap.Map(bMapId);//创建地图
var ac=new BMap.Autocomplete({//自动补全实例
"input":inputSearchTextId,
"location":bmap   
});
ac.addEventListener("onhighlight",function(e){
var str="";
var _value= e.fromitem.value;
var value="";
if(e.fromitem.index>-1){
value= _value.province+ _value.city+ _value.district+_value.street+_value.business;
}
str="FromItem<br/>index="+e.fromitem.index+"<br />value="+ value;
value = "";
if(e.toitem.index>-1){
_value =e.toitem.value;
value=_value.province+_value.city+_value.district+_value.street+_value.business;
}
str+="<br/>ToItem<br/>index="+e.toitem.index+"<br/>value="+value;
//document.getElementById("searchResultPanel").innerHTML=str;//临时存储数据信息
});
ac.addEventListener("onconfirm",function(e){//回车或确认后调用函数
var _value=e.item.value;
inputAddress=_value.province+_value.city+_value.district+_value.street+_value.business;
//获取输入框中的显示地址
var name1=_value.province+_value.city+_value.district;
var name2=_value.street+_value.business;
labelValue=name1+"\n"+name2+"\n"+"\n";
bmap.clearOverlays();
var local=new BMap.LocalSearch(bmap,{//智能搜索位置经纬度 
onSearchComplete: myFun
});
local.search(inputAddress);//开始检索位置
function myFun(){//搜索完成回调函数
bdLyr.removeAll();  
var bdPoint=local.getResults().getPoi(0).point;//第一个百度坐标点
if (bdPoint){//百度点
var lon= bdPoint.lng;//百度经度
var lat= bdPoint.lat;//百度纬度
var gdCoordinate=coordinateTransform.bd09ToGCj02(lon,lat);//百度坐标转谷歌坐标
var lon1=gdCoordinate[0];//高德经度
var lat1=gdCoordinate[1];//高德纬度
var dwPoint=new myModel.Point({//创建arcgis中的定位点
longitude:lon1,
latitude:lat1,
spatialReference:{wkid:4326}
});
var textNameSym=new myModel.TextSymbol({//定位显示的标注 
text:labelValue,
color:"#FFFF00",
font:new myModel.Font({size:"10pt",weight:"bold"})
});
var text_graphic=new myModel.Graphic({//定位标注图形
geometry:dwPoint,
symbol:textNameSym
});
bdLyr.add(text_graphic);
var picSymbol = new myModel.PictureMarkerSymbol({
url:"utilityIcons/dwgif.gif",
width:"34px",
height:"34px"
});
var picGraphic=new myModel.Graphic({//定位图标
geometry:dwPoint,
symbol:picSymbol
});
bdLyr.add(picGraphic);
sceneview.goTo({target:picGraphic,zoom:15.76393877727478,tilt:59.29604283659093},{animate:true,speedFactor:0.6});
function bd_dzSearchEnter(bd_searchTextID){//百度地址搜索绑定Enter确认方法
var bd_Input = document.getElementById(bd_searchTextID);
bd_Input.onkeydown=function(evt){
if(evt.keyCode == 13){//判断按下的是enter键
if(bd_Input.value){
if(picGraphic && text_graphic){
bdLyr.removeAll();  
bdLyr.add(picGraphic);
bdLyr.add(text_graphic);
sceneview.goTo({target:picGraphic,zoom:15.76393877727478,tilt:59.29604283659093},{animate:true,speedFactor:0.6});
}    
}    
}    
}
}//e1
}
}
});
}//e

/**************************封装鼠标移动显示当前坐标************************
 *参数:mappoint(地图点):地图点
 *无返回值
 *注解：mappoint对象中要包含经度、纬度、海拔属性
 */
queryAdressAndCoordinate.showCoordinate=function(mappoint,showCoordinateId){
var myModel=window.myModel;//模块存储对象        
if(mappoint){
var lon1=mappoint.longitude;//经度
var lat1=mappoint.latitude;//纬度
var hb1=mappoint.z;//海拔    
var lon=lon1.toFixed(6);
var lat=lat1.toFixed(6);
var hb=hb1.toFixed(6);
lon=coordinateToDfb(eval(lon));
lat=coordinateToDfb(eval(lat));   
dom.byId(showCoordinateId).innerHTML=myModel.string
.substitute('当前经度为:${0}&nbsp;&nbsp;纬度为：${1}&nbsp;&nbsp;海拔为：${2}米',[lon,lat,hb]);//精确到小数点后6位    
}
function coordinateToDfb(coordinateValue){//坐标值转换方法
var value2 = Math.abs(coordinateValue);//绝对值    
var du = parseInt(value2);//取整值为度
var v1 = (coordinateValue-du)*60;//小数转为分
var fen;
var dfm;
if(v1!=0){
fen = parseInt(v1);//取整值为分    
}
var v2 = Math.round((v1-fen)*60); //秒   四舍五入
if(jwd_show_Type=="1"){
dfm =du+"度"+fen+"分"+v2+"秒";
}
else if(jwd_show_Type=="2"){
dfm =du+"°"+fen+"″"+v2+"′";
}
else{
dfm =coordinateValue+"度";
}
return dfm;
}//e1
}//e

/*****************封装鼠标移动时显示经纬度类型的转换菜单**************
 *参数:coordinateDivId(string):显示经纬度坐标的divId
 *无返回值
 *注解：jwd_show_Type的值的类型:
 *"1":"102度25分35秒"类型  "2":"102°25′35″ "类型  "3":"102.253587度"类型
 */
window.jwd_show_Type="1";//默认显示度分秒的类型    全局变量   
queryAdressAndCoordinate.jwdTypeTansformMenu=function(coordinateDivId){
var myModel=window.myModel;//模块存储对象    
var on=myModel.on;
var dom=myModel.dom;
var showDiv=dom.byId(coordinateDivId);
on(showDiv,"mouseover",function(evt){
if(showDiv){
createMenu2(showDiv);	
}
});
on(showDiv,"contextmenu", function (event) {
createMenu2(showDiv);
});
function createMenu2(domNode){
var menu1= new myModel.Menu({});
var hideall = new myModel.MenuItem({
label: "经纬度显示类型",
//iconClass: "glyphicon glyphicon-remove-sign",
onClick: function (e) {
}
});
var a = new myModel.MenuItem({
label: "102度25分35秒",
iconClass: "glyphicon glyphicon-eye-open",
onClick: function (e) {
jwd_show_Type = "1";
}
});
var b = new myModel.MenuItem({
label: "102°25′35″",
iconClass: "glyphicon glyphicon-eye-open",
onClick: function (e) {
jwd_show_Type = "2";
}
});
var c = new myModel.MenuItem({
label: "102.253587度",
iconClass: "glyphicon glyphicon-eye-open",
onClick: function (e) {
jwd_show_Type = "3";
}
});
menu1.addChild(hideall);
menu1.addChild(a);
menu1.addChild(b);
menu1.addChild(c);
menu1.startup(); 
menu1.bindDomNode(domNode);  //绑定右键功能
}
}//e

/**************************封装根据经纬度进行高德地图的地址的解析***************
 *参数:GDLon[number]:高德地图坐标系下的经度   火星坐标
 *****GDLat[number]:高德地图坐标系下的纬度
 *****lyr(GraphicsLayer):GraphicsLayer将要添加定位点的图层
 *****gisPoint(Point):arcgis中创建的Point对象
 *无返回值
 *注意:要引入coordinateTransform.js文件  coordinateTransform对象才能使用
 *var GDmap = new AMap.Map("b_map");//可以不需要创建高德地图对象   只要要引入高德api文件 
 */
queryAdressAndCoordinate.queryAdress_gd=function(GDLon,GDLat,lyr,gisPoint){ 
var myModel=window.myModel;//模块存储对象
var sceneview=window.mapRelatedObj.sceneview;//场景视图
GDLon=eval(GDLon);
GDLat=eval(GDLat);
if(!GDLon || !GDLat){
return;    
}
var adress="";
var geoc = new AMap.Geocoder({city:"全国",extensions:"all"});
var gdPoint = new AMap.LngLat(GDLon,GDLat);
geoc.getAddress(gdPoint,function(status, result){
if (status === "complete" && result.info === "OK"){
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
addAdressToLyr(adress2);//添加地址标注到指定的图层
});
function addAdressToLyr(adress2){//添加地址到图层上显示
lyr.removeAll();  
var ads=adress.split(",");
var text="";
var s1=ads[3];//县下一级的地址   0省  1城市  2地区 3乡镇 4街道 5街道号
if(s1){
for(var i=3;i<ads.length;i++){//县下一级开始标注
text=text+ads[i];
}
}
var p=new myModel.Point({
longitude:gisPoint.longitude,
latitude:gisPoint.latitude,
spatialReference:{wkid:4326}
});
var picSym=new myModel.PictureMarkerSymbol({
url:"utilityIcons/dzjx_dw.gif",
width:34,
height:34
});
var adressGra=new myModel.Graphic({//定位图标
geometry:p,
symbol:picSym
});
var sy_text=new myModel.TextSymbol({
text:text+"\n\n\n\n",
color:"#FFFF00",
font:new myModel.Font({size:"12pt",weight:"bold"})
});
var g_gd=new myModel.Graphic({//地址解析标注
geometry:p,
symbol:sy_text
});
lyr.add(adressGra);  
lyr.add(g_gd);   
sceneview.goTo({target:p,tilt:55.377548661082734,zoom:14.233582909066383},{animate:true,speedFactor:0.9});
}
}//e

/**************************封装根据经纬度进行百度地图的地址的解析**************************
 *参数:BLon[number]:百度坐标系下的经度   BD-09坐标
 *****BLat[number]:百度坐标系下的纬度
 *****lyr(GraphicsLayer):GraphicsLayer将要添加定位点的图层
 *****gisPoint(Point):arcgis中创建的Point对象
 *无返回值
 *注意:要引入coordinateTransform.js文件  coordinateTransform对象才能使用
 *var bMap = new BMap.Map("b_map")//可以不需要创建百度地图对象  只要引入百度api文件即可
 */
queryAdressAndCoordinate.queryAdress_bd=function(BLon,BLat,lyr,gisPoint){  
var myModel=window.myModel;//模块存储对象          
var sceneview=window.mapRelatedObj.sceneview;//场景视图
BLon=eval(BLon);
BLat=eval(BLat);
var adress="";
var geoc = new BMap.Geocoder();//百度地理编码
var bPoint = new BMap.Point(BLon,BLat);//百度地图点
geoc.getLocation(bPoint,function(rs){
var addComp = rs.addressComponents;
var addComp2="";
if(rs.surroundingPois.length>0){
addComp2 = rs.surroundingPois[0].title;//具体地址
}
var province=addComp.province?addComp.province:0;//省份
var city=addComp.city?addComp.city:0;//城市
var district=addComp.district?addComp.district:0;//地区
var street=addComp.street?addComp.street:0;//街道
var streetNumber=addComp.streetNumber?addComp.streetNumber:0//街道号
var addComp2=addComp2?addComp2:0;//详细的地址
var dz=[province,city,district,street,streetNumber,addComp2];
for(var i=0;i<dz.length-1;i++){//通过遍历检查哪个变量没有地址名，即变量值为0
if(dz[i]==0){
continue;//如果值为0,继续下一个循环	
}
else{
var b=dz[i]+",";
adress=adress+b;
adress2=adress.substring(0, adress.length-1);//去除最后一个字符
}
}
addAdressToLyr(adress2)
});
function addAdressToLyr(adress2){//添加地址到图层上显示
lyr.removeAll();  
var ads=adress.split(",");
var text="";
var s1=ads[2];//县下一级的地址
if(s1){
for(var i=3;i<ads.length;i++){//县下一级开始标注
text=text+ads[i];
}
}
var p=new myModel.Point({
longitude:gisPoint.longitude,
latitude:gisPoint.latitude,
spatialReference:{wkid:4326}
});
var picSym=new myModel.PictureMarkerSymbol({
url:"utilityIcons/dzjx_dw.gif",
width:34,
height:34
});
var adressGra=new myModel.Graphic({//定位图标
geometry:p,
symbol:picSym
});
var sy_text=new myModel.TextSymbol({
text:text+"\n\n\n\n",
color:"#FFFF00",
font:new myModel.Font({size:"12pt",weight:"bold"})
});
var g_bd=new myModel.Graphic({
geometry:p,
symbol:sy_text
});
lyr.add(adressGra);
lyr.add(g_bd);
//定位
sceneview.goTo({target:p,tilt:55.377548661082734,zoom:14.233582909066383},{animate:true,speedFactor:0.9});
}
}//e