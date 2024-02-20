/* eslint-disable */
/*
 ***********************时间:2019.05.26 wxt**********************
 *更新时间:2023.03.31  wxt (react、vue通用)
 *****************************overview**************************
 *该插件封装了一个myCesium对象，该对象包含着地图实用的方法
 *插件中的代码是独立于业务和地图组件封装的函数，主要是为了供地图内部使用
 *******************************note****************************
 *1.该插件代码是基于底层地图代码进行的二次封装，使用时需要引入相关的lib文件
 ******************************document*************************
 *api_addGeoDatasToMap_Backend(viewer,jsonGeo,dataSourceLayer,attr,isClear):加载geojson格式的几何数据到地图(geojson几何数据)
 *addManyPrimitiveCollection(primitiveCollection,priCollections):封装在primitiveCollection集合中添加多个primitiveCollection图层
 *addCoverLayer_byCode(viewer,coverWMSLayer,xzCodes,cqlField,mapServerConfig):根据codes字段添加遮盖图层(属性筛选遮盖)
 *addCoverLayer_wms(viewer,coverWMSLayer,wmsUrl,cqlStr):添加遮盖图层(coverLayer)
 *createDotPrimitive_sym(coord,attr,color,pointSize,outlineColor,outlineWidth):封装创建圆点要素Primitive(dot,WGS84,symbol)
 *createDotPrimitive_car(cartesian3,attr,color,pointSize,outlineColor,outlineWidth):封装创建primitive圆点要素(dot,世界坐标)
 *createPicPtPrimitive(coord,imgSrc,attr,heightReference):封装创建primitive点图标要素(Point,WGS84)
 *createPicPtPrimitive_car(cartesian3,imgSrc,attr,heightReference):封装创建primitive点图标要素(Point,世界坐标)
 *createModelEntity(coord,modelUrl,modelHpr,attr,lyrId,parentEntity,heightReference):封装创建模型要素entity(model,WGS84)
 *createDotEntity(coord,color,attr,entityId,lyrId,parentEntity,heightReference):封装创建圆点要素entity(dot,WGS84)
 *createDotEntity_sym(coord,color,attr,entityId,pointSize,lyrId,parentEntity,heightReference):封装创建圆点要素entity(dot,WGS84,symbol)
 *createDotEntity_car(cartesian3,color,attr,entityId,lyrId,parentEntity,heightReference):封装创建圆点要素entity(dot,世界坐标)
 *createMultiDotEntity(geoDatas,color,attr,entityId,lyrId,parentEntity,heightReference):封装创建多圆点entity(MultiDot,WGS84)
 *createMultiDotEntity_sym(geoDatas,color,attr,entityId,pointSize,lyrId,parentEntity,heightReference):封装创建多圆点entity(MultiDot,WGS84,symbol)
 *createPicPtEntity(coord,imgSrc,attr,entityId,lyrId,parentEntity,heightReference):封装创建点图标要素entity(point,WGS84坐标)
 *createPicPtEntity_car(cartesian3,imgSrc,attr,entityId,lyrId,parentEntity,heightReference):封装创建点图标要素entity(point,世界坐标)
 *createMultiPicPtEntity(geoDatas,imgSrc,attr,entityId,lyrId,parentEntity,heightReference):封装创建多点图标要素entity(MultiPoint)
 *createPolylineEntity(lineDatas,attr,entityId,symbol,lyrId,parentEntity,isGround):封装创建线要素entity(polyline,WGS84坐标)
 *createPolylineEntity_car(lineDatas,attr,entityId,symbol,lyrId,parentEntity,isGround):封装创建线要素entity(polyline,世界坐标)
 *createMultiPolylineEntity(lineDatas,attr,entityId,symbol,lyrId,parentEntity,isGround):封装创建多线要素entity(MultiLineString)
 *createPolygonEntity_holes(geoCoords,attr,symbol,borderSym,borderWidth,lyrId,parentEntity):封装创建指定样式孔洞面要素entity(Polygon，WGS84坐标,symbol)
 *createPolygonEntity(mianDatas,attr,entityId,symbol,lyrId,parentEntity):封装创建面要素entity(polygon,WGS84坐标)
 *createPolygonEntity_sym(mianDatas,attr,entityId,symbol,borderSym,lyrId,parentEntity):封装创建指定样式面要素entity(Polygon，WGS84坐标,symbol)
 *createPolygonEntity_car(mianDatas,attr,entityId,symbol,lyrId,parentEntity):封装创建面要素entity(polygon,世界坐标)
 *createMultiPolygonEntity(mianDatas,attr,entityId,symbol,lyrId,parentEntity):封装创建多面要素entity(MultiPolygon，WGS84坐标)
 *createMultiPolygonEntity_sym(mianDatas,attr,entityId,symbol,borderSym,lyrId,parentEntity):封装创建指定样式多面要素entity(MultiPolygon，WGS84坐标,symbol)
 *createBboxEntity_sym(boxCoord,attr,entityId,symbol,borderSym,borderWidth,lyrId,parentEntity):封装创建指定样式bbox面要素entity(Polygon，WGS84坐标,symbol)
 *createWMSCoverInfo_code(xzCodes,cqlField,mapServerConfig):创建根据codes筛选的wms遮盖信息(属性筛选遮盖,wms)
 *createWMSImageryLayer(wmsURL,layers,layerName,cql_filter,style,sldStr,layerAttr):封装创建WMSImageryLayer图层
 *createWMTSImageryLayer_wmts():封装创建WMTSImageryLayer图层(wmts方式)
 *createWMTSImageryLayer_tms(wmtsUrl,tileMatrixSet,layerAttr):封装创建WMTSImageryLayer图层
 *clearEntityLayer(viewer,entityLayer):封装清空指定entityLayer的方法(遍历各个移除)
 *clearEntityLayer_all(mapAllLyr,entityLayer):清空指定entityLayer图层中所有实体(removeAll()方式)
 *clearAll(viewer,mapAllLyr):清空地图所有的数据及entityLayer关联的实体
 *createLyrLegend(canvasId,legendDatas,legendTitle,fontColor):封装创建图层图例
 *createLyrLegend_plus(canvasId,legendDatas,legendTitle,fontColor):封装创建图层图例(一个个累加显示)   
 *createLayerLegend_ul(legendDivId,layerObjList):通过ul列表创建图例功能(checkbox,一次全部添加)
 *createLayerLegend_ul2(legendDivId,lyrInfo):封装通过ul列表创建图例功能(checkbox，累积添加)
 *createLayerLegend_ul3(legendDivId,lyrInfo,callback):封装通过ul列表创建图例功能(no checkbox，累积添加,点击标题控制图层)
 *createLayerLegend_ul_fc(legendDivId,lyrInfo):封装通过ul列表创建分层图例功能(checkbox，多类型数据，累积添加)
 *createLayerLegend_ul_fc_no(legendDivId,lyrInfo):封装通过ul列表创建分层图例功能(无checkbox，多类型数据，累积添加)
 *create_legend_simplify(lyrObj):图层数据格式化为创建图例的数据格式标准-累积添加图例(一般图例数据格式)
 *cartesian3ToWGS84(cartesian3):封装空间笛卡尔坐标转WGS84坐标
 *cartesian3sToWGS84s(cartesian3Array):笛卡尔空间坐标数组转WGS84坐标数组(常用坐标格式)
 *cartesian3sToGeojson(cartesian3Array,geoType):笛卡尔空间坐标数组转geojson几何
 *calcEntityArrayRect(entityArray):封装计算EntityArray的Rect矩形范围
 *calcGeojsonArrayRect(geojsonArray):封装计算geojsonArray的Rect矩形范围
 *calcFitDwRect_entityArray(entityArray,zoom):封装根据实体数组计算合适的定位Rectangle矩形范围
 *calcFitDwRect_geojsonArray(geojsonArray,zoom):封装根据geojson数组计算合适的定位Rectangle矩形范围
 *dynamicCreateEntityLayer(mapLyrCollection,lyrObj,lyrInfo):封装动态创建entityLayer的方法(entity)
 *dynamicCreateVectorLyr(mapLyrCollection,lyrObj,attr):封装动态创建CustomDataSource的方法
 *dwByEntityArray(viewer,entityArray,dwLayer,isSaveDwEntity):通过实体数组进行地图定位
 *disableSeeUndergroud(viewer):封装禁止相机进入地下
 *getEntityType(entity):获取entity几何类型
 *getCurrentHeading(viewer):封装获取当前地图方位角(度)
 *getCurrentViewExtent(viewer):封装获取当前场景视图的范围
 *getViewCenterPt(viewer):封装获取当前场景视图的中心坐标
 *getCameraHeight(viewer):封装获取当前场景相机的高度(不包含高程,对地高度)
 *getCameraHeight_gc(viewer):封装获取当前场景相机的高度(包含高程,相对椭球体表面)
 *getGridsetZoom_resolution(currentResolution,tileResolutions):根据地图分辨率获取切片格网zoom(geoserver格网)
 *getMapZoom_scaleD(scaleD,tileResolutions):根据比例尺获取地图zoom(geoserver格网)
 *getMaxTiledLevel(viewer):封装从tilesToRender中获取最大的瓦片zoom
 *getPrimitiveCollection(viewer,PrimitiveCollectionId):封装通过id查找PrimitiveCollection图层
 *getPrimitiveById(primitiveLyr,globalId):封装在PrimitiveCollection图层中根据指定id获取primitive要素
 *getXZDMLevelByCode(xzCode,levelType):封装通过行政代码判断行政级别
 *getServerUrlByCode(xzCode,mapServerConfig):封装通过code获取相对应的wms、wfs服务地址
 *getAllFeatFromlayer(entityLyr):封装获取图层中的所有要素(包括cesium多种图层类型)
 *getEntityByGlobalId(entityLyr,GlobalId):封装在图层中查询指定globalId实体要素
 *getTopEntityFeat(entityArray,mapAllLyr):获取选中多个实体中的最上面的实体
 *getDataSourceByLyrId(viewer,lyrId):封装通过图层id获取该图层关联的dataSource
 *getEntityInfoByLyrId(lyrCollection,lyrId):封装通过图层id获取指定的图层信息(entity信息)
 *getEntityInfoByName(mapLyrCollection,layerName):封装通过图层名称获取entityLayer
 *getLayerInfo_id(lyrCollection,lyrId):封装通过图层id获取指定的图层信息对象(layerInfo)
 *getImageryLayer_credit(imageryLayerArray,layerId,wmsUrl,cql):查询底图影像图层(通过影像图层的“credit”属性)
 *getWGS84CoordsFromEntity(entityFeat):封装获取实体的geojson格式的几何坐标
 *getCar3CoordsFromEntity(entityFeat):封装获取指定实体的cartesian3格式数组坐标
 *getWGS84Array_rect(rect):获取rect矩形范围常规WGS84坐标数组(WGS84)
 *getCar3Array_rect(rect):获取rect矩形范围car3坐标数组
 *getElevationByCoords(wgs84Coords,terrainProvider,terrainLevel,callback):封装根据指定的坐标点采样地形高程数据获取高程(适用于在线、离线地形,准确)
 *getElevationByCoord2(lon,lat,viewer):根据指定的坐标点采样地形高程数据(适用于在线、离线地形,可能不准确)
 *getMapZoom(viewer):获取当前地图层级zoom
 *getMapLevelByHeight(cameraHeight):封装根据相机的高度获取地图的级别
 *getPolygonGraphicsCenter(polygonGraphic):封装获取面图形PolygonGraphics的中心(WGS84)
 *geoJsonToWKT_geo(jsonGeo):封装将单个geojson转为WKT格式几何(Point、LineString、Polygon)
 *getPolygonGraphicsCenter_car(polygonGraphic):封装获取面图形PolygonGraphics的中心(世界坐标点)
 *geoJsonsToWKT_MultiGeo(geojsonArray):封装将geojson数组转为WKT格式几何(MultiPoint、MultiLineString、MULTIPolygon)
 *getGeojson_byCode(xzdm,formatCode,mapServerConfig,config,callback):封装根据行政代码code获取geojson数据(WFS服务)
 *generateUuid_time():封装生成uuid的函数(当前时间戳)
 *getNumberOfXTilesAtLevel(level,projection):获取瓦片格网x轴方向的瓦片数
 *getNumberOfYTilesAtLevel(level,projection):获取瓦片格网y轴方向的瓦片数
 *getTileZXY_byCoord(tileGridSet,level,coord):根据位置坐标coord计算所在的瓦片位置(不准确)
 *getTileZXY_byCoord_globeSurface(viewer,coord,projection):根据click位置坐标计算所在的瓦片编号(准确)
 *getTileIJ_byPosition(clickCoord,x,y,level,gridsetId):计算click位置坐标相对于瓦片的屏幕坐标位置(i,j)
 *getFeatureInfoUrl_wms(viewer,wmsLayer,clickCoord):获取GetFeatureInfo路径地址(wms)
 *hoverTipInfo(screen_x,screen_y,tipContent,offset_x,offset_y):封装鼠标悬空要素提示信息功能
 *hexColorToRgbaColor(HexColor,alpha):封装将十六进制格式的颜色转RGBA格式的颜色
 *hexColorToRgbaColor2(HexColor,alpha):封装将十六进制格式的颜色转RGB格式的颜色(array)
 *isPointInPolyArray(lat,lon,geoExtentArray):封装判断点坐标是否在几何区域数组范围内
 *isJsonStr(str):封装判断str字符串是否可以转为json对象
 *layerList_format(layerList):格式化图层对象字段(format)
 *lightFeat_custom_pri(primitiveLayer,selectFeat,lightColor,isClearLyr):封装自定义高亮选中的实体要素的颜色(仅高亮边界)
 *lightGeojson_custom_pri(viewer,primitiveLayer,jsonGeo,attr,isClear,isDw):封装自定义高亮geojson坐标的颜色(仅高亮边界)
 *lightFeat_hover(primitiveLayer,selectFeat,isClearLyr):封装悬空高亮选中的实体要素(仅高亮边界)
 *lightFeat_click(clickSeletedLayer,selectFeat,isClearLyr):封装点击高亮选中的实体要素(仅高亮面内部区域)
 *lightFeat_self(selectFeat):封装高亮实体本身(适用于click实体高亮,不适用与hover)
 *mapDw_byCode(viewer,xzdm,formatCode,mapServerConfig,config,callback):封装根据行政代码code进行地图区域定位(WFS服务)
 *mapHomeFun(viewer,homeRect,callback):地图复位视图函数
 *pickTopWmsLyrFeat(viewer,screenCoord,wmsLyrArray,callback):封装click拾取wms数组中最顶部wms图层且wms图层"show=true"
 *queryFeat_wfs(wfsURL,cql,callback):根据筛选条件查询相应的WFS几何要素
 *WGS84ToWercator(wgsLon,wgsLat,elevation):封装WGS84坐标Wercator投影坐标(arcgis坐标转换的结果一样)
 *setHoverShowText_span(hoverShowFields):设置hover需要显示的文本(span)
 *setHoverShowText_td(hoverShowFields):设置hover需要显示的文本(单元格)
 *setMountainCover(viewer):封装设置山体是否遮挡要素
 *setWGS84Coords_Z(coordDatas,viewer,relativeHeight,callback):封装设置WGS84坐标"z"值("z"包含地面高程+相对地面高度)
 *setLayerFeatVisible(viewer,layerId,visibleStatus):封装图层几何要素显隐控制器
 *removeEntityFromArray(entityArray,globalId,type):封装在实体数组中，通过entity Id(或者属性“globalId”字段)移除指定实体(地图不会移除实体)
 *removeEntityFromlyr(viewer,lyr,globalId,type):封装通过entity Id(或者属性“globalId”字段)在地图和图层中移除指定实体(地图会移除实体)
 *transformToCesiumCoords(coordDatas):常规经纬度坐标数组转换为cesium常用格式的经纬度坐标数组
 *transToCartesian3Coords(coordDatas):常规经纬度坐标数组转换为cesium使用的Cartesian3坐标数组
 *tileZXYToBbox(level,x,y,projection):计算指定瓦片编号的地理范围
 *updateImageryLayer(oldLayer,newLayer,viewer):封装更新影像图层
 *urlParamToObject(url):封装将路径参数解析为对象
 *************************扩展*************************
 *1.viewer.then(callback):延迟回调    
 * 
 *
 *    
 *    
 * */

//import Cesium from 'cesium/Cesium';//导入cesium对象
//import * as Cesium from 'cesium/Cesium';//es6
//import * as Cesium from 'cesium/Source/Cesium'; //umi
//import * as Cesium from "cesium";//vite
//import * as turf from '@turf/turf';
//import defaulImg from '../../../customPlugins/utilityIcons/jdwddw.png';
//import geoserverGridSet from '../../../customPlugins/plugins/geoserverGridSet';

window.turf=turf || "";
const myCesium={};
//script
const defaulImg="./customPlugins/utilityIcons/jdwddw.png";
window.myCesium=myCesium;


/***********************获取entity几何类型***********************
 *更新更新时间:2020.11.13
 *参数:entity(Entity):实体对象
 *返回值:geomType(String):几何类型,可选值:"Dot"、"Point"、"LineString"、"Polygon"
 */
myCesium.getEntityType=function(entity){
	let geomType=null;
	if(entity){
		let dot=entity.point||"";//圆点
		let billboard=entity.billboard||"";//点图标
		let polyline=entity.polyline||"";//线
		let polygon=entity.polygon||"";//面
		if(dot&&!billboard&&!polyline&&!polygon){//圆点
			geomType="Dot";
		}
		else if(!dot&&billboard&&!polyline&&!polygon){//点图标
			geomType="Point";
		}
		else if(!dot&&!billboard&&polyline&&!polygon){
			geomType="LineString";
		}
		else if(polygon){
			geomType="Polygon";
		}
	}
	return geomType;
}//e




/****************************格式化图层对象字段(format)******************************
*更新时间:2020.04.20
*参数:layerList(Array):图层列表
*返回值newArray(Array):返回一个格式化后的图层列表数组
*注解:
*1.该方法不会改变原来的数组数据，会返回一个新的图层数组
*/
myCesium.layerList_format=function(layerList){
	let newArray=layerList;
	if(layerList&&layerList.length>0){
		newArray=[];
		for(let i=0;i<layerList.length;i++){
			let layerInfo=layerList[i]||{};
			var layerName=layerInfo.layername||"未命名";//图层名
			var layerId=layerInfo.layerid||"";//图层id*
			if(!layerId)layerId=layerInfo.id||"";
			var layerId_obj=layerInfo.layerId_obj||layerId;//图层id*
			var layerDataType=layerInfo.layerdatatype||"";//wms*
			var layerClassify=layerInfo.classify||"";//图层类型(公共、行业、业务)
			var layerStatus=layerInfo.layerstatus==false?false:true;
			var isLegend=layerInfo.islegend==false?false:true;
			var isBaseMap=layerInfo.isbasemap==true?true:false;
			var url=layerInfo.url||"";//图层通用url
			var filter_cql=layerInfo.condtion||"";//cql
			var enablePickFeatures=layerInfo.enablePickFeatures==false?false:true;
			var enablePickFeatures_double=layerInfo.enablePickFeatures_double==true?true:false;
			var urlParam=myCesium.urlParamToObject(url)||{};
			if(!layerId||!layerDataType)return false;
			var layerStyle=layerInfo.layerstyle||"";
			//1.格式化图层样式
			if(layerStyle){
				if(layerStyle.styletype=="Point"){
					layerStyle={
						styleType:layerStyle.styletype,
						pointColor:layerStyle.fillcolor||"#000000",
						pointSize:layerStyle.pointsize||"8.0",
						ptIconURL:layerStyle.icopath||"",//点图标url,string
						icoPath:layerStyle.icopath||"",//点图标(base64格式)，如果为空则为显示圆点样式，否则显示图标样式
					};
				}else if(layerStyle.styletype=="LineString"){
					layerStyle={
						styleType:layerStyle.styletype,
						lineColor:layerStyle.fillcolor||"#0000FF",
						lineWidth:layerStyle.borderwidth||"2.0",
						lineStyle:"Color",
					};
				}else if(layerStyle.styletype=="Polygon"){
					layerStyle={
						styleType:layerStyle.styletype,
						fillColor:layerStyle.fillcolor||"#0000FF",//hex
						alphaValue:layerStyle.alphavalue||"0.2",
						borderWidth:layerStyle.borderwidth||"2.0",
						borderColor:layerStyle.bordercolor||"#FF0000",
						fillStyle:"Color",
						borderStyle:"Color", 
					};
				}
			}
			//2.格式化layerInfo(驼峰字段)
			Object.assign(layerInfo,{
				layerName,
				layerId,
				layerId_obj,
				layerDataType,
				layerClassify,
				layerStatus,
				isLegend,
				isBaseMap,
				enablePickFeatures:enablePickFeatures,   
				enablePickFeatures_double:enablePickFeatures_double,  
				layerAttr:{},
				layerStyle:layerStyle||""
			});
			//3.格式化图层属性
			if(layerDataType=="vector"||layerDataType=="mapobject"){
				layerDataType="vector";
				layerInfo.layerAttr={
					layerClass:"dataSourceLayer",//矢量图层种类
					apiUrl:url,//矢量数据接口
				}
			}else if(layerDataType=="wms"){
				layerInfo.layerAttr={
					wmsUrl:url,
					cql_filter:filter_cql,
					style:"",
					sld_layerId:urlParam.layers||"",
					sldStr:"",//sld样式
					tileMatrixSet:"",//格网集,可选值"EPSG:4326"、"EPSG:900913"
					isRealUpdate:false,
				}
			}
			else if(layerDataType=="wmts"){
				layerInfo.layerAttr={
					wmtsUrl:url,
					tileMatrixSet:"",//可选值:"EPSG:4326"、"EPSG:900913"
				}
			}
			else if(layerDataType=="vectorTile"){
				layerInfo.layerAttr={
					vecTileUrl:url,
					vecTileStyle:"",	
					styleField:"",
					maximumLevel:"",
					layers:"",
					tileMatrixSet:"",
				}
			}
			newArray.push(layerInfo);
		}
	}
	return newArray;
}//e



/**************************计算指定瓦片编号的地理范围*************************
 *参数:level(number|number):瓦片格网的级别数
 *****x(number):格网格网的坐标系，可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *****y(number):格网格网的坐标系，可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *****projection(String):格网格网的坐标系，可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *返回值:bbox(Array):矩形范围[xmin,ymin,xmax,ymax]
 */
myCesium.tileZXYToBbox=function(level,x,y,projection){
	let bbox=null;
	var tileNum_x=myCesium.getNumberOfXTilesAtLevel(level,projection);//瓦片格网x轴方向的瓦片数
 	var tileNum_y=myCesium.getNumberOfYTilesAtLevel(level,projection);//瓦片格网y轴方向的瓦片数
 	if(!level||!x||!y)return false;
 	level=eval(level);
 	x=eval(x);
 	y=eval(y);
    if(projection=="EPSG:4326"){
       	let tileRange_width=6.283185307179586;//弧度<=>360度
       	let tileRange_height=3.141592653589793;//弧度<=>180度
    	var tileGrid_leftBottom=[-3.141592653589793,-1.5707963267948966];//瓦片格网的左下角坐标(-180,-90)
		var tileGrid_rightTop=[3.141592653589793,1.5707963267948966];//瓦片格网的右上角坐标(180,90)
		
        //计算x轴方向一个瓦片width对应的地理范围，xTileWidth=瓦片格网x方向坐标跨度/tileNum_x;
        var xTileWidth = tileRange_width / tileNum_x;
        //计算瓦片最左边边界坐标,x轴向右为tile_x正编号
        var xmin=tileGrid_leftBottom[0]+ x * xTileWidth;
        //计算瓦片最右边边界坐标,x轴向右为tile_x正编号
        var xmax = tileGrid_leftBottom[0] + (x + 1) * xTileWidth;
        //计算y轴方向一个瓦片height对应的地理范围，xTileheight=瓦片格网y方向坐标跨度/tileNum_y;
        var yTileHeight = tileRange_height / tileNum_y;
        //计算瓦片最上边边界坐标,y轴向下为tile_y正编号
        var ymax = tileGrid_rightTop[1] - y * yTileHeight;
        //计算瓦片最下边边界坐标,y轴向下为tile_y正编号
        var ymin = tileGrid_rightTop[1] - (y + 1) * yTileHeight;
        xmin = xmin * (180/Math.PI);
        ymin = ymin * (180/Math.PI);
        xmax = xmax * (180/Math.PI);
        ymax = ymax * (180/Math.PI);
   	 	bbox=[xmin,ymin,xmax,ymax];
    }
    else{
		//计算x轴方向一个瓦片width对应的地理范围，xTileWidth=瓦片格网x方向坐标跨度/tileNum_x;
		var tileGrid_leftBottom=[-20037508.342789244,-20037508.342789244];//瓦片格网的左下角坐标
		var tileGrid_rightTop=[20037508.342789244,20037508.342789244];//瓦片格网的右上角坐标
		var xTileWidth = (tileGrid_rightTop[0] - tileGrid_leftBottom[0]) / tileNum_x;
		//计算瓦片最左边边界坐标,x轴向右为tile_x正编号
		var xmin = tileGrid_leftBottom[0] + x * xTileWidth;
		//计算瓦片最右边边界坐标,x轴向右为tile_x正编号
		var xmax = tileGrid_leftBottom[0] + (x + 1) * xTileWidth;
   	    
 		//计算y轴方向一个瓦片height对应的地理范围，xTileheight=瓦片格网y方向坐标跨度/tileNum_y;
 		var yTileHeight = (tileGrid_rightTop[1] - tileGrid_leftBottom[1]) / tileNum_y;
   		//计算瓦片最上边边界坐标,y轴向下为tile_y正编号
   		var ymax = tileGrid_rightTop[1] - y * yTileHeight;
   		//计算瓦片最下边边界坐标,y轴向下为tile_y正编号
   		var ymin = tileGrid_rightTop[1] - (y + 1) * yTileHeight;
   	 	bbox=[xmin,ymin,xmax,ymax];
    }
    return bbox;
}//e



/***************获取瓦片格网x轴方向的瓦片数**************
 *参数:level(number|number):瓦片格网的级别数
 *****projection(String):格网格网的坐标系，可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *返回值:tileNum(number):瓦片数
 */
myCesium.getNumberOfXTilesAtLevel=function(level,projection){
let tileNum=null;
if(level&&projection){
if(projection=="EPSG:4326"){
tileNum=2<<eval(level);//2^leval*2
}
else{
tileNum=1<<eval(level);//2^leval
}
}
return tileNum;
}//e



/***************获取瓦片格网y轴方向的瓦片数**************
 *参数:level(number|number):瓦片格网的级别数
 *****projection(String):格网格网的坐标系，可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *返回值:tileNum(number):瓦片数
 */
myCesium.getNumberOfYTilesAtLevel=function(level,projection){
let tileNum=null;
if(level&&projection){
if(projection=="EPSG:4326"){
tileNum=1<<eval(level);//2^leval
}
else{
tileNum=1<<eval(level);//2^leval
}
}
return tileNum;
}//e



/************************获取GetFeatureInfo路径地址(wms)*********************
 *参数:viewer(Viewer):Viewer实例
 *****wmsLayer(object):wms服务图层
 *****clickCoord(Array):wgs84坐标或Cartographic
 *返回值(featureInfoUrl):getFeatureInfoUrl拾取要素url
 *注解:
 *1.通过瓦片编号计算getFeatureInfoUrl
 *2.通过该方法拾取要素时不需要将wms图层添加到地图上
 *3.通过该方法可以代替wmts图层拾取要素信息
 *4.支持wms图层坐标系"EPSG:4326"、"EPSG:900913"
 */
myCesium.getFeatureInfoUrl_wms=function(viewer,wmsLayer,clickCoord){
	let featureInfoUrl="";
	let projection=null;
	let tilingScheme=null;
	if(viewer&&wmsLayer&&clickCoord){
		tilingScheme=wmsLayer.imageryProvider.tilingScheme;
		let wmsUrl=wmsLayer.imageryProvider.url||"";//"http://192.168.167.129:8066/geoserver/XZQH/wms"
		let layers=wmsLayer.imageryProvider.layers||"";
		let queryParameters=wmsLayer.imageryProvider._resource.queryParameters||{};
		if(wmsLayer.imageryProvider&&wmsLayer.imageryProvider.tilingScheme instanceof Cesium.WebMercatorTilingScheme){
			projection="EPSG:900913";
		}else{
			projection="EPSG:4326";
		}
		let tileZXY=myCesium.getTileZXY_byCoord_globeSurface(viewer,clickCoord,projection);
		let tileIJ=myCesium.getTileIJ_byPosition(clickCoord,tileZXY[1],tileZXY[2],tileZXY[0],projection);
		let rectangle=tilingScheme.tileXYToNativeRectangle(tileZXY[1],tileZXY[2],tileZXY[0]);
		let box=[rectangle.west,rectangle.south,rectangle.east,rectangle.north];
		box=box.join(",");
		if(!wmsUrl||!layers)return "";
		featureInfoUrl=wmsUrl+"?"+//wms
		"service=WMS&request=GetFeatureInfo&version=1.1.1&width=256&height=256&info_format=application/json"+
		"&layers="+layers+
		"&query_layers="+layers+
		"&srs="+projection+
		"&crs="+projection+//""EPSG:4326""、"EPSG:900913"
		"&bbox="+box+
		"&x="+tileIJ[0]+
		"&y="+tileIJ[1];
		//"+&cql_filter={filter}",//该值需要进行encodeURIComponent	
		if(queryParameters.cql_filter)featureInfoUrl=featureInfoUrl+"&cql_filter="+window.encodeURIComponent(queryParameters.cql_filter);
	}
	return featureInfoUrl;
}///e



/************************计算click位置坐标相对于瓦片的屏幕坐标位置(i,j)*********************
 *参数:clickCoord(Array||Cartographic):wgs84坐标数组或Cartographic实例
 *****x(Number):瓦片x轴方向编号
 *****y(Number):瓦片y轴方向编号
 *****level(Number):瓦片格网级别
 *****gridsetId(String):瓦片格网坐标系，默认:"EPSG:43263",可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
 *返回值:tile_IJ(Array):click位置坐标相对于瓦片的I、J的屏幕坐标
 *注解:
 *1.支持"EPSG:4326"、"EPSG:900913"瓦片格网
 */
myCesium.getTileIJ_byPosition=function(clickCoord,x,y,level,gridsetId){
let projectedCoord=null;//clickCoord转换为相对应坐标格式
let tilingScheme=null;//瓦片格网
let tile_IJ=null;//click瓦片的I,J坐标
let tileWidth,tileHeight=256;//瓦片尺寸
gridsetId=(gridsetId=="EPSG:3857"||gridsetId=="EPSG:900913")?"EPSG:3857":"EPSG:4326"
if(clickCoord&&x&&y&&level&&gridsetId){
projectedCoord=clickCoord;//弧度坐标
if(clickCoord.length>=2){//wgs84
let lon=Cesium.Math.toRadians(clickCoord[0]);//弧度
let lat=Cesium.Math.toRadians(clickCoord[1]);//弧度
projectedCoord=new Cesium.Cartographic(lon,lat);
}
if(gridsetId=="EPSG:3857"){
tilingScheme=new Cesium.WebMercatorTilingScheme();//"EPSG:3857"瓦片格网
projectedCoord=tilingScheme.projection.project(projectedCoord);//弧度坐标转投影坐标
}else{
tilingScheme=new Cesium.GeographicTilingScheme();//"EPSG:4326"瓦片格网
let lon=Cesium.Math.toDegrees(projectedCoord.longitude);
let lat=Cesium.Math.toDegrees(projectedCoord.latitude);
projectedCoord={x:lon,y:lat};
}
//计算瓦片编号相对应的地理范围
let rectangle=tilingScheme.tileXYToNativeRectangle(x,y,level);
//计算click位置相对于瓦片原点的屏幕坐标,click位置的地理坐标相对于瓦片(取整)
let tile_x = (tileWidth * (projectedCoord.x - rectangle.west) / rectangle.width) | 0;
let tile_y = (tileHeight * (rectangle.north - projectedCoord.y) / rectangle.height) | 0;
tile_IJ=[tile_x,tile_y];
}
return tile_IJ
}//e




