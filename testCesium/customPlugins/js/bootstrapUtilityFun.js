/*
 ***********************时间:2018.4.14 wxt**********************
 *更新时间:2019.12.26
 *************************一、插件概述*************************
 *该插件封装了一个bootstrapUtilityFun对象，该对象包含着关于bootstrap插件使用方法封装的方法
 *************************二、方法*************************
 *createFileInput_img(fileInputId,imgUpLoadUrl,param,uploadedFun):封装创建图片上传插件对象
 *createFileInput_excel(fileInputId,url,param,uploadedFun):封装创建上传excel插件对象
 *createBootstrapTable(TableId,dataUrl,queryParamFun,fieldColumns,clickRowFun):封装创建数据表格插件对象
 *initDateFun(classValue,inputId):封装初始化年月日插件
 *initYearFun(classValue,inputId):封装初始化年份插件
 *initMonthFun(classValue,inputId):封装初始化月份插件
 *initDayFun(classValue,inputId):封装初始化日期插件
 *initTimeFun(classValue,inputId):封装初始化时间插件
 *isEqualDate(date1,date2):判断两个Date日期对象是否相等
 *getTimeNumber(timeText):封获取年月日字符串中的时间数字
 *getFormatDate(myDate,timeType):将Date对象格式化为多种格式的时间字符串函数
 *************************三、说明*************************
 * 
 *   
 *    
 *    
 **************************四、注意*************************
 * 1.该文件的使用要放在所有引用的插件js文件的后面，否在该文件中封装的方法使用不了，
 * 该文件方法封装使用jquery进行封装，注意文件也要放到jquery.js的后面来引用
 * createFileInput_img()方法的使用必须有fileinput.css、fileinput.js、fileinput-zh.js
 *2.使用初始化年月日时间选择器插件时必须有datepicker3.css、datepicker.js、datepicker.zh-CN.js
 *3.使用createBootstrapTable()方法必须要引用bootstrap-table.css bootstrap-table.min.js  bootstrap-table-zh-CN.min.js
 *
 * */

var bootstrapUtilityFun={};
window.bootstrapUtilityFun=bootstrapUtilityFun;




/**********************判断两个Date日期对象是否相等**************
 *参数:date1(Date对象):Date时间 日期对象
 *****date2(Date对象):Date时间 日期对象
 *返回值:result(boolean):返回值日期对象是否相等  可选值:true,false
 */
bootstrapUtilityFun.isEqualDate=function(date1,date2){
var result="";
if(date1&&date2){
date1=formatDate(date1); 	
date2=formatDate(date2); 
result=(date1.getTime() == date2.getTime());	
}
function formatDate(myDate){
if(myDate){
var currentdate="";
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var strDate = myDate.getDate();
if(month >= 1 && month <= 9){
month = "0" + month;
}
if(strDate >= 0 && strDate <= 9){
strDate = "0"+strDate;
}
currentdate=year+"-"+month+"-"+strDate;	
currentdate=new Date(currentdate);
return currentdate;
}
}//e1
return result;
}//e



/************************将Date对象格式化为多种格式的时间字符串函数******************
 *参数:myDate(DateD对象):将要格式化的Date对象
 *****timeType(string):时间格式的类型，可选值为:"年月日"、"/"、"-"
 *返回值:currentdate(string):时间格式后的字符串
 *注解:返回的时间格式的个位数，显示为两位，
 *例如:
 *1.“2018-01-02”,不显示“2018-1-2”
 *2.“2018年01月02日”,不显示 “2018年1月2日”
 *3.“2018/01/02日”,不显示 “2018/1/2”
 */
bootstrapUtilityFun.getFormatDate=function(myDate,timeType){
if(myDate){
var currentdate="";
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;
var strDate = myDate.getDate();
if(month >= 1 && month <= 9){
month = "0" + month;
}
if(strDate >= 0 && strDate <= 9){
strDate = "0"+strDate;
}
if(timeType=="年月日"){//时间格式:2018年10月20日
currentdate=year+"年"+month+"月"+strDate+"日";	
}
else if(timeType=="/"){//时间格式:2018/10/20
currentdate=year+"/"+month+"/"+strDate;		
}
else if(timeType=="-"){
currentdate=year+"-"+month+"-"+strDate;		
}
else{//默认时间格式:2018-10-20
currentdate=year+"-"+month+"-"+strDate;		
}
return currentdate;
}
}//e



