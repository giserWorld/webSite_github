/*
 ***********************时间:2019.10.23  wxt****************
 *更新时间:2020.04.05
 **************************overview************************
 *该插件封装了一个myGeoLib对象，该对象包含着关于空间分析方法源码
 *****************************note*************************
 *1.
 *************************document*************************
 *drawCanvas_geojson(canvas,width,height,geojson):将geojson几何绘制到canvas
 *getBoundBox_coords(geoCoords):获取常规经纬度坐标数据的BoundingBox
 *hexColorToRgbaColor(HexColor,alpha):封装将十六进制格式的颜色转RGBA格式的颜色
 *wgs84ToMercator(longitude,longitude):将wgs84坐标转Mercator投影坐标
 *************************三、说明*************************
 * 
 *
 *
 * */


var myGeoLib={};
window.myGeoLib=myGeoLib;



/*************************封装将十六进制格式的颜色转RGB格式的颜色************************
 *更新时间:2020.04.05
 *参数:HexColor(string):十六进制格式的颜色,即css,html中使用的格式，例如:“#FFFFFF”
 ****alpha(number):染色透明度，默认为1.0
 *返回值:rgbaColor(string):rgba格式的颜色
 */
myGeoLib.hexColorToRgbaColor=function(HexColor="",alpha=1.0){
let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
let rgbaColor=null;
alpha=(!alpha&&(eval(alpha)!=0))?1.0:alpha;
if(eval(alpha)<0||eval(alpha)>1)alpha=1.0;
if(HexColor){
var sColor=HexColor.toLowerCase();
if(sColor && reg.test(sColor)){
if(sColor.length === 4){
var sColorNew = "#";
for(var i=1; i<4; i+=1){
sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));    
}
sColor = sColorNew;
}
//处理六位的颜色值
var sColorChange = [];
for(var i=1; i<7; i+=2){
sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
}
sColorChange.push(eval(alpha));
rgbaColor="RGBA(" + sColorChange.join(",") + ")";
}
else{
rgbaColor=sColor;    
}
}
return rgbaColor;
}//e




/********************将wgs84坐标转Mercator投影坐标*******************
 *参数:longitude(number):经度
 *****longitude(number):纬度
 *返回值(point):投影坐标点
 *注解:
 *1.投影坐标点:
 point={
 	x:"",
 	y:""
 };
 *2.与turf.js计算结果相同
 */
myGeoLib.wgs84ToMercator=function(longitude, latitude){
var point = null;	
if(longitude&&longitude){
var radius = 6378137;
var max = 85.0511287798;
var radians = Math.PI / 180;
point = {};
point.x = radius * longitude * radians;
point.y = Math.max(Math.min(max, latitude), -max) * radians;
point.y = radius * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)));
}
return point;
}//e


/*********************************将geojson几何绘制到canvas***********************************
 *参数:canvas(string||dom):canvasId值或dom节点
 *****width(number):canvas绘制的宽度
 *****height(number):canvas绘制的高度
 *****geojson(geojson):geojson,支持(LineString,Polygon,MultiLineString,MultiPolygon)
 *****style(object):绘图样式，详细见"相关笔录"
 *无返回值
 *注解:
 *1.使用该方法需要引入turf.js
 *2.该方法支持"LineString","Polygon","MultiLineString","MultiPolygon"
 *3.不支持"Point"、"MultiPoint"
 *4.geojson坐标系必须为"EPSG4326"，不能为"EPSG:3857"
 */