/************************根据click位置坐标计算所在的瓦片编号(准确)**************************
*参数:viewer(Viewer):地图viewer
*****coord(Array):位置坐标,可能为wgs84或cartographic
*****projection(String):投影坐标系,默认"EPSG:4326",可选值:"EPSG:4326"、"EPSG:3857"或"EPSG:900913"
*返回值tileZXY(Array):瓦片编号[z,x,y]
*注解：
*1.该方法依靠地图viewer进行瓦片编号的计算，计算比较准确
*2.推荐使用该方式计算位置点所在的瓦片编号,支持"EPSG4326瓦片格网"、"EPSG3857(EPSG900913)瓦片格网"
*3.三维地图中推荐使用该方式
*/
myCesium.getTileZXY_byCoord_globeSurface=function(viewer,coord,projection){
let tileZXY=null;//瓦片x,y轴坐标
projection=projection||"EPSG:4326";
if(viewer&&coord){
let scene=viewer.scene;
let pickedLocation=coord;//可能为[lon,lat]或cartographic
if(coord.length>=2){//wgs84
let lon=Cesium.Math.toRadians(coord[0]);//弧度
let lat=Cesium.Math.toRadians(coord[1]);//弧度
pickedLocation=new Cesium.Cartographic(lon,lat);
}
//获取当前屏幕范围内的瓦片
let tilesToRender = scene.globe._surface._tilesToRender;
let pickedTile;
//从当前屏幕范围内的瓦片中获取coord坐标所在的瓦片
for(let textureIndex=0;textureIndex<tilesToRender.length;++textureIndex){
let tile=tilesToRender[textureIndex];
//判断瓦片地理范围内是否包含该位置坐标
if(Cesium.Rectangle.contains(tile.rectangle,pickedLocation)){
pickedTile = tile;
break;
}
}
if((projection=="EPSG:3857"||projection=="EPSG:900913")&&pickedTile){
let renderingTiles=pickedTile.data?pickedTile.data.imagery:[];
for(let i=0;i<renderingTiles.length;i++){
let tileImagery=renderingTiles[i];
if(tileImagery.useWebMercatorT==true){
let readyImagery=tileImagery.readyImagery;
let imageryLayer=readyImagery.imageryLayer;
let rectangle=readyImagery.rectangle;
//判断瓦片地理范围内是否包含该位置坐标
if(Cesium.Rectangle.contains(rectangle,pickedLocation)){
pickedTile=readyImagery;
break;
}
}	
}
}
if(pickedTile){
let tile_z=pickedTile.level;
let tile_x=pickedTile.x;
let tile_y=pickedTile.y;
tileZXY=[tile_z,tile_x,tile_y];
}
}
return tileZXY;
}//e


/************************根据位置坐标coord计算所在的瓦片位置(不准确)**************************
*参数:tileGridSet(String):瓦片平面类型，可选值:"EPSG:4326"、"EPSG:3857"
*****coord(Array):位置坐标，坐标格式与瓦片平面对应的地理坐标系有关系,EPSG_4326坐标系、EPSG_3857坐标系
*返回值tileZXY(Array):瓦片编号[z,x,y]
*注解:
*1.该方法适用于二维地图计算，不太适用于三维地图，当三维地图倾斜视角时，屏幕范围内会出现多级别的瓦片编号
所以拾取的瓦片编号会有所误差，如果当前屏幕范围内只有同一级别的瓦片编号时(即垂直视角)，不会出现误差
*2.该方法与二维地图拾取wmts瓦片编号的方法是相同的
*3.三维地图中不推荐使用该方式
*/
myCesium.getTileZXY_byCoord=function(tileGridSet,level,coord){
let tileZXY=null;//瓦片x,y轴坐标
let tilingScheme=null;
let tileNum_x=null;//瓦片平面x轴方向的瓦片数
let tileNum_y=null;//瓦片平面y轴方向的瓦片数
if(tileGridSet=="EPSG:3857"){
tilingScheme=new Cesium.WebMercatorTilingScheme();//EPSG:3857瓦片平面
//tileGridSet为"EPSG:3857"时，tileNum_x=tileNum_y,瓦片平面为正方形
tileNum_x=1 << level;//2^level
tileNum_y=1 << level;//2^level
}else{
tilingScheme=new Cesium.GeographicTilingScheme();//EPSG:4326瓦片平面
//tileGridSet为"EPSG:4326"时，tileNum_x=tileNum_y/2,瓦片平面为长方形
tileNum_x=2 << level;//(2^level)*2
tileNum_y=1 << level;//2^level
}
var rectangle=tilingScheme.rectangle;//瓦片平面对应的地理范围
if(coord&&coord.length>=2){
var lon=Cesium.Math.toRadians(coord[0]);//弧度
var lat=Cesium.Math.toRadians(coord[1]);//弧度
var position=new Cesium.Cartographic(lon,lat);
//判断位置点是否在rectangle矩形范围内
if (!Cesium.Rectangle.contains(rectangle,position)) {
// outside the bounds of the tiling scheme
return undefined;
} 
//xTileWidth=yTileHeight瓦片高度与宽度代表的地理范围大小是相等的
var xTileWidth = rectangle.width / tileNum_x;//一个瓦片宽度代表的地理范围
var yTileHeight = rectangle.height / tileNum_y;//一个瓦片高度代表的地理范围
//计算位置点的经度距离瓦片平面的原点x轴方向跨域几个瓦片数(一般为小数)
var tile_x = (position.longitude - rectangle.west) / xTileWidth | 0;//取整，等同于Math.floor(n)
if (tile_x >= tileNum_x) {
tile_x = tileNum_x - 1;
}
//计算位置点的经度距离瓦片平面的原点y轴方向跨域几个瓦片数(一般为小数)
var tile_y = (rectangle.north - position.latitude) / yTileHeight | 0;//取整，等同于Math.floor(n)
if (tile_y >= tileNum_y) {
tile_y = tileNum_y - 1;
}
tileZXY=[level,tile_x,tile_y];
}
return tileZXY;
}//e



/***********************封装根据行政代码code获取geojson数据(WFS服务)*****************************
 *参数:xzdm(String):需要定位的区域行政代码code,只能为“51”、“5101”格式
 ***formatCode?(String):格式化行政代码code，可选值:“1”，“2”，值为1:“51”格式,值为2:"510000"格式
 ***mapServerConfig?(object):地图服务地址对象
 ***config?(object):配置对象，对省、市、县、乡进行WFS服务过滤的code字段，默认都为:"mc_code"
 ***callback(function):区域定位后进行回调,回调参数(geojsonData,bbox),“geojsonData”，“rectExtent”为“Rectangle”矩形范围
 *无返回值
 *注解:
*1.config服务过滤字段配置:
config={
	codeField_sheng:"",		
	codeField_shi:"",		
	codeField_xian:"",		
	codeField_xiang:""		
};
*2.通过bbox进行定位
*3.turf.bbox():范围与Cesium.Rectangle.fromDegrees()范围对应的坐标顺序是一致的，
*都是[xmin,ymin,xmax,ymax]顺序坐标
*4.“geojsonData”:数据为geojson格式的“FeatureCollection”
 */    
myCesium.getGeojson_byCode=function(xzdm="",formatCode="",mapServerConfig,config={},callback=function(){}){
let url_dw="";
config=config||{};
let codeField_sheng=config.codeField_sheng||"mc_code";
let codeField_shi=config.codeField_shi||"mc_code";
let codeField_xian=config.codeField_xian||"mc_code";
let codeField_xiang=config.codeField_xiang||"mc_code";
mapServerConfig=mapServerConfig||window.mapServerConfig;
if(xzdm){
xzdm=xzdm+"";
let xzjb=myCesium.getXZDMLevelByCode(xzdm);//行政级别,可选值:"sheng"、"shi"、"xian"、"xiang"
if(xzjb=="sheng"){
if(String(formatCode)=="2")xzdm+="0000";
url_dw=mapServerConfig.china_sheng+"&cql_filter="+codeField_sheng+"="+xzdm;//定位省
}
else if(xzjb=="shi"){
if(String(formatCode)=="2")xzdm+="00";
url_dw=mapServerConfig.china_shi+"&cql_filter="+codeField_shi+"="+xzdm;//定位市
}
else if(xzjb=="xian"){
url_dw=mapServerConfig.sichuan_xian+"&cql_filter="+codeField_xian+"="+xzdm;//定位县
}
else if(xzjb=="xiang"){
url_dw=mapServerConfig.sichuan_xiang+"&cql_filter="+codeField_xiang+"="+xzdm;//定位乡镇
}
if(!url_dw)return false;
let wfsURL=url_dw+"&service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson";
fetch(wfsURL).then(response=>response.text()).then(function(geojsonStr){
let isJson=myCesium.isJsonStr(geojsonStr);
if(!isJson)return false;
let geojsonData=eval("("+geojsonStr+")");
if(geojsonData.features.length==0)return false;
let bbox = turf.bbox(geojsonData)||"";
callback(geojsonData,bbox);
});
}
}//e




/*******************封装通过code获取相对应的wms、wfs服务地址*****************
 *更新时间:2020.10.22 wxt
 *参数:xzCode(String):行政代码
 *返回值serverUrl(object):查询出来的服务地址
 *注解:
 *1.serverUrl={
 	wfs:"",
 	wms:""
 }
 */
myCesium.getServerUrlByCode=function(xzCode="",mapServerConfig){
let serverUrl={};
if(xzCode&&mapServerConfig){
if(String(xzCode).length==2){//省
serverUrl={wfs:mapServerConfig.china_sheng,wms:mapServerConfig.china_sheng_wms};
}
else if(String(xzCode).length==4){//市
serverUrl={wfs:mapServerConfig.china_shi,wms:mapServerConfig.china_shi_wms};
//serverUrl={wms:mapServerConfig.sichuan_shi,wms:mapServerConfig.sichuan_shi_wms};
}
else if(String(xzCode).length==6){//县
serverUrl={wfs:mapServerConfig.sichuan_xian,wms:mapServerConfig.sichuan_xian_wms};
}
else if(String(xzCode).length>6){//乡
serverUrl={wfs:mapServerConfig.sichuan_xiang,wms:mapServerConfig.sichuan_xiang_wms};
}
}
return serverUrl;
}//e


/*******************封装通过图层id获取指定的图层信息对象(layerInfo)*****************
 *参数:lyrCollection(array):图层信息对象集合，“entity”
 *****lyrId(string):需要查询的图层id
 *返回值result(object):返回图层信息对象
 *注解:
 *1.如何想使用该方法前提是每一个图层中必须包含“layerId”属性，否则使用不了，
 *不同的图层类型获取图层上空间要素的方法不同
 */
myCesium.getLayerInfo_id=function(lyrCollection="",lyrId=""){
let result=null;
if(lyrCollection&&lyrCollection.length>0&&lyrId){
for(let i=0;i<lyrCollection.length;i++){
let entityInfo=lyrCollection[i];//图层
let layerid=entityInfo.layerId || "";//图层id
if(layerid==lyrId){
result=entityInfo;
break;
}
}
}
return result;
}//e



/***************封装将路径参数解析为对象**************
 *参数:url(string):带参数的请求地址
 *返回值:paramObject(object):解析的参数对象
 */
myCesium.urlParamToObject=function(url=""){
let paramObject={};
if(/\?/.test(url)){
let urlString = url.substring(url.indexOf("?")+1); 
let urlArray=urlString.split("&"); 
for (let i=0,len=urlArray.length;i<len;i++) { 
let urlItem=urlArray[i]; 
var idx=urlItem.indexOf("=");
let name=urlItem.substring(0,idx);
let value=urlItem.substring(idx+1);
if(name)paramObject[name]=value; 
} 
}
return paramObject;
}//e



/***************封装生成uuid的函数(当前时间戳)**************
 *参数:无参数
 *返回值:timestamp(number):返回当前时间戳
 *注解:因为每个时间戳是唯一的，所以当做uuid
 */
myCesium.generateUuid_time=function(){
let date=new Date();//中国标准时间对象
let timestamp=date.getTime();//当前时间的时间戳
return timestamp;
}//e




/***********************图层数据格式化为创建图例的数据格式标准-累积添加图例(一般图例数据格式)******************
 *更新时间:2020.04.17
 *参数:lyrObj(object):图层相关信息对象，必须包含“layerName”和“layerId”,"layerType"字段
 *返回值:lengendInfo(object):返回创建图例需要的图层信息对象
 *注解:
 *1.图层信息对象:"layer"如果为空，则需要通过"layerId"查询图层，反之直接使用
 var lyrObj={
    layerName:"",
    layerId:"",
    layerType:"",//公共、业务
    isLegend:"",//是否开启图例
    layer:""//option
    layerStyle:{}
 }
2.lyrObj对象中的“layerStyle”必须包含的字段
lyrObj.layerStyle={
    styleType:"",
    icoPath:"",
    color:""
};
 */
myCesium.create_legend_simplify=function(lyrObj){
    //geoStrFiled=geoStrFiled || "geo";
    var layrId=lyrObj.layerId || "";//图层id
    var isLegend=lyrObj.isLegend==false?false:true;//是否创建图例
    if(!layrId||!isLegend)return null;
    var layerName=lyrObj.layerName || "";//图层名字
    var layerType=lyrObj.layerType || "";//图层类型
    var lyrStyle=lyrObj.layerStyle || {};//图层样式
    var layerStatus=lyrObj.layerStatus;//图层可视状态
    var styleType=lyrStyle.styleType || "";//样式保存的几何类型
    //格式化样式几何
    if(styleType=="point"||styleType=="Point"||styleType=="Dot"||styleType=="dot"){
		styleType="Point";
	}else if(styleType=="line"||styleType=="polyline"||styleType=="LineString"){
		styleType="LineString"
	}else if(styleType=="polygon"||styleType=="Polygon"){
		styleType="Polygon"
	}
    //公共color
    var color=lyrStyle.color || "";//公共color
    //1.圆点
    var pointColor=lyrStyle.pointColor || color;
    var pointSize=lyrStyle.pointSize || 10.0;
    //2.点图标
    var ptIconURL=lyrStyle.ptIconURL || "";
    var icoPath=lyrStyle.icoPath || "";
    //3.线
    var lineWidth=lyrStyle.lineWidth || 2.0;
    var lineColor=lyrStyle.lineColor || color;
    var lineStyle=lyrStyle.lineStyle || "Color";
    //3.面
    var fillColor=lyrStyle.fillColor || color;
    var alphaValue=(!lyrStyle.alphaValue&&eval(lyrStyle.alphaValue)!=0)?1.0:lyrStyle.alphaValue;
    var fillStyle=lyrStyle.fillStyle || "Color";
    var borderWidth=lyrStyle.borderWidth || 2.0;
    var borderColor=lyrStyle.borderColor || color;
    var borderStyle=lyrStyle.borderStyle || "Color";
    //if(icoPath)ptIconURL=require("@/assets/icon"+icoPath);
    //图例对象
    var lengendInfo={
    	styleType:styleType,
	    layerName:layerName,
        layerId:layrId,
        layerType:layerType,
        layerStatus:layerStatus,
	    geoType:styleType,
	    childLegends:[],
	    layerStyle:{
            color:color,
            pointColor:pointColor,
            pointSize:pointSize,
            icoPath:icoPath,
            ptIconURL:ptIconURL,
            lineWidth:lineWidth,
            lineColor:lineColor,
            lineStyle:lineStyle,
            fillColor:fillColor,
            alphaValue:alphaValue,
            fillStyle:fillStyle,
            borderWidth:borderWidth,
            borderColor:borderColor,
            borderStyle:borderStyle
	    }
	}
	return lengendInfo;
}//e





/******************************加载geojson格式的几何数据到地图(geojson几何数据)*************************
 *更新时间:2020.06.18
 *参数:viewer(Viewer):地图Viewer实例
 *****jsonGeo(geojson):geojson数据格式的空间对象,例如:geojsonPt={"type":"Point","coordinates": [110, 50]};
 *****dataSourceLayer(CustomDataSource):dataSourceLayer图层
 *****geoAttr(object):几何属性信息
 *返回值:entityFeats(array):根据单个geojson数据创建的实体数组，可能包含多个
 *注解:
 *1.该方法支持添加“Point”、“LineString”、“Polygon”、“MultiPoint”、“MultiLineString”、“MultiPolygon”、“GeometryCollection”
 *的七种geojson几何类型的格式
 *2.返回entityFeats实体数组，便于更改添加的实体样式
 *3.“Point”类型有两种：“圆点”,“点图标”，默认为“点图标”,如果设置为“圆点”类型，则需添加attr={pointType:"Dot"}属性
 *4.支持geojson的"EPSG:4326"、"EPSG:3857"两种格式的坐标
 *5.功能属性:
	var geoAttr={
		enablePickFeatures:""	
	};
 *6.如果创建时想自定义样式，只需在attr={}属性对象中添加指定样式即可,可定义样式:
 *	1)"Point"、"MultiPoint"可选属性：
	attr={
	 	pointType:"",//"Dot"、"Point"
	 	icoPath:"",
	 	icoSize:"",//可以充当"iconScale"作用
	  	width:"",//icon宽度
        height:"",//icon高度
		color:"",//hex、red
		pointColor:"",
	 	pointSize:"",
		heightReference:""
 	}
 *	2)"LineString"、"MultiLineString"可选属性：
 	attr={
	 	symbol:"",
 		lineWidth:"2.0",
	    lineColor:"",
	 	isGround:true
 	}
 *	3)"Polygon"、"MultiPolygon"可选属性：
 	attr={
	 	symbol:"",
	 	borderSym:"",
	 	fillColor:"",
	    alphaValue:"1.0",
	    borderWidth:"2.0",
	    borderColor:"",
 	}
 *日志
 *1.优化点要素的样式字段
 *2.优化要素拾取功能
 */
myCesium.api_addGeoDatasToMap_Backend=function(viewer,jsonGeo,dataSourceLayer,geoAttr={},isClear=false){//dataSourceLayer
	let geoCoords=null;
	let entityFeats=[];//实体要素
	dataSourceLayer=dataSourceLayer||viewer;
	geoAttr=geoAttr||{};
	if(isClear==true)dataSourceLayer.entities.removeAll();
	let layerInfo=dataSourceLayer.name?dataSourceLayer.name:"{}";layerInfo=JSON.parse(layerInfo);
	if(jsonGeo&&jsonGeo.type=="GeometryCollection"&&jsonGeo.geometries){
		let jsonGeoArray=jsonGeo.geometries||[];
		jsonGeoArray.forEach((json)=>{
			let feats=loadGeojsonSingleType(viewer,json,geoAttr);
			entityFeats=entityFeats.concat(feats);
		});
	}
	else{
		entityFeats=loadGeojsonSingleType(viewer,jsonGeo,geoAttr);
	}
    return entityFeats;
	//加载单类型的geojson支持“Point”、“LineString”、“Polygon”、“MultiPoint”、“MultiLineString”、“MultiPolygon”
    function loadGeojsonSingleType(viewer,jsonGeo,attr){
    	let featArray=[];
		attr=Object.assign({},attr);
		let style=attr.style||"";
		if(style)Object.assign(attr,style);
        if(viewer&&jsonGeo&&jsonGeo.type&&jsonGeo.coordinates&&turf){
            let myUid=myCesium.generateUuid_time();//生成的uuid
        	let geoUUid=null;//生成的uuid
        	let enablePickFeatures=(attr.enablePickFeatures||attr.enablePickFeatures==false)?attr.enablePickFeatures:layerInfo.enablePickFeatures;//图层拾取
            if(jsonGeo.type=="Point"){//点图标或圆点
            	let firstCoord=jsonGeo.coordinates;
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
            	geoCoords=jsonGeo.coordinates;//一维坐标
            	let icoPath=attr.icoPath || defaulImg;//图标url
            	let modelPath=attr.modelPath||"";//模型url
        		let icoSize=attr.icoSize || "";//图标缩放比例
        		let width=attr.width || "";
        		let height=attr.height || "";
        		let color=attr.pointColor || attr.color;//圆点颜色
        		let featAttr=attr;
        		let entityId=geoUUid;
        		let pointSize=attr.pointSize || "";
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                let ptEntity=null;
                let heightReference=attr.heightReference;
                featAttr.entityId=entityId;
                featAttr.iconScale=icoSize;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
                if(attr.pointType&&attr.pointType=="Dot"&&!icoPath&&!modelPath){
                    ptEntity=myCesium.createDotEntity_sym(geoCoords,color,featAttr,entityId,pointSize,lyrId,parentEntity,heightReference);
                }
                else if(modelPath){
                	 let modelHpr=new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-60),Cesium.Math.toRadians(0),Cesium.Math.toRadians(0));////entity模型方位
                	 ptEntity=myCesium.createModelEntity(geoCoords,modelPath,modelHpr,featAttr,lyrId,parentEntity,heightReference);
                }
                else{
                    ptEntity=myCesium.createPicPtEntity(geoCoords,icoPath,featAttr,entityId,lyrId,parentEntity,heightReference); 
                }
                featArray.push(ptEntity);
            }
            else if(jsonGeo.type=="LineString"){//线
            	let firstCoord=jsonGeo.coordinates[0];
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
            	geoCoords=jsonGeo.coordinates;//二维坐标
            	let featAttr=attr;
            	let entityId=geoUUid;
            	let symbol=attr.symbol || null;//自定义样式
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                let isGround=attr.isGround;
                featAttr.entityId=entityId;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
            	let lineEntity=myCesium.createPolylineEntity(geoCoords,featAttr,entityId,symbol,lyrId,parentEntity,isGround);
            	featArray.push(lineEntity);
            }
        	else if(jsonGeo.type=="Polygon"){//面
        		let firstCoord=jsonGeo.coordinates[0][0];
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
            	geoCoords=jsonGeo.coordinates[0];//三维坐标
            	let featAttr=attr;
            	let entityId=geoUUid;
            	let symbol=attr.symbol || null;//面样式
            	let borderSym=attr.borderSym || null;//边界样式
            	let borderWidth=attr.borderWidth || null;//边界宽度
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                featAttr.entityId=entityId;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
            	let mianFeat=myCesium.createPolygonEntity_sym(geoCoords,featAttr,entityId,symbol,borderSym,borderWidth,lyrId,parentEntity);
            	featArray.push(mianFeat);
        	}
            else if(jsonGeo.type=="MultiPoint"){//二维坐标
            	let firstCoord=jsonGeo.coordinates[0];
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
            	geoCoords=jsonGeo.coordinates;//几何坐标
            	let icoPath=attr.icoPath || defaulImg;//图标url
    			let icoSize=attr.icoSize || "";//图标缩放比例
        		let width=attr.width || "";
        		let height=attr.height || "";
            	let color=attr.color || "";//通过属性获取颜色
            	let featAttr=attr;
            	let entityId=geoUUid||myUid;
            	let pointSize=attr.pointSize || "";
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                let ptEntity=null;
                let heightReference=attr.heightReference;
                featAttr.entityId=entityId;
                featAttr.iconScale=icoSize;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
                if(attr.pointType&&attr.pointType=="Dot"){
                	featArray=myCesium.createMultiDotEntity_sym(geoCoords,color,featAttr,entityId,pointSize,lyrId,parentEntity,heightReference); 
                }
                else{
                	featArray=myCesium.createMultiPicPtEntity(geoCoords,icoPath,featAttr,entityId,lyrId,parentEntity,heightReference);
                }
            }
            else if(jsonGeo.type=="MultiLineString"){//多线
            	let firstCoord=jsonGeo.coordinates[0][0];
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
            	geoCoords=jsonGeo.coordinates;//三维坐标
            	let featAttr=attr;
            	let entityId=geoUUid||myUid;
            	let symbol=attr.symbol || null;//自定义样式
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                let isGround=attr.isGround;
                featAttr.entityId=entityId;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
                featArray=myCesium.createMultiPolylineEntity(geoCoords,featAttr,entityId,symbol,lyrId,parentEntity,isGround);
            }
            else if(jsonGeo.type=="MultiPolygon"){//多面
            	let firstCoord=jsonGeo.coordinates[0][0][0];
            	if(firstCoord&&String(parseInt(firstCoord[0])).length>4)jsonGeo=turf.toWgs84(jsonGeo);
                geoCoords=jsonGeo.coordinates;//四维坐标
                let featAttr=attr;
            	let entityId=geoUUid||myUid;
                let symbol=attr.symbol || null;//面样式
            	let borderSym=attr.borderSym || null;//边界样式
            	let borderWidth=attr.borderWidth || null;//边界宽度
                let lyrId=layerInfo.layerId||null;
                let parentEntity=null;
                featAttr.entityId=entityId;
                featAttr.enablePickFeatures=enablePickFeatures==false?false:true; 
                featArray=myCesium.createMultiPolygonEntity_sym(geoCoords,featAttr,entityId,symbol,borderSym,borderWidth,lyrId,parentEntity);
            }
            if(dataSourceLayer&&featArray&&featArray.length>0){
            	featArray.forEach(function(item){
                    dataSourceLayer.entities.add(item);
               });
            }
        }
        return featArray;
    }//e1
}//e



/****************************封装动态创建CustomDataSource的方法*****************************
 *参数:mapLyrCollection(array):包含地图所有图层的数组 
 ******lyrObj(object):创建图层必须的图层信息对象，必须包含"layerName"、"layerId" 
 ******attr(object):存储图层额外的信息对象
 *返回值layer(entity):返回矢量图层
 *注解:
 *1.layerInfo对象可选属性见规范记录
 *2.创建CustomDataSource图层时，同时会创建一个layerInfo对象
 */   
myCesium.dynamicCreateVectorLyr=function(mapLyrCollection="",lyrObj,attr={}){
let layer=null;
if(mapLyrCollection&&lyrObj&&lyrObj.layerId){
let layerName=lyrObj.layerName || "未命名";//图层标题
let lyrId=lyrObj.layerId || "";//图层id
let enablePickFeatures=lyrObj.enablePickFeatures==false?false:true;
let layerStatus=lyrObj.layerStatus==false?false:true;
attr=attr||{};
layer=new Cesium.CustomDataSource(JSON.stringify({
title:layerName,//图层名字
layerName:layerName,//图层名字
layerId:lyrId,//图层id
lyrNodeName:"",//图层节点名字
lyrNodeKey:"",//图层节点key
layerIndex:"",//图层叠加index
attr:attr,//图层属性信息
layerType:"dataSourceLayer",//图层类型
enablePickFeatures:enablePickFeatures//该图层上的实体是否可以拾取，默认可以被拾取
}));
layer.show=layerStatus;
var find_layerInfo=myCesium.getLayerInfo_id(mapLyrCollection,lyrId);
if(!find_layerInfo){//新添加
mapLyrCollection.push(lyrObj);
}
else{//覆盖
var idx=mapLyrCollection.indexOf(find_layerInfo);
mapLyrCollection[idx]=lyrObj;
}
}
return layer;
}//e




/******************************地图复位视图函数***********************************
*参数:viewer():地图Viewer
*****homeRect(Rectangle):Rectangle范围
*****callback(function):[opt] 地图范围后完成后回调
*注解:
*1.格式化图层信息为自定的数据格式
*/
myCesium.mapHomeFun=function(viewer,homeRect,callback){
callback=callback||function(){};
if(viewer&&homeRect){
var orientation_hpRange=new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0),Cesium.Math.toRadians(-90),Cesium.Math.toRadians(0))
viewer.camera.setView({destination:homeRect,orientation:orientation_hpRange});
callback(homeRect);
} 
}//e



/*******************************根据codes字段添加遮盖图层(属性筛选遮盖)******************************************
 *参数:viewer(Viewer):地图Viewer实例
 ****coverWMSLayer(ImageryLayer):用来存储遮盖图层“ImageryLayer”的实例变量
 ****xzCodes(array):多个行政code字符数组,code数组中的code等级必须相同
 ****cqlField(string):cql条件查询的字段，默认为"mc_code"
 ****mapServerConfig(object):地图服务地址配置对象
 *返回值:coverWMSLayer(ImageryLayer):wms影像图层
 *注解:
 *1.wmsUrl地址样例
 *“http://192.168.167.129:8066/geoserver/XZQH/ows?layers=XZQH:sichuan_xiang”
 *2.过滤条件样例：sqlStr="mc_code NOT IN('"+code_str+"')";
 *3.只支持xzCodes数组中code为同级的code，不能为多个级别的code
 */
myCesium.addCoverLayer_byCode=function(viewer,coverWMSLayer,xzCodes=[],cqlField,mapServerConfig){
if(viewer&&mapServerConfig&&xzCodes&&xzCodes.length>0){
var coverInfo=myCesium.createWMSCoverInfo_code(xzCodes,cqlField,mapServerConfig);
return myCesium.addCoverLayer_wms(viewer,coverWMSLayer,coverInfo.wmsUrl,coverInfo.cqlStr);
}
}//e

/*********************创建根据codes筛选的wms遮盖信息(属性筛选遮盖,wms)****************
 *参数:xzCodes(array):多个行政code字符数组,code数组中的code等级必须相同
 *****cqlField(string):cql条件查询的字段，默认为"mc_code"
 *****mapServerConfig(object):地图服务地址对象
 *返回值:result(object):包含“wmsUrl”、“cqlStr”属性的信息对象
 *注解:
 *1.wmsUrl地址样例
 *“http://192.168.167.129:8066/geoserver/XZQH/ows?layers=XZQH:sichuan_xiang”
 *2.过滤条件样例：cqlStr="mc_code NOT IN('"+code_str+"')";
 *3.只支持xzCodes数组中code为同级的code，不能为多个级别的code
 *4.result={
	wmsUrl:"",//wms遮盖服务地址
	cqlStr:""//wms遮盖筛选条件
 };
 */
myCesium.createWMSCoverInfo_code=function(xzCodes=[],cqlField,mapServerConfig){
let result=null;
cqlField=cqlField||"mc_code";
if(mapServerConfig&&xzCodes&&xzCodes.length>0){
var codeStr="";
for(var i=0;i<xzCodes.length;i++){
var xzCode=xzCodes[i] || "";
if(!codeStr){
codeStr="'"+xzCode+"'";
}
else{
codeStr=codeStr+","+"'"+xzCode+"'";
}
}
}
if(xzCodes.length==0)return false;
var cqlStr="";
var wmsUrl="";
if(xzCodes[0].length==2){//"sheng"
cqlStr=cqlField+" NOT IN("+codeStr+")";
wmsUrl=mapServerConfig.china_sheng_mws;
}
else if(xzCodes[0].length==4){//"shi"
cqlStr=cqlField+" NOT IN("+codeStr+")";
wmsUrl=mapServerConfig.china_shi_mws;
}
else if(xzCodes[0].length==6){//"xian"
cqlStr=cqlField+" NOT IN("+codeStr+")";
wmsUrl=mapServerConfig.sichuan_xian_mws;
}
else if(xzCodes[0].length>6){//"xiang"
cqlStr=cqlField+" NOT IN("+codeStr+")";
wmsUrl=mapServerConfig.sichuan_xiang_mws;
}
result={
wmsUrl:wmsUrl,
cqlStr:cqlStr
};
return result;
}//e