/**************封获取年月日字符串中的时间数字*************
 *参数:timeText(string):输入框的年份值
 *返回值:value(number):返回时间字符串中的时间数字
 *注解：例如：2018年转为2018    09月转为9
 */
bootstrapUtilityFun.getTimeNumber=function(timeText){
var value=timeText.replace(/[^0-9]/ig,""); 
value=eval(value);
return value;    
}//e



/**************封装初始化时间插件*************
 *参数:classValue(string):输入框的类值
 *****inputId(string):输入框的id值
 *无返回值
 *注解:使用该方法时该文件要在bootstrap-datetimepicker.js文件之后
 */
bootstrapUtilityFun.initTimeFun=function(classValue,inputId){
inputId=inputId || "";
classValue=classValue || "";
var obj;
if(classValue){
obj=$("."+classValue);	
}
else{
obj=$("#"+inputId);	
}
obj.datetimepicker({   
language:"zh-CN",
//format:"hh时",
autoclose:true,
});   
}//e

/**************封装初始化年月日插件*************
 *参数:classValue(string):输入框的类值
 *****inputId(string):输入框的id值
 *无返回值
 *注解:使用该方法时该文件要在bootstrap-datepicker.js文件之后
 */
bootstrapUtilityFun.initDateFun=function(classValue,inputId){
inputId=inputId || "";
classValue=classValue || "";
var obj;
if(classValue){
obj=$("."+classValue);	
}
else{
obj=$("#"+inputId);	
}
obj.datepicker({   
format:'yyyy年mm月dd日',  
weekStart:1,  
autoclose:true,  
yearSuffix:'年',//年的后缀  
startView:0,  
maxViewMode:0,
minViewMode:0,
forceParse:false,  
language:'zh-CN',
autoclose :true,
todayHighlight:false,//是否高亮今天日期
});   
}//e


/**************封装初始化年份插件*************
 *参数:classValue(string):输入框的类值
 *****inputId(string):输入框的id值
 *无返回值
 *注解:使用该方法时该文件要在bootstrap-datepicker.js文件之后
 */
bootstrapUtilityFun.initYearFun=function(classValue,inputId){
inputId=inputId || "";
classValue=classValue || "";
var obj;
if(classValue){
obj=$("."+classValue);	
}
else{
obj=$("#"+inputId);	
}
obj.datepicker({   
format: 'yyyy年',  
weekStart:1,  
autoclose:true,  
yearSuffix:'年', //年的后缀  
startView:0,  
maxViewMode:2,
minViewMode:2,
forceParse:false,  
language:'zh-CN',
autoclose :true,
todayHighlight:false,//是否高亮今天日期
});   
}//e
/**************封装初始化月份插件*************
 *参数:classValue(string):输入框的类值
 *****inputId(string):输入框的id值
 *无返回值
 *注解:使用该方法时该文件要在bootstrap-datepicker.js文件之后
 */
bootstrapUtilityFun.initMonthFun=function(classValue,inputId){
inputId=inputId || "";
classValue=classValue || "";
var obj;
if(classValue){
obj=$("."+classValue);	
}
else{
obj=$("#"+inputId);	
}
obj.datepicker({  	
language: "zh-CN",
todayHighlight: false,
format: 'mm月',
autoclose: true,
startView: 1,
maxViewMode: 1,
minViewMode:1, 
todayHighlight:false,//是否高亮今天日期
});  
}//e
/**************封装初始日期插件*************
 *参数:classValue(string):输入框的类值  标签元素可以是input、button
 *****inputId(string):输入框的id值
 *无返回值
 *注解:使用该方法时该文件要在bootstrap-datepicker.js文件之后
 *初始化插件时的元素可以是input、button
 */