myGeoLib.drawCanvas_geojson=function(canvas,width,height,geojson,style){
var context,coords,point,latitude,longitude,xScale,yScale,scale,bounds={};
width=width||300;
height=height||300;
style=style||{};//绘图样式
let color=style.color||"#000000"//圆点颜色
let pointSize=style.pointSize||"#000000"//圆点大小,单位"px"
let lineWidth=style.lineWidth||"2.0"//线宽度
let lineColor=style.lineColor||"#0000FF"//线颜色
let fillColor=style.fillColor||"#000000"//面填充色
let alphaValue=style.alphaValue||"1.0"//面填充透明度
let borderWidth=style.borderWidth||"2.0"//面边框宽度
let borderColor=style.borderColor||"#FF0000"//面边框颜色
canvas.width=eval(width);
canvas.height=eval(height);
let ringArray=[];//三维坐标
if(canvas&&geojson){
canvas=typeof(canvas)=="string"?document.getElementById("canvas"):canvas;
context = canvas.getContext('2d');//ctx 2d
if(geojson.type=="Point"){
let coord2=geojson.coordinates;//一维数组
ringArray.push(coord2);
bounds={};
console.warn("暂不支持'Point'几何绘制!");
}
else if(geojson.type=="LineString"){
let coord2=geojson.coordinates;//二维数组
ringArray.push(coord2);
bounds=myGeoLib.getBoundBox_coords(coord2);	
}
else if(geojson.type=="Polygon"){
ringArray=geojson.coordinates;//三维数组
bounds=myGeoLib.getBoundBox_coords(ringArray[0]);
}
else if(geojson.type=="MultiPoint"){
bounds={};
console.log("暂不支持'MultiPoint'几何绘制!");
}
else if(geojson.type=="MultiLineString"){
ringArray=geojson.coordinates;//三维数组
let boxCoords=turf.coordAll(geojson);
bounds=myGeoLib.getBoundBox_coords(boxCoords);
}
else if(geojson.type=="MultiPolygon"){
let coords1=geojson.coordinates||[];//四维数组
coords1.forEach(function(item){
ringArray.push(item[0]);//单环几何	
});
let boxCoords=turf.coordAll(geojson);
bounds=myGeoLib.getBoundBox_coords(boxCoords);
}
//计算屏幕坐标与经纬度坐标的缩放比例
if(!bounds.xMax||!bounds.xMin||!bounds.yMax||!bounds.yMin)return false;//几何bbox
xScale = width / Math.abs(bounds.xMax - bounds.xMin);//1度的地理距离对应多少像素(width)
yScale = height / Math.abs(bounds.yMax - bounds.yMin);//1度的地理距离对应多少像素(height)
scale = xScale < yScale ? xScale : yScale;//取x,y方向的最小的缩放比例
for(let i=0;i<ringArray.length;i++){//[[[lon,lat],[lon,lat]]]
coords=ringArray[i];//ring
for (var j = 0; j < coords.length; j++) {//绘制单环坐标
longitude = coords[j][0];
latitude = coords[j][1];
var xoffset=width/2.0-Math.abs(bounds.xMax - bounds.xMin)/2*scale;//几何中心x相对画布中心x方向差值
var yoffset=height/2.0-Math.abs(bounds.yMax - bounds.yMin)/2*scale;//几何中心y相对画布中心y方向差值
//wgs84投影坐标点
point = {//计算画布坐标,wgs84
x: (longitude - bounds.xMin) * scale+xoffset,//几何坐标都平移(几何中心点对应canvas中心)
y: (bounds.yMax - latitude) * scale+yoffset//几何坐标都平移(几何中心点对应canvas中心)
};
//Mercator投影坐标点
/*point=myGeoLib.wgs84ToMercator(longitude,latitude);
bounds.xMin=myGeoLib.wgs84ToMercator(bounds.xMin,bounds.yMin).x;
bounds.yMax=myGeoLib.wgs84ToMercator(bounds.xMax,bounds.yMax).y;
point = {//计算画布坐标,Mercator
 x: (point.x - bounds.xMin) * scale,
 y: (bounds.yMax - point.y) * scale
};*/
if (j === 0) {//绘制第一个坐标点
context.beginPath();
context.moveTo(point.x, point.y);
} else {
context.lineTo(point.x, point.y);
}
}
if(geojson.type=="Point"||geojson.type=="MultiPoint"){

}else if(geojson.type=="LineString"||geojson.type=="MultiLineString"){//绘制线
context.strokeStyle=lineColor
context.lineWidth=eval(lineWidth);
context.stroke();
}else if(geojson.type=="Polygon"||geojson.type=="MultiPolygon"){//绘制面
if(!fillColor.match("rgba"))fillColor=myGeoLib.hexColorToRgbaColor(fillColor,alphaValue);//rgba格式
context.fillStyle=fillColor;//填充色
context.fill();//填充绘制
context.strokeStyle=borderColor;
context.lineWidth=borderWidth;
if(borderWidth&&eval(borderWidth)>0)context.stroke();
}
}
}	
}//e


/*****************************获取常规经纬度坐标数据的BoundingBox*************************
 *参数:geoCoords(Array):常规坐标，即二维坐标，例如:[[lon,lat],[lon,lat]]
 *返回值bounds(object):返回包含边界框坐标点的对象
 *注解:
 *1.bounds边界框对象:
 *bounds={
 	xMin:"",
 	xMax:"",
 	yMin:"",
 	yMax:"",
 };
 *2.与turf.js计算结果相同
 */
myGeoLib.getBoundBox_coords=function(geoCoords){
var bounds = {}, geoCoords, latitude, longitude;
if(geoCoords&&geoCoords.length>0){
for(var j=0;j<geoCoords.length;j++){
longitude = geoCoords[j][0];
latitude = geoCoords[j][1];
bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;//计算bbox
bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
}
}
return bounds;
}//e