/****************************添加遮盖图层(coverLayer)******************************
*参数:viewer(Viewer):地图Viewer实例
****coverWMSLayer(ImageryLayer):用来存储遮盖图层“ImageryLayer”的实例变量
****wmsUrl(string):用来显示遮盖的wms服务地址
****sqlStr(string):cql字符串
*返回值:coverWMSLayer(ImageryLayer):wms影像图层
 *注解:
*1.wmsUrl地址样例
*“http://192.168.167.129:8066/geoserver/XZQH/ows?layers=XZQH:sichuan_xiang”
*2.过滤条件样例：sqlStr="mc_code NOT IN('"+code_str+"')";
*/
myCesium.addCoverLayer_wms=function(viewer,coverWMSLayer,wmsUrl="",cqlStr=""){
if(viewer&&wmsUrl){
let urlParam=myCesium.urlParamToObject(wmsUrl);
let layers=urlParam.layers || "";//图层
let cql_filter=cqlStr || "1=1";//筛选条件
if(viewer.imageryLayers.contains(coverWMSLayer)){
viewer.imageryLayers.remove(coverWMSLayer);  
}
coverWMSLayer=new Cesium.ImageryLayer(new Cesium.WebMapServiceImageryProvider({
title:"coverWMSLayer",
credit:"coverWMSLayer",
url:wmsUrl,//请求地址
layers:layers,//显示的图层
enablePickFeatures:false,
parameters:{//查询参数
transparent:true,//是否透明
format:"image/png",//请求的格式
srs:"EPSG:4326",//查询参数坐标系，只能为wgs84格式，不能为投影坐标系，服务可以是任意坐标系
styles:"coverBackground",//动态渲染样式
cql_filter:cql_filter//过滤条件
}
}));
viewer.imageryLayers.add(coverWMSLayer); 
if(coverWMSLayer)viewer.imageryLayers.raiseToTop(coverWMSLayer);
}
return coverWMSLayer;
}//e






/*************************封装判断str字符串是否可以转为json对象******************************************
 *参数:str(string):字符串
 *返回值(boolean):返回判断结果
 *注解:
 */
myCesium.isJsonStr=function(str){
if (typeof str == 'string') {
try {
var obj=JSON.parse(str);
if(typeof obj == 'object' && obj ){
return true;
}else{
return false;
}
} catch(e) {
//console.log('error：'+str+'!!!'+e);
return false;
}
}
console.log('It is not a string!')
}//e


/***********************封装根据行政代码code进行地图区域定位(WFS服务)*****************************
 *参数:viewer(Viewer):地图viewer
 ***xzdm(String):需要定位的区域行政代码code,只能为“51”、“5101”格式
 ***formatCode(String):格式化行政代码code，可选值:“1”，“2”，值为1:“51”格式,值为2:"510000"格式
 ***mapServerConfig(object):地图服务地址对象
 ***config(object):配置对象，对省、市、县、乡进行WFS服务过滤的code字段，默认都为:"mc_code"
 ***callback(function):区域定位后进行回调,回调参数“geojsonData”，“rectExtent”为“Rectangle”矩形范围
 *无返回值
 *注解:
*1.config服务过滤字段配置:
config={
	codeField_sheng:"",		
	codeField_shi:"",		
	codeField_xian:"",		
	codeField_xiang:""		
};
*2.通过bbox进行定位
*3.turf.bbox():范围与Cesium.Rectangle.fromDegrees()范围对应的坐标顺序是一致的，
*都是[xmin,ymin,xmax,ymax]顺序坐标
*4.“geojsonData”:数据为geojson格式的“FeatureCollection”,“rectExtent”数据为
 */    
myCesium.mapDw_byCode=function(viewer,xzdm="",formatCode="",mapServerConfig,config={},callback=function(){}){
let url_dw="";
config=config||{};
let codeField_sheng=config.codeField_sheng||"mc_code";
let codeField_shi=config.codeField_shi||"mc_code";
let codeField_xian=config.codeField_xian||"mc_code";
let codeField_xiang=config.codeField_xiang||"mc_code";
if(viewer&&xzdm){
xzdm=xzdm+"";
let xzjb=myCesium.getXZDMLevelByCode(xzdm);//行政级别,可选值:"sheng"、"shi"、"xian"、"xiang"
if(xzjb=="sheng"){
if(String(formatCode)=="2")xzdm+="0000";
url_dw=mapServerConfig.china_sheng+"&cql_filter="+codeField_sheng+"="+xzdm;//定位省
}
else if(xzjb=="shi"){
if(String(formatCode)=="2")xzdm+="00";
url_dw=mapServerConfig.china_shi+"&cql_filter="+codeField_shi+"="+xzdm;//定位市
}
else if(xzjb=="xian"){
url_dw=mapServerConfig.sichuan_xian+"&cql_filter="+codeField_xian+"="+xzdm;//定位县
}
else if(xzjb=="xiang"){
url_dw=mapServerConfig.sichuan_xiang+"&cql_filter="+codeField_xiang+"="+xzdm;//定位乡镇
}
if(!url_dw)return false;
let wfsURL=url_dw+"&service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson";
fetch(wfsURL).then(response=>response.text()).then(function(geojsonStr){
let isJson=myCesium.isJsonStr(geojsonStr);
if(!isJson)return false;
let geojsonData=eval("("+geojsonStr+")");
if(geojsonData.features.length==0)return false;
let bbox = turf.bbox(geojsonData);
let orientation_hpRange=new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0),Cesium.Math.toRadians(-90),0);
let rectExtent=Cesium.Rectangle.fromDegrees(bbox[0],bbox[1],bbox[2],bbox[3]);//[xmin,ymin,xmax,ymax]
viewer.camera.setView({destination:rectExtent,orientation:orientation_hpRange});
callback(geojsonData,rectExtent);
});
}
}//e


/******************************设置hover需要显示的文本(单元格)****************************
 *参数:hoverShowFields(array):需要浮显得字段数组
 *返回值:showText(string):hover显示的html字符串
 *注解: 
 *1.设置hover需要显示的文本,popShowFields=[{name:name,value:value}];//弹框需要显示的字段信息
 *2.如果popShowFields只为空，则 showText结果为""
*/
myCesium.setHoverShowText_td=function(popShowFields){
let showText="";
if(popShowFields&&popShowFields.length){
showText="<div class='popDataDiv_hover'>"+
"<table class='hoverTable' border='0'>"+
"<tbody>";
for(let i=0;i<popShowFields.length;i++){
var oneField=popShowFields[i];
var name=oneField.name;
var value=oneField.value;
var tr_td="<tr>"+
"<td class='hover_tdName'>"+name+":</td>"+
"<td class='hover_tdValue'>"+value+"</td>"+
"</tr>";
showText=showText+tr_td;
}
showText=showText+"</tbody>"+
"</table>"+
"</div>";
}
else{
showText="暂无需要显示字段！"
}
return showText;
}//e



/******************************设置hover需要显示的文本(span)****************************
 *参数:hoverShowFields(array):需要浮显得字段数组
 *返回值:showText(string):hover显示的html字符串
 *注解: 
 *1.设置hover需要显示的文本,popShowFields=[{name:name,value:value}];//弹框需要显示的字段信息
 *2.如果popShowFields只为空，则 showText结果为""
*/
myCesium.setHoverShowText_span=function(hoverShowFields){
let showText="";
if(hoverShowFields&&hoverShowFields.length>0){
showText="<div class='popDataDiv_hover'>"+
"<table class='hoverTable' border='0'>"+
"<tbody>";
for(let i=0;i<hoverShowFields.length;i++){
var oneField=hoverShowFields[i];
var name=oneField.name;
var value=oneField.value;
var tr_td="<tr>"+
"<td>"+
"<span class='td_nameSpan'>"+name+":</span>"+
"<span class='td_valueSpan'>"+value+"</span>"+
"</td>"+
"</tr>";
showText=showText+tr_td;
}
showText=showText+"</tbody>"+
"</table>"+
"</div>";
}
else{
//showText="暂无需要显示字段！"
showText="";
}
return showText;
}//e





/*************************封装设置地图方位角到指定方位(度)************************
 *参数:viewer(Viewer):地图viewer
 *****angle(number):需要旋转到的角度值，正值(正北向东),负值(正北向西)
 *无返回值
 */
myCesium.setCurrentHeading=function(viewer,angle){
angle=angle||0;
if(viewer){
let currentHeading=viewer.scene.camera.heading;//相机方位
viewer.scene.camera.rotate(viewer.scene.camera.position,-currentHeading);
let angle2=360-eval(angle);//获取相机方位与地图方位相反
let radians=Cesium.Math.toRadians(angle2);
viewer.scene.camera.rotate(viewer.scene.camera.position,radians);
}	
}//e

/*************************封装获取当前地图方位角(度)************************
 *参数:viewer(Viewer):地图viewer
 *返回值:currentHeading(number):返回方位角(0~360,正北向东)
 */
myCesium.getCurrentHeading=function(viewer){
let currentHeading=null;
if(viewer){
var heading=viewer.scene.camera.heading;//获取相机方位与地图方位相反
currentHeading=360-Cesium.Math.toDegrees(heading);
}	
return currentHeading;
}//e



/*************************封装更新影像图层************************
 *参数:更新时间:2020.05.09
 ****oldLayer(ImageryLayer):将要被替换的旧图层
 ****newLayer(ImageryLayer):新图层
 ****viewer(Viewer):地图viewer
 *返回值:newLayer(ImageryLayer):返回新图层
 */
myCesium.updateImageryLayer=function(oldLayer,newLayer,viewer){
if(oldLayer&&newLayer&&viewer){
if(viewer.imageryLayers.contains(oldLayer)){
let lyrIdx=viewer.imageryLayers.indexOf(oldLayer);
viewer.imageryLayers.remove(oldLayer);
viewer.imageryLayers.add(newLayer,lyrIdx);	
}else{
//viewer.imageryLayers.add(newLayer);	
}
}	
return newLayer;
}//e



/*************************封装将十六进制格式的颜色转RGBA格式的颜色************************
 *更新时间:2020.04.05
 *参数:HexColor(string):十六进制格式的颜色,即css,html中使用的格式，例如:“#FFFFFF”
 ****alpha(number):染色透明度，默认为1.0
 *返回值:rgbaColor(string):rgba格式的颜色
 */
myCesium.hexColorToRgbaColor=function(HexColor="",alpha=1.0){
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

/*************************封装将十六进制格式的颜色转RGB格式的颜色(array)************************
 *参数:HexColor(string):十六进制格式的颜色,即css,html中使用的格式，例如:“#FFFFFF”
 ****alpha(number):染色透明度，默认为1.0
 *返回值:sColorChange(array):rgba数组格式，例如:[255,0,0,0.5]
 */
myCesium.hexColorToRgbaColor2=function(HexColor="",alpha=1.0){
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
rgbaColor="RGB(" + sColorChange.join(",") + ")";
}
else{
rgbaColor=sColor;    
}
}
return sColorChange;
}//e



/***************************封装创建primitive点图标要素(Point,世界坐标)***********************
 *参数:cartesian3(object):世界坐标，例如:{x:"",y:"",z:""}   
 *****imgSrc(string):图标路径
 *****[attr(object)]:该空间对象属性
 *****[heightReference(HeightReference)]:空间对象的参考高度
 *返回值:primitive_pic(Entity):点图标primitive对象
 *注解:
 *1.该方法支持创建二维贴地点，支持三维坐标实体
 */
myCesium.createPicPtPrimitive_car=function(cartesian3,imgSrc,attr={},heightReference=""){
let primitive_pic="";
attr=attr||{};//空间对象属性
attr.title="primitive点图标";
attr.type="Billboard";
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
if(cartesian3&&imgSrc){
primitive_pic={//Billboard
id:JSON.stringify(attr),//存放属性
position:cartesian3,
image:imgSrc,
scale:1.0,
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
heightReference:heightReference//参考高度
};	
}
return primitive_pic;
}//e



/***************************封装创建primitive点图标要素(Point,WGS84)***********************
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z]    
 *****imgSrc(string):图标路径
 *****[attr(object)]:该空间对象属性
 *****[heightReference(HeightReference)]:空间对象的参考高度
 *返回值:primitive_pic(Entity):点图标primitive对象
 *注解:
 *1.该方法支持创建二维贴地点，支持三维坐标实体
 */
myCesium.createPicPtPrimitive=function(coord,imgSrc,attr={},heightReference=""){
let primitive_pic="";
let lon=coord[0] || "";
let lat=coord[1] || "";
let z=coord[2] || 0;
attr=attr||{};//空间对象属性
attr.title="primitive点图标";
attr.type="Billboard";
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
if(lon&&lat&&imgSrc){
primitive_pic={//Billboard
id:JSON.stringify(attr),//存放属性
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),
image:imgSrc,
scale:1.0,
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
heightReference:heightReference//参考高度
};	
}
return primitive_pic;
}//e


/***************************封装创建primitive圆点要素(dot,世界坐标)***********************
 *参数:cartesian3(object):世界坐标，例如:{x:"",y:"",z:""}  
 ***[attr(object)]:该实体属性
 ***color(string):圆点颜色，十六进制格式颜色，默认为黄色
 ***[pointSize(number)]:圆点大小
 ***[outlineColor(string)]:圆点外边框颜色，十六进制格式颜色
 ***[outlineWidth(number)]:圆点外边框宽度
  *返回值:primitive_pt(Entity):primitive圆点对象
  *注解:
 *1.primitive几何对象属性存放在“id”属性中，类型为string
 */
myCesium.createDotPrimitive_car=function(cartesian3,attr={},color="",pointSize="",outlineColor="",outlineWidth=""){
let primitive_pt=null;
color=color || "#CEE723";
outlineColor=outlineColor||color;
outlineWidth=outlineWidth||0;
attr=attr||{};
pointSize=pointSize||5.0;
if(cartesian3){
primitive_pt={//PointPrimitive
id:JSON.stringify(attr),//存放属性String
position:cartesian3,//位置坐标,
pixelSize:pointSize,
color:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//点的填充色
outlineColor:Cesium.Color.fromCssColorString(outlineColor).withAlpha(1.0),//外边框颜色
outlineWidth:outlineWidth,//外边框宽度
//scaleByDistance:new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance:new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),//通过相机远近控制显示的比例大小
};
}
return primitive_pt;
}//e



/***************************封装创建Primitive圆点要素(dot,WGS84,symbol)***********************
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z]    
 ***[attr(object)]:该实体属性
 ***color(string):圆点颜色，十六进制格式颜色，默认为黄色
 ***[pointSize(number)]:圆点大小
 ***[outlineColor(string)]:圆点外边框颜色，十六进制格式颜色
 ***[outlineWidth(number)]:圆点外边框宽度
  *返回值:primitive_pt(Entity):primitive圆点对象
  *注解:
 *1.primitive几何对象属性存放在“id”属性中，类型为string
 */
myCesium.createDotPrimitive_sym=function(coord,attr={},color="",pointSize="",outlineColor="",outlineWidth=""){
let primitive_pt=null;
if(coord&&coord.length<2)return false;
let lon=coord[0] || "";
let lat=coord[1] || ""
let z=coord[2] || 0;
color=color || "#CEE723";
outlineColor=outlineColor||color;
outlineWidth=outlineWidth||0;
attr=attr||{};
pointSize=pointSize||5.0;
if(lon&&lat){
primitive_pt={//PointPrimitive
id:JSON.stringify(attr),//存放属性String
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//位置坐标,
pixelSize:pointSize,
color:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//点的填充色
outlineColor:Cesium.Color.fromCssColorString(outlineColor).withAlpha(1.0),//外边框颜色
outlineWidth:outlineWidth,//外边框宽度
//scaleByDistance:new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance:new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),//通过相机远近控制显示的比例大小
};
}
return primitive_pt;
}//e



/**********************封装设置WGS84坐标"z"值("z"包含地面高程+相对地面高度)*******************
*更新时间:2020.05.28
*参数:coordDatas(string):不带“z”的经纬度坐标(二维坐标),例如:[[lon,lat],[lon,lat]]
*****viewer(Viewer):地图viewer实例
*****isRelativeHeightZ(boolean):[opt] 坐标数据是否包含z值(相对于地面高度值)，默认false
*****callback(function):查询结果的回调函数，参数为带有z坐标的坐标数组，例如:[[lon,lat,z],[lon,lat,z]]
*无返回值
*注解:
*1.如果设置“zValue”参数，则优先使用该值
*2.coordDatas坐标为wgs84常规坐标，例如:[[lon,lat],[lon,lat]]
*3.回调函数的参数为带有z坐标的坐标数组，例如:[[lon,lat,z],[lon,lat,z]]
*4.查询的坐标高程的数组顺序是按原始的坐标顺序进行返回
*/
myCesium.setWGS84Coords_Z=function(coordDatas,viewer,isRelativeHeightZ=false,callback=function(){}){
let coords_z=[];
isRelativeHeightZ=isRelativeHeightZ?isRelativeHeightZ:false;
if(coordDatas&&coordDatas.length>0){
getElevationByCoords(coordDatas,viewer.terrainProvider,12,callback);
}
function getElevationByCoords(wgs84Coords,terrainProvider,terrainLevel,callback){
let coords=[];//需要查询高程的坐标点数组
terrainLevel=eval(terrainLevel) || 14;//terrain瓦片级别
if(wgs84Coords&&wgs84Coords.length>0&&terrainProvider){
for(let i=0;i<wgs84Coords.length;i++){
let lon=wgs84Coords[i][0] || "";
let lat=wgs84Coords[i][1] || "";
if(!lon||!lat)continue;
lon=eval(lon);
lat=eval(lat);
let cartographic=Cesium.Cartographic.fromDegrees(lon,lat);//将经纬度坐标转为弧度坐标，例如：{longitude:"",latitude:"",height:""}
coords.push(cartographic);
}
let promise=Cesium.sampleTerrain(terrainProvider,terrainLevel,coords);//高程采样
//Cesium高版本取消Cesium.when方法
promise.then(function(updatedPositions){
let coords_z=[];
if(updatedPositions&&updatedPositions.length>0){
for(let i=0;i<updatedPositions.length>0;i++){
let lon2=Cesium.Math.toDegrees(updatedPositions[i].longitude);//经度
let lat2=Cesium.Math.toDegrees(updatedPositions[i].latitude);//纬度
//let ele=updatedPositions[i].height>=0?parseInt(updatedPositions[i].height) : 0;//地面高程
let ele=updatedPositions[i].height>=0?eval(updatedPositions[i].height) : 0;//地面高程
//if(height)ele=eval(height)+ele;
if(isRelativeHeightZ){
let coord_z=coordDatas[i][2]||0;
ele=eval(coord_z)+ele;//加上原坐标的相对地面高度z值
}
if(lon2&&lat2)coords_z.push([lon2,lat2,ele]);
}
}
callback(coords_z);//返回查询高程结果
});
}
}//e
}//e


/*******************************封装将单个geojson转为WKT格式几何(Point、LineString、Polygon)*******************************
*参数:jsonGeo(string):geojson几何
*****geoWKT(WKT):WKT格式的几何
*无返回值
*注解:
*1.geojson几何支持“Point”、“LineString”、“Polygon”几何类型
*/
myCesium.geoJsonToWKT_geo=function(jsonGeo=""){
let geoWKT="";
let coords="";//二维数组
let geojsonType="";//可选值:“Point”、“LineString”、“Polygon”
let wktType="";
if(jsonGeo){
geojsonType=jsonGeo.type;//可选值:“Point”、“LineString”、“Polygon”
if(geojsonType=="Point"){//一维数组
wktType="POINT";
coords=[jsonGeo.coordinates];
}
else if(geojsonType=="LineString"){//二维数组
wktType="LINESTRING";
coords=jsonGeo.coordinates;
}
else if(geojsonType=="Polygon"){//三维数组
wktType="POLYGON";
coords=jsonGeo.coordinates[0];
}
let wktGeoStr="";
if(coords&&coords.length>0){
for(let i=0;i<coords.length;i++){
let coord=coords[i];//[lon,lat]
if(!wktGeoStr){
wktGeoStr=coord[0]+" "+coord[1];
}
else{
wktGeoStr=wktGeoStr+","+coord[0]+" "+coord[1];
}	
}
if(geojsonType=="Point" || geojsonType=="LineString"){
if(!geoWKT){
geoWKT=wktGeoStr;
}
else{
geoWKT=geoWKT+","+wktGeoStr;
}
}
else if(geojsonType=="Polygon"){
if(!geoWKT){
geoWKT="("+wktGeoStr+")";
}
else{
geoWKT=geoWKT+","+"("+wktGeoStr+")";
}
}
}
geoWKT=wktType+"("+geoWKT+")";
}
return geoWKT;
}//e



/*******************************封装将geojson数组转为WKT格式几何(MultiPoint、MultiLineString、MULTIPolygon)*******************************
 *参数:geojsonArray(string):geojson几何数组
 *****geoWKT(WKT):WKT格式的几何数组
 *无返回值
 *注解:
 *1.geojsonArray中只支持一种几何类型，不支持多种几何类型混合在一起
 *2.geojson几何支持“Point”、“LineString”、“Polygon”几何类型
 *3.适用于空间查询，例如:var cql2="DISJOINT(the_geom,"+geojson_wkt1+")";
 */
myCesium.geoJsonsToWKT_MultiGeo=function(geojsonArray=[]){
let geoWKT="";
let coords="";//二维数组
let geojsonType="";//可选值:“Point”、“LineString”、“Polygon”
let wktType="";
if(geojsonArray&&geojsonArray.length>0){
geojsonType=geojsonArray[0].type;//以数组中第一个几何为准
for(let i=0;i<geojsonArray.length;i++){
let jsonGeo=geojsonArray[i];
if(geojsonType=="Point"&&jsonGeo&&jsonGeo.type==geojsonType){//一维数组
wktType="MULTIPOINT";
coords=[jsonGeo.coordinates];
}
else if(geojsonType=="LineString"&&jsonGeo&&jsonGeo.type==geojsonType){//二维数组
wktType="MULTILINESTRING";
coords=jsonGeo.coordinates;
}
else if(geojsonType=="Polygon"&&jsonGeo&&jsonGeo.type==geojsonType){//三维数组
wktType="MULTIPOLYGON";
coords=jsonGeo.coordinates[0];
}
let wktGeoStr="";
if(coords&&coords.length>0){
for(let i=0;i<coords.length;i++){
let coord=coords[i];//[lon,lat]
if(!wktGeoStr){
wktGeoStr=coord[0]+" "+coord[1];
}
else{
wktGeoStr=wktGeoStr+","+coord[0]+" "+coord[1];
}	
}
if(geojsonType=="Point"){
if(!geoWKT){
geoWKT="("+wktGeoStr+")";
}
else{
geoWKT=geoWKT+","+"("+wktGeoStr+")";
}
}
else if(geojsonType=="LineString"){
if(!geoWKT){
geoWKT="("+wktGeoStr+")";
}
else{
geoWKT=geoWKT+","+"("+wktGeoStr+")";
}
}
else if(geojsonType=="Polygon"){
if(!geoWKT){
geoWKT="(("+wktGeoStr+"))";
}
else{
geoWKT=geoWKT+","+"(("+wktGeoStr+"))";
}
}
}	
}
geoWKT=wktType+"("+geoWKT+")";
}
return geoWKT;
}//e




/******************************封装创建WMSImageryLayer图层*****************************
 *更新时间:2020.05.26 wxt
 *参数:wmsUrl(string):wms服务地址
 *****layers(string):wms服务需要显示的图层，例如：“XZQH:sichuan_xiang”
 *****layerName(array):[option] wms图层名字，一般为中文名
 *****cql_filter(string):[option] wms需要筛选的cql条件，默认：“1=1”
 *****style(string):[option] wms图层显示的样式,sld样式id
 *****sldStr(string):[option] sld XML字符串，如果该参数有值，则优先"style"样式
 *****layerAttr(object):[option] 图层属性信息
 *返回值(wmsLayer):ImageryLayer类实例
 *注解:
 *1.wmsURL地址样例:
 *"http://localhost:8089/geoserver/XZQH/ows?layers=XZQH:sichuan_xiang"
 *2.wms服务地址的坐标系必须是"EPSG:4326",否则不能使用
 *3.如果地址中已经有了相应的参数，则相应的方法参数可以设置为空
 *4.如果url包含layers参数则可以忽略“layers”参数
 *5."WMSImageryLayer"图像图层通过“credit”存储图层属性信息
 *6.支持tileMatrixSet为"EPSG:4326"、"EPSG:900913"或"EPSG:3857"的格式
 *7.图层属性可选值:
 *var layerAttr={
 	enablePickFeatures:"",
 	layerStatus:"",
 	tileMatrixSet:"",//wms图层瓦片格网集，默认"EPSG:4326",可选值:"EPSG:4326"、"EPSG:900913"或"EPSG:3857"
 	rectangle:"",//wms图层显示范围
 	getFeatureInfoParameters:{//getFeatureInfo方法的额外路径参数
 		
 	}
 }
 *8.cql_filter=="no"时wms图层请求参数会省略"cql_filter"参数
 */
myCesium.createWMSImageryLayer=function(wmsUrl,layers,layerName="",cql_filter="1=1",style="",sldStr,layerAttr){
let wmsLayer="";
let urlParam=myCesium.urlParamToObject(wmsUrl)||{};
cql_filter=cql_filter || "1=1";
layerName=layerName || "未命名";
layers=layers || urlParam.layers;
style=style || "";
sldStr=sldStr || "";
if(!layers)layers="noLayers";
let attr=layerAttr||{};
attr=Object.assign({},attr);//复制对象
let enablePickFeatures=attr.enablePickFeatures==false?false:true;
let layerStatus=attr.layerStatus==false?false:true;
let rectangle=layerAttr.rectangle?layerAttr.rectangle:null;
let getFeatureInfoParameters=attr.getFeatureInfoParameters||null;
let tileMatrixSet=(attr.tileMatrixSet=="EPSG:3857"||attr.tileMatrixSet=="EPSG:900913")?"EPSG:900913":"EPSG:4326";
if(!getFeatureInfoParameters){
getFeatureInfoParameters={cql_filter:cql_filter};	
}else{
getFeatureInfoParameters.cql_filter=cql_filter;
}
attr.layerName=layerName;
attr.wmsUrl=wmsUrl;
attr.layers=layers;
attr.layerId=attr.layerId||layers;
attr.cql_filter=cql_filter;//更新"cql_filter"
let attrStr=JSON.stringify(attr);//wms图层属性信息
let tilingScheme=tileMatrixSet=="EPSG:900913"?new Cesium.WebMercatorTilingScheme():new Cesium.GeographicTilingScheme();
let parameters={};
if(sldStr){
parameters={
transparent:true,//是否透明
format:"image/png",//请求的格式
//styles:style,//动态渲染样式
sld_body:sldStr,
cql_filter:cql_filter,		
};	
}
else{
parameters={
transparent:true,//是否透明
format:"image/png",//请求的格式
styles:style,//动态渲染样式
//sld_body:sldStr,
cql_filter:cql_filter,		
};	
}
if(cql_filter=="no")delete parameters.cql_filter;
if(wmsUrl){
wmsLayer=new Cesium.ImageryLayer(new Cesium.WebMapServiceImageryProvider({
title:layerName,
credit:attrStr,//图层属性信息
url:wmsUrl,//请求地址
layers:layers,//显示的图层
srs:tileMatrixSet,//服务数据源坐标系
crs:tileMatrixSet,
rectangle:rectangle,
enablePickFeatures:enablePickFeatures,//wms是否可以被拾取
tilingScheme:tilingScheme,//默认为“4326格网策略”
getFeatureInfoParameters:getFeatureInfoParameters,
parameters:parameters//查询参数
}),{show:layerStatus});	
}
return wmsLayer;
}//e




/******************************封装创建WMTSImageryLayer图层(wmts方式)*****************************
 *参数:wmtsUrl(string):wmts服务地址
 *****layers(string):wmts服务需要显示的图层，例如：“XZQH:sichuan_xiang”
 *****layerName(array):[option] wmts图层名字，一般为中文名
 *****tileMatrixSet(string):[option] 格网集，默认"EPSG:4326",可选值:"EPSG:4326"、"EPSG:900913"
 *****style(string):[option] wmts图层显示的样式
 *****layerAttr(object):[option] 图层相关属性
 *返回值(wmtsLayer):TileLayer类实例
 *注解:
 *1.如果地址中已经有了相应的参数，则相应的方法形参可以设置为空
 *2.如果url包含layers参数则可以忽略“layers”参数
 *3.图层属性可选值:
 *var layerAttr={
	rectangle:"",//显示范围
	layerStatus:"",//图层可视状态,默认true
 	enablePickFeatures:"",//是否可拾取,默认true
 }
 */
myCesium.createWMTSImageryLayer_wmts=function(wmtsUrl,layers,layerName,tileMatrixSet="",style,layerAttr={}){
let wmtsLayer=null;
let tilingScheme=null;
let rectangle=null;
let tileMatrixLabels=null;
if(wmtsUrl&&geoserverGridSet){
let urlParam=myCesium.urlParamToObject(wmtsUrl)||{};
layers=layers||urlParam.layers;
style=style||"";
tileMatrixSet=tileMatrixSet||"EPSG:4326";//可选值:"EPSG:4326"、"EPSG:900913"
let attr=layerAttr||{};
var layerName=layerName||"未命名";
let layerStatus=attr.layerStatus==false?false:true;
let enablePickFeatures=attr.enablePickFeatures==false?false:true;
rectangle=attr.rectangle||null;
attr.layerName=layerName;
attr.layerId=layers;
attr.url=wmtsUrl;
attr.tileMatrixSet=tileMatrixSet;
let attrStr=JSON.stringify(attr);//图层属性信息
if(tileMatrixSet=="EPSG:900913"){
tilingScheme=new Cesium.WebMercatorTilingScheme();
tileMatrixLabels=geoserverGridSet.EPSG3857.matrixIds;
}
else{
tilingScheme=new Cesium.GeographicTilingScheme();
tileMatrixLabels=geoserverGridSet.EPSG4326.matrixIds;
}
if(rectangle){
wmtsLayer=new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
title:layerName,
layerName:layerName,
credit:attrStr,//图层属性信息
url:wmtsUrl,
layer:layers,//图层请求参数
style:style,//样式请求参数
rectangle:rectangle,
enablePickFeatures:enablePickFeatures,//数据拾取
format:"image/png",//数据格式
tileMatrixSetID:tileMatrixSet,//格网集,可选值:"EPSG:4326"、"EPSG:900913"
tileMatrixLabels:tileMatrixLabels,//格网集Id对应的，每一级别切片数组
tilingScheme:tilingScheme//瓦片格网
}),{show:layerStatus});	
}
else{
wmtsLayer=new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
title:layerName,
layerName:layerName,
credit:attrStr,//图层属性信息
url:wmtsUrl,
layer:layers,//图层请求参数
style:style,//样式请求参数
//rectangle:"",
enablePickFeatures:enablePickFeatures,//数据拾取
format:"image/png",//数据格式
tileMatrixSetID:tileMatrixSet,//格网集,可选值:"EPSG:4326"、"EPSG:900913"
tileMatrixLabels:tileMatrixLabels,//格网集Id对应的，每一级别切片数组
tilingScheme:tilingScheme//瓦片格网
}),{show:layerStatus});	
}
}
return wmtsLayer;
}//e