bootstrapUtilityFun.initDayFun=function(classValue,inputId){
inputId=inputId || "";
classValue=classValue || "";
var obj;
if(classValue){
obj=$("."+classValue);	
}
else{
obj=$("#"+inputId);	
}
obj.datepicker({  
language: "zh-CN",
todayHighlight: false,
format: 'dd日',
autoclose: true,
startView: 0,
maxViewMode: 0,
minViewMode:0,
});
}//e
/***********************封装创建数据表格插件对象********************
 *参数:TableId(string):将要创建BootstrapTable的table标签id值
 *****dataUrl(string):服务器数据的加载地址
 *****queryParamFun(function):通过回调函数将参数传给后台 刷新回调该函数,函数带有一个param参数对象param.limit   param.offset   
 *****fieldColumns(array):表格的头字段数组
 *****clickRowFun(function):点击表格数据行回调的函数   包含参数：row
 *返回值:strapTableObj(object):数据表格对象
 */
bootstrapUtilityFun.createBootstrapTable=function(TableId,dataUrl,queryParamFun,fieldColumns,clickRowFun){
$("#"+TableId).bootstrapTable("destroy");//销毁存在的列表 
var strapTableObj=$("#"+TableId).bootstrapTable({
//data:sj,//加载json格式的数据数组  前台分页
url:dataUrl,//请求数据的路径
method:"POST",//请求的方式
contentType:"application/x-www-form-urlencoded;charset=UTF-8",//发送到服务器的数据编码类型
cache:false,//是否开启数据缓存
striped:true,//开启隔行变色
pagination:true,//是否显示底部分页工具栏
locale:"zh-CN",//显示为中文
sScrollXInner:5,
singleSelect:false,//设置 true将禁止多选
clickToSelect:false,//设置 true将在点击行时，自动选择 rediobox 和 checkbox
sidePagination:"server",//服务端处理分页
pageSize:10,//每页显示的数据个数，会被pagelist改变
pageNumber:1,//首页页码
pageList:[10,20,50,100],//设置每页显示的数据的个数快捷键
silent:true,//刷新事件必须设置 
paginationLoop:false,//是否启用分页条无限循环的功能
silent:true,//刷新事件必须设置 
queryParams:queryParamFun,
queryParamsType:"limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数    
columns:fieldColumns,//数据表的列字段
onClickRow:clickRowFun,//点击行回调函数事件
//paginationPreText:"上一页",//格式化上一页按钮
//paginationNextText:"下一页",//格式化下一页按钮
responseHandler:function(response){//处理返回的数据格式，这样可以改
return{
"rows":response.rows,//数组数据
"total":response.total,//数据总条数
};
},
formatLoadingMessage:function(){
return "请稍等，正在加载中...";
},
formatNoMatches:function(){
return "当前无符合条件的记录";
},
onLoadSuccess:function(data){//数据加载成功回调函数
    
}
});
}//e


/***********************封装创建图片上传插件对象*****************
 *参数:fileInputId(string):input 输入文件的id
 *****imgUpLoadUrl(string):图片上传的地址路径
 *****extraDataFun(Function):上传时传额外参数的回调函数，返回值必须是一个对象
 *****uploadedFun(function):图片上传完成的回调函数 包含的参数：event, data, previewId, index
 *返回值:fileinputObj(object):图片上传对象
 */
