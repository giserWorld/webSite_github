/*************************时间:2018.3.20 wxt**********************
 *更新时间:2021.04.07 wxt
 *****************************overview**************************
 *该插件封装了一个coordinateTransform对象，用于转换各种坐标系的转换
 *******************************note****************************
 *WGS84：国际坐标系，为一种大地坐标系，也是目前广泛使用的GPS全球卫星定位系统使用的坐标系。
 *GCJ02：火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
 *BD09：为百度坐标系，在GCJ02坐标系基础上再次加密。其中bd09ll表示百度经纬度坐标，bd09mc表示百度墨卡托米制坐标
 *
 *BD-09(百度坐标系):百度地图
 *GCJ-02(火星坐标系): 谷歌地图、高德地图、腾讯地图
 * 
 ******************************document*************************
 *1.bd09ToGCj02(lng,lat):百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换     即 百度 转 谷歌、高德
 *2.GCj02ToBd09(lng,lat):火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换  即谷歌、高德 转 百度
 *3.WGS84ToGCJ02(lng,lat):WGS84转换为GCJ02
 *4.GCJ02ToWGS84(lng,lat):GCJ02转换为 WGS84
 * 
 * 
 */

let coordinateTransform={};

window.coordinateTransform=coordinateTransform;

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/****百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换,即 百度 转 谷歌、高德*******
 *参数:bd_lon(number):百度经度
 *****bd_lat(number):百度纬度
 *返回值 array:返回一个GCJ-02的经纬度数组  例如:[lon,lat]
 */
coordinateTransform.bd09ToGCj02=function(bd_lon,bd_lat){
var x_pi = 3.14159265358979324*3000.0 / 180.0;
var x = bd_lon - 0.0065;
var y = bd_lat - 0.006;
var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
var gg_lng = z * Math.cos(theta);
var gg_lat = z * Math.sin(theta);
return [gg_lng,gg_lat];
}//e1

//
/****火星坐标系 (GCJ-02) 与百度坐标系 (BD-09)的转换,即谷歌、高德转百度*******
 *参数:lng(number):谷歌、高德经度
 *****lat(number):谷歌、高德纬度
 *返回值 array:返回一个BD-09经纬度数组  例如:[lon,lat]
 */
coordinateTransform.GCj02ToBd09=function(lng, lat){
var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
var bd_lng = z * Math.cos(theta) + 0.0065;
var bd_lat = z * Math.sin(theta) + 0.006;
return [bd_lng, bd_lat]
}//e2

/*************************WGS84转GCJ02************************
 *更新时间:2020.09.07
 *参数:lng(number):WGS84经度
 *****lat(number):WGS84纬度
 *返回值 array:返回一个GCJ02经纬度数组  例如:[lon,lat]
 */
coordinateTransform.WGS84ToGCJ02=function(lng, lat){
lng=eval(lng);
lat=eval(lat);
if(out_of_china(lng, lat)){//国外不做偏移
return [lng, lat]
}
else{//国内
var dlat = transformlat(lng - 105.0, lat - 35.0);
var dlng = transformlng(lng - 105.0, lat - 35.0);
var radlat = lat / 180.0 * PI;
var magic = Math.sin(radlat);
magic = 1 - ee * magic * magic;
var sqrtmagic = Math.sqrt(magic);
dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
var mglat = lat + dlat;
var mglng = lng + dlng;
return [mglng, mglat];
}
}//e3
/*************************GCJ02转换为WGS84************************
 *参数:lng(number):GCJ02经度
 *****lat(number):GCJ02纬度
 *返回值 array:返回一个WGS84经纬度数组  例如:[lon,lat]
 */
coordinateTransform.GCJ02ToWGS84=function(lng,lat){
if(out_of_china(lng,lat)){
return [lng, lat]
}
else{
var dlat = transformlat(lng - 105.0, lat - 35.0);
var dlng = transformlng(lng - 105.0, lat - 35.0);
var radlat = lat / 180.0 * PI;
var magic = Math.sin(radlat);
magic = 1 - ee * magic * magic;
var sqrtmagic = Math.sqrt(magic);
dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
mglat = lat + dlat;
mglng = lng + dlng;
return [lng * 2 - mglng, lat * 2 - mglat]
}
}//e4

//变换经度
function transformlng(lng,lat){
var pi = 3.14159265358979324;// 圆周率
var a = 6378245.0;// WGS 长轴半径
var ee = 0.00669342162296594323;// WGS 偏心率的平方
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1* Math.sqrt(Math.abs(lng));
ret += (20.0 * Math.sin(6.0 * lng * pi) + 20.0 * Math.sin(2.0 * lng * pi)) * 2.0 / 3.0;
ret += (20.0 * Math.sin(lng * pi) + 40.0 * Math.sin(lng / 3.0 * pi)) * 2.0 / 3.0;
ret += (150.0 * Math.sin(lng / 12.0 * pi) + 300.0 * Math.sin(lng / 30.0* pi)) * 2.0 / 3.0;
return ret;	
}

//变换纬度
function transformlat(lng,lat){
var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
return ret
}
//判断是否在国内，不在国内则不做偏移
function out_of_china(lon,lat){
if (lon < 72.004 || lon > 137.8347) {//国外
return true;
}
if (lat < 0.8293 || lat > 55.8271){
return true;
}
return false;
}

//export default coordinateTransform;