/******************************封装创建WMTSImageryLayer图层*****************************
 *参数:wmtsUrl(string):wmts服务地址
 *****tileMatrixSet(string):[option] 瓦片格网,默认:"EPSG:4326",可选值:"EPSG:4326"、"EPSG:900913"
 *****layerAttr(object):[option] 图层属性信息
 *返回值(wmtsLayer):ImageryLayer类实例
 *注解:
 *1.wmtsURL地址样例:
 *"http://192.168.167.129:8066/geoserver/gwc/service/tms/1.0.0/XZQH:sichuan_xian@EPSG:4326@png/{z}/{x}/{reverseY}.png"
 *2.wmts服务地址注意“tileMatrixSet”格网的设置
 *3.layerAttr可选属性
 *var layerAttr={
 	rectangle:"",//显示范围,Rectangle实例
 	layerStatus:"",//图层可视状态,默认true
 	enablePickFeatures:"",//是否可拾取,默认true
 *};
 */
myCesium.createWMTSImageryLayer_tms=function(wmtsUrl,tileMatrixSet,layerAttr){
let wmtsLayer="";
tileMatrixSet=tileMatrixSet||"EPSG:4326";//可选值:"EPSG:4326"、"EPSG:900913"
let attr=layerAttr||{};
let enablePickFeatures=attr.enablePickFeatures==false?false:true;
let layerStatus=attr.layerStatus==false?false:true;
let rectangle=attr.rectangle||null;
let tilingScheme=tileMatrixSet=="EPSG:900913"?new Cesium.WebMercatorTilingScheme():new Cesium.GeographicTilingScheme();
attr.url=wmtsUrl;
wmtsUrl=wmtsUrl.replace("{-y}","{reverseY}");
attr.tileMatrixSet=tileMatrixSet;
let attrStr=JSON.stringify(attr);//图层属性信息
if(wmtsUrl&&tileMatrixSet&&rectangle){
wmtsLayer=new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
title:"tms方式加载瓦片",
credit:attrStr,
url:wmtsUrl,
minimumLevel:0,
maximumLevel:20,
rectangle:rectangle,
enablePickFeatures:enablePickFeatures,//数据拾取
tilingScheme:tilingScheme//EPSG:3857切片策略，默认的坐标系是EPSG3857，与“TileMatrixSet”坐标一致
}),{show:layerStatus});
}
else if(wmtsUrl&&tileMatrixSet){
wmtsLayer=new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
title:"tms方式加载瓦片",
credit:"tms方式加载瓦片",
url:wmtsUrl,
minimumLevel:0,
maximumLevel:20,
enablePickFeatures:enablePickFeatures,//数据拾取
tilingScheme:tilingScheme//EPSG:3857切片策略，默认的坐标系是EPSG3857，与“TileMatrixSet”坐标一致
}),{show:layerStatus});	
}
return wmtsLayer;
}//e




/******************************封装click拾取wms数组中最顶部wms图层且wms图层"show=true"***********************************
*参数:viewer(viewer):Viewer地图实例
******screenCoord(array):屏幕坐标数组,[x,y]
******wmsLyrArray(array):wms图层数组，“ImageryLayer”类
******callback(function):拾取顶部wms图层中的几何要素
*无返回值
*注解:
*/
myCesium.pickTopWmsLyrFeat=function(viewer="",screenCoord="",wmsLyrArray=[],callback=function(){}){
if(viewer&&screenCoord&&wmsLyrArray){
let topWmsLyr="";//ImageryLayer
let cameraRay=viewer.camera.getPickRay(screenCoord);//获取相机位置到点击的射线
let cartesian3=viewer.scene.globe.pick(cameraRay,viewer.scene);//拾取的椭球体表面位置
let cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian3);//cartesian3坐标转地理弧度坐标
for(let i=wmsLyrArray.length-1;i>=0;i--){
let wmsLyr=wmsLyrArray[i];
if(wmsLyr.show){
topWmsLyr=wmsLyr;
break;
}
}
if(topWmsLyr&&cartographic){
var alti = viewer.camera.positionCartographic.height;//当前位置相机高度
var mapLevel=myCesium.getMapLevelByHeight(alti);//获取当前地图的级别大小
if(topWmsLyr.show&&topWmsLyr.imageryProvider&&topWmsLyr.imageryProvider.ready){//wms图层show,等待wms服务准备完成
var xy=topWmsLyr.imageryProvider.tilingScheme.positionToTileXY(cartographic,mapLevel);//计算切片位置
var promise=topWmsLyr.imageryProvider.pickFeatures(xy.x,xy.y,mapLevel,cartographic.longitude,cartographic.latitude);
//Cesium高版本取消Cesium.when方法
promise.then(function(featSet){//要素集
callback(featSet);
});
}
}
}
}//e



/***********************************根据筛选条件查询相应的WFS几何要素***********************************
 *参数:wfsURL(string):WFS服务地址
 *****cql(string):筛选条件
 *****callback(function):查询的结果要素集，返回一个“FeatureCollection”类型要素集合
 *无返回值
 *注解:
 *1."wfsURL"路径样例：
 *"http://localhost:8066/geoserver/XZQH/ows?typeName=XZQH:china_sheng_chouxi"
 *2.回调函数的参数FeatureSet:
 *var FeatureSet={
	crs:{type:"name",properties:{}},
 	features:[],
 	totalFeatures: 1,
 	type:"FeatureCollection"
 };
*3.路径“cql_filter”优先，如果wfsURL地址中包含“cql_filter”参数，则忽略“cql”参数
*/
myCesium.queryFeat_wfs=function(wfsURL,cql="1=1",callback=function(){}){
cql=cql || "1=1";
if(wfsURL){
if(!wfsURL.match("cql_filter"))wfsURL=wfsURL+"&cql_filter="+cql;
wfsURL=wfsURL+"&service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson";
}
fetch(wfsURL).then(response=>response.text()).then(function(geojsonStr){
let geojsonData=eval("("+geojsonStr+")");
callback(geojsonData);
});
}//e




/******************************封装判断点坐标是否在几何区域数组范围内***********************************
 *参数:lat(number):经度
*****lon(number):纬度
*****geoExtentArray(array):几何数组，geojson格式的几何
*返回值:isInPolyArray(boolean):如果坐标点都不在任何几何范围内，则返回false,反之为true
*注解:
*1.geoExtentArray数组中的geojson几何可以是任意几何类型，但是参与运算的只有"Polygon","MultiPolygon"
*2.geojson_geo={
	type:"Polygon",
	coordinates:[]
};
*3."geoExtentArray"数组为空时，默认地图没有限制，任何位置都可点击操作
*/
myCesium.isPointInPolyArray=function(lat="",lon="",geoExtentArray=[]){
let isInPolyArray=false;
if(lat&&lon&&geoExtentArray&&geoExtentArray.length>0){
let pt = turf.point([lat,lon]);
for(let i=0;i<geoExtentArray.length;i++){
let json_mian=geoExtentArray[i];//geojson 
let poly="";
if(json_mian.type&&json_mian.type=="Polygon"){
poly = turf.polygon(json_mian.coordinates)
}
else if(json_mian.type&&json_mian.type=="MultiPolygon"){
poly = turf.multiPolygon(json_mian.coordinates)
}
if(pt&&poly){
let isInPolyArray2=turf.booleanPointInPolygon(pt, poly);
if(isInPolyArray2==true)isInPolyArray=true;
}
}
}
if(!geoExtentArray || geoExtentArray.length==0)isInPolyArray=true;
return isInPolyArray;
}//e


/******************************封装通过图层名称获取entityLayer***********************************
*参数:mapLyrCollection(array):包含地图所有的图层数组 
******layerName(string):entityLayer图层"title"属性值
*返回值entityLyr(entity):entityLayer图层
*注解:
*1.如果想要使用该方法，则entityLayer属性中必须包含"title"，否则使用不了
*2.一般来说"mapLyrCollection"数组中都应该全是"entityLayer"类型的图层
*/
myCesium.getEntityInfoByName=function(mapLyrCollection=[],layerName=""){
let entityLyr=null;
if(layerName&&mapLyrCollection&&mapLyrCollection.length>0){
for(let i=0;i<mapLyrCollection.length;i++){
let layer=mapLyrCollection[i];
if(layer.lyrType=="entityLayer"){
if(layer.title==layerName){
entityLyr=layer;  
break;
}
}
}
}
return entityLyr;
}//e



/************************************封装从tilesToRender中获取最大的瓦片zoom*************************************
 *参数:viewer(viewer):地图viewer实例
 *返回值:maxZoom(number):当前地图最大zoom
 *注解：
 *1.tilesToRender切片策略为"GeographicTilingScheme"
 */
myCesium.getMaxTiledLevel=function(viewer=""){
let maxZoom=1;
if(viewer){
let tilesToRender =viewer.scene.globe._surface._tilesToRender;//tiled4326
tilesToRender.forEach(function(tiled){
if(tiled.level>maxZoom)maxZoom=tiled.level;
});	
}
return maxZoom;
}//e


/************************************封装清空地图所有实体要素*************************************
 *参数:viewer(viewer):地图viewer实例
 ******mapAllLyr(array):包含地图所有的图层数组，只清空“entityLayer”图层，“dataSource”图层只隐藏，不清空
 *无返回值
 *注解：
 *1.清空规则：
 *	1)viewer.entities.removeAll()
 *	2)entityLayer._children=[]
 *	3)viewer.dataSources.removeAll
 */
myCesium.clearAll=function(viewer="",mapAllLyr=""){
if(viewer&&mapAllLyr&&mapAllLyr.length>0){
viewer.entities.removeAll();
viewer.dataSources.removeAll();
for(let i=0;i<mapAllLyr.length;i++){
let layer=mapAllLyr[i];//图层
let lyrId=layer.lyrId || "";//图层id
let layerType=layer.lyrType || "";//图层类型
if(layerType=="entityLayer"){
layer._children=[];
}
}
}
}//e



/*******************封装根据geojson数组计算合适的定位Rectangle矩形范围*****************
 *参数:geojsonArray(array):geojson几何数组，geojson可以为点、线、面
 *****zoom(number):缓冲区范围，单位"kilometers",zoom值越小，定位级别越大，
 *返回值dwRectangle(Rectangle):实体数组合适的定位Rectangle矩形范围
 *注解:
 *1.如果是点实体，则会计算获取以该点为中心的5*5的矩形范围
 *2.如果是线、面实体，则会直接根据坐标计算Rect矩形范围
 *3.该方法需要依赖于turf.js库，需要提前引用
 *4.一般用于home视图范围定位，只适用于home定位，不适合单独的定位
 *5.实现流程：通过获取实体数组的外边边框Rectangle，然后通过Rectangle建立合适的缓冲区，找到合适的“Rectangle”即可
 *6.优势该定位方式不依靠任何地图上的entity就可实现定位，即可以定位地图上不存在的entity
 *7.定位缓冲级别(sheng:100,shi:20,xian:5,xiang:5)
 *8.支持的几何类型:"Point"、"LineString"、"Polygon"，"MultiPoint"、"MultiLineString"、"MultiPolygon"
 *9.定位点的zoom级别为0.5
 */
myCesium.calcFitDwRect_geojsonArray=function(geojsonArray,zoom=100){
let dwRectangle=null;
zoom=eval(zoom) || 100;
if(geojsonArray&&geojsonArray.length>0){
let entityArray_rect=calcGeojsonArrayRect(geojsonArray);//计算矩形范围
let rect_wgs84Coord=getWGS84Array_rect(entityArray_rect);//获取rectangle矩形实例wgs84坐标数组
let polygon = turf.polygon([rect_wgs84Coord]);
let buffered =turf.buffer(polygon,zoom,{units:'kilometers'});
let coords = turf.getCoords(buffered);//缓冲面的wgs84坐标
let car3s=myCesium.transToCartesian3Coords(coords[0]);
dwRectangle=Cesium.Rectangle.fromCartesianArray(car3s);//根据cartesian3坐标数组计算rectangle范围
}
return dwRectangle;
function getWGS84Array_rect(rect=""){
let rect_WGS84=null;//闭合坐标
if(rect){
let west=rect.west;
let south=rect.south;
let east=rect.east;
let north=rect.north;
let rect_pt=[west,north,east,north,east,south,west,south,west,north];
let rect_car3=Cesium.Cartesian3.fromRadiansArray(rect_pt);
rect_WGS84=cartesian3sToWGS84s(rect_car3);
}
return rect_WGS84;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e2
}//e
function calcGeojsonArrayRect(geojsonArray){
let rectangle=null;
let geoCoordsArray=[];//car3坐标数组
if(geojsonArray&&geojsonArray.length>0){
for(let i=0;i<geojsonArray.length;i++){
let geojson=geojsonArray[i];
let geoType=geojson.type;
let coords=geojson.coordinates;
if(geoType=="Point"){//点实体
let coords2=geojson.coordinates;//一维数组
let point = turf.point(coords2);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
else if(geoType=="LineString"){//二维数组
let geoCoords=myCesium.transToCartesian3Coords(coords);	
geoCoordsArray.push(geoCoords);
}
else if(geoType=="Polygon"){//三维数组
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);	
geoCoordsArray.push(geoCoords);
}
else if(geoType=="MultiPoint"){//二维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];//一维数组
let point = turf.point(coords2);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
}
else if(geoType=="MultiLineString"){//三维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];
let geoCoords=myCesium.transToCartesian3Coords(coords2);	
geoCoordsArray.push(geoCoords);
}
}
else if(geoType=="MultiPolygon"){//四维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];
let geoCoords=myCesium.transToCartesian3Coords(coords2[0]);	
geoCoordsArray.push(geoCoords);
}
}
if(geoCoordsArray&&geoCoordsArray.length>0){
geoCoordsArray.forEach(function(geoCoords){
if(!rectangle){
rectangle=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围	
}
else{
var entityRect=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围
rectangle=Cesium.Rectangle.union(rectangle,entityRect);	
}	
});
}
}
}
return rectangle;
}//
}//e




/*******************封装根据实体数组计算合适的定位Rectangle矩形范围*****************
 *参数:entityArray(entity):实体数组，实体可以为点、线、面
 *****zoom(number):缓冲区范围，单位"kilometers",zoom值越小，定位级别越大，
 *返回值dwRectangle(Rectangle):实体数组合适的定位Rectangle矩形范围
 *注解:
 *1.如果是点实体，则会计算获取以该点为中心的5*5的矩形范围
 *2.如果是线、面实体，则会直接根据坐标计算Rect矩形范围
 *3.该方法需要依赖于turf.js库，需要提前引用
 *4.一般用于home视图范围定位，只适用于home定位，不适合单独的定位
 *5.实现流程：通过获取实体数组的外边边框Rectangle，然后通过Rectangle建立合适的缓冲区，找到合适的“Rectangle”即可
 *6.优势该定位方式不依靠任何地图上的entity就可实现定位，即可以定位地图上不存在的entity
 *7.定位缓冲级别(sheng:100,shi:20,xian:5,xiang:5)
 */
myCesium.calcFitDwRect_entityArray=function(entityArray,zoom=100){
let dwRectangle=null;
zoom=eval(zoom) || 100;
if(entityArray&&entityArray.length>0){
let entityArray_rect=calcEntityArrayRect(entityArray);//计算多实体的矩形范围
let rect_wgs84Coord=getWGS84Array_rect(entityArray_rect);//获取rectangle矩形实例wgs84坐标数组
let polygon = turf.polygon([rect_wgs84Coord]);
let buffered =turf.buffer(polygon,zoom,{units:'kilometers'});
let coords = turf.getCoords(buffered);//缓冲面的wgs84坐标
let car3s=myCesium.transToCartesian3Coords(coords[0]);
dwRectangle=Cesium.Rectangle.fromCartesianArray(car3s);//根据cartesian3坐标数组计算rectangle范围
}
return dwRectangle;
function getWGS84Array_rect(rect=""){
let rect_WGS84=null;//闭合坐标
if(rect){
let west=rect.west;
let south=rect.south;
let east=rect.east;
let north=rect.north;
let rect_pt=[west,north,east,north,east,south,west,south,west,north];
let rect_car3=Cesium.Cartesian3.fromRadiansArray(rect_pt);
rect_WGS84=cartesian3sToWGS84s(rect_car3);
}
return rect_WGS84;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e2
}//e
function calcEntityArrayRect(entityArray){//实体数组Rect
let rectangle=null;
let geoType="";//几何类型，可选值：“点”、“线”、“面”
let geoCoords=[];//car3坐标数组
if(entityArray&&entityArray.length>0){
for(let i=0;i<entityArray.length;i++){
let entityFeat=entityArray[i];
let dotGra=entityFeat.point || "";//圆点
let picGra=entityFeat.billboard || "";//点图标
let polylineGra=entityFeat.polyline || "";//线
let polygonGra=entityFeat.polygon || "";//面
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点类型
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线类型
geoType="LineString";
geoCoords=entityFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!dotGra&&!picGra&&polygonGra){//面类型
geoType="Polygon";
geoCoords=entityFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组,geoserver发布的服务
if(!geoCoords){
geoCoords=entityFeat.polygon.hierarchy.getValue();//自己添加的空间对象
}
}
if(geoType=="Point"){//点实体
let pt_zb=cartesian3ToWGS84(geoCoords[0]);
let point = turf.point([pt_zb.longitude,pt_zb.latitude]);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
geoCoords=myCesium.transToCartesian3Coords(coords[0]);
}
if(geoCoords&&geoCoords.length>0){
if(!rectangle){
rectangle=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围	
}
else{
var entityRect=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围
rectangle=Cesium.Rectangle.union(rectangle,entityRect);	
}
}
}
}
return rectangle;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
} 
}//e



/*******************封装计算GeojsonArray的Rect矩形范围*****************
 *参数:geojsonArray(array):geojson几何数组，geojson可以为点、线、面
 *返回值rectangle(Rectangle):Rectangle矩形范围实例
 *注解:
 *1.如果是点实体，则会计算获取以该点为中心的5*5的矩形范围
 *2.如果是线、面实体，则会直接根据坐标计算Rect矩形范围
 *3.该方法需要依赖于turf.js库，需要提前引用
 *4.支持的几何类型:"Point"、"LineString"、"Polygon","MultiPoint"、"MultiLineString"、"MultiPolygon"
 *5.
 */
myCesium.calcGeojsonArrayRect=function(geojsonArray){
let rectangle=null;
let geoCoordsArray=[];//car3坐标数组
if(geojsonArray&&geojsonArray.length>0){
for(let i=0;i<geojsonArray.length;i++){
let geojson=geojsonArray[i];
let geoType=geojson.type;
let coords=geojson.coordinates;
if(geoType=="Point"){//点实体
let coords2=geojson.coordinates;//一维数组
let point = turf.point(coords2);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
else if(geoType=="LineString"){//二维数组
let geoCoords=myCesium.transToCartesian3Coords(coords);	
geoCoordsArray.push(geoCoords);
}
else if(geoType=="Polygon"){//三维数组
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);	
geoCoordsArray.push(geoCoords);
}
else if(geoType=="MultiPoint"){//二维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];//一维数组
let point = turf.point(coords2);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
}
else if(geoType=="MultiLineString"){//三维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];
let geoCoords=myCesium.transToCartesian3Coords(coords2);	
geoCoordsArray.push(geoCoords);
}
}
else if(geoType=="MultiPolygon"){//四维数组
let coords3=geojson.coordinates;
for(let i=0;i<coords3.length;i++){
let coords2=coords3[i];
let geoCoords=myCesium.transToCartesian3Coords(coords2[0]);	
geoCoordsArray.push(geoCoords);
}
}
if(geoCoordsArray&&geoCoordsArray.length>0){
geoCoordsArray.forEach(function(geoCoords){
if(!rectangle){
rectangle=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围	
}
else{
var entityRect=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围
rectangle=Cesium.Rectangle.union(rectangle,entityRect);	
}	
});
}
}
}
return rectangle;
}//e


/*******************封装计算EntityArray的Rect矩形范围*****************
 *更新时间:2020.05.28
 *参数:entityArray(entity):实体数组，实体可以为点、线、面
 *返回值rectangle(Rectangle):Rectangle矩形范围实例
 *注解:
 *1.如果是点实体，则会计算获取以该点为中心的5*5的矩形范围
 *2.如果是线、面实体，则会直接根据坐标计算Rect矩形范围
 *3.该方法需要依赖于turf.js库，需要提前引用
 */
myCesium.calcEntityArrayRect=function(entityArray){
let rectangle=null;
let geoType="";//几何类型，可选值：“点”、“线”、“面”
let geoCoords=[];//car3坐标数组
if(entityArray&&entityArray.length>0){
for(let i=0;i<entityArray.length;i++){
let entityFeat=entityArray[i];
let dotGra=entityFeat.point || "";//圆点
let picGra=entityFeat.billboard || "";//点图标
let polylineGra=entityFeat.polyline || "";//线
let polygonGra=entityFeat.polygon || "";//面
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点类型
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线类型
geoType="LineString";
geoCoords=entityFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!dotGra&&!picGra&&polygonGra){//面类型
geoType="Polygon";
geoCoords=entityFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组,geoserver发布的服务
if(!geoCoords){
geoCoords=entityFeat.polygon.hierarchy.getValue();//自己添加的空间对象
}
}
if(geoType=="Point"){//点实体
let pt_zb=cartesian3ToWGS84(geoCoords[0]);
let point = turf.point([pt_zb.longitude,pt_zb.latitude]);
let pt_buffer = turf.buffer(point,0.005,{units:'kilometers'});//点缓冲区面，5*5
let coords = turf.getCoords(pt_buffer);
geoCoords=myCesium.transToCartesian3Coords(coords[0]);
}
if(geoCoords&&geoCoords.length>0){
if(!rectangle){
rectangle=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围	
}
else{
var entityRect=Cesium.Rectangle.fromCartesianArray(geoCoords);//根据cartesian3坐标数组计算rectangle范围
rectangle=Cesium.Rectangle.union(rectangle,entityRect);	
}
}
}
}
return rectangle;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e


/******************************获取rect矩形范围常规WGS84坐标数组(WGS84)****************************
 *参数:rect(Rectangle):Rectangle实例对象
 *返回值:rect_WGS84(Array):常规WGS84坐标数组
 */
myCesium.getWGS84Array_rect=function(rect=""){
let rect_WGS84=null;//闭合坐标
if(rect){
let west=rect.west;
let south=rect.south;
let east=rect.east;
let north=rect.north;
let rect_pt=[west,north,east,north,east,south,west,south,west,north];
let rect_car3=Cesium.Cartesian3.fromRadiansArray(rect_pt);
rect_WGS84=cartesian3sToWGS84s(rect_car3);
}
return rect_WGS84;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e2
}//e

/******************************获取rect矩形范围car3坐标数组(car3)****************************
 *参数:rect(Rectangle):Rectangle实例对象
 *返回值:rect_car3(Array):Cartesian3坐标数组
 */
myCesium.getCar3Array_rect=function(rect=""){
let rect_car3=null;//闭合坐标
if(rect){
let west=rect.west;
let south=rect.south;
let east=rect.east;
let north=rect.north;
let rect_pt=[west,north,east,north,east,south,west,south,west,north];
rect_car3=Cesium.Cartesian3.fromRadiansArray(rect_pt);
}
return rect_car3;
}//e


/***************************封装高亮实体本身(适用于click实体高亮,不适用与hover)***********************
 *参数:selectFeat(entity):需要高亮的实体要素
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:线的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:lineEntity(Entity):线实体对象,该要素实体包含“geoType”几何类型
 *注解:
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.如果该方法实体中包含"lightColor","normalColor"直接属性或者属性中包含该属性
 *3.如果实体本身没有"lightColor","normalColor"属性，则会从属性中获取属性值
 *4.如果该方法实体属性对象中必须包含"isHighLight"字段，否则可能会出现问题
 *5.地图高亮边界宽度为4，正常状态边界宽度为2
 */
myCesium.lightFeat_self=function(selectFeat=""){
if(selectFeat){
let dotGra=selectFeat.point || "";//圆点
let picGra=selectFeat.billboard || "";//点图标
let polylineGra=selectFeat.polyline || "";//线
let polygonGra=selectFeat.polygon || "";//面
let lightColor=selectFeat.lightColor || "";//高亮颜色
let normalColor=selectFeat.normalColor || "";//正常颜色
if(!lightColor&&selectFeat.properties.lightColor)lightColor=selectFeat.properties.lightColor._value;
if(!normalColor&&selectFeat.properties.normalColor)normalColor=selectFeat.properties.normalColor._value;
if(!lightColor)lightColor="#00FFFF";
if(!normalColor)normalColor="#0000FF";
let geoType="";
let geoCoords="";
let attr=selectFeat.properties || {};//实体属性
let isHighLight=selectFeat.properties.isHighLight ? selectFeat.properties.isHighLight._value : "false";//高亮状态
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){//圆点

}
else if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点图标

}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线
if(isHighLight=="true"){
selectFeat.polyline.material=Cesium.Color.fromCssColorString(normalColor).withAlpha(1.0);
selectFeat.polyline.width=2;
selectFeat.properties.isHighLight._value="false";
}
else{
selectFeat.polyline.material=Cesium.Color.fromCssColorString(lightColor).withAlpha(1.0);	
selectFeat.polyline.width=4;
selectFeat.properties.isHighLight._value="true";
}
}
else if(!dotGra&&!picGra&&polylineGra&&polygonGra){//面
if(isHighLight=="true"){
selectFeat.polyline.material=Cesium.Color.fromCssColorString(normalColor).withAlpha(1.0);
selectFeat.polyline.width=2;
selectFeat.properties.isHighLight._value="false";
}
else{
selectFeat.polyline.material=Cesium.Color.fromCssColorString(lightColor).withAlpha(1.0);
selectFeat.polyline.width=4;
selectFeat.properties.isHighLight._value="true";
}
}
}		   			
}//e



/**********************封装自定义高亮geojson坐标的颜色(primitive方式)*******************
 *更新时间:2020.04.07
 *参数:viewer(Viewer):地图Viewer实例
 *****jsonGeo(geojson):将要高亮的geojson几何对象
 *****primitiveLayer(PrimitiveCollection):PrimitiveCollection图层实例对象
 *****attr(object):高亮primitive图元的属性信息
 *****isClear(boolean):每次调用该方法是否清除高亮图层,默认是清除
 *****isDw(boolean):高亮要素时是否进行定位,默认true
 *返回值:primitive_geo(GeometryInstance):高亮的图元要素，便于获取“id”获取的图元信息
 *注解:
 *1.该方法只支持"Point(圆点)"、"MultiPoint(圆点)"、"LineString"、"Polygon",MultiLineString"、"MultiPolygon"
 *2.该方法不支持高亮 点图标
 *3.该方法针对于与点击wms要素后的高亮
 *4."Polygon"只能只单环面，不支持多环面
 *5.可选属性，可通过属性值，定义初始化要素的样式
 *attr={
	//圆点
	pointType:"Dot",//"Dot"
 	color:"#00FFFF",
 	pointSize:"10",
 	outlineColor:"#00FFFF",
 	outlineWidth:"1.0",
 	//线
	lineWidth:"3.0",
    lineColor:"#00FFFF",//hex
  	//面
    fillColor:"#9ACD32",//hex
    alphaValue:"0.0",
    borderWidth:"3.0",
    borderColor:"#00FFFF",//hex
 }
 */
myCesium.lightGeojson_custom_pri=function(viewer,primitiveLayer="",jsonGeo="",attr={},isClear=true,isDw=true){
let primitive_gras=[];//图元几何;
let primitive_geo=null;
attr=attr||{};
isClear=isClear==false?false:true;
isDw=isDw==false?false:true;
if(viewer&&primitiveLayer&&jsonGeo&&turf){
if(isClear=="true"||isClear==true){
primitiveLayer.removeAll();
}
let geoType=jsonGeo.type||"";
let coords=jsonGeo.coordinates||"";
let geoCoordsArray=[];
attr.type="GeometryInstance";
let attrStr=JSON.stringify(attr);
//格式化坐标
if(coords&&geoType=="Point"){//点类型
let firstCoord=coords;
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
let geoCoords=myCesium.transToCartesian3Coords([coords]);
geoCoordsArray.push(geoCoords);
}
else if(coords&&geoType=="LineString"){//线类型
let firstCoord=coords[0];
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
let geoCoords=myCesium.transToCartesian3Coords(coords);
geoCoordsArray.push(geoCoords);
}
else if(coords&&geoType=="Polygon"){//面类型
let firstCoord=coords[0][0];
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
else if(coords&&geoType=="MultiPoint"){//多点类型
let firstCoord=coords[0];
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
let geoCoords=myCesium.transToCartesian3Coords(coords[0]);
geoCoordsArray.push(geoCoords);
}
else if(coords&&geoType=="MultiLineString"){//多线类型
let firstCoord=coords[0][0];
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
for(let i=0;i<coords.length;i++){
let lineCoord=coords[i];
let geoCoords=myCesium.transToCartesian3Coords(lineCoord);
geoCoordsArray.push(geoCoords);
}
}
else if(coords&&geoType=="MultiPolygon"){//多面类型
let firstCoord=coords[0][0][0];
if(firstCoord&&String(parseInt(firstCoord[0])).length>4){
let converted=turf.toWgs84(jsonGeo);
coords=turf.getCoords(converted);
} 
for(let i=0;i<coords.length;i++){
let mianCoord=coords[i][0];
let geoCoords=myCesium.transToCartesian3Coords(mianCoord);
geoCoordsArray.push(geoCoords);
}
}
//高亮几何
if(geoCoordsArray&&geoCoordsArray.length>0){
if(geoType=="Point"){//点
let pointType=attr.pointType||"Dot";//Dot
let color=attr.color||"#00FFFF";
let pointSize=attr.pointSize||"10";//Dot
let outlineColor=attr.outlineColor||"#00FFFF";//Dot
let outlineWidth=attr.outlineWidth||"2.0";//Dot
if(pointType=="Dot"){//圆点
	myCesium.setWGS84Coords_Z([coords],viewer,0,function(coord_z){
		let priLayer_pt2=new Cesium.PointPrimitiveCollection();
		let primitive_pt2=myCesium.createDotPrimitive_sym(coord_z[0],attr,color,eval(pointSize),outlineColor,eval(outlineWidth));
		priLayer_pt2.add(primitive_pt2);
		primitiveLayer.add(priLayer_pt2);
	});
}
else{//点图标，不支持
	
}
}
else if(geoType=="LineString" || geoType=="MultiLineString"){//线
let lineWidth=attr.lineWidth||"3.0";
let lineColor=attr.lineColor||"#00FFFF";
for(let i=0;i<geoCoordsArray.length;i++){
let geoCoords=geoCoordsArray[i];
let lineGeo=new Cesium.GroundPolylineGeometry({//贴地线几何
positions:geoCoords,
width:eval(lineWidth),
});
primitive_geo=new Cesium.GeometryInstance({
title:"高亮线图形",
id:attrStr,//该属性设置有点影响，高亮的性能，但可以忽略影响
geometry:lineGeo
}) 
//贴地线图形组
let primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:primitive_geo,//几何图形
appearance:new Cesium.PolylineMaterialAppearance({
material:Cesium.Material.fromType("Color",{
color:Cesium.Color.fromCssColorString(lineColor).withAlpha(1.0)
})
}),
});
primitive_gras.push(primitive_gra);
}
}
else if(geoType=="Polygon" || geoType=="MultiPolygon"){//面
let fillColor=attr.fillColor||"#9ACD32";//hex
let alphaValue=attr.alphaValue||"0.0";
let borderWidth=attr.borderWidth||"3.0";
let borderColor=attr.borderColor||"#00FFFF";
for(let i=0;i<geoCoordsArray.length;i++){
let geoCoords=geoCoordsArray[i];
//面几何图形
var geoInstance_mian=new Cesium.GeometryInstance({
title:"高亮面图形",
id:attrStr,//该属性设置有点影响，高亮的性能，但可以忽略影响
geometry:new Cesium.PolygonGeometry({//几何
polygonHierarchy:new Cesium.PolygonHierarchy(geoCoords),
})
})
//GroundPrimitive(贴地面)
var groundPrimitive=new Cesium.GroundPrimitive({
geometryInstances:geoInstance_mian,//几何图形实例
appearance:new Cesium.PolylineMaterialAppearance({
material:Cesium.Material.fromType("Color",{
color:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue))
})
}),
});
if(eval(alphaValue)>0)primitive_gras.push(groundPrimitive);//面透明度不为0,则添加面几何
//贴地线几何图形
primitive_geo=new Cesium.GeometryInstance({
id:attrStr,//该属性设置有点影响，高亮的性能，但可以忽略影响
title:"高亮面图形",
geometry:new Cesium.GroundPolylineGeometry({
positions:geoCoords,
width:eval(borderWidth),
})
}) 
//线图形组
let primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:primitive_geo,//几何图形
appearance:new Cesium.MaterialAppearance({//图层组外观
material:Cesium.Material.fromType("Color",{
color:Cesium.Color.fromCssColorString(borderColor).withAlpha(1.0)
})
}),
});	
primitive_gras.push(primitive_gra);
}
}
if(primitive_gras&&primitive_gras.length>0&&primitiveLayer&&geoType!="Point"){
primitive_gras.forEach(function(primitive_gra){
primitiveLayer.add(primitive_gra);	
});
}
}
//定位
if(isDw){
let dwRectangle=myCesium.calcFitDwRect_geojsonArray([jsonGeo],50);
var hpRange=new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0),Cesium.Math.toRadians(-90),0);
viewer.camera.setView({
destination:dwRectangle,
orientation:hpRange
});	
}
}
return primitive_geo;
}//e