bootstrapUtilityFun.createFileInput_img=function(fileInputId,imgUpLoadUrl,extraDataFun,uploadedFun){
extraDataFun=extraDataFun||function(){return {}};
var fileinputObj=$("#"+fileInputId).fileinput({
language:"zh",
uploadUrl:imgUpLoadUrl,//图片上传的地址
uploadAsync:true,//上传异步
allowedFileExtensions:["jpg", "png","gif"],
overwriteInitial: false,
enctype:"multipart/form-data",
maxFileSize: 2000,
maxFilesNum: 10,
allowedFileTypes: ["image"],//允许上传的文件格式
showCaption:true,//是否显示标题
browseClass:"btn btn-info",//按钮样式 
dropZoneEnabled:true,//是否显示拖拽区域
//minImageWidth: 150,//图片的最小宽度
//minImageHeight:150,//图片的最小高度
//maxImageWidth: 1500,//图片的最大宽度
//maxImageHeight: 1500,//图片的最大高度
maxFileCount: 5, //表示允许同时上传的最大文件个数
showUploadedThumbs:true,
initialPreviewAsData:false,
purifyHtml:false,
overwriteInitial: false,
previewSettings: {//缩略图的显示大小
image: {width: "auto", height: "80px"},
},
layoutTemplates:{actions:""},//取消缩略图页脚下的按钮
slugCallback:function(filename){//文件的名字
return filename.replace('(', '_').replace(']', '_');
},
uploadExtraData:extraDataFun//向后台传额外参数的回调函数
}); 
//图片上传完成回调函数
if(uploadedFun){
fileinputObj.on("fileuploaded",uploadedFun);    
}
return fileinputObj;
}//e


/***********************封装创建上传excel插件对象*****************
 *参数:fileInputId(string):input 输入文件的id
 *****url(string):上传的地址路径
 *****param(object):上传过程中传入后台的额外参数
 *****uploadedFun(function):上传完成的回调函数 包含的参数：event, data, previewId, index
 *返回值:fileinputObj(object):上传对象
 */
bootstrapUtilityFun.createFileInput_excel=function(fileInputId,url,param,uploadedFun){
var fileinputObj;
if(fileInputId&&url){
fileinputObj=$("#"+fileInputId).fileinput({
language:"zh",//显示为中文
uploadUrl:url,// 设置excel文件上传的地址
uploadAsync:true,//异步上传
showUpload:true, //是否显示上传按钮,跟随文本框的那个
showRemove:true, //显示移除按钮,跟随文本框的那个
showCaption:true,//是否显示标题,就是那个文本框
showPreview:true, //是否显示预览,不写默认为true
dropZoneEnabled:true,//是否显示拖拽区域，默认不写为true，但是会占用很大区域
allowedFileExtensions:["xls", "xlsx","xml","XLS"],//接收的文件后缀
overwriteInitial: false,
enctype:"multipart/form-data",
maxFileSize: 3000,
maxFilesNum: 10,
allowedFileTypes: ["xls", "xlsx","xml","XLS"],//允许上传的文件格式
browseClass:"btn btn-info",//按钮样式 
showUploadedThumbs:true,
initialPreviewAsData:false,
purifyHtml:false,
//minImageWidth:150, //图片的最小宽度
//minImageHeight:150,//图片的最小高度
//maxImageWidth:1500,//图片的最大宽度
//maxImageHeight:1500,//图片的最大高度
maxFileCount:5,//表示允许同时上传的最大文件个数
layoutTemplates:{actions:""},//取消缩略图页脚下的按钮
previewZoomSettings:"",
slugCallback: function(filename) {
return filename.replace('(', '_').replace(']', '_');
},
previewFileIconSettings:{//修改文件显示的图标  注意要引入font-awesome.css文件
'docx':'<i ass="fa fa-file-word-o text-primary"></i>',
'xlsx':'<i class="fa fa-file-excel-o text-success"></i>',
'xls':'<i class="fa fa-file-excel-o text-success"></i>',
'pptx':'<i class="fa fa-file-powerpoint-o text-danger"></i>',
'jpg':'<i class="fa fa-file-photo-o text-warning"></i>',
'pdf':'<i class="fa fa-file-archive-o text-muted"></i>',
'zip':'<i class="fa fa-file-archive-o text-muted"></i>',
},
uploadExtraData: function(previewId, index){//向后台传额外参数
var obj = {};
if(param){
for(var i in param){
obj[i]=param[i];
}	
}
return obj;
},
});	
if(uploadedFun){
fileinputObj.on("fileuploaded",uploadedFun); 	
}
}
return fileinputObj;
}//e