/**********************封装自定义高亮选中的实体要素的颜色(仅高亮边界)*******************
 *参数:primitiveLayer(PrimitiveCollection):PrimitiveCollection图层实例对象
 *****selectFeat(entity):选中的实体要素
 *****lightColor(string):自定义高亮的颜色，必须是十六进制的颜色，默认为:"#00FFFF"
 *****isClearLyr(string):每次调用该方法是否清除高亮图层,默认是不清除
 *返回值:primitive_gra(Primitive):高亮的图元要素，便于更改样式
 */
myCesium.lightFeat_custom_pri=function(primitiveLayer="",selectFeat="",lightColor="#00FFFF",isClearLyr="false"){
let primitive_gra=null;//图元几何;
lightColor=lightColor || "#00FFFF";
isClearLyr=isClearLyr||"false";
if(primitiveLayer&&selectFeat){
if(isClearLyr=="true"){
primitiveLayer.removeAll();
}
let dotGra=selectFeat.point || "";//圆点
let picGra=selectFeat.billboard || "";//点图标
let polylineGra=selectFeat.polyline || "";//线
let polygonGra=selectFeat.polygon || "";//面
let geoType="";
let geoCoords="";
let globalId=new Date().getTime();
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){
geoType="dot";
let position=selectFeat.position._value || "";//世界坐标数组
geoCoords=[position];
}
if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点类型
geoType="Point";
selectFeat.billboard.scale=1.2;
}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线类型
geoType="LineString";
geoCoords=selectFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!dotGra&&!picGra&&polylineGra&&polygonGra){//面类型
geoType="Polygon";
geoCoords=selectFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组,geoserver发布的服务
if(!geoCoords){
geoCoords=selectFeat.polygon.hierarchy.getValue();//自己添加的空间对象
}
}
if(selectFeat.properties){
globalId=selectFeat.properties.globalId ? selectFeat.properties.globalId._value : "";//全局id字段	
}
if(geoCoords&&geoCoords.length>0){
if(geoType=="dot"){//圆点
var pixelSize=dotGra.pixelSize.getValue();
if(!Number.isInteger(pixelSize/1.337))dotGra.pixelSize=dotGra.pixelSize*1.337;
}
else if(geoType=="Point"){//点

}
else if(geoType=="LineString"){//线
let lineGeo=new Cesium.GroundPolylineGeometry({//贴地线几何
positions:geoCoords,
width:3,
});
let line_geoInstance=new Cesium.GeometryInstance({
title:"高亮线图形",
//id:globalId,//该属性设置有点影响，高亮的性能，但可以忽略影响
geometry:lineGeo
}) 
//贴地线图形组
primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:line_geoInstance,//几何图形
appearance:new Cesium.PolylineMaterialAppearance({
material:Cesium.Material.fromType("Color",{
color:Cesium.Color.fromCssColorString(lightColor).withAlpha(1.0)
})
}),
});
}
else{//面
//线几何
let linegeo=new Cesium.GroundPolylineGeometry({
positions:geoCoords,
width:3,
}); 
//线几何图形
let line_geoInstance=new Cesium.GeometryInstance({
//id:globalId,//该属性设置有点影响，高亮的性能，但可以忽略影响
title:"高亮面图形",
geometry:linegeo
}) 
//图形组
primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:line_geoInstance,//几何图形
appearance:new Cesium.MaterialAppearance({//图层组外观
material:Cesium.Material.fromType("Color",{
color:Cesium.Color.fromCssColorString(lightColor).withAlpha(1.0)
})
}),
});
}
if(primitive_gra&&primitiveLayer){
primitiveLayer.add(primitive_gra);
}
}
}
return primitive_gra;
}//e


/***********************获取影像图层(通过影像图层的“credit”属性)******************************
*更新时间:2020.01.07
*参数:imageryLayerArray(Array):imageryLayer数组，即ImageryLayerCollection实例
******layerId(string):imageryLayer的图层id
******wmsUrl(string):imageryLayer的url
******cql(string):imageryLayer的cql_Filter
*返回值:layer(ImageryLayer):影像图层实例
*注解:
*1.该方法有两种查询imageryLayer图层方法：
*	1)直接"layerId"查找，例如:"yn_zs:yn_zs4326"
*	2)如果"layerId"相同，则通过wmsUrl、cql进行查找
*2.如果使用该方法则imageryProvider.credit值必须为json字符串，否则使用不了
*/
myCesium.getImageryLayer_credit=function(imageryLayerArray,layerId,wmsUrl,cql){
let layer=null;
if(imageryLayerArray&&imageryLayerArray.length>0){
for(let i=0;i<imageryLayerArray.length;i++){
let imageryLayer=imageryLayerArray[i];
let layerCredit=imageryLayer.imageryProvider.credit?imageryLayer.imageryProvider.credit.html:"{}";
let layerAttr=JSON.parse(layerCredit);
let lyrId=layerAttr.layerId||"";
if(lyrId.match(":"))lyrId=lyrId.split(":")[1];
let url=layerAttr.wmsUrl||"";
let cqlFilter=layerAttr.cql||"";
if(layerId==lyrId){//1.通过图层id进行查找，忽略wmsUrl,cql查询条件
layer=imageryLayer;
break;
}
if(wmsUrl&&cql&&(url==wmsUrl)&&(cql=cqlFilter)){//2.如果wmsUrl,cql参数不为空，则通过wmsUrl,cql进行查找，忽略layerId查询条件
layer=imageryLayer;
break;
}
}
}
return layer;
}//e



/****************************封装动态创建entityLayer的方法(entity)*****************************
 *参数:mapLyrCollection(array):包含地图所有图层的数组 
 ******lyrObj(object):创建图层必须的图层信息对象，必须包含"layerName"、"layerId" 
 ******attr(object):存储图层额外的信息对象
 *返回值entityLyr(entity):返回创建的实体图层
 *注解:
 *1.图层信息对象包含的属性:
 lyrObj={
      layerName:"",
      layerId:"",
      enablePickFeatures:true
 };
 *2.该entity用于存储图层相关信息，不用于实际操作
 */   
myCesium.dynamicCreateEntityLayer=function(mapLyrCollection="",lyrObj,attr={}){
let entityLyr=null;
attr=attr||{};
if(lyrObj&&mapLyrCollection){
let title=lyrObj.layerName || "未命名";//图层标题
let lyrId=lyrObj.layerId || "";//图层id
let enablePickFeatures=lyrObj.enablePickFeatures==false?false:true;
//实体图层
entityLyr=new Cesium.Entity({
title:title,
layerName:title,
lyrNodeName:"",//图层节点名字
lyrNodeKey:"",//图层节点key
attr:attr,//图层相关信息对象，用于存储图层信息
layerIndex:"",//图层叠加index
layerId:lyrId,//图层id,*必须
layerType:"entityLayer",//图层要素集合类型,*必须 
enablePickFeatures:enablePickFeatures
});
mapLyrCollection.push(entityLyr);
}
return entityLyr;
}//e



/************************封装通过ul列表创建分层图例功能(checkbox，多类型数据，累积添加)**************************
*参数:legendDivId(string):图例div容器id
*****lyrInfo(object):图层对象,图层对象需要包含一些必须的字段,
*"layerName","layerId","childLegends","layerStyle","geoType"字段
*无返回值
*注解:
*1.每一个图层对象中需要包含"layerName","layerId","childLegends","layerStyle","geoType"字段，
*“layerId”和“layerStyle”不能为空，否则不能使用，
*例如:
var layerInfo={
    layerName:"",
    layerId:"",
    geoType:"",
    layerStatus:"true",
    childLegends:[],
    layerStyle:{}
}
*2.layerStyle对象中必须包括的字段:(包含的原点、点图标、线、面的全部样式属性)
*例如:layerStyle={
    color:color,//通用color 
    //1.圆点
    pointColor:"#EDCE18",
    pointSize:"10",
    //2.点图标
    ptIconURL:"",//点图标
    ptIconName:"",//点路径
    //3.线
    lineWidth:"2.0",
    lineColor:"#000000",
    lineStyle:"Color",
    //3.面
    fillColor: "#EDCE18",
    alphaValue:"1.0",
    fillStyle:"Color",
    borderWidth:"2.0",
    borderColor:"#000000",
    borderStyle:"Color", 
}
*3."fillColor"可以是十六进制颜色，rgab颜色，如果需要透明，则必须设置rgab格式的颜色
*/
myCesium.createLayerLegend_ul_fc=function(legendDivId,lyrInfo){
var lengend="";
if(!lyrInfo)return false;
var legend_title=document.getElementById("legend_title2");
if(legendDivId&&!legend_title){
document.getElementById(legendDivId).innerHTML="";
var lengend_ul="<div class='legendContainer2'>"+
"<ul class='legend_ul2' id='legend_ul2'>"+
"<li class='legend_ul_li2'>"+
"<div class='legend_title2' id='legend_title2'>图例</div>"+
"</li>"+
"</ul>"+
"</div>";
document.getElementById(legendDivId).innerHTML=lengend_ul;
}
var layername=lyrInfo.layerName || "未命名";//图层名字*
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var layerStatus=lyrInfo.layerStatus || "true";//图层状态，*必须，默认显示
var geoType=lyrInfo.geoType || "";
var childLegends=lyrInfo.childLegends||[];//子图例
if(legendDivId&&layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,lineColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
if(childLegends.length>0){
var chilid_li=createChildLi(childLegends);
if(chilid_li){
let status=layerStatus=="true"?"checked":"";
lengend=lengend+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2'>"+
"<input type='checkbox' "+status+" id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2 legend_xzStyle3' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>"+
"<li class='legend_ul_li2'>"+
"<ul class='legend_ul2' id='legend_ul3'>"+
chilid_li+
"</ul>"+
"</li>";
} 
}	
else{
let status=layerStatus=="true"?"checked":"";
lengend=lengend+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2'>"+
"<input type='checkbox' "+status+" id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>";
}
document.getElementById("legend_ul2").insertAdjacentHTML("beforeend",lengend);
}
}
function createChildLi(layerObjList){
var childe_li="";
if(layerObjList&&layerObjList.length>0){
for(let i=0;i<layerObjList.length;i++){
var lyrInfo=layerObjList[i];//图层信息对象
var layername=lyrInfo.layerName || "未命名";//图层名字
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var geoType=lyrInfo.geoType || "";
if(layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,lineColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
childe_li=childe_li+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2 legend_checkboxDiv3'>"+
"<input type='checkbox' checked id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2 legend_checkbox3'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>";
}
}   
}
} 
return childe_li;
}//e1
function drawIcon_line(canvasWidth,canvasHeight,color){
let iconImg=null;//base64格式图标
if(canvasWidth&&canvasHeight&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let lineLen=canvasWidth-2;
let lineH=canvasHeight/2;
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(1,lineH);//画笔的开始绘制的起点位置
ctx.lineTo(1+lineLen,lineH);//线段1的终点位置
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e2
function drawIcon_rect(canvasWidth,canvasHeight,fillColor,borderColor,borderWidth){
let iconImg=null;//base64格式图标
borderColor=borderColor || fillColor;
borderWidth=borderWidth||0;
if(canvasWidth&&canvasHeight&&fillColor){
let canvasDom=document.createElement("canvas");
if(borderWidth)canvasWidth+=borderWidth*2;canvasHeight+=borderWidth*2;
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let rectW=canvasWidth-2;
let rectH=canvasHeight-2;
ctx.beginPath();
ctx.fillStyle=fillColor;
ctx.fillRect(1, 1, rectW,rectH);
ctx.strokeStyle=borderColor;//线的颜色
ctx.lineWidth=borderWidth;//线宽度
if(borderWidth&&eval(borderWidth)>0)ctx.strokeRect(1, 1, rectW,rectH);
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
function drawIcon_circle(radius,color){
let iconImg=null;//base64格式图标
if(radius&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=2*radius+2;
canvasDom.height=2*radius+2;
let ctx=canvasDom.getContext("2d");
let x=parseInt(radius+1);
let y=parseInt(radius+1);
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.fillStyle=color;
ctx.lineWidth=2.0;
ctx.beginPath();
ctx.arc(x, y,radius,0,2*Math.PI);
ctx.fill();
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
}//e



/************************封装通过ul列表创建分层图例功能(无checkbox，多类型数据，累积添加)**************************
*参数:legendDivId(string):图例div容器id
*****lyrInfo(object):图层对象,图层对象需要包含一些必须的字段,
*"layerName","layerId","childLegends","layerStyle","geoType"字段
*无返回值
*注解:
*1.每一个图层对象中需要包含"layerName","layerId","childLegends","layerStyle","geoType"字段，
*“layerId”和“layerStyle”不能为空，否则不能使用，
*例如:
var layerInfo={
    layerName:"",
    layerId:"",
    geoType:"",
    layerStatus:"true",
    childLegends:[],
    layerStyle:{}
}
*2.layerStyle对象中必须包括的字段:(包含的原点、点图标、线、面的全部样式属性)
*例如:layerStyle={
    color:color,//通用color 
    //1.圆点
    pointColor:"#EDCE18",
    pointSize:"10",
    //2.点图标
    ptIconURL:"",//点图标
    ptIconName:"",//点路径
    //3.线
    lineWidth:"2.0",
    lineColor:"#000000",
    lineStyle:"Color",
    //3.面
    fillColor: "#EDCE18",
    alphaValue:"1.0",
    fillStyle:"Color",
    borderWidth:"2.0",
    borderColor:"#000000",
    borderStyle:"Color", 
}
*3."fillColor"可以是十六进制颜色，rgab颜色，如果需要透明，则必须设置rgab格式的颜色
*/
myCesium.createLayerLegend_ul_fc_no=function(legendDivId,lyrInfo){
var lengend="";
if(!lyrInfo)return false;
var legend_title=document.getElementById("legend_title2");
if(legendDivId&&!legend_title){
document.getElementById(legendDivId).innerHTML="";
var lengend_ul="<div class='legendContainer2 legendContainer_fc_no'>"+
"<ul class='legend_ul2' id='legend_ul2'>"+
"<li class='legend_ul_li2'>"+
"<div class='legend_title2' id='legend_title2'>图例</div>"+
"</li>"+
"</ul>"+
"</div>";
document.getElementById(legendDivId).innerHTML=lengend_ul;
}
var layername=lyrInfo.layerName || "未命名";//图层名字*
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var layerStatus=lyrInfo.layerStatus || "true";//图层状态，*必须，默认显示
var geoType=lyrInfo.geoType || "";
var childLegends=lyrInfo.childLegends||[];//子图例
if(legendDivId&&layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,lineColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
if(childLegends.length>0){
var chilid_li=createChildLi(childLegends);
if(chilid_li){//子图例
let status=layerStatus=="true"?"checked":"";
lengend=lengend+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2'>"+
"<input type='checkbox' "+status+" id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2 legend_xzStyle3' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span class='legend_text2_span'>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>"+
"<li class='legend_ul_li2'>"+
"<ul class='legend_ul2' id='legend_ul3'>"+
chilid_li+
"</ul>"+
"</li>";
} 
}	
else{//常规图例
let status=layerStatus=="true"?"checked":"";
lengend=lengend+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2'>"+
"<input type='checkbox' "+status+" id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span class='legend_text2_span'>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>";
}
document.getElementById("legend_ul2").insertAdjacentHTML("beforeend",lengend);
}
}
function createChildLi(layerObjList){
var childe_li="";
if(layerObjList&&layerObjList.length>0){
for(let i=0;i<layerObjList.length;i++){
var lyrInfo=layerObjList[i];//图层信息对象
var layername=lyrInfo.layerName || "未命名";//图层名字
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var geoType=lyrInfo.geoType || "";
if(layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,lineColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
childe_li=childe_li+"<li class='legend_ul_li2'>"+
"<div class='legend_li_a2'>"+
"<div class='legend_checkboxDiv2 legend_checkboxDiv3'>"+
"<input type='checkbox' checked id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox2 legend_checkbox3'/>"+
"</div>"+
"<div class='legend_text2'>"+
"<a href='javascript:void(0)' class='legend_xzStyle2' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img2' src='"+legendIcon+"'/>"+
"</a>"+
"<span class='legend_text2_span'>"+layername+"</span>"+
"</div>"+
"</div>"+
"</li>";
}
}   
}
} 
return childe_li;
}//e1
function drawIcon_line(canvasWidth,canvasHeight,color){
let iconImg=null;//base64格式图标
if(canvasWidth&&canvasHeight&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let lineLen=canvasWidth-2;
let lineH=canvasHeight/2;
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(1,lineH);//画笔的开始绘制的起点位置
ctx.lineTo(1+lineLen,lineH);//线段1的终点位置
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e2
function drawIcon_rect(canvasWidth,canvasHeight,fillColor,borderColor,borderWidth){
let iconImg=null;//base64格式图标
borderColor=borderColor || fillColor;
borderWidth=borderWidth||0;
if(canvasWidth&&canvasHeight&&fillColor){
let canvasDom=document.createElement("canvas");
if(borderWidth)canvasWidth+=borderWidth*2;canvasHeight+=borderWidth*2;
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let rectW=canvasWidth-2;
let rectH=canvasHeight-2;
ctx.beginPath();
ctx.fillStyle=fillColor;
ctx.fillRect(1, 1, rectW,rectH);
ctx.strokeStyle=borderColor;//线的颜色
ctx.lineWidth=borderWidth;//线宽度
if(borderWidth&&eval(borderWidth)>0)ctx.strokeRect(1, 1, rectW,rectH);
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
function drawIcon_circle(radius,color){
let iconImg=null;//base64格式图标
if(radius&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=2*radius+2;
canvasDom.height=2*radius+2;
let ctx=canvasDom.getContext("2d");
let x=parseInt(radius+1);
let y=parseInt(radius+1);
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.fillStyle=color;
ctx.lineWidth=2.0;
ctx.beginPath();
ctx.arc(x, y,radius,0,2*Math.PI);
ctx.fill();
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
}//e



/************************封装通过ul列表创建图例功能(checkbox，累积添加)**************************
*参数:legendDivId(string):图例div容器id
*****lyrInfo(arrary):图层对象,图层对象需要包含一些必须的字段
*无返回值
*注解:
*1.每一个图层对象中需要包含"layerName","layerId","layerStyle","geoType"字段，
*“layerId”和“layerStyle”不能为空，否则不能使用，例如:{layerName:"",layerId:"",layerStyle:{},geoType:""}
*2.layerStyle对象中必须包括 "imgURL","color","borderWidth","borderColor","fillColor"字段
*3."fillColor"可以是十六进制颜色，rgab颜色，如果需要透明，则必须设置rgab格式的颜色
*/
myCesium.createLayerLegend_ul2=function(legendDivId,lyrInfo){
var lengend="";
if(!lyrInfo)return false;
var legend_title=document.getElementById("legend_title");
if(legendDivId&&!legend_title){
document.getElementById(legendDivId).innerHTML="";
var lengend_ul="<div class='legendContainer'>"+
"<ul class='legend_ul' id='legend_ul'>"+
"<li class='legend_ul_li'>"+
"<div class='legend_title' id='legend_title'>图例</div>"+
"</li>"+
"</ul>"+
"</div>";
document.getElementById(legendDivId).innerHTML=lengend_ul;
}
var layername=lyrInfo.layerName || "未命名";//图层名字
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var geoType=lyrInfo.geoType || "";
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStatus=lyrInfo.layerStatus || "true";//图层状态，*必须，默认显示
if(legendDivId&&layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,color); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,borderColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);	
}
if(legendIcon){
lengend=lengend+"<li class='legend_ul_li'>"+
"<div class='legend_li_a'>"+
"<div class='legend_text'>"+
"<a href='javascript:void(0)' class='legend_xzStyle' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img' src='"+legendIcon+"'/>"+
"</a>"+
"<span>"+layername+"</span>"+
"</div>"+
"<div class='legend_checkboxDiv'>"+
"<input type='checkbox' checked id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox'/>"+
"</div>"+
"</div>"+
"</li>";
document.getElementById("legend_ul").insertAdjacentHTML("beforeend",lengend);
}
}
function drawIcon_circle(radius,color){
let iconImg=null;//base64格式图标
if(radius&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=2*radius+2;
canvasDom.height=2*radius+2;
let ctx=canvasDom.getContext("2d");
let x=parseInt(radius+1);
let y=parseInt(radius+1);
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.fillStyle=color;
ctx.lineWidth=2.0;
ctx.beginPath();
ctx.arc(x, y,radius,0,2*Math.PI);
ctx.fill();
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
function drawIcon_line(canvasWidth,canvasHeight,color){
let iconImg=null;//base64格式图标
if(canvasWidth&&canvasHeight&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let lineLen=canvasWidth-2;
let lineH=canvasHeight/2;
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(1,lineH);//画笔的开始绘制的起点位置
ctx.lineTo(1+lineLen,lineH);//线段1的终点位置
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e2
function drawIcon_rect(canvasWidth,canvasHeight,fillColor,borderColor,borderWidth){
let iconImg=null;//base64格式图标
borderColor=borderColor || fillColor;
borderWidth=borderWidth||0;
if(canvasWidth&&canvasHeight&&fillColor){
let canvasDom=document.createElement("canvas");
if(borderWidth)canvasWidth+=borderWidth*2;canvasHeight+=borderWidth*2;
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let rectW=canvasWidth-2;
let rectH=canvasHeight-2;
ctx.beginPath();
ctx.fillStyle=fillColor;
ctx.fillRect(1, 1, rectW,rectH);
ctx.strokeStyle=borderColor;//线的颜色
ctx.lineWidth=borderWidth;//线宽度
if(borderWidth&&eval(borderWidth)>0)ctx.strokeRect(1, 1, rectW,rectH);
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e1
}//e


/************************封装通过ul列表创建图例功能(no checkbox，累积添加,点击标题控制图层)**************************
*更新时间:2021.03.20 wxt
*参数:legendDivId(string):图例div容器id
*****lyrInfo(arrary):图层对象,图层对象需要包含一些必须的字段
*****callback(function):创建图例后进行回调
*无返回值
*注解:
*1.每一个图层对象中需要包含"layerName","layerId","layerStyle","geoType"字段，
*“layerId”和“layerStyle”不能为空，否则不能使用，
*例如:
var lyrInfo={
    layerName:"",
    layerId:"",
    geoType:"",
    layerStyle:{}
}
*2.layerStyle对象中必须包括的字段:(包含的原点、点图标、线、面的全部样式属性)
*例如:
var layerStyle={
    color:color,//通用color 
    //1.圆点
    pointColor:"#EDCE18",
    pointSize:"10",
    //2.点图标
    ptIconURL:"",//点图标
    ptIconName:"",//点路径
    //3.线
    lineWidth:"2.0",
    lineColor:"#000000",
    lineStyle:"Color",
    //3.面
    fillColor: "#EDCE18",
    alphaValue:"1.0",
    fillStyle:"Color",
    borderWidth:"2.0",
    borderColor:"#000000",
    borderStyle:"Color", 
}
*3."fillColor"可以是十六进制颜色，rgab颜色，如果需要透明，则必须设置rgab格式的颜色
*4.支持多图例
*/
myCesium.createLayerLegend_ul3=function(legendDivId,lyrInfo,callback){
var lengend="";
if(!lyrInfo)return false;
let titleId=legendDivId+"_title";
let legend_ulId=titleId+"_ul";
var legend_title=document.getElementById(titleId);
if(legendDivId&&!legend_title){
document.getElementById(legendDivId).innerHTML="";
var lengend_ul="<div class='legendContainer'>"+
"<ul class='legend_ul5' id='"+legend_ulId+"'>"+
"<li class='legend_ul_li5'>"+
"<div class='legend_title5' id='"+titleId+"'>图例</div>"+
"</li>"+
"</ul>"+
"</div>";
document.getElementById(legendDivId).innerHTML=lengend_ul;
}
var layername=lyrInfo.layerName || "未命名";//图层名字*
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var layerStatus=lyrInfo.layerStatus;//图层状态*
var geoType=lyrInfo.geoType || "";
if(legendDivId&&layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var icoPath=layerStyle.icoPath || "";//base64"
var imgURL=layerStyle.ptIconURL || icoPath;//./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,lineColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
var status=layerStatus==false?"closeLyrStyle":"";//图例状态
var li_layerId="layer_"+layerid;
lengend=lengend+"<li class='legend_ul_li5 "+li_layerId+"'>"+
"<div class='legend_li_a5'>"+
"<a href='javascript:void(0)' class='legend_xzStyle5' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img5' src='"+legendIcon+"'/>"+
"</a>"+
"<div class='legend_text5'>"+
"<a href='javascript:void(0)' class='legend_xzText5 "+status+"' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<span class='legend_name5'>"+layername+"</span>"+
"</a>"+
"</div>"+
"</div>"+
"</li>";
document.getElementById(legend_ulId).insertAdjacentHTML("beforeend",lengend);
if(callback)callback();//回调函数
}
}
function drawIcon_circle(radius,color){
let iconImg=null;//base64格式图标
if(radius&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=2*radius+2;
canvasDom.height=2*radius+2;
let ctx=canvasDom.getContext("2d");
let x=parseInt(radius+1);
let y=parseInt(radius+1);
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.fillStyle=color;
ctx.lineWidth=2.0;
ctx.beginPath();
ctx.arc(x, y,radius,0,2*Math.PI);
ctx.fill();
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
function drawIcon_line(canvasWidth,canvasHeight,color){
let iconImg=null;//base64格式图标
if(canvasWidth&&canvasHeight&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let lineLen=canvasWidth-2;
let lineH=canvasHeight/2;
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(1,lineH);//画笔的开始绘制的起点位置
ctx.lineTo(1+lineLen,lineH);//线段1的终点位置
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e2
function drawIcon_rect(canvasWidth,canvasHeight,fillColor,borderColor,borderWidth){
let iconImg=null;//base64格式图标
borderColor=borderColor || fillColor;
borderWidth=borderWidth||0;
if(canvasWidth&&canvasHeight&&fillColor){
let canvasDom=document.createElement("canvas");
if(borderWidth)canvasWidth+=borderWidth*2;canvasHeight+=borderWidth*2;
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let rectW=canvasWidth-2;
let rectH=canvasHeight-2;
ctx.beginPath();
ctx.fillStyle=fillColor;
ctx.fillRect(1, 1, rectW,rectH);
ctx.strokeStyle=borderColor;//线的颜色
ctx.lineWidth=borderWidth;//线宽度
if(borderWidth&&eval(borderWidth)>0)ctx.strokeRect(1, 1, rectW,rectH);
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e1
}//e



/************************封装通过ul列表创建图例功能(checkbox,一次全部添加)**************************
*更新时间:2020.06.09
*参数:legendDivId(string):图例div容器id
*****layerObjList(arrary):图层对象数组,每一个图层对象需要包含一些必须的字段
*无返回值
*注解:
*1.每一个图层对象中需要包含"layerName","layerId","layerStyle","geoType"字段，
*“layerId”和“layerStyle”不能为空，否则不能使用，例如:{layerName:"",layerId:"",layerStyle:{},geoType:""}
*2.layerStyle对象中必须包括 "imgURL","color","borderWidth","borderColor","fillColor"字段
*3."fillColor"可以是十六进制颜色，rgab颜色，如果需要透明，则必须设置rgab格式的颜色
*/
myCesium.createLayerLegend_ul=function(legendDivId,layerObjList){
if(legendDivId&&layerObjList&&layerObjList.length>0){
let lengend_title="<div class='legendContainer'>"+
"<ul class='legend_ul' id='legend_ul'>"+
"<li class='legend_ul_li'>"+
"<div class='legend_title' id='legend_title'>图例</div>"+
"</li>"+
"</ul>"+
"</div>";
document.getElementById(legendDivId).innerHTML=lengend_title;
let lengend="";
for(let i=0;i<layerObjList.length;i++){
var lyrInfo=layerObjList[i];//图层信息对象
var layername=lyrInfo.layerName || "未命名";//图层名字
var layerid=lyrInfo.layerId || "";//图层id,*必须
var layerStyle=lyrInfo.layerStyle || "";//图层样式,*必须
var geoType=lyrInfo.geoType || "";
var layerType=lyrInfo.layerType || "";//图层类型,*必须，可以为空
var layerStatus=lyrInfo.layerStatus || "true";//图层状态，*必须，默认显示
if(layerid&&layerStyle){
//样式属性
var color=layerStyle.color || "#000000";//公共color,默认为黑色
//1.圆点
var pointColor=layerStyle.pointColor || color;
var pointSize=layerStyle.pointSize || 10.0;
//2.点图标
var imgURL=layerStyle.ptIconURL || "";//base64
var icoPath=layerStyle.icoPath || "";//"./imgs/icon.png"
//3.线
var lineWidth=layerStyle.lineWidth || 2.0;
var lineColor=layerStyle.lineColor || color;
var lineStyle=layerStyle.lineStyle || "Color";
//3.面
var fillColor=layerStyle.fillColor || color;
var alphaValue=(!layerStyle.alphaValue&&(eval(layerStyle.alphaValue)!=0))?1.0:layerStyle.alphaValue;//面填充透明度
var fillStyle=layerStyle.fillStyle || "Color";
var borderWidth=layerStyle.borderWidth || 2.0;
var borderColor=layerStyle.borderColor || fillColor;
var borderStyle=layerStyle.borderStyle || "Color";
var lyrInfo={//绑定额外信息到html元素
layerName:layername,
layerId:layerid,
layerType:layerType,
styleType:geoType,
color:color,
pointColor:pointColor,
pointSize:pointSize,
ptIconURL:imgURL,
icoPath:icoPath,
lineWidth:lineWidth,
lineColor:lineColor,
lineStyle:lineStyle,
fillColor:fillColor,
alphaValue:alphaValue,
fillStyle:fillStyle,
borderWidth:borderWidth,
borderColor:borderColor,
borderStyle:borderStyle
};
lyrInfo=JSON.stringify(lyrInfo);
var legendIcon=null;//图例图标
if(!geoType){
if(imgURL){//点样式
geoType="Point";
}
else if(borderColor&&!fillColor){
geoType="LineString";
}
else if(fillColor){//面样式
geoType="Polygon";
}
}
if(geoType=="Point"){//点样式
if(imgURL){
legendIcon=imgURL; 
}
else{
legendIcon=drawIcon_circle(6,pointColor); 
}
}
else if(geoType=="LineString"){//线样式
legendIcon=drawIcon_line(12,10,borderColor);
}
else if(geoType=="Polygon"){//面样式
fillColor=myCesium.hexColorToRgbaColor(fillColor,alphaValue);
borderColor=myCesium.hexColorToRgbaColor(borderColor,1.0);
legendIcon=drawIcon_rect(12,10,fillColor,borderColor,borderWidth);
}
if(legendIcon){
lengend=lengend+"<li class='legend_ul_li'>"+
"<div class='legend_li_a'>"+
"<div class='legend_text'>"+
"<a href='javascript:void(0)' class='legend_xzStyle' id='"+layerid+"' name='"+lyrInfo+"'>"+
"<img class='legend_img' src='"+legendIcon+"'/>"+
"</a>"+
"<span>"+layername+"</span>"+
"</div>"+
"<div class='legend_checkboxDiv'>"+
"<input type='checkbox' checked id='"+layerid+"' name='"+lyrInfo+"' class='legend_checkbox'/>"+
"</div>"+
"</div>"+
"</li>";
}
}   
}
document.getElementById("legend_ul").insertAdjacentHTML("beforeend",lengend);
}
function drawIcon_circle(radius,color){
let iconImg=null;//base64格式图标
if(radius&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=2*radius+2;
canvasDom.height=2*radius+2;
let ctx=canvasDom.getContext("2d");
let x=parseInt(radius+1);
let y=parseInt(radius+1);
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.fillStyle=color;
ctx.lineWidth=2.0;
ctx.beginPath();
ctx.arc(x, y,radius,0,2*Math.PI);
ctx.fill();
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e3
function drawIcon_line(canvasWidth,canvasHeight,color){
let iconImg=null;//base64格式图标
if(canvasWidth&&canvasHeight&&color){
let canvasDom=document.createElement("canvas");
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let lineLen=canvasWidth-2;
let lineH=canvasHeight/2;
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=color;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(1,lineH);//画笔的开始绘制的起点位置
ctx.lineTo(1+lineLen,lineH);//线段1的终点位置
ctx.stroke();
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e2
function drawIcon_rect(canvasWidth,canvasHeight,fillColor,borderColor,borderWidth){
let iconImg=null;//base64格式图标
borderColor=borderColor || fillColor;
borderWidth=borderWidth||0;
if(canvasWidth&&canvasHeight&&fillColor){
let canvasDom=document.createElement("canvas");
if(borderWidth)canvasWidth+=borderWidth*2;canvasHeight+=borderWidth*2;
canvasDom.width=canvasWidth;
canvasDom.height=canvasHeight;
let ctx=canvasDom.getContext("2d");
let rectW=canvasWidth-2;
let rectH=canvasHeight-2;
ctx.beginPath();
ctx.fillStyle=fillColor;
ctx.fillRect(1, 1, rectW,rectH);
ctx.strokeStyle=borderColor;//线的颜色
ctx.lineWidth=borderWidth;//线宽度
if(borderWidth&&eval(borderWidth)>0)ctx.strokeRect(1, 1, rectW,rectH);
iconImg=canvasDom.toDataURL();
}
return iconImg;
}//e1
}//e


/*************************通过实体数组进行地图定位***************************
 *参数:viewer(Viewer):地图viewer实例
 *****entityArray(Array):用于定位的实体数组
 *****[dwLayer(entityLayer)]:用于存放定位实体的图层
 *****[isSaveDwEntity(string)]:是否保留用于定位的实体，默认"false",定位后，清除定位实体
 *无返回值
 *注解:如果定位实体不保留的话，只能定位一次，如果保留实体定位的话，可以重复定位
 */
myCesium.dwByEntityArray=function(viewer,entityArray,dwLayer="",isSaveDwEntity="false"){
if(viewer&&entityArray&&entityArray.length>0){
//定位实体方位，视角垂直向下
let Orientation=new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0),Cesium.Math.toRadians(-90),Cesium.Math.toRadians(0));	
viewer.zoomTo(entityArray,Orientation).then(function(){
window.setTimeout(function(){//必须有定时，否则报错
if(isSaveDwEntity=="false"){
if(dwLayer)dwLayer.show=false;
clearEntityLayer(viewer,dwLayer);//清空图层
entityArray.forEach(function(entity){
if(viewer.entities.contains(entity)){
viewer.entities.remove(entity);
}
});
if(dwLayer)dwLayer.show=true;
entityArray=[];
}
},100);
});
}	
function clearEntityLayer(viewer="",entityLayer=""){
if(viewer&&entityLayer){
var gras=entityLayer._children;//该图层的所有实体数组
if(gras){
gras.forEach(function(item){
if(viewer.entities.contains(item)){
viewer.entities.remove(item);
let idx=gras.indexOf(item);
gras.splice(idx,1);
}
});
}
}
}//e1
}//e	


/*****************封装清空指定entityLayer的方法(遍历各个移除)****************
 *参数:viewer(Viewer):地图Viewer实例
 ******entityLayer(Entity):entityLayer图层
 *无返回值
 */
myCesium.clearEntityLayer=function(viewer="",entityLayer=""){
if(viewer&&entityLayer){
var gras=entityLayer._children;//该图层的所有实体数组
if(gras){
gras.forEach(function(item){
if(viewer.entities.contains(item)){
viewer.entities.remove(item);
let idx=gras.indexOf(item);
gras.splice(idx,1);
}
});
}
}
}//e


/********************清空指定entityLayer图层中所有实体(removeAll()方式)******************
*参数:mapAllLyr(geojson):地图包含的所有的图层(dataSource图层和entityLayer图层)
*****entityLayer(Entity):将要被清空entity实体图层
*无返回值 
*注解:只能清空“entityLayer”图层，不能清空“dataSource”图层
*/
myCesium.clearEntityLayer_all=function(viewer,mapAllLyr,entityLayer){
if(viewer&&mapAllLyr&&entityLayer&&entityLayer._children&&entityLayer._children.length>0){
viewer.entities.removeAll();//清空所有要素
entityLayer._children=[];
window.setTimeout(addOtherEntity,100);
}
function addOtherEntity(){//添加其他实体
let removedLyrId=entityLayer.lyrId || "";//被移除的图层id
if(!removedLyrId)removedLyrId=removedLyrId.id || "";
for(let i=0;i<mapAllLyr.length;i++){
let layer=mapAllLyr[i];//图层
let lyrId=layer.lyrId || "";//图层id
let layerType=layer.lyrType || "";//图层类型
if(layerType=="entityLayer"){
if(!lyrId)lyrId=layer.id || "";
if(removedLyrId&&lyrId&&(removedLyrId!=lyrId)){//重新添加其他实体
let entityFeats=layer._children;//该图层的所有实体
entityFeats.forEach(function(entityItem){
viewer.entities.add(entityItem);
});
}
}
}	
}
}//e


/****************************获取选中多个实体中的最上面的实体*******************************
 *参数:entityArray(Array):选中的多个实体数组，从中选取对顶层的实体
 *****mapAllLyr(Array):包含地图所有的图层数组，包含“entityLayer”图层，“dataSource”图层
 *注解:
 *1.使用该方法时图层数组中的每一个图层必须包含“layerId”和“lyrIndex”属性，否则使用不了
 *2.每一个实体要素必须包含“geoType”属性，否则可能使用不了
 *3.拾取情况:
 *	1)不同图层下的要素拾取顶级实体(通过图层index比较)
 *	2)相同图层下的要素拾取顶级实体(point>xian>mian进行比较)
 *	3)地图实体没有关联图层下的要素拾取顶级实体(point>xian>mian进行比较)
 */
myCesium.getTopEntityFeat=function(entityArray,mapAllLyr){
let topEntity=entityArray[entityArray.length-1];//默认是数组最后一个实体
let topIdx=-1;
let topEntityType=topEntity.id?topEntity.id.geoType:"other";//顶级实体几何类型
let geoLevel={"Point":3,"LineString":2,"Polygon":1,"other":0};//几何类型级别
if(mapAllLyr&&entityArray&&entityArray.length>0){
for(let i=0;i<entityArray.length;i++){
let entityFeat=entityArray[i];//entity实体对象
if(entityFeat.id)entityFeat=entityFeat.id;
let lyrId=entityFeat.layerId || "";//实体关联的图层id
let entityLyr=myCesium.getEntityInfoByLyrId(mapAllLyr,lyrId);//实体关联的图层
if(entityLyr&&entityLyr.entityInfo){
let lyrIdx=entityLyr.entityInfo.lyrIndex;
if(lyrIdx&&lyrIdx>topIdx){//不同图层下拾取顶级实体
topEntity=entityArray[i];
topIdx=lyrIdx;
topEntityType=entityFeat.geoType || "other";
}
else if(lyrIdx&&lyrIdx==topIdx){//相同图层下拾取顶级实体
let entityType=entityFeat.geoType || "other";
if(geoLevel[entityType]>geoLevel[topEntityType]){
topEntity=entityArray[i];
topIdx=lyrIdx;	
topEntityType=entityFeat.geoType || "other";
}
}
}
else{
let entityType2=entityFeat.geoType || "other";
if(geoLevel[entityType2]>geoLevel[topEntityType]){
topEntity=entityArray[i];
topEntityType=entityFeat.geoType || "other";	
}
}
}
}
return topEntity;
}//e


/*****封装通过entity Id(或者属性“globalId”字段)在地图和图层中移除指定实体(地图会移除实体)********
 *参数:viewer(Viewer):地图实例viewer
 *****globalId(string):globalId(string):将要移除的实体id
 *****[type(string)]:移除指定实体的方式，可选值:"id","attr"
 *****1.通过entity.id进行移除2.通过属性中“globalId”字段进行移除，默认"id"方式
 *无返回值
 *注解:如果type值为"id",则只会移除一个实体，如果type值为"attr",可以回移除多个“globalId”值相同的实体
 *因为：entity id是唯一的，“globalId”字段值可能不是唯一的
 */
myCesium.removeEntityFromlyr=function(viewer,lyr,globalId="",type="id"){
if(viewer&&lyr&&globalId){
let entityArray=getAllEntityFromLyr(lyr);
for(let i=0;i<entityArray.length;i++){
let entity=entityArray[i];
let entityId=entity.id||"";//实体id
let attrId=entity.properties.globalId ?entity.properties.globalId._value : "";//属性Id
let uid=null;//进行比较的id
if(type=="attr"){
uid=attrId;//属性中的“globalId”字段
}
else{
uid=entityId;//实体的id
}
if(globalId==uid){
if(viewer.entities.contains(entity)){//地图移除实体
viewer.entities.remove(entity);	
}
let idx=entityArray.indexOf(entity);//图层移除实体
entityArray.splice(idx,1);
}
}
}
function getAllEntityFromLyr(entityLyr=""){
let entiyArray=[];
if(entityLyr){
let lyrType=entityLyr.lyrType || "";//图层类型
if(lyrType=="dataSource"){
entiyArray=entityLyr.values;//图层要素 
}
else if(lyrType=="entityLayer"){
entiyArray=entityLyr._children;//图层要素
}
else if(entityLyr.values){
entiyArray=entityLyr.values;//图层要素 
}
else if(entityLyr._children){
entiyArray=entityLyr._children;//图层要素
}
}
return entiyArray;
}//e1
}//e


/********封装在实体数组中，通过entity Id(属性“globalId”字段)移除指定实体(地图不会移除实体)*******
 *参数:entityArray(Array):包含实体的数组
 *****globalId(string):globalId(string):将要移除的实体id
 *****[type(string)]:移除指定实体的方式，可选值:"id","attr"
 *****1.通过entity.id进行移除2.通过属性中“globalId”字段进行移除，默认"id"方式
 *无返回值
 *注解:如果type值为"id",则只会移除一个实体，如果type值为"attr",可以回移除多个“globalId”值相同的实体
 *因为：entity id是唯一的，“globalId”字段值可能不是唯一的
 */
myCesium.removeEntityFromArray=function(entityArray,globalId="",type="id"){
if(entityArray&&entityArray.length>0&&globalId){
for(let i=0;i<entityArray.length;i++){
let entity=entityArray[i];
let entityId=entity.id||"";//实体id
let attrId=entity.properties.globalId ?entity.properties.globalId._value : "";//属性Id
let uid=null;//进行比较的id
if(type=="attr"){
uid=attrId;//属性中的“globalId”字段
}
else{
uid=entityId;//实体的id
}
if(globalId==uid){
let idx=entityArray.indexOf(entity);
entityArray.splice(idx,1);
}
}
}
}//e	

/*********************封装获取图层中的所有要素(包括cesium多种图层类型)*******************
 *参数:entityLyr(object):实体图层，可以是“dataSource”图层和“entityLayer”图层
 *返回值:object(object):包含"layerType"、"data"字段的对象
 *注解:
 *1.如果使用该方法，实体图层中必须包含“lyrType”属性，否则使用不了
 *2.cesiumLayer图层类型可以为"dataSourceLayer"、"entityLayer"
 *3.object={
 	layerType:"",//图层类型
 	data:[]//图层包含的要素数组
 *};
 */
myCesium.getAllFeatFromlayer=function(cesiumLayer=""){
let entiyArray=null;
let data=[];
let layerType="";
if(cesiumLayer instanceof Cesium.CustomDataSource){//“dataSourceLayer”
layerType="dataSourceLayer";
data=cesiumLayer.entities.values;
}else if(cesiumLayer instanceof Cesium.Entity){//“entityLayer”
layerType="entityLayer";
data=cesiumLayer._children;//图层要素	
}
return {
layerType:layerType,
data:data
};
}//e




/*******************封装获取指定实体的cartesian3格式数组坐标*****************
 *参数:entityFeat(entity):实体要素，可以为点、线、面实体
 *返回值object(返回值object):包含geoType和geoCoords属性的对象
 *注解:geoCoords的坐标格式为cartesian3数组,例如：
 *1.如何点实体则返回格式为:[{x:"",y:"",z:""}],线、面格式为：[{x:"",y:"",z:""},{x:"",y:"",z:""}]
 *2.返回的对象格式为:
 *var result={
 *	type:"",
 *	coordinates:""  
 *};
 *3.待完善
 */
myCesium.getCar3CoordsFromEntity=function(entityFeat=""){
let geoType="";
let geoCoords="";
if(entityFeat){
let dotGra=entityFeat.point || "";//圆点
let picGra=entityFeat.billboard || "";//点图标
let polylineGra=entityFeat.polyline || "";//线
let polygonGra=entityFeat.polygon || "";//面
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){
geoType="Point";
if(entityFeat.position instanceof Cesium.ConstantPositionProperty){//固定位置属性
geoCoords=[entityFeat.position._value];	
}
}
else if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点类型
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线类型
geoType="LineString";
geoCoords=entityFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!dotGra&&!picGra&&polylineGra&&polygonGra){//面类型
geoType="Polygon";
geoCoords=entityFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组,geoserver发布的服务
if(!geoCoords)geoCoords=entityFeat.polygon.hierarchy.getValue();//自己添加的空间对象  
}   
}
return {
type:geoType,
coordinates:geoCoords  
};
}//e


/*******************封装获取实体的常规格式的WGS84坐标*****************
 *参数:entityFeat(entity):实体要素，可以为点、线、面实体
 *返回值object(返回值object):包含type和coordinates属性的对象
 *注解:
 *1.coordinates的坐标格式为常规坐标,例如：
 *	1)点:[lon,lat] 
 *	2)线:[[lon,lat],[lon,lat]] 
 *	3)面:[[lon,lat],[lon,lat]]
 *2.返回的对象格式为:
 *object={
 *	type:"",
 *	coordinates:""  
 *};
 *3.待完善
 */
myCesium.getWGS84CoordsFromEntity=function(entityFeat=""){
let geoType="";
let geoCoords="";
if(entityFeat){
let dotGra=entityFeat.point || "";//圆点
let picGra=entityFeat.billboard || "";//点图标
let polylineGra=entityFeat.polyline || "";//线
let polygonGra=entityFeat.polygon || "";//面	
if(dotGra&&!picGra&&!polylineGra&&!polygonGra){//圆点
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&picGra&&!polylineGra&&!polygonGra){//点类型
geoType="Point";
geoCoords=[entityFeat.position._value];
}
else if(!dotGra&&!picGra&&polylineGra&&!polygonGra){//线类型
geoType="LineString";
geoCoords=entityFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!dotGra&&!picGra&&polylineGra&&polygonGra){//面类型
geoType="Polygon";
geoCoords=entityFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组,geoserver发布的服务
if(!geoCoords)geoCoords=entityFeat.polygon.hierarchy.getValue();//自己添加的空间对象  
}	
if(geoCoords){
geoCoords=cartesian3sToWGS84s(geoCoords);
}		
}
return {
type:geoType,
coordinates:geoCoords  
};
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}
}//e1
}//e



/*******************封装在PrimitiveCollection图层中根据指定id获取primitive要素*****************
 *参数:primitiveLyr(Viewer):地图的Viewer实例
 *****globalId(string):需要查询的Primitive id值
 *返回值primitiveFeat(primitive):primitive要素
 */
myCesium.getPrimitiveById=function(primitiveLyr="",globalId=""){
let primitiveFeat=null;
if(primitiveLyr&&globalId){
for(let i=0;i<primitiveLyr._primitives.length;i++){
let primitive=primitiveLyr._primitives[i];
let geometryInstance=null;
if(primitive.geometryInstances){
geometryInstance=primitive.geometryInstances[0];
}
else{
geometryInstance=primitive._primitiveOptions.geometryInstances[0];
}
let geoId=geometryInstance.id? geometryInstance.id : "";
if(globalId==geoId){
primitiveFeat=primitive;
break;
}
}
}
return primitiveFeat;
}//e


/**********************封装悬空高亮选中的实体要素(仅高亮边界)*******************
 *参数:primitiveLayer(PrimitiveCollection):PrimitiveCollection图层实例对象
 *****selectFeat(entity):选中的实体要素
 *****isClearLyr(String):每次调用该方法是否清除高亮图层,默认是清除图层
 *无返回值
 */
myCesium.lightFeat_hover_pri=function(primitiveLayer="",selectFeat="",isClearLyr=true){
if(primitiveLayer&&selectFeat){
if(isClearLyr){
primitiveLayer.removeAll();
}
let picGra=selectFeat.billboard || "";//点图标
let polylineGra=selectFeat.polyline || "";//线
let polygonGra=selectFeat.polygon || "";//面
let geoType="";
let geoCoords="";
if(picGra&&!polylineGra&&!polygonGra){//点类型
geoType="point";
selectFeat.billboard.scale=1.2;
}
else if(!picGra&&polylineGra&&!polygonGra){//线类型
geoType="polyline";
geoCoords=selectFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!picGra&&polylineGra&&polygonGra){//面类型
geoType="polygon";
geoCoords=selectFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组
}
let attr=selectFeat.properties || {};//要素属性
let primitive_gra="";//图元几何
if(geoCoords&&geoCoords.length>0){
if(geoType=="point"){//点

}
else if(geoType=="polyline"){//线
let lineGeo=new Cesium.GroundPolylineGeometry({//贴地线几何
positions:geoCoords,
width:3,
});
let line_geoInstance=new Cesium.GeometryInstance({
title:"高亮线图形",
geometry:lineGeo
}) 
//贴地线图形组
primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:line_geoInstance,//几何图形
appearance:new Cesium.PolylineMaterialAppearance({
material:Cesium.Material.fromType("Color",{
color:new Cesium.Color(0.0, 1.0, 1.0, 1.0)
})
}),
});
}
else{//面
//线几何
let linegeo=new Cesium.GroundPolylineGeometry({
positions:geoCoords,
width:3,
}); 
//线几何图形
let line_geoInstance=new Cesium.GeometryInstance({
title:"高亮面图形",
geometry:linegeo
}) 
//图形组
primitive_gra=new Cesium.GroundPolylinePrimitive({
geometryInstances:line_geoInstance,//几何图形
appearance:new Cesium.MaterialAppearance({//图层组外观
material:Cesium.Material.fromType("Color",{
color:new Cesium.Color(0.0, 1.0, 1.0, 1.0)
})
}),
});
}
if(primitive_gra&&primitiveLayer){
primitiveLayer.add(primitive_gra);
}
}
}
}//e

/**********************封装点击高亮选中的实体要素(仅高亮面内部区域)*******************
 *参数:clickSeletedLayer(PrimitiveCollection):PrimitiveCollection实例对象
 *****selectFeat(entity):选中的实体要素
 *****isClearLyr(String):每次调用该方法是否清除高亮图层,默认是清除图层
 *无返回值
 */
myCesium.lightFeat_click=function(clickSeletedLayer="",selectFeat="",isClearLyr=true){
if(clickSeletedLayer&&selectFeat){
if(isClearLyr){
clickSeletedLayer.removeAll();
}
let picGra=selectFeat.billboard || "";//点图标
let polylineGra=selectFeat.polyline || "";//线
let polygonGra=selectFeat.polygon || "";//面
let geoType="";//实体几何类型
let geoCoords="";//实体几何坐标
if(picGra&&!polylineGra&&!polygonGra){//点类型
geoType="point";
selectFeat.billboard.scale=1.2;
}
else if(!picGra&&polylineGra&&!polygonGra){//线类型
geoType="polyline";
geoCoords=selectFeat.polyline.positions.getValue() || "";//线世界坐标数组
}
else if(!picGra&&polylineGra&&polygonGra){//面类型
geoType="polygon";
geoCoords=selectFeat.polygon.hierarchy.getValue().positions || "";//面世界坐标数组
}
let attr=selectFeat.properties;
let isHighLight=selectFeat.properties.isHighLight ? selectFeat.properties.isHighLight._value : "false";//是否高亮字段
let globalId=selectFeat.properties.globalId ? selectFeat.properties.globalId._value : "";//全局id字段
if(!attr.hasProperty("isHighLight")){
attr.addProperty("isHighLight","false");
}
if(!attr.hasProperty("globalId")){
attr.addProperty("globalId","");
}
let primitive_gra="";//图元几何
if(geoCoords&&geoCoords.length>0){
if(geoType=="point"){//点实体
            
}
else if(geoType=="polyline"){//线实体
let lineGeo=new Cesium.GroundPolylineGeometry({//贴地线几何
id:globalId,
positions:geoCoords,
width:3,
});
let line_geoInstance=new Cesium.GeometryInstance({
title:"高亮线图形",
id:globalId,
geometry:lineGeo
}) 
//贴地线图形组
primitive_gra=new Cesium.GroundPolylinePrimitive({
id:globalId,
geometryInstances:line_geoInstance,//几何图形
appearance:new Cesium.PolylineMaterialAppearance({
material:Cesium.Material.fromType("Color",{
color:new Cesium.Color(0.0, 1.0, 1.0, 1.0)
})
}),
});
}
else{//面
//面几何
let miangeo=new Cesium.PolygonGeometry({//几何
id:globalId,
polygonHierarchy:new Cesium.PolygonHierarchy(geoCoords)
}); 
//面几何图形
let mian_geoInstance=new Cesium.GeometryInstance({
id:globalId,
title:"几何属性",
geometry:miangeo
})
//图形组
primitive_gra=new Cesium.GroundPrimitive({
id:globalId,
geometryInstances:mian_geoInstance,//几何图形
appearance:new Cesium.MaterialAppearance({//图层组外观
material:Cesium.Material.fromType("Color",{
color:new Cesium.Color(0.0, 0.0, 1.0, 0.1)
})
}),
});
}
if(primitive_gra&&clickSeletedLayer&&isHighLight=="false"){
clickSeletedLayer.add(primitive_gra);
selectFeat.properties.isHighLight._value="true";
}
else{
selectFeat.properties.isHighLight._value="false";   
}
}
}
}//e


/*******************封装在图层中查询指定globalId实体要素*****************
 *参数:viewer(Viewer):地图的Viewer实例
 *****lyrId(string):需要查询的图层id
 *返回值dataSource(dataSource)
 *注解:如果想使用该方法则每一个实体中必须包含“globalId”属性，否则使用不了
 */
myCesium.getEntityByGlobalId=function(entityLyr="",GlobalId=""){
let entityFeat=null;
if(entityLyr&&GlobalId){
let lyrType=entityLyr.lyrType || "";
let entityFeats=[];
if(lyrType=="dataSource"){//dataSource关联的图层
entityFeats=entityLyr.values;//图层要素 
}
else if(lyrType=="entityLayer"){//通过entity父实体关联的图层
entityFeats=entityLyr._children;//图层要素
}
for(let i=0;i<entityFeats.length;i++){
let entity=entityFeats[i];
let entityUid=entity.properties.globalId ? entity.properties.globalId._value : "";
if(entityUid==GlobalId){
entityFeat=entity;
break;
}
}
}
return entityFeat;
}//e


/*******************封装通过行政代码判断行政级别*****************
 *更新时间:2020.05.21
 *参数:xzCode(String):行政代码
 ****levelType(String):级别类型,默认为"1",可选值:"1","2"
 *返回值xzLevel(string):行政级别
 *注解:
 *1.levelType为"1"，返回类型为:"sheng"、"shi"、"xian"、"xiang"格式
 *2.levelType为"2"，返回类型为:"1"、"2"、"3"、"4"格式
 */
myCesium.getXZDMLevelByCode=function(xzCode="",levelType="1"){
let xzLevel=null;
let codeLevel=null;
if(xzCode){
xzCode=xzCode+"";
let len=xzCode.length;
if(len==2){//省
xzLevel="sheng";
codeLevel="1";
}
else if(len==4){//市
xzLevel="shi";
codeLevel="2";
}
else if(len==6){//县
xzLevel="xian";
codeLevel="3";
}
else if(len>6){//乡
xzLevel="xiang";
codeLevel="4";
}
}
if(levelType=="2")xzLevel=codeLevel;
return xzLevel;
}//e


/*******************封装通过图层id获取该图层关联的dataSource*****************
 *参数:viewer(Viewer):地图的Viewer实例
 *****lyrId(string):需要查询的图层id
 *返回值dataSource(dataSource)
 *注解:如何想使用该方法前提是dataSource数据源关联的图层中必须包含“lyrId”属性，否则使用不了
 */
myCesium.getDataSourceByLyrId=function(viewer="",lyrId=""){
let dataSource=null;
if(viewer&&lyrId){
let dataSources=viewer.dataSources;
for(let i=0;i<dataSources.length;i++){
let source=dataSources._dataSources[i];//数据源
let layerid=source.entities.lyrId || "";//图层id
if(layerid){
if(layerid==lyrId){
dataSource=source;
break;
}
}
}
}
return dataSource;
}//e

/*******************封装通过图层id获取指定的图层信息对象(“entity信息对象”)*****************
 *参数:lyrCollection(array):图层信息对象集合，“entity”
 *****lyrId(string):需要查询的图层id
 *返回值result(object):返回对象中包含entityInfo、layer、layerType属性,
 *注解:
 *1.如何想使用该方法前提是每一个图层中必须包含“lyrId”、“lyrType”属性，否则使用不了，
 *不同的图层类型获取图层上空间要素的方法不同
 *2.result={
	entityInfo:entityInfo,//实体信息对象
	layer:geoLayer,//cesium图层
	layerType:lyrType//cesium类型
 }
 */
myCesium.getEntityInfoByLyrId=function(lyrCollection="",lyrId=""){
let result=null;
if(lyrCollection&&lyrId){
for(let i=0;i<lyrCollection.length;i++){
let entityInfo=lyrCollection[i];//图层
let layerid=entityInfo.layerId || "";//图层id
let lyrType=entityInfo.layerType || "";//图层要素集合类型
let geoLayer=entityInfo.layer || "";//几何图层
if(layerid&&lyrType){
if(layerid==lyrId){
result={
entityInfo:entityInfo,
layer:geoLayer,
layerType:lyrType
};
break;
}
}
}
}
return result;
}//e


/*************************封装创建图层图例************************
 *参数:canvasId(srting):画布id值
 *****legendDatas(array):将要显示的图例数组，必须包含name和color(iconUrl)属性。例如：legendDatas=[{name:"",iconUrl:"",geoType:""},{name:"",color:"",geoType:""}];
 *****legendTitle(string):图例标题
 *****fontColor(string):设置画布文字显示的颜色
 *无返回值
 *注解:图例显示的顺序，就是图例数组中图例数据的顺序
 *如果加载的是点类型的图例，则必须包含name和iconUrl属性，例如：legendDatas=[{name:"",iconUrl:"",geoType:""}]
 *如果是线、面类型的图例，则必须包含name和color属性，例如：legendDatas=[{name:"",color:"",geoType:""}]
 */
myCesium.createLyrLegend=function(canvasId,legendDatas,legendTitle="图例",fontColor="black"){
if(canvasId&&legendDatas&&legendDatas.length>0){
let canvas=document.getElementById(canvasId);
let legendLen=legendDatas.length;//图例总个数
if(canvas){
canvas.style.display="block";
let ctx=canvas.getContext("2d");
canvas.width=180;//画布的宽度
let yheight=36;	
canvas.height=yheight+legendLen*27;//画布的高度
ctx.font="16px Arial";//图例标题字体
ctx.fillStyle=fontColor;//重新设置填充色
ctx.fillText(legendTitle,canvas.width/2.5,25);//在(width/2.5,25)填充文本
for(var i=0;i<legendDatas.length;i++){
let legend=legendDatas[i];//图例
let name=legend.name || "";//图例文本
let geoType=legend.geoType || "";//几何类型
ctx.font="12px Arial";//重新设置字体大小
ctx.fillStyle=fontColor;
ctx.fillText(name,52,72+(i-1)*25);//文字
if(geoType){
if(geoType=="Point"){//点图例
let iconUrl=legend.iconUrl || "";//图标路径
addLegendPic(canvas,iconUrl,i);
}
else if(geoType=="Polyline"){//线图例
let geoColor=legend.color || "black";//图例几何显示的颜色
addLegendXian(canvas,geoColor,i);
}
else if(geoType=="Polygon"){//面图例
let geoColor=legend.color || "black";//图例几何显示的颜色
addLegendMian(canvas,geoColor,i);
}
}
}
}
}
function addLegendPic(canvas,iconUrl,p){//添加点图标
let ctx=canvas.getContext("2d");
let imgObj=new Image();//动态创建img节点对象
imgObj.src=iconUrl;
if(imgObj.complete){//如果图片加载完成
ctx.drawImage(imgObj,17,32+(p*25),22,24);//在canvas上绘制图片
}
else{
imgObj.onload=function(){//图片加载完成回调
ctx.drawImage(imgObj,17,32+(p*25),22,24);//在canvas上绘制图片
};
imgObj.onerror=function(){//加载失败
console.log("canvas图片加载失败,请重试！")
};
}
}//e1
function addLegendXian(canvas,geoColor,p){
let ctx=canvas.getContext("2d");
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=geoColor;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(20,68+(i-1)*25);//画笔的开始绘制的起点位置
ctx.lineTo(35,68+(i-1)*25);//线段1的终点位置
ctx.stroke();//根据子路径列表书顺序，绘制线类型
}//e2
function addLegendMian(canvas,geoColor,p){
let ctx=canvas.getContext("2d");
ctx.fillStyle=geoColor;//图例矩形颜色
ctx.fillRect(20,60+(i-1)*25,15,15);//颜色块：x,y,w,h
ctx.strokeStyle=geoColor;//线的颜色
ctx.lineWidth=2;//线的宽度
ctx.strokeRect(20,60+(i-1)*25,15,15);//绘制两次边界
ctx.strokeRect(20,60+(i-1)*25,15,15);
}//e3	
}//e



/*************************封装创建图层图例(一个个累加显示)************************
 *参数:canvasId(srting):画布id值
 *****legendDatas(array):将要显示的图例数组，必须包含name和color(iconUrl)属性。例如：legendDatas=[{name:"",iconUrl:"",geoType:""},{name:"",color:"",geoType:""}];
 *****legendTitle(string):图例标题
 *****fontColor(string):设置画布文字显示的颜色
 *无返回值
 *注解:图例显示的顺序，就是图例数组中图例数据的顺序
 *如果加载的是点类型的图例，则必须包含name和iconUrl属性，例如：legendDatas=[{name:"",iconUrl:"",geoType:""}]
 *如果是线、面类型的图例，则必须包含name和color属性，例如：legendDatas=[{name:"",color:"",geoType:""}]
 */
var legendDataList=[];
window.legendDataList=legendDataList;//存放图例的数组
myCesium.createLyrLegend_plus=function(canvasId,legendDatas,legendTitle="图例",fontColor="black"){
if(canvasId&&legendDatas&&legendDatas.length>0){
let canvas=document.getElementById(canvasId);
let legendLen=legendDatas.length;//图例总个数
for(let i=0;i<legendDatas.length>0;i++){
legendDataList.push(legendDatas[i]);
}
let legendLen2=legendDataList.length;//图例总个数
if(canvas){
canvas.style.display="block";
let ctx=canvas.getContext("2d");
canvas.width=180;//画布的宽度
let yheight=36;	
canvas.height=yheight+legendLen2*27;//画布的高度
ctx.font="16px Arial";//图例标题字体
ctx.fillStyle=fontColor;//重新设置填充色
ctx.fillText(legendTitle,canvas.width/2.5,25);//在(width/2.5,25)填充文本

for(var i=0;i<legendDataList.length;i++){
let legend=legendDataList[i];//图例
let name=legend.name || "";//图例文本
let geoType=legend.geoType || "";//几何类型
ctx.font="12px Arial";//重新设置字体大小
ctx.fillStyle=fontColor;
ctx.fillText(name,52,72+(i-1)*25);//文字
if(geoType){
if(geoType=="Point"){//点图例
let iconUrl=legend.iconUrl || "";//图标路径
addLegendPic(canvas,iconUrl,i);
}
else if(geoType=="Polyline"){//线图例
let geoColor=legend.color || "black";//图例几何显示的颜色
addLegendXian(canvas,geoColor,i);
}
else if(geoType=="Polygon"){//面图例
let geoColor=legend.color || "black";//图例几何显示的颜色
addLegendMian(canvas,geoColor,i);
}
}
}
}
}
function addLegendPic(canvas,iconUrl,p){//添加点图标
let ctx=canvas.getContext("2d");
let imgObj=new Image();//动态创建img节点对象
imgObj.src=iconUrl;
if(imgObj.complete){//如果图片加载完成
ctx.drawImage(imgObj,17,32+(p*25),22,24);//在canvas上绘制图片
}
else{
imgObj.onload=function(){//图片加载完成回调
ctx.drawImage(imgObj,17,32+(p*25),22,24);//在canvas上绘制图片
};
imgObj.onerror=function(){//加载失败
console.log("canvas图片加载失败,请重试！")
};
}
}//e1
function addLegendXian(canvas,geoColor,p){
let ctx=canvas.getContext("2d");
ctx.beginPath();//开始绘制路径
ctx.strokeStyle=geoColor;//线的颜色
ctx.lineWidth=2;
ctx.moveTo(20,68+(i-1)*25);//画笔的开始绘制的起点位置
ctx.lineTo(35,68+(i-1)*25);//线段1的终点位置
ctx.stroke();//根据子路径列表书顺序，绘制线类型
}//e2
function addLegendMian(canvas,geoColor,p){
let ctx=canvas.getContext("2d");
ctx.fillStyle=geoColor;//图例矩形颜色
ctx.fillRect(20,60+(i-1)*25,15,15);//颜色块：x,y,w,h
ctx.strokeStyle=geoColor;//线的颜色
ctx.lineWidth=2;//线的宽度
ctx.strokeRect(20,60+(i-1)*25,15,15);//绘制两次边界
ctx.strokeRect(20,60+(i-1)*25,15,15);
}//e3	
}//e


/********************封装获取面图形PolygonGraphics的中心(WGS84)*****************
 *参数:polygonGraphic(PolygonGraphic):几何面图形
 *返回值:cartesian3Center(cartesian3):中心点坐标(世界坐标)，例如:{x:"",y:"",z:""}
 *注解:使用该方法必须先引入Cesium.js和turf.min.js文件，否则使用不了
 */
myCesium.getPolygonGraphicsCenter=function(polygonGraphic){
let WGS84Center="";
let turf=window.turf || "";
if(polygonGraphic&&turf){
let geoCoords=polygonGraphic.hierarchy.getValue();//世界坐标数组
if(geoCoords.positions&&geoCoords.positions.length>0){
geoCoords=geoCoords.positions;	
}
let wgs84Coords=cartesian3sToWGS84s(geoCoords);
let polygon = turf.polygon([wgs84Coords]);
let centroid=turf.centroid(polygon);
WGS84Center=turf.getCoord(centroid);
}
else{
console.error("请检查turf.min.js文件是否被引入！");
}
return WGS84Center;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
}//e2
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e


/********************封装获取面图形PolygonGraphics的中心(世界坐标点)*****************
 *参数:polygonGraphic(PolygonGraphic):几何面图形
 *返回值:cartesian3Center(cartesian3):中心点坐标(世界坐标)，例如:{x:"",y:"",z:""}
 *注解:使用该方法必须先引入Cesium.js和turf.min.js文件，否则使用不了
 */
myCesium.getPolygonGraphicsCenter_car=function(polygonGraphic){
let cartesian3Center="";
let turf=window.turf || "";
if(polygonGraphic&&turf){
let geoCoords=polygonGraphic.hierarchy.getValue();//世界坐标数组
if(geoCoords.positions&&geoCoords.positions.length>0){
geoCoords=geoCoords.positions;	
}
let wgs84Coords=cartesian3sToWGS84s(geoCoords);
let polygon = turf.polygon([wgs84Coords]);
let centroid=turf.centroid(polygon);
let centerCoord=turf.getCoord(centroid);
if(centerCoord&&centerCoord.length>0){
cartesian3Center=Cesium.Cartesian3.fromDegrees(centerCoord[0],centerCoord[1]); 
}
}
else{
console.error("请检查turf.min.js文件是否被引入！");
}
return cartesian3Center;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
}//e2
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e

/**************************笛卡尔空间坐标数组转WGS84坐标数组(常用坐标格式)************************
 *参数:cartesian3Array(Array):需要转换的世界坐标数组,例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]
 *返回值:lonLatArray(array):常用格式WGS84坐标数组，例如:[[lon,lat],[lon,lat]]
 */
myCesium.cartesian3sToWGS84s=function(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e


/**************************笛卡尔空间坐标数组转geojson几何************************
 *参数:cartesian3Array(Array):需要转换的世界坐标数组,例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]
 *****geoType(string):几何类型，可选值:"Point"、"LineString"、"Polygon"
 *返回值:geojson(json):geojson格式几何坐标
 *注解:
 *1.geojson格式={
 	type:"",
	coordinates:[]
 *};
 */
myCesium.cartesian3sToGeojson=function(cartesian3Array=[],geoType=""){
let geojson=null;
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0&&geoType){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
if(geoType=="Point"){
geojson={
type:"Point",
coordinates:lonLatArray[0]	
};
}
else if(geoType=="LineString"){
geojson={
type:"LineString",
coordinates:lonLatArray	
};	
}
else if(geoType=="Polygon"){
lonLatArray.push(lonLatArray[0]);	
geojson={
type:"Polygon",
coordinates:[lonLatArray]	
};	
}
}
return geojson;
function cartesian3ToWGS84(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e1
}//e



/***************************封装创建指定样式bbox面要素entity(Polygon，WGS84坐标,symbol)***********************
*更新时间:2021.02.25
*参数:boxCoord(array):boxCoord(array):box坐标，例如:[xmin,ymin,xmax,ymax]  
*****attr(object):[option],该实体属性
*****entityId(string):[option],entity实体id值
*****symbol(Material):[option],面的样式
*****borderSym(Material):[option],边界线样式
*****borderWidth(number):[option],边界宽度
*****lyrId(string):[option],该实体所属图层id
*****parentEntity(Entity):[option],该实体关联的父实体实例
*返回值:mianEntity(Entity):面实体对象，该要素实体包含“geoType”字段
*1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
*var attr={
	globalId:"",
	fillColor: "",//hex
	alphaValue:"1.0",
	borderWidth:"2.0",
	borderColor:"",//hex
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
};
*2.该方法只针对于单环面，不适用于多环面
*/
myCesium.createBboxEntity_sym=function(boxCoord,attr,entityId,symbol,borderSym,borderWidth,lyrId,parentEntity){
let mianEntity="";
if(borderWidth!=null&&borderWidth!="")borderWidth=String(borderWidth);
parentEntity=parentEntity || null;
attr=attr||{};
let fillColor=attr.fillColor||"#0000FF";
let alphaValue=(!attr.alphaValue&&eval(attr.alphaValue)!=0)?0.2:attr.alphaValue;
let borderWidth2=(!attr.borderWidth&&eval(attr.borderWidth)!=0)?"2.0":attr.borderWidth;
let borderColor=attr.borderColor||"#FF0000";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=borderColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : eval(borderWidth2);//高亮时显示的边线宽度
if(boxCoord&&boxCoord.length==4){
let rectangle=Cesium.Rectangle.fromDegrees(boxCoord[0],boxCoord[1],boxCoord[2],boxCoord[3]);//[xmin,ymin,xmax,ymax]	
let coords_car3=myCesium.getCar3Array_rect(rectangle);//获取矩形cars坐标数组
mianEntity=new Cesium.Entity({//矩形实体
title:"面bbox",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
attr:attr,
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线几何
positions:coords_car3,//线的坐标点
width:eval(width),//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
clampToGround:true,//是否为贴地线
}),
rectangle:new Cesium.RectangleGraphics({
coordinates:rectangle,
fill:true,
outline:false,
material:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue)),//面颜色
heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//贴地
})
});
}
if(symbol){
mianEntity.rectangle.material=symbol;
}
if(borderSym){
mianEntity.polyline.material=borderSym;	
}
if(borderWidth){
mianEntity.polyline.width=eval(borderWidth);
}
return mianEntity;
}//e


/***************************封装创建多面要素entity(MultiPolygon，WGS84坐标,symbol)***********************
 *参数:mianDatas(array):四维坐标数组*，例如:[[[[lon,lat],[lon,lat]]]]   
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:面的样式
 *****[borderSym(Material)]:边界线样式
 *****[borderWidth(number)]:边界宽度
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:multimianEntity(array):实体对象数组，每一要素实体包含“geoType”几何类型，“relateId”关联id
 *注解:创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
 	fillColor: "",
	alphaValue:"1.0",
	borderWidth:"2.0",
	borderColor:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiPolygonEntity_sym=function(mianDatas,attr={},entityId="",symbol="",borderSym="",borderWidth="",lyrId=null,parentEntity=null){
let mianEntity="";
let multimianEntity=[];
if(borderWidth!=null&&borderWidth!="")borderWidth=String(borderWidth);
parentEntity=parentEntity || null;
attr=attr||{};
let fillColor=attr.fillColor||"#0000FF";
let alphaValue=(!attr.alphaValue&&eval(attr.alphaValue)!=0)?0.1:attr.alphaValue;
let borderWidth2=(!attr.borderWidth&&eval(attr.borderWidth)!=0)?"2.0":attr.borderWidth;
let borderColor=attr.borderColor||"#FF0000";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=borderColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : eval(borderWidth2);//高亮时显示的边线宽度
if(mianDatas&&mianDatas.length>0&&entityId){
for(let i=0;i<mianDatas.length;i++){
let oneMianData=mianDatas[i][0];
if(oneMianData&&oneMianData.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
let ringPath=myCesium.transToCartesian3Coords(oneMianData);
mianEntity=new Cesium.Entity({
id:entityId2,
title:"多面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"MultiPolygon",
relateId:relateId,
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:eval(width),
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue)),//面颜色
})
});
}
if(symbol){
mianEntity.polygon.material=symbol;
}
if(borderSym){
mianEntity.polyline.material=borderSym;	
}
if(borderWidth){
mianEntity.polyline.width=eval(borderWidth);	
}
multimianEntity.push(mianEntity); 
}
}
return multimianEntity;
}//e


/***************************封装创建多面要素entity(MultiPolygon，WGS84坐标)***********************
 *参数:mianDatas(array):四维坐标数组*，例如:[[[[lon,lat],[lon,lat]]]]    
 *****[attr(object)]:该实体属性
 *****entityId(string):entity实体id值*，必须设置该参数
 *****[symbol(Material)]:面的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:multimianEntity(array):实体对象数组，每一要素实体包含“geoType”几何类型，“relateId”关联id
 *注解:创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiPolygonEntity=function(mianDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null){
let mianEntity="";
let multimianEntity=[];
parentEntity=parentEntity || null;
attr=attr||{};
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor="#FF0000";//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : 2;//高亮时显示的边线宽度
if(mianDatas&&mianDatas.length>0&&entityId){
for(let i=0;i<mianDatas.length;i++){
let oneMianData=mianDatas[i][0];
if(oneMianData&&oneMianData.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
let ringPath=myCesium.transToCartesian3Coords(oneMianData);
mianEntity=new Cesium.Entity({
id:entityId2,
title:"多面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"MultiPolygon",
relateId:relateId,
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:width,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
if(symbol){
mianEntity.polygon.material=symbol;
}
multimianEntity.push(mianEntity); 
}
}
return multimianEntity;
}//e


/***************************封装创建指定样式面要素entity(Polygon，WGS84坐标,symbol)***********************
 *参数:mianDatas(array):坐标数组，二维数组，例如:[[lon,lat],[lon,lat]]    
 *****attr(object):[option],该实体属性
 *****entityId(string):[option],entity实体id值
 *****symbol(Material):[option],面的样式
 *****borderSym(Material):[option],边界线样式
 *****borderWidth(number):[option],边界宽度
 *****lyrId(string):[option],该实体所属图层id
 *****parentEntity(Entity):[option],该实体关联的父实体实例
 *返回值:mianEntity(Entity):面实体对象，该要素实体包含“geoType”字段
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
 	fillColor: "",//hex
	alphaValue:"1.0",
	borderWidth:"2.0",
	borderColor:"",//hex
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.该方法只针对于单环面，不适用于多环面
 */
myCesium.createPolygonEntity_sym=function(mianDatas,attr={},entityId="",symbol="",borderSym="",borderWidth=2.0,lyrId=null,parentEntity=null){
let mianEntity="";
if(borderWidth!=null&&borderWidth!="")borderWidth=String(borderWidth);
parentEntity=parentEntity || null;
attr=attr||{};
let fillColor=attr.fillColor||"#0000FF";
let alphaValue=(!attr.alphaValue&&eval(attr.alphaValue)!=0)?0.1:attr.alphaValue;
let borderWidth2=(!attr.borderWidth&&eval(attr.borderWidth)!=0)?"2.0":attr.borderWidth;
let borderColor=attr.borderColor||"#FF0000";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=borderColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : eval(borderWidth2);//高亮时显示的边线宽度
if(mianDatas&&mianDatas.length>1&&entityId){
let ringPath=myCesium.transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
id:entityId,
title:"面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:eval(width),
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue)),//面颜色
})
});
}
else if(mianDatas&&mianDatas.length>0){
let ringPath=myCesium.transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
title:"面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:eval(width),
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue)),//面颜色
})
});
}
if(symbol){
mianEntity.polygon.material=symbol;
}
if(borderSym){
mianEntity.polyline.material=borderSym;	
}
if(borderWidth){
mianEntity.polyline.width=eval(borderWidth);
}
return mianEntity;
}//e

/***************************封装创建面要素entity(Polygon，WGS84坐标)***********************
 *参数:mianDatas(array):坐标数组,二维数组，例如:[[lon,lat],[lon,lat]]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:面的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:mianEntity(Entity):面实体对象，该要素实体包含“geoType”几何类型
 *注解:
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.高亮面要素只是高亮面的边界，不高亮填充色
 *3.该方法只针对于单环面，不适用于多环面
 */
myCesium.createPolygonEntity=function(mianDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null){
let mianEntity="";
parentEntity=parentEntity || null;
attr=attr||{};
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor="#FF0000";//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : 2;//高亮时显示的边线宽度
if(mianDatas&&mianDatas.length>0&&entityId){
let ringPath=myCesium.transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
id:entityId,
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:width,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
else if(mianDatas&&mianDatas.length>0){
let ringPath=myCesium.transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:width,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
if(symbol){
mianEntity.polygon.material=symbol;
if(symbol.red){//面边界颜色默认和面填充色相同
symbol.alpha=1.0; 
mianEntity.polyline.material=symbol;
}
}
return mianEntity;
}//e


/***************************封装创建面要素entity(Polygon,世界坐标)***********************
 *参数:mianDatas(array):笛卡尔空间直角坐标数组，例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:面的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:mianEntity(Entity):面实体对象，该要素实体包含“geoType”几何类型
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 */
myCesium.createPolygonEntity_car=function(mianDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null){
let mianEntity="";
parentEntity=parentEntity || null;
attr=attr||{};
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor="#FF0000";//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : 2;//高亮时显示的边线宽度
if(mianDatas&&mianDatas.length>0&&entityId){
let firstCoord=mianDatas[0];
let lastCoord=mianDatas[mianDatas.length-1];
if(firstCoord.x!=lastCoord.x || firstCoord.y!=lastCoord.y || firstCoord.z!=lastCoord.z){
mianDatas.push(firstCoord);	
}
mianEntity=new Cesium.Entity({
id:entityId,
title:"面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(mianDatas),//边界线
width:width,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:mianDatas,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
else if(mianDatas&&mianDatas.length>0){
let firstCoord=mianDatas[0];
let lastCoord=mianDatas[mianDatas.length-1];
if(firstCoord.x!=lastCoord.x || firstCoord.y!=lastCoord.y || firstCoord.z!=lastCoord.z){
mianDatas.push(firstCoord);	
}
mianEntity=new Cesium.Entity({
title:"面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(mianDatas),//边界线
width:width,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:mianDatas,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
if(symbol){
mianEntity.polygon.material=symbol;
}
return mianEntity;
}//e


/***************************封装创建指定样式孔洞面要素entity(Polygon，WGS84坐标,symbol)***********************
 *参数:geoCoords(array):坐标数组，三维数组，例如:[[[lon,lat],[lon,lat]],[[lon,lat],[lon,lat]]]      
 *****attr(object):[option],该实体属性
 *****symbol(Material):[option],面的样式
 *****borderSym(Material):[option],边界线样式
 *****borderWidth(number):[option],边界宽度
 *****lyrId(string):[option],该实体所属图层id
 *****parentEntity(Entity):[option],该实体关联的父实体实例
 *返回值:mianEntity(Entity):面实体对象，该要素实体包含“geoType”字段
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
 	fillColor: "",//hex
	alphaValue:"1.0",
	borderWidth:"2.0",
	borderColor:"",//hex
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.该方法适用于单环面、多环面(孔洞)
 */
myCesium.createPolygonEntity_holes=function(geoCoords,attr={},symbol="",borderSym="",borderWidth=2.0,lyrId=null,parentEntity=null){
let mianEntity="";
if(borderWidth!=null&&borderWidth!="")borderWidth=String(borderWidth);
parentEntity=parentEntity || null;
attr=attr||{};
let fillColor=attr.fillColor||"#0000FF";
let alphaValue=(!attr.alphaValue&&eval(attr.alphaValue)!=0)?0.1:attr.alphaValue;
let borderWidth2=(!attr.borderWidth&&eval(attr.borderWidth)!=0)?"2.0":attr.borderWidth;
let borderColor=attr.borderColor||"#FF0000";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=borderColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
let width=attr.isHighLight=="true" ? 4 : eval(borderWidth2);//高亮时显示的边线宽度
let ringPath="";
let ringPath2="";
if(geoCoords&&geoCoords.length>0){
let innerRing=geoCoords.length>1?geoCoords[0]:null;
let outterRing=geoCoords.length>1?geoCoords[1]:geoCoords[0];
ringPath=myCesium.transToCartesian3Coords(outterRing);
ringPath2=myCesium.transToCartesian3Coords(innerRing);
mianEntity=new Cesium.Entity({
title:"面实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"Polygon",
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:eval(width),
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:new Cesium.PolygonHierarchy({
positions:ringPath,//面层级数据,外环
}),
material:Cesium.Color.fromCssColorString(fillColor).withAlpha(eval(alphaValue)),//面颜色
})
});
}
if(ringPath2){
let holes=[//内环
{positions:ringPath2}
]
mianEntity.polygon.hierarchy=new Cesium.PolygonHierarchy(ringPath,holes);	
}
if(symbol){
mianEntity.polygon.material=symbol;
}
if(borderSym){
mianEntity.polyline.material=borderSym;	
}
if(borderWidth){
mianEntity.polyline.width=eval(borderWidth);
}
return mianEntity;
}//e


/***************************封装创建多线要素entity(MultiLineString,WGS84)***********************
 *参数:lineDatas(array):坐标数组*,三维数组，例如:[[[lon,lat],[lon,lat]],[[lon,lat],[lon,lat]]]    
 *****[attr(object)]:该实体属性
 *****entityId(string):entity实体id值
 *****[symbol(Material)]:线的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[isGround(boolean)]:是否为贴地实体，默认true
 *返回值:multiLineEntity(array):线实体对象,该要素实体包含“geoType”几何类型,"relateId"关联id
 *注解:创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
 	lineWidth:"",
    lineColor:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiPolylineEntity=function(lineDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null,isGround=true){
let lineEntity="";
let multiLineEntity=[];
parentEntity=parentEntity || null;
attr=attr||{};
let lineWidth=(!attr.lineWidth&&eval(attr.lineWidth)!=0)?"3.0":attr.lineWidth;
let lineColor=attr.lineColor||"#0000FF";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=lineColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
if(lineDatas&&lineDatas.length>0&&entityId){
for(let i=0;i<lineDatas.length;i++){
let oneLianData=lineDatas[i];
if(oneLianData&&oneLianData.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
let linePath=myCesium.transToCartesian3Coords(oneLianData);
lineEntity=new Cesium.Entity({
id:entityId2,
title:"多线实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"LineString",
relateId:relateId,
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:linePath,//线的坐标点，默认为“ConstantProperty”
width:eval(lineWidth),//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//线的符号
clampToGround:isGround,//是否为贴地线
}
});
}
if(symbol){
lineEntity.polyline.material=symbol;
}
multiLineEntity.push(lineEntity); 
}
}
return multiLineEntity;
}//e

/***************************封装创建线要素entity(LineString,WGS84)***********************
 *更新时间:20202.11.13 wxt
 *参数:lineDatas(array):坐标数组，例如:[[lon,lat],[lon,lat]]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:线的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[isGround(boolean||String)]:是否为贴地实体，默认true,当值为"no"时,clampToGround为"undefined"
 *返回值:lineEntity(Entity):线实体对象,该要素实体包含“geoType”几何类型
 *注解:
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
 	lineWidth:"",
    lineColor:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 */
myCesium.createPolylineEntity=function(lineDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null,isGround=true){
let lineEntity="";
parentEntity=parentEntity || null;
let clampToGround=isGround==false?false:true;
if(isGround==="no")clampToGround=undefined;
attr=attr||{};
let lineWidth=(!attr.lineWidth&&eval(attr.lineWidth)!=0)?"3.0":attr.lineWidth;
let lineColor=attr.lineColor||"#0000FF";
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor=lineColor;//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
//color="#0000FF";
if(lineDatas&&lineDatas.length>0&&entityId){
let linePath=myCesium.transToCartesian3Coords(lineDatas);
lineEntity=new Cesium.Entity({
id:entityId,
title:"线实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"LineString",
properties:attr,//实体属性
attr:attr,
show:true,
polyline:new Cesium.PolylineGraphics({//线几何
positions:linePath,//线的坐标点，默认为“ConstantProperty”
width:eval(lineWidth),//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//线的符号
clampToGround:clampToGround,//是否为贴地线,默认为true
})
});
}
else if(lineDatas&&lineDatas.length>0){
let linePath=myCesium.transToCartesian3Coords(lineDatas);
lineEntity=new Cesium.Entity({
title:"线实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"LineString",
properties:attr,//实体属性
attr:attr,
show:true,
polyline:new Cesium.PolylineGraphics({//线几何
positions:linePath,//线的坐标点，默认为“ConstantProperty”
width:eval(lineWidth),//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//线的符号
clampToGround:clampToGround,//是否为贴地线
})
});	
}
if(symbol){
lineEntity.polyline.material=symbol;
}
return lineEntity;
}//e



/***************************封装创建线要素entity(LineString,世界坐标)***********************
 *参数:lineDatas(array):世界坐标数组，例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[symbol(Material)]:线的样式
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[isGround(boolean)]:是否为贴地实体，默认true
 *返回值:lineEntity(Entity):线实体对象，该要素实体包含“geoType”几何类型
 *注解:
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={
 	globalId:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
 };
 */
myCesium.createPolylineEntity_car=function(lineDatas,attr={},entityId="",symbol="",lyrId=null,parentEntity=null,isGround=true){
let lineEntity="";
parentEntity=parentEntity || null;
attr=attr||{};
//默认添加必要的属性
if(!attr.globalId)attr.globalId="";//“globalId”
if(!attr.lightColor)attr.lightColor="#00FFFF";//高亮颜色
if(!attr.normalColor)attr.normalColor="#0000FF";//正常颜色
if(!attr.isHighLight)attr.isHighLight="false";//是否高亮，默认不高亮
if(!attr.isEditable)attr.isEditable="true";//是否可编辑，默认可编辑
let color=attr.isHighLight=="true"?attr.lightColor:attr.normalColor;
if(lineDatas&&lineDatas.length>0&&entityId){
lineEntity=new Cesium.Entity({
id:entityId,
title:"线实体",
layerId:lyrId,
parent:parentEntity,//父实体
lightColor:attr.lightColor,//高亮颜色hex
normalColor:attr.normalColor,//正常颜色hex
geoType:"LineString",
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:lineDatas,//线的坐标点，默认为“ConstantProperty”
width:3,//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//线的符号
clampToGround:isGround,//是否为贴地线
}
});
}
else if(lineDatas&&lineDatas.length>0){
lineEntity=new Cesium.Entity({
title:"线实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"LineString",
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:lineDatas,//线的坐标点，默认为“ConstantProperty”
width:3,//线的宽度
material:Cesium.Color.fromCssColorString(color).withAlpha(1.0),//线的符号
clampToGround:isGround,//是否为贴地线
}
});	
}
if(symbol){
lineEntity.polyline.material=symbol;
}
return lineEntity;
}//e


/***************************封装创建多点图标要素entity(MultiPoint,WGS84)***********************
 *参数:geoDatas(array):包含多点的几何数据*,二维数组,例如[[lon,lat],[lon,lat]]
 *****imgSrc(string):图标路径
 *****[attr(object)]:该实体属性
 *****entityId(string):entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型,"relateId"关联id
 *注解:
 *1.创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiPicPtEntity=function(geoDatas,imgSrc,attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
let ptEntitys=[];
parentEntity=parentEntity || null;
attr=attr||{};
heightReference=(heightReference||heightReference===0)?heightReference:Cesium.HeightReference.CLAMP_TO_GROUND;
if(geoDatas&&geoDatas.length>0&&imgSrc&&entityId){
for(let i=0;i<geoDatas.length;i++){
let onePoint=geoDatas[i];
let lon=onePoint[0] || "";
let lat=onePoint[1] || "";
let z=onePoint[2] || 0;
if(onePoint&&onePoint.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
ptEntity=new Cesium.Entity({
id:entityId2,
title:"多点图标实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Point",
relateId:relateId,
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:1.0,//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
heightReference:heightReference,//贴地
}
});
}
ptEntitys.push(ptEntity);
}
}
return ptEntitys;
}//e


/***************************封装创建模型要素entity(Model,WGS84)***********************
 *更新时间:2021.02.24 wxt
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z] 
 *****modelUrl(string):模型url
 *****modelHpr(HeadingPitchRange):模型方位
 *****[attr(object)]:实体属性
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:modelEntity(Entity):模型实体对象,该要素实体包含“geoType”几何类型
 *注解:
 *1.通过属性值可改变的实体状态的属性,可直接在创建实体时通过属性对象进行属字段赋值，即可改变实体初始化状态
 *var attr={//可选几何属性
 	globalId:"",
 	lineWidth:"",
    lineColor:"",
	lightColor:"",
	normalColor:"",
	isHighLight:"false",
	isEditable:"true",
	//model
	iconScale:6,//模型显示比例,默认为1
	minimumPixelSize:1,//显示的最小尺寸，不管地图怎么缩放，保持模型的最小大小
	maximumScale:80,//最大显示比例大小，//模型随地图缩放显示的最大比例
	color:"#40F923",//模型颜色,hexColor
	colorBlendMode: Cesium.ColorBlendMode.MIX,//"Highlight"、"MIX"
 };
 */
myCesium.createModelEntity=function(coord,modelUrl,modelHpr,attr={},lyrId=null,parentEntity=null,heightReference=""){
let modelEntity=null;
parentEntity=parentEntity||null;
let geoAttr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
let lon=coord[0] || "";
let lat=coord[1] || "";
let z=coord[2] || 0;
if(lon&&lat&&modelUrl){
let position=Cesium.Cartesian3.fromDegrees(lon,lat,z);//实体位置，坐标类型是cartesian3坐标系
modelEntity=new Cesium.Entity({
title:"3d模型",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Model",
position:position,//实体位置，坐标类型是cartesian3坐标系
orientation:Cesium.Transforms.headingPitchRollQuaternion(position,modelHpr),//实体显示的方位
show:true,
attr:geoAttr,//自定义几何属性
properties:geoAttr,//实体属性
model:new Cesium.ModelGraphics({
uri:modelUrl,//模型url
runAnimations:true,//3d模型是否显示动画
scale:geoAttr.iconScale?Number(geoAttr.iconScale):1.0,//显示比例大小
minimumPixelSize:geoAttr.minimumPixelSize||undefined,//显示的最小尺寸，不管地图怎么缩放，保持模型的最小大小
maximumScale:geoAttr.maximumScale||undefined,//最大显示比例大小，//模型随地图缩放显示的最大比例
heightReference:heightReference,//参考高度
//color:Cesium.Color.fromCssColorString("#40F923").withAlpha(0.8),//模型颜色
//colorBlendMode: Cesium.ColorBlendMode.MIX,//"Highlight"、"MIX"
})
});
//设置颜色
if(geoAttr.color){ 
let alphaValue=geoAttr.alphaValue?Number(geoAttr.alphaValue):1.0;
modelEntity.model.color=Cesium.Color.fromCssColorString(geoAttr.color).withAlpha(alphaValue);
}
if(geoAttr.colorBlendMode){ 
modelEntity.model.colorBlendMode=geoAttr.colorBlendMode;
}
}
return modelEntity;
}//e



/***************************封装创建点图标要素entity(Point,WGS84)***********************
 *更新时间:2020.04.23 wxt
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z]    
 *****imgSrc(string):图标路径
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象
 *注解:
 *1.该方法支持创建二维贴地点，不支持三维坐标实体
 *2.var attr={//可选属性
 	iconScale:"",//缩放比例，默认为1.0
 	width:"",//图标宽度
 	height:"",//图标高度
 	enablePickFeatures:false,//是否被拾取
 }
 */
myCesium.createPicPtEntity=function(coord,imgSrc,attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
parentEntity=parentEntity || null;
attr=attr||{};
heightReference=(heightReference||heightReference===0)?heightReference:Cesium.HeightReference.CLAMP_TO_GROUND;
let iconScale=attr.iconScale||"1.0";
let width=attr.width||"";
let height=attr.height||"";
let lon=eval(coord[0]) || "";
let lat=eval(coord[1]) || "";
let z=eval(coord[2]) || 0;
if(lon&&lat&&imgSrc&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"点图标实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Point",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:eval(iconScale),//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,//水平方向原点
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,//垂直方向原点
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//默认贴地
}
});
}
else if(lon&&lat&&imgSrc){
ptEntity=new Cesium.Entity({
title:"点图标实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Point",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:eval(iconScale),//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
}
});	
}
if(width&&height&&ptEntity.billboard){
ptEntity.billboard.width=eval(width);
ptEntity.billboard.height=eval(height);	
}
return ptEntity;
}//e


/***************************封装创建点图标要素entity(Point,世界坐标)***********************
 *参数:cartesian3(object):世界坐标，例如:{x:"",y:"",z:""}
 *****imgSrc(string):图标路径
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型
 */
myCesium.createPicPtEntity_car=function(cartesian3,imgSrc,attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
parentEntity=parentEntity || null;
attr=attr||{};
heightReference=(heightReference||heightReference===0)?heightReference:Cesium.HeightReference.CLAMP_TO_GROUND;
let iconScale=attr.iconScale||"1.0";
let width=attr.width||"";
let height=attr.height||"";
if(cartesian3&&imgSrc&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"点图标实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Point",
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:eval(iconScale),//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
}
});
}
else if(cartesian3&&imgSrc){
ptEntity=new Cesium.Entity({
title:"点图标实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Point",
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:eval(iconScale),//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
heightReference:heightReference,//贴地
}
});	
}
if(width&&height&&ptEntity.billboard){
ptEntity.billboard.width=eval(width);
ptEntity.billboard.height=eval(height);	
}
return ptEntity;
}//e


/***************************封装创建多圆点entity(MultiDot,WGS84)***********************
 *参数:geoDatas(array):包含多点的几何数据*,二维数组,例如[[lon,lat],[lon,lat]]
 *****color(string):圆点颜色，十六进制格式颜色，默认为黄色
 *****[attr(object)]:该实体属性
 *****entityId(string):entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型,"relateId"关联id
 *注解:
 *1.创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiDotEntity=function(geoDatas,color="#CEE723",attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
let ptEntitys=[];
parentEntity=parentEntity || null;
color=color || "#CEE723";
attr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
if(geoDatas&&geoDatas.length>0&&entityId){
for(let i=0;i<geoDatas.length;i++){
let onePoint=geoDatas[i];
let lon=onePoint[0] || "";
let lat=onePoint[1] || "";
let z=onePoint[2] || 0;
if(onePoint&&onePoint.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
ptEntity=new Cesium.Entity({
id:entityId2,
title:"多圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
relateId:relateId,
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});
}
ptEntitys.push(ptEntity);
}
}
return ptEntitys;
}//e


/***************************封装创建多圆点entity(MultiDot,WGS84,symbol)***********************
 *参数:geoDatas(array):包含多点的几何数据*,二维数组,例如[[lon,lat],[lon,lat]]
 *****color(string):圆点颜色，十六进制格式颜色，默认为黄色
 *****[attr(object)]:该实体属性
 *****entityId(string):entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型,"relateId"关联id
 *注解:
 *1.创建多面实体要素时entityId必须提供，因为多面几何通过“entityId”进行关联，查找
 *2.“entityId”参数必须设置否则，该方法使用不了
 *3.带星号的参数为必选参数
 */
myCesium.createMultiDotEntity_sym=function(geoDatas,color="#CEE723",attr={},entityId="",pointSize="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
let ptEntitys=[];
parentEntity=parentEntity || null;
color=color || "#CEE723";
attr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
if(geoDatas&&geoDatas.length>0&&entityId){
for(let i=0;i<geoDatas.length;i++){
let onePoint=geoDatas[i];
let lon=onePoint[0] || "";
let lat=onePoint[1] || "";
let z=onePoint[2] || 0;
if(onePoint&&onePoint.length>0){
let relateId=entityId;//多面关联的相同的id用于查找
let entityId2=entityId+"_"+i;	
ptEntity=new Cesium.Entity({
id:entityId2,
title:"多圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
relateId:relateId,
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});
}
if(pointSize){
ptEntity.point.pixelSize=pointSize;	
}
ptEntitys.push(ptEntity);
}
}
return ptEntitys;
}//e



/***************************封装创建圆点要素entity(dot,WGS84,symbol)***********************
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z]    
 *****color(string):圆点颜色，十六进制格式颜色，默认为黄色
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[pointSize(number)]:圆点大小
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型
 */
myCesium.createDotEntity_sym=function(coord,color="#CEE723",attr={},entityId="",pointSize="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
parentEntity=parentEntity || null;
color=color || "#CEE723";
attr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
let lon=coord[0] || "";
let lat=coord[1] || "";
let z=coord[2] || 0;
z+=2;
if(lon&&lat&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});
}
else if(lon&&lat){
ptEntity=new Cesium.Entity({
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});	
}
if(pointSize){
ptEntity.point.pixelSize=pointSize;	
}
return ptEntity;
}//e

/***************************封装创建圆点要素entity(dot,WGS84)***********************
 *参数:coord(array):经纬度坐标,例如:[lon,lat]或[lon,lat,z]    
 *****color(string):圆点颜色，十六进制格式颜色，默认为黄色
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型
 */
myCesium.createDotEntity=function(coord,color="#CEE723",attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
parentEntity=parentEntity || null;
color=color || "#CEE723";
attr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
let lon=coord[0] || "";
let lat=coord[1] || "";
let z=coord[2] || 0;
if(lon&&lat&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});
}
else if(lon&&lat){
ptEntity=new Cesium.Entity({
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:Cesium.Cartesian3.fromDegrees(lon,lat,z),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});	
}
return ptEntity;
}//e


/***************************封装创建圆点要素entity(dot,世界坐标)***********************
 *参数:cartesian3(object):世界坐标，例如:{x:"",y:"",z:""}
 *****color(string):圆点颜色，十六进制格式颜色，默认为黄色
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *****[heightReference(HeightReference)]:实体的参考高度
 *返回值:ptEntity(Entity):点图标实体对象，该要素实体包含“geoType”几何类型
 */
myCesium.createDotEntity_car=function(cartesian3,color="#CEE723",attr={},entityId="",lyrId=null,parentEntity=null,heightReference=""){
let ptEntity="";
parentEntity=parentEntity || null;
color=color || "#CEE723";
attr=attr||{};
heightReference=(!heightReference&&heightReference!=0)?Cesium.HeightReference.CLAMP_TO_GROUND:heightReference;
if(cartesian3&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});
}
else if(cartesian3){
ptEntity=new Cesium.Entity({
title:"圆点实体",
layerId:lyrId,
parent:parentEntity,//父实体
geoType:"Dot",
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
point:new Cesium.PointGraphics({//实体的点符号
pixelSize:10,//
color:Cesium.Color.fromCssColorString(color),
outlineColor:Cesium.Color.fromCssColorString(color),
outlineWidth:2,
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
//scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:heightReference,//贴地
})
});	
}
return ptEntity;
}//e


/***************************封装鼠标悬空要素提示信息功能***********************
 *参数:screen_x(number):屏幕坐标x     
 *****screen_y(number):屏幕坐标y         屏幕坐标的原点为屏幕的坐上角   
 *****tipContent(string):设置提示的内容  
 *****offset_x(number):鼠标所在的屏幕与表与提示框显示位置坐标的x差值   
 *****offset_y(number):鼠标所在的屏幕与表与提示框显示位置坐标的y差值   
 *无返回值
 */
myCesium.hoverTipInfo=function(screen_x,screen_y,tipContent,offset_x=0,offset_y=0){
if(screen_x&&screen_y&&tipContent){
var tipdivNode=document.getElementById("tipDiv");
if(!tipdivNode){
tipdivNode=document.createElement("div");
tipdivNode.id="tipDiv";
tipdivNode.style="position:absolute;" 
+"z-index:9999;font-size:14px;color: #003EF5;border: 1px solid #87E3F1;padding: 1px 8px;"
+"background-color: rgb(255, 255, 255);box-shadow: 0px 0px 10px 0PX rgba(17, 186, 236, 0.78);" 
+"border-radius:8px;padding-top:5px;padding-bottom:5px;";
window.document.body.appendChild(tipdivNode);	
}
tipdivNode.innerHTML=tipContent;
tipdivNode.style.display="block";
tipdivNode.style.left=screen_x+offset_x+"px";
tipdivNode.style.top=screen_y+offset_y+"px";
}
}//e


/**************************封装图层几何要素显隐控制器************************
 *参数:viewer(Viewer):Viewer实例
 *****layerId(String):需要控制的图层id,即entity要素实体关联的图层id
 *****visibleStatus(boolean):设置图层实体要素显示的状态
 *返回值:lyrEntities(array):该图层关联的所有同类型的实体要素
 *注解:如果想使用该方法Entity实体要素中必须要有“layerId”属性，否则使用不了，例如new Entity({layerId:""})
 */
function setLayerFeatVisible(viewer="",layerId="",visibleStatus=true){
let lyrEntities=[];//该图层关联的所有同类型的实体要素
if(viewer&&layerId){
let entityCollection=viewer.entities.values;//获取地图上所有的entity实体
for(let i=0;i<entityCollection.length;i++){
let entity=entityCollection[i];//获取实体要素
let entityLyrId=entity.layerId || "";//实体所关联的图层id
if(entityLyrId==layerId){
entity.show=visibleStatus;
lyrEntities.push(entity);
}
}
}
return lyrEntities;
}//e


/****************封装在primitiveCollection集合中添加多个primitiveCollection图层**************
*参数:PrimitiveCollectionId(number):PrimitiveCollection集合id
*无返回值
*/
myCesium.addManyPrimitiveCollection=function(primitiveCollection="",priCollections=""){
if(primitiveCollection&&priCollections){
for(let i=0;i<priCollections.length;i++){
primitiveCollection.add(priCollections[i]);
}
}	
}//e

/*********************封装通过id查找PrimitiveCollection图层******************
*参数:viewer(Viewer):Viewer实例
*****PrimitiveCollectionId(number):PrimitiveCollection集合id
*返回值:primitiveCollection(PrimitiveCollection):查找的PrimitiveCollection集合
*/
myCesium.findPrimitiveCollection=function(viewer="",PrimitiveCollectionId=""){
let primitiveCollection="";
if(viewer&&PrimitiveCollectionId){
let Len=viewer.scene.primitives._primitives.length;//图层数
let lyrCollection=viewer.scene.primitives._primitives;
for(let i=0;i<Len;i++){
let lyr=lyrCollection[i];
if(lyr.id&&(lyr.id==PrimitiveCollectionId)){
primitiveCollection=lyr;
break;
}
}
}
return primitiveCollection;
}//e


/*********************封装WGS84坐标Wercator投影坐标(arcgis坐标转换的结果一样)******************
*参数:wgsLon(number):经度
*****wgsLat(number):纬度
*****elevation(number):地面高程
*返回值:wercatorObj(object):该对象包含x、y、z、srs属性
*/
myCesium.WGS84ToWercator=function(wgsLon,wgsLat,elevation=0){
let wercatorObj={};
if(wgsLon&&wgsLat&&elevation){
let x=wgsLon*20037508.342789/180;
let y=Math.log(Math.tan((90+wgsLat)*Math.PI/360))/(Math.PI/180);
y =y*20037508.34789/180+7.081154553416204e-10;	
wercatorObj={
"x":x,
"y":y,
"z":elevation,
"srs":"ESPG3857"
};
}
return wercatorObj;
}//e

/*********************封装空间笛卡尔坐标转WGS84坐标******************
*参数:cartesian3(cartesian3):空间笛卡尔坐标，例如:{x:"",y:"",z:""}
*返回值:WGS84Obj(object):该对象包含longitude、latitude、height、srs属性
*注解:使用该方法前需要提前引入Cesium.js文件，否则使用不了
*/
myCesium.cartesian3ToWGS84=function(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e

/*********************封装根据指定的坐标点采样地形高程数据获取高程(适用于在线、离线地形，准确)******************
*参数:wgs84Coords(array):WGS84坐标数组，二维坐标，不带有“z”坐标，即常规坐标，例如:[[lon,lat],[lon,lat]]
*****terrainProvider(TerrainProvider):DEM高程的TerrainProvider高程数据源
*****terrainLevel(number):从高程数据源指定级别数据高程
*****callback(function):查询结果的回调函数,回调函数的参数为带有z坐标的坐标数组，例如:[[lon,lat,z],[lon,lat,z]]
*无返回值
*注解:
*1.使用该方法前需要提前引入Cesium.js文件，否则使用不了
*2.wgs84Coords坐标为常规坐标，不带有“z”坐标，二维坐标
*3.callback回调函数的参数为:[[lon,lat,z],[lon,lat,z]]
*/
myCesium.getElevationByCoords=function(wgs84Coords,terrainProvider,terrainLevel,callback){
let coords=[];//需要查询高程的坐标点数组
terrainLevel=eval(terrainLevel) || 14;//terrain瓦片级别
if(wgs84Coords&&wgs84Coords.length>0&&terrainProvider){
for(let i=0;i<wgs84Coords.length;i++){
let lon=wgs84Coords[i][0] || "";
let lat=wgs84Coords[i][1] || "";
if(!lon||!lat)continue;
lon=eval(lon);
lat=eval(lat);
let cartographic=Cesium.Cartographic.fromDegrees(lon,lat);//将经纬度坐标转为弧度坐标，例如：{longitude:"",latitude:"",height:""}
coords.push(cartographic);
}
let promise=Cesium.sampleTerrain(terrainProvider,terrainLevel,coords);//高程采样
//Cesium高版本取消Cesium.when方法
promise.then(function(updatedPositions){
let coords_z=[];
if(updatedPositions&&updatedPositions.length>0){
for(let i=0;i<updatedPositions.length>0;i++){
let lon2=Cesium.Math.toDegrees(updatedPositions[i].longitude);//经度
let lat2=Cesium.Math.toDegrees(updatedPositions[i].latitude);//纬度
//let ele=updatedPositions[i].height>=0?parseInt(updatedPositions[i].height) : 0;//地面高程
let ele=updatedPositions[i].height>=0?eval(updatedPositions[i].height) : 0;//地面高程
ele=Math.ceil(ele)+1;//向上取整
if(lon2&&lat2)coords_z.push([lon2,lat2,ele]);
}
}
callback(coords_z);//返回查询高程结果
});
}
}//e


/******************常规经纬度坐标数组转换为cesium使用的Cartesian3坐标数组******************
*更新时间:2020.11.17 
*参数:coordDatas(array):常规的坐标数组，即二维数组,“z”坐标可选，例如:[[lon1,lat1,(height)],[lon2,lat2,(height)]]
*返回值:Cartesian3Coords(array):cesium格式的Cartesian3坐标数组，例如[{x:"",y:"",z:""},{x:"",y:"",z:""}]
*注解:
*1.使用该方法前需要提前引入Cesium.js文件，否则使用不了
*2.该方法用于转换经纬度的数组格式[[lon1,lat1],[lon2,lat2]]或[[lon1,lat1,z1],[lon2,lat2,z2]]为常规经纬度格式
*3.[{x:"",y:"",z:""},{x:"",y:"",z:""}]为cesium使用的Cartesian3数组
*4.支持二维坐标和三维坐标
*/
myCesium.transToCartesian3Coords=function(coordDatas){
let Cartesian3Coords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
let cesiumCoords=myCesium.transformToCesiumCoords(coordDatas);//cesium格式的经纬度坐标
if(coordDatas[0]&&coordDatas[0].length>2){//[lon,lat,height]坐标
Cartesian3Coords=Cesium.Cartesian3.fromDegreesArrayHeights(cesiumCoords);//转为为Cartesian3数组	
}
else{//[lon,lat]坐标
Cartesian3Coords=Cesium.Cartesian3.fromDegreesArray(cesiumCoords);//转为为Cartesian3数组	
}
}
return Cartesian3Coords;
}//e


/******************常规经纬度坐标数组转换为cesium常用格式的经纬度坐标数组******************
*参数:coordDatas(array):常规的坐标数组，例如:[[lon1,lat1],[lon2,lat2]]
*返回值:cesiumCoords(array):cesium格式的坐标数组，例如[lon1,lat1,lon2,lat2]
*注解:该方法用于转换经纬度的数组格式[[lon1,lat1],[lon2,lat2]]为常规经纬度格式
*[lon1,lat1,lon2,lat2]为cesium常用经纬度格式
*/
myCesium.transformToCesiumCoords=function(coordDatas){
let cesiumCoords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
for(let i=0;i<coordDatas.length;i++){
let coord=coordDatas[i];
let lon=coord[0] || "";
let lat=coord[1] || "";
if(lon&&lat){
cesiumCoords.push(lon);
cesiumCoords.push(lat);
if(coord.length>2){
let height=coord[2] || 0;
cesiumCoords.push(height);
}
}
}
}
return cesiumCoords;
}//e


/*******************根据比例尺获取地图zoom(geoserver格网)*************
 *更新时间:2021.03.04 wxt
 *参数:scaleD(number):地图比例尺
 *****tileResolutions?(Array):geoserver对应的tileResolutions,一般为3857格网层级
 *返回值:gridsetZoom(number):当前地图分辨率所属的格网级别
 *注解:
 *1.适用于任何EPSG4326和EPSG900913瓦片格网
 */
myCesium.getMapZoom_scaleD=function(scaleD,tileResolutions){
let gridsetZoom=null;
tileResolutions=tileResolutions||geoserverGridSet.EPSG3857.resolutions;
let currentResolution=myCesium.scaleD_to_Resolution(scaleD);
if(currentResolution&&tileResolutions){
let diff = Infinity;//最大数值
for(let i = 0;i<tileResolutions.length;i++){
let tileResolution = tileResolutions[i];//每一个级别的分辨率
let diffP=Math.abs(currentResolution-tileResolution);//当前分辨率里格网级别越近，差值越小
if (diffP<diff){//如果当前级别差值小于上一个级别分辨率差值，则取当前分辨率级别
diff=diffP;
gridsetZoom=i;
}
if(tileResolution < currentResolution){//当格网级别的分辨率小于当前地图分辨率则退出
break;
}
}
}
return gridsetZoom;
}//e


/*******************根据地图分辨率获取切片格网zoom(geoserver格网)*************
 *更新时间:2021.03.04 wxt
 *参数:currentResolution(number):当前地图分辨率
 *****tileResolutions?(Array):geoserver对应的tileResolutions,一般为3857格网层级
 *返回值:gridsetZoom(number):当前地图分辨率所属的格网级别
 *注解:
 *1.适用于任何EPSG4326和EPSG900913瓦片格网
 */
myCesium.getGridsetZoom_resolution=function(currentResolution,tileResolutions){
let gridsetZoom=null;
tileResolutions=tileResolutions||geoserverGridSet.EPSG3857.resolutions;
if(currentResolution&&tileResolutions){
let diff = Infinity;//最大数值
for(let i = 0;i<tileResolutions.length;i++){
let tileResolution = tileResolutions[i];//每一个级别的分辨率
let diffP=Math.abs(currentResolution-tileResolution);//当前分辨率里格网级别越近，差值越小
if (diffP<diff){//如果当前级别差值小于上一个级别分辨率差值，则取当前分辨率级别
diff=diffP;
gridsetZoom=i;
}
if(tileResolution < currentResolution){//当格网级别的分辨率小于当前地图分辨率则退出
break;
}
}
}
return gridsetZoom;
}//e


/*************************获取当前地图层级zoom************************
 *更新时间:2021.03.04 wxt
 *参数:viewer(Viewer):当前视图对象
 *返回地图级别结果
 *注解:
 *1.ceisum地图级别与ol地图级别相差1,即olZoom=cesiumZoom+1;
 *2.通过转换关系，这两个地图层级对应的范围是相同的
 */
myCesium.getMapZoom=function(viewer){
let mapZoom="";
if(viewer){
//当前视图相机高度(对椭球体高度,高度值不受地形影响)
let cameraHeight_gc=myCesium.getCameraHeight_gc(viewer);	
mapZoom=myCesium.getMapLevelByHeight(cameraHeight_gc)+1;
}
return mapZoom;
}//e


/*************************封装根据相机的高度获取地图的级别************************
 *参数:cameraHeight(number):当前相机高度
 *返回地图级别结果
 */
myCesium.getMapLevelByHeight=function(cameraHeight){
if(cameraHeight>48000000){
return 0;
}else if(cameraHeight>24000000){
return 1;
}else if(cameraHeight >12000000){
return 2;
}else if(cameraHeight>6000000){
 return 3;
}else if(cameraHeight>3000000){
return 4;
}else if(cameraHeight>1500000){
return 5;
}else if(cameraHeight>750000){
return 6;
}else if(cameraHeight>375000){
return 7;
}else if(cameraHeight>187500){
return 8;
}else if(cameraHeight>93750){
return 9;
}else if(cameraHeight>46875){
return 10;
}else if(cameraHeight>23437.5){
return 11;
}else if(cameraHeight>11718.75){
return 12;
}else if(cameraHeight>5859.38){
return 13;
}else if(cameraHeight>2929.69){
return 14;
}else if(cameraHeight>1464.84){
return 15;
}else if(cameraHeight>732.42){
return 16;
}else if(cameraHeight>366.21){
return 17;
}else{
return 18;
}
}//e


/*************************封装设置山体是否遮挡要素************************
 *参数:viewer(Viewer):当前视图对象
 *无返回值
 *注解:当“drawStatus=true”时不会开启地形遮挡
 */
window.drawStatus=false;//地图绘制几何状态
myCesium.setMountainCover=function(viewer){
if(viewer){
viewer.scene.preRender.addEventListener(function(evt){
var pitch=viewer.scene.camera.pitch;//相机俯角(-1.5-0)范围
if(pitch&&eval(pitch)>-0.45){
if(!window.drawStatus){
viewer.scene.globe.depthTestAgainstTerrain=true;//开启地形遮挡
}
}
else{
viewer.scene.globe.depthTestAgainstTerrain=false;//关闭地形遮挡
}
});	
}
}//e

/*************************封装禁止相机进入地下************************
 *参数:viewer(Viewer):当前视图对象
 *无返回值
 */
myCesium.disableSeeUndergroud=function(viewer=""){
let startMousePosition;
let mousePosition;
if(viewer){
viewer.clock.onTick.addEventListener(function(){//时钟跳动事件
setMinCamera();
}); 
let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement){
mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
handler.setInputAction(function(movement) {
mousePosition = movement.endPosition;
var y = mousePosition.y - startMousePosition.y;
if(y>0){
viewer.scene.screenSpaceCameraController.enableTilt = true;
}
},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
handler.setInputAction(function(movement){
handler.setInputAction(function(movement){
	
},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
},Cesium.ScreenSpaceEventType.MIDDLE_UP);
}
function setMinCamera(){
if(viewer.camera.pitch>0){
viewer.scene.screenSpaceCameraController.enableTilt = false;
}
}//e1
}//e

/*******************封装通过指定位置查询高程信息(适用于在线、离线地形,可能不准确)*******************
 *参数:lon(number):经度
 *****lat(number):纬度
 *****viewer(viewer):viewer实例
 *返回值:elevation(number):查询的地面高程
 */
myCesium.getElevationByCoord2=function(lon="",lat="",viewer){
let elevation=null;
if(lon&&lat){
let cartographic=Cesium.Cartographic.fromDegrees(eval(lon),eval(lat));//弧度坐标
elevation=viewer.scene.globe.getHeight(cartographic) || 0;
if(eval(elevation)<=0)elevation=0;
return elevation;
}
}//e

/*************************封装获取当前场景相机的高度(不包含高程,对地高度)************************
 *更新时间:2021.03.02 wxt
 *参数:viewer(Viewer):当前视图对象
 *返回值:height(Number):对地相机高度值
 *注解:
 *1.该方法获取的值受地形的影响
 */
myCesium.getCameraHeight=function(viewer=""){
let height="";
if(viewer){
let ellipsoid=viewer.scene.globe.ellipsoid;//椭球体
let cameraPosition=viewer.camera.position;//相机位置
cameraPosition=ellipsoid.cartesianToCartographic(cameraPosition);//弧度坐标
let height1=cameraPosition.height;//获取场景位置位于椭球体表面上的位置
let elevation=viewer.scene.globe.getHeight(cameraPosition);//高程,获取场景地表位置相对于椭球面高度
elevation=elevation&&elevation>0?elevation:0;
height=height1-elevation;
}
return height;
}//e

/*************封装获取当前场景相机的高度(包含高程,相对椭球体表面)****************
 *更新时间:2021.03.03 wxt
 *参数:viewer(Viewer):当前视图对象
 *返回值:height(Number):相机相对于椭球体表面的高度(包含高程)
 *注解:
 *1.该方法获取的值不受地形的影响
 */
myCesium.getCameraHeight_gc=function(viewer=""){
if(viewer){
let ellipsoid=viewer.scene.globe.ellipsoid;//参考椭球体
let height=ellipsoid.cartesianToCartographic(viewer.camera.position).height;
return height;
}
}//e


/*************************封装获取当前场景视图的中心坐标************************
 *参数:viewer(Viewer):当前视图对象
 *返回值:centerPt(object):包含中心点信息对象
 */
myCesium.getViewCenterPt=function(viewer=""){
let centerPt=null;
if(viewer){
let result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth/2,viewer.canvas.clientHeight/2));
if(result){
let curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
let lon = curPosition.longitude * 180 / Math.PI;
let lat = curPosition.latitude * 180 / Math.PI;
let height=getCameraHeight();
centerPt={
lon:lon,
lat:lat,
height:height
};
}
return centerPt;
}
function getCameraHeight(){
if (viewer){
let scene = viewer.scene;
let ellipsoid = scene.globe.ellipsoid;
let height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
return height;
}
}//e1
}//e

/*************************封装获取当前场景视图的范围************************
 *更新时间:2021.03.03
 *参数:viewer(Viewer):当前视图对象
 *返回值:extent(object):包含地图视图范围信息对象
 *注解:
 *1.extent={
 	xmin:"",
 	ymin:"",
 	xmax:"",
 	ymax:"",
 	height:"",
 }
 */
myCesium.getCurrentViewExtent=function(viewer=""){
if(viewer){
let extent = {};// 范围对象
let scene = viewer.scene;//得到当前三维场景
let ellipsoid = scene.globe.ellipsoid;//得到当前三维场景的椭球体
let canvas = scene.canvas;
let car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);//canvas左上角
let car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);//canvas右下角
if(car3_lt&&car3_rb){ // 当canvas左上角和右下角全部在椭球体上
let carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
let carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
}
else if(!car3_lt && car3_rb){// 当canvas左上角不在但右下角在椭球体上
let car3_lt2 = null;
let yIndex = 0;
do{
//这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
//yIndex <= canvas.height ? yIndex += 10 : canvas.height;
yIndex = canvas.height ? yIndex += 10 : canvas.height;
car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
} 
while (!car3_lt2);
let carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
let carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
}
extent.height = Math.ceil(viewer.camera.positionCartographic.height);//获取相机高度
return extent;
}
}//e

/*********************************Cesium扩展函数*************************************/
//1.viewer.then()
if(Cesium&&!Cesium.Viewer.prototype.then){
Cesium.Viewer.prototype.then=function(callback=function(){}){
window.setTimeout(callback,1000);	
}
}//end
if(Cesium){
//Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NjRjNGFjNy1jNDM3LTQzMTktODVlYS05YmFmOTAxYjk5MWUiLCJpZCI6Mzk5MSwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImlhdCI6MTUzOTU3OTE2NX0.-25udUzENRJ66mnICMK8Hfc6xgF_VP7P4sWkSHaUjOQ";	
//我的
Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOGI1MWNhMS02MTZkLTRlYWUtOWU0Zi03M2JlYTA2ZTg5YTkiLCJpZCI6MTI3NjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjE4NjE4NTh9.EbLY4fLD68THp6EFdm4JDSRnJbN2kDum6ehoowK9m8s";
}
else{
console.warn("未引入cesium.js文件！");
}
//设置mars
var logo_mars="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAD0lEQVQYV2NkwAIYaSAIAAGkAAa+Ds1zAAAAAElFTkSuQmCC";
if(window.mars3d&&window.mars3d.image){
window.mars3d.image.url=logo_mars;
}else{
window.setTimeout(function(){
if(window.mars3d&&window.mars3d.image)window.mars3d.image.url=logo_mars;
},1000);	
}
//地图缩放级别(包含地形)
window.mapZoom=[
 {zoom:0,height:22000000},
 {zoom:1,height:22000000},
 {zoom:2,height:1355484},
 {zoom:3,height:1355484},
 {zoom:4,height:1355484},
 {zoom:5,height:1355484},
 {zoom:6,height:1355484},
 {zoom:7,height:1355484},//sheng
 {zoom:8,height:1355484},
 {zoom:9,height:1355484},
 {zoom:10,height:447996},//shi
 {zoom:11,height:1355484},
 {zoom:12,height:217858},//xian
 {zoom:13,height:72192},//xiang
 {zoom:14,height:1355484},
 {zoom:15,height:1355484},
 {zoom:16,height:1355484},
 {zoom:17,height:1355484},
 {zoom:18,height:1355484},
];
//天地图key
window.key_tdt=[
"00c6e9c1be799e44a2e2f4fb801223cd",//company
//"1160dfb7250f4fced22b4130eedebb3b",//my
"2a0e637a8772d92b123ee8866dee4a82",//mars
"ef6151d9f0386f3b2a2fdf1d58fe9b32",//天地图官网
];
//星图key
window.keyXingTu = [
  '3ffa44dd1dcdd31b285da59e8ad30be457f80fe2b035840a8bfdcb5ab7512d31', //my
];

//export default myCesium;//暴露出去
