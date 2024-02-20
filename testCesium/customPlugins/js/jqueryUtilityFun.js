/*
 ********************创建时间:2018.4.24 wxt*******************
 *更新时间:2020.08.13
 *************************一、插件概述*************************
 *该插件封装了一个jqueryUtilityFun对象，该对象包含着关于jquery中实用方法
 *************************二、方法****************************
 *ajax_jquery(requestUrl,CS_data,successFun,errorFun):封装jquery ajax请求
 *ajax_jquery_form(requestUrl,param,requestType,successFun,errorFun):封装jquery ajax请求(form格式)
 *ajax_jquery_json(requestUrl,param,requestType,successFun,errorFun):封装jquery ajax请求(json格式)
 *ajax_jquery_all(url,param,requestType,header,returnDateType,callback,errCallback):封装jquery ajax请求
 *attachShowList(containerId,downUrlObjs,attachPic):封装创建附件显示下载列表
 *attachShowList_url(containerId,downUrls,attachPic):封装创建附件显示下载列表(附件名字从路径中截取)
 *checkUrlStatus(requestUrl,timeOut,statusFun):封装判断请求路径的访问状态(支持跨域判断)
 *createPicCropperFun(fileInputId,imgId):创建图片裁剪模态框插件
 *isJsonStr(str):封装判断str字符串是否可以转为json对象
 *paramObjectToUrl(baseUrl,params):封装将参数对象格式化为url上
 *rollPicFun(ulId):封装图片横向走马灯滚动效果(仅滚动)
 *staticAndRollPic(imgDivContainerId,imgPaths,imgClickFun):封装展示静态和横向走马灯滚动效果图片(清空上一次的数据)
 *staticAndRollPic_noClear(imgDivContainerId,imgPaths,imgClickFun):封装展示静态和横向走马灯滚动效果图片(不会清空上一次的数据)
 *staticAndRollPic_sc(imgDivContainerId,obj_imgs,imgClickFun,closeFun):封装展示静态和横向走马灯滚动效果图片(每次调用会清空原来的数据,带有删除按钮)
 *sendMessage(phoneInputId,sendBtnId,sendInfoFun):封装发送手机验证码倒计时方法
 *urlParamToObject(url):封装将路径参数解析为对象
 *************************三、说明*************************
 * 
 *   
 * 
 * 
 **************************四、注意*************************
 * 1.checkUrlStatus()方法使用时，statusFun参数的格式应该为：
   function statusFun(requestStatus){
   if(requestStatus.status==200){
   console.log("请求访问成功");
   }
   else{
   console.log("请求访问失败");
   }
   }//e
 * 2.
 * 3.
 * */

//import $ from 'jquery';

var jqueryUtilityFun={};
window.jqueryUtilityFun=jqueryUtilityFun;



/************************封装将参数对象格式化为url上*********************
 *更新时间:2020.06.14
 *参数:baseUrl(string):基础路径,可以为"",如果为"",则没有"?"字符，例如"id=1",否则为"?id=1"
 *返回值:params(object):参数对象
 */
jqueryUtilityFun.paramObjectToUrl=function(baseUrl,params){
if(!params)return false;
//过滤任何空值或未定义的参数值
let keyParams = []; 
Object.keys(params).forEach(function (k){
if(params[k] !== null && params[k] !== undefined){
//keyParams.push(k + '=' + encodeURIComponent(params[k]));//特殊字符进行编码
keyParams.push(k + '=' + params[k]);//特殊字符不进行编码
}
});
let qs=keyParams.join('&'); // remove any trailing ? or &
baseUrl = baseUrl.replace(/[?&]$/, ''); // append ? or & depending on whether uri has existing parameters
if(baseUrl){
baseUrl = baseUrl.indexOf('?') === -1 ? baseUrl + '?' : baseUrl + '&';	
}else{
baseUrl = baseUrl.indexOf('?') === -1 ? baseUrl + '' : baseUrl + '&';		
}
return baseUrl + qs;
}//e




/************************创建时间轴控件*********************
 *参数:timePlayDivId(Array):时间轴容器divId
 *返回值:timeScales(Array):时间轴刻度对象数组,例如:[{label:"1",value:"1"}]
 ******playTime(number):时间轴播放速度，单位:"毫秒"
 ******callback(function):时间轴数值改变时回调，参数(scaleLabel,playTime))
 *注解:
 *1.回调参数说明:
 *	1)scaleLabel:当前时间位置对应的刻度对象
 *	2)playTime:时间轴对象实例
 *2.使用该方法前提需要引入"jquery.js"、"jquery.range.js"、
 *"bootstrap.css"、"jquery.range.min.css"、"timeSlider.css"类库，否则使用不了
 */
jqueryUtilityFun.createTimePlay=function(timePlayDivId,timeScales,playTime,callback){
	let scaleLabel=[];//刻度标注
	timeScales=timeScales||"1500"
	callback=callback||function(){};
	if(timePlayDiv&&timeScales&&timeScales.length>0){
		for(let i=0;i<timeScales.length;i++){
			let timeScale=timeScales[i];
			let labelVal=timeScale.label||"";
			scaleLabel.push(labelVal);
		}
		var timePlay='<div class="timePlayContainer" id="timePlayContainer">'+
				'<div class="time clearfix" >'+
					'<a class="clearfix_a" herf="javascript:void(0)">'+
									'<div class="demo fl">'+
							'<input type="hidden" value="" class="single-slider none">'+
						'</div>'+
					'</a>'+
				'</div>'+
				'<div class="playControl">'+
				'<a><span class="glyphicon glyphicon-step-backward control" name="后退" title="后退"></span></a>'+
				'<a><span class="glyphicon glyphicon-play control" name="播放" title="播放"></span></a>'+
				'<a><span class="glyphicon glyphicon-step-forward control" name="前进" title="前进"></span></a>'+
			'</div>'+
		 '</div>';
		 $("#"+timePlayDivId).html(timePlay);
		 $('.demo').children().remove();
		var div='<input type="hidden" value="" class="single-slider none">';
	    $('.demo').html(div)
	    var timePlayW=document.getElementById("timePlayContainer").clientWidth||500;
		window.clearInterval(window.timePlayStatus);
		$(".playControl .control[name=暂停]").addClass("glyphicon-play");
		$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
		$(".playControl .control[name=暂停]").attr("title","播放");
		$(".playControl .control[name=暂停]").attr("name","播放");
		//初始化时间轴
		$('.single-slider').jRange({
		    from:1,//数轴最小值的标注
		    to:scaleLabel.length,//数轴最大值的标注
		    step:1,//增量(步长)
		    scale:scaleLabel,//刻度条，均分数轴进行标注
		    format:function(value,type){//用来设置高亮时标签的格式 例如"%s 天"
		    	return value;
		    },
		    data:timeScales,
		    width:timePlayW,//宽度(默认300)
		    showScale:true,//显示刻度条
		    isRange:false,//是否为范围(默认false,选择一个点),如果是true，选择的是范围,格式为'1,2'
		    showLabels: false,//显示标签,移动滑块时显示的标注
		    snap:true,//是否只允许按增值选择(默认false)
		    onstatechange:function(value){//数字变化的时候的回调函数
		    	let scaleLabel=this.options.data||[];
		    	if(value){
		    		let idx=eval(value)-1;
		    		callback(scaleLabel[idx],this);
		    	}
		    },
		    ondragend:function(value){//拖动结束时的回调函数
		    	let scaleLabel=this.options.data||[];
		    	if(value){
		    		let idx=eval(value)-1;
		    		//callback("dragend",scaleLabel[idx],this);
		    	}
		    },
		    onbarclicked:function(value){//刻度条被按住时的回调函数
		    	let scaleLabel=this.options.data||[];
		    	if(value){
		    		let idx=eval(value)-1;
		    		//callback("dragend",scaleLabel[idx],this);
		    	}
		    }
		});
		//只绑一次click事件
		$(".playControl .control").unbind("click").bind("click",function(evt){
			let dom=evt.currentTarget;
			let name=$(dom).attr("name");
			if(name=="播放"){
				$(dom).removeClass("glyphicon-play");
				$(dom).addClass("glyphicon-pause");
				$(dom).attr("title","暂停");
				$(dom).attr("name","暂停");
				window.timePlayStatus=window.setInterval(function(){
					let currentValue=$('.single-slider').jRange('getValue');//当前值
					let minValue=$('.single-slider').jRange('getOptions').from;//时间轴最小值
					let maxValue=$('.single-slider').jRange('getOptions').to;//时间轴最大值
					let step=$('.single-slider').jRange('getOptions').step;//步长
					let toValue=(eval(currentValue)+eval(step)).toString();
					if(eval(toValue)<=eval(maxValue)){
						$('.single-slider').jRange('setValue',toValue);
					}
					else{
						$(".playControl .control[name=暂停]").addClass("glyphicon-play");
						$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
						$(".playControl .control[name=暂停]").attr("title","播放");
						$(".playControl .control[name=暂停]").attr("name","播放");
						window.clearInterval(window.timePlayStatus);
					}
				},eval(playTime));
			}
			else if(name=="暂停"){
				$(dom).addClass("glyphicon-play");
				$(dom).removeClass("glyphicon-pause");
				$(dom).attr("title","播放");
				$(dom).attr("name","播放");
				window.clearInterval(window.timePlayStatus);
			}
			else if(name=="前进"){//前进按钮
				$(".playControl .control[name=暂停]").addClass("glyphicon-play");
				$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
				$(".playControl .control[name=暂停]").attr("title","播放");
				$(".playControl .control[name=暂停]").attr("name","播放");
				window.clearInterval(window.timePlayStatus);
				let currentValue=$('.single-slider').jRange('getValue');//当前值
				let minValue=$('.single-slider').jRange('getOptions').from;//时间轴最小值
				let maxValue=$('.single-slider').jRange('getOptions').to;//时间轴最大值
				let step=$('.single-slider').jRange('getOptions').step;//步长
				let toValue=(eval(currentValue)+eval(step)).toString();
				if(eval(toValue)<=eval(maxValue)){
					$('.single-slider').jRange('setValue',toValue);
				}
				else{
					$(".playControl .control[name=暂停]").addClass("glyphicon-play");
					$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
					$(".playControl .control[name=暂停]").attr("title","播放");
					$(".playControl .control[name=暂停]").attr("name","播放");
					window.clearInterval(window.timePlayStatus);
				}
			}
			else if(name=="后退"){//后退按钮
				$(".playControl .control[name=暂停]").addClass("glyphicon-play");
				$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
				$(".playControl .control[name=暂停]").attr("title","播放");
				$(".playControl .control[name=暂停]").attr("name","播放");
				window.clearInterval(window.timePlayStatus);
				let currentValue=$('.single-slider').jRange('getValue');//当前值
				let minValue=$('.single-slider').jRange('getOptions').from;//时间轴最小值
				let maxValue=$('.single-slider').jRange('getOptions').to;//时间轴最大值
				let step=$('.single-slider').jRange('getOptions').step;//步长
				let toValue=(eval(currentValue)-eval(step)).toString();
				if(eval(toValue)>=eval(minValue)){
					$('.single-slider').jRange('setValue',toValue);
				}
				else{
					$(".playControl .control[name=暂停]").addClass("glyphicon-play");
					$(".playControl .control[name=暂停]").removeClass("glyphicon-pause");
					$(".playControl .control[name=暂停]").attr("title","播放");
					$(".playControl .control[name=暂停]").attr("name","播放");
					window.clearInterval(window.timePlayStatus);
				}
			}
		});
	}
}//e




/************************封装将路径参数解析为对象*********************
 *更新时间:2020.06.14
 *参数:url(string):带参数的请求地址
 *返回值:paramObject(object):解析的参数对象
 */
jqueryUtilityFun.urlParamToObject=function(url=""){
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


/******************************封装jquery ajax请求(json格式)**********************
 *更新时间:2021.03.10 wxt
 *参数:requestUrl(String):请求的路径
 ****param(object):参数对象 
 ****requestType(String):请求类型"GET"、"POST"
 ****successFun(function):成功回调的函数
 ****errorFun(function):错误回调的函数
 *无返回值
 *注解:
 *该方法是对jquery ajax请求的二次封装，返回的数据包含"GET"、"POST"请求的参数和请求的数据，
 *便于其他开发需求
 *
 */
jqueryUtilityFun.ajax_jquery_json=function(requestUrl,param,requestType,successFun,errorFun){
param=param||{};
requestType=requestType||"GET";
errorFun=errorFun||function(){};   
successFun=successFun||function(){};
//if(requestType=="POST"||requestType=="post"||requestType=="Post")param=JSON.stringify(param);
$.ajax({
url:requestUrl,
type:requestType,
data:param,//请求参数
contentType:"application/json;charset=utf-8",
async:true,
//dataType:returnDateType,//"text"服务器返回的数据类型,注意设置的类型否则会报“parsererrorSyntaxError”
success:function(data,textStatus,jqXHR){
let statusCode=textStatus=="success"?200:-1;//请求状态：成功:200,失败:-1
let requestType=this.type||"";//请求类型
let requestParam=this.data||{};//请求参数
let requestUrl=this.url;//请求路径
if(typeof(requestParam)=="string")requestParam=JSON.parse(requestParam);
if(requestType=="GET"||requestType=="get"||requestType=="Get"){
requestUrl=window.decodeURIComponent(requestUrl);//url解码,避免中文乱码
requestParam=jqueryUtilityFun.urlParamToObject(requestUrl);
}
let responseData={
status:statusCode,//状态码
param:requestParam,//参数对象
returnData:data//请求响应数据
};
successFun(responseData,this);//"this"为本次ajax请求时传递的options参数对象
},
error:function(XMLHttpRequest,textStatus,errorThrown){
//通常情况下textStatus和errorThrown只有其中一个包含信息
errorFun(textStatus+errorThrown,this);
}
});    
}//e



/******************************封装jquery ajax请求(form格式)**********************
 *更新时间:2021.03.10 wxt
 *参数:requestUrl(String):请求的路径
 ****param(object):参数对象 
 ****requestType(String):请求类型"GET"、"POST"
 ****successFun(function):成功回调的函数
 ****errorFun(function):错误回调的函数
 *无返回值
 *注解:
 *1.当以“application/x-www-form-urlencoded”传递参数时，参数自动会转为"id=1&name=form"格式
 	例如:
 	var param={id:"1",name:"form",userId:"5101"},转为表单参数格式"id=1&name=form&userId=5101"
 *2.返回的数据结构
 var result={
	status:statusCode,//状态码
	param:requestParam,//参数对象
	returnData:data//请求响应数据
 };
 */
jqueryUtilityFun.ajax_jquery_form=function(requestUrl,param,requestType,successFun,errorFun){
param=param||{};
requestType=requestType||"GET";
errorFun=errorFun||function(){};   
successFun=successFun||function(){};
$.ajax({
url:requestUrl,
type:requestType,
data:param,//请求参数
contentType:"application/x-www-form-urlencoded;charset=UTF-8",
async:true,
//dataType:returnDateType,//"text"服务器返回的数据类型,注意设置的类型否则会报“parsererrorSyntaxError”
success:function(data,textStatus,jqXHR){
let statusCode=textStatus=="success"?200:-1;//请求状态：成功:200,失败:-1
let requestType=this.type||"";//请求类型
let requestParam=this.data||{};//get请求为undefined,post请求参数格式“id=1&name=form&userId=5101”
let requestUrl=this.url;//请求路径
if(requestType=="GET"||requestType=="get"||requestType=="Get"){//参数拼写在url上
requestUrl=window.decodeURIComponent(requestUrl);//url解码,避免中文乱码
requestParam=jqueryUtilityFun.urlParamToObject(requestUrl);
}
else if(typeof(requestParam)=="string"){//post请求"id=1&name=form",解析为参数对象
requestParam=jqueryUtilityFun.urlParamToObject("?"+requestParam);
}
let responseData={
status:statusCode,//状态码
param:requestParam,//参数对象
returnData:data//请求响应数据
};
successFun(responseData,this);//"this"为本次ajax请求时传递的options参数对象
},
error:function(XMLHttpRequest,textStatus,errorThrown){
//通常情况下textStatus和errorThrown只有其中一个包含信息
errorFun(textStatus+errorThrown,this);
}
});    
}//e



/*************************封装判断str字符串是否可以转为json对象******************************************
 *参数:str(string):字符串
 *返回值(boolean):返回判断结果
 *注解:
 */
jqueryUtilityFun.isJsonStr=function(str){
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


/****************************封装jquery的ajax请求*******************************
 *更新时间:2020.08.13
 *参数:url(string):请求地址
 *****param(object):请求参数
 *****requestType(string):请求类型,默认"GET"可选值:"GET","POST","PUT","DELETE"
 *****header(object):设置请求头
 *****returnDataType(string):要求为String类型的参数，预期服务器返回的数据类型，可选值"text"、"xml"、"html"、"script"、"json"、"jsonp"
 *****callback(function):请求数据成功完成回调函数
 *****errCallback(function):[option]请求数据失败回调函数
 *无返回值
 *注解：
 *1."POST"、“PUT”请求成功后，可通过“this.data”可获取请求的参数
 *2."GET"请求没有“this.data”属性
 *3."DELETE"请求成功后“this.data”属性为空
 *4.contentType属性值可通过“headers={'Content-type': 'text/xml'}”进行修改
 *5.'Content-type'可选值：
 	1)"application/x-www-form-urlencoded;charset=UTF-8"
 	2)"application/json;charset=utf-8"
 	3)"text/xml"
 */
jqueryUtilityFun.ajax_jquery_all=function(url="",param={},requestType="GET",header={},returnDataType,successFun,errorFun){
param=param||{};
requestType=requestType||"GET";
errorFun=errorFun||function(){};   
successFun=successFun||function(){};
header=header||{};
returnDataType=returnDataType||"text";
if(url){
$.ajax({
url:url,
type:requestType,
data:param,
//contentType:"application/json",//传给服务器数据参数的类型,当发送信息至服务器时，内容编码类型默认为"application/x-www-form-urlencoded"
dataType:returnDataType,//"text"服务器返回的数据类型,注意设置的类型否则会报“parsererrorSyntaxError”
headers:header,
success:function(data,textStatus,jqXHR){
let statusCode=textStatus=="success"?200:-1;//请求状态：成功:200,失败:-1
let requestType=this.type||"";//请求类型
let requestParam=this.data||{};//get请求为undefined,post请求参数格式“id=1&name=form&userId=5101”
let requestUrl=this.url;//请求路径
if(requestType=="GET"||requestType=="get"||requestType=="Get"){//参数拼写在url上
requestParam=jqueryUtilityFun.urlParamToObject(requestUrl);
}
else if(typeof(requestParam)=="string"){//post请求"id=1&name=form",解析为参数对象
requestParam=jqueryUtilityFun.urlParamToObject("?"+requestParam);
}
let responseData={
status:statusCode,//状态码
param:requestParam,//参数对象
returnData:data//请求响应数据
};
successFun(responseData,this);//"this"为本次ajax请求时传递的options参数对象
},
error:function(XMLHttpRequest,textStatus,errorThrown){
//通常情况下textStatus和errorThrown只有其中一个包含信息
errorFun(textStatus+errorThrown,this);
}
});
}
}//e



/************************创建图片裁剪模态框插件*******************
 *参数:fileInputId(string):文件选择输入框Id 
 *****imgId(string):裁剪结果输入的img标签的Id值
 *无返回值
 *注解:使用该方法之前必须要引入jquery.js、bootstrap.css、bootstrap.js、
 *cropper.css、cropper.js、myCropper.css文件，否则不能使用
 */
jqueryUtilityFun.createPicCropperFun=function(fileInputId,imgId){
if(fileInputId&&imgId){
initCropperFun();//初始化图片裁剪函数
operateBtnFun();//操作按钮
$("#"+fileInputId).change(function(){
if(!this.files || !this.files[0]){
return;
}
var reader=new FileReader();
reader.onload=function(evt){
var replaceSrc=evt.target.result;
$('#tailoringImg').cropper('replace',replaceSrc,false);//默认false，适应高度，不失真
}
reader.readAsDataURL(this.files[0]);
});	
}
function operateBtnFun(){//操作按钮
$(".sureCut").on("click",function(){//确定裁剪后的处理
if($("#tailoringImg").attr("src") == null ){
return false;
}
else{
var cas=$('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
$("#clipRes").prop("src",base64url);//显示为图片的形式
}
});
$(".cropper-rotate-btn").on("click",function(){//旋转操作
$('#tailoringImg').cropper("rotate", 45);
});

$(".cropper-reset-btn").on("click",function(){//复位操作
$('#tailoringImg').cropper("reset");
});
var flagX=true;
$(".cropper-scaleX-btn").on("click",function(){//换向操作
if(flagX){
$('#tailoringImg').cropper("scaleX", -1);
flagX=false;
}
else{
$('#tailoringImg').cropper("scaleX", 1);
flagX=true;
}
flagX=!flagX;
});	
}//e2

function initCropperFun(){//初始化图片裁剪函数
$('#tailoringImg').cropper({
aspectRatio: 1/1,//默认比例
preview:'.previewImg',//预览视图
guides: false,//裁剪框的虚线(九宫格)
autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
movable: false, //是否允许移动图片
dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
movable: true,  //是否允许移动剪裁框
resizable: true,  //是否允许改变裁剪框的大小
zoomable: false,  //是否允许缩放图片大小
mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
rotatable: true,  //是否允许旋转图片
background:false,//是否显示背景的黑白方格
crop: function(e){
// 输出结果数据裁剪图像。
}
});
}//e1
}//e

/*****************封装发送手机验证码倒计时方法***************
 *参数:phoneInputId(string):手机号码的输入框id值
 *****sendBtnId(string):点击发送验证码按钮id值  只能使用input:button类型的按钮，不能使用<button>的按钮标签
 *****sendInfoFun(function):调用后台发送验证码的函数     不带有参数
 *无返回值
 */
jqueryUtilityFun.sendMessage=function(phoneInputId,sendBtnId,sendInfoFun){
var phoneReg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;//手机号正则 
var count=60;//间隔函数，1秒执行
var InterValObj1; //timer变量，控制时间
var curCount1;//当前剩余秒数
var sendInfoFun=sendInfoFun || function(){};
if(phoneInputId&&sendBtnId){
curCount1=count;
var phone=$.trim($("#"+phoneInputId).val());//去除字符串两端的空格
if (!phoneReg.test(phone)){//检测输入的手机号码的格式
alert(" 请输入有效的手机号码"); 
}
else{
$("#"+sendBtnId).attr("disabled", "true");
$("#"+sendBtnId).val( + curCount1 + "秒");
InterValObj1 = window.setInterval(SetRemainTime1, 1000); //启动计时器，1秒执行一次	
sendInfoFun();
}
function SetRemainTime1(){
if(curCount1==0){                
window.clearInterval(InterValObj1);//停止计时器
$("#"+sendBtnId).removeAttr("disabled");//启用按钮
$("#"+sendBtnId).val("重新发送");
}
else {
curCount1--;
$("#"+sendBtnId).val( + curCount1 + "秒");
}
}
}
}//e


/**********************封装创建附件显示下载列表******************
 *参数:containerId(string):附件容器的div的id值
 *****downUrlObjs(array):包含附件下载的路径和名字对象数组[{title:"",url:""}]
 *****attachPic(string):附件显示图标的路径
 *无返回值
 *注解：该插件基于jquery基础上进行使用
 */
jqueryUtilityFun.attachShowList=function(containerId,downUrlObjs,attachPic){
if(containerId&&downUrlObjs&&downUrlObjs.length>0){
attachPic=attachPic || "utilityIcons/fujian_down4.png";	
$("#"+containerId).html("");
var ulDom="<ul class='attach_ul'></ul>";
$("#"+containerId).append(ulDom);
for(var i=0;i<downUrlObjs.length;i++){
var url=downUrlObjs[i].url;
var title=downUrlObjs[i].title || "未命名";
if(url){
var liDom="<li class='attach_li'>"+
"<a href='"+url+"' download='' class='attach_a'>"+
"<img src='"+attachPic+"' width=72 height=72>"+
"<span class='attach_title'>"+title+"</span>"+
"</a>"+
"</li>"; 
}	
$(".attach_ul").append(liDom);
}
}	
}//e


/**********************封装创建附件显示下载列表(附件名字从路径中截取)******************
 *参数:containerId(string):附件容器的div的id值
 *****downUrls(array):附件下载的路径数组
 *****attachPic(string):附件显示图标的路径
 *无返回值
 *注解：该插件基于jquery基础上进行使用
 */
jqueryUtilityFun.attachShowList_url=function(containerId,downUrls,attachPic){
if(containerId&&downUrls&&downUrls.length>0){
attachPic=attachPic || "utilityIcons/fujian_down4.png";	
$("#"+containerId).html("");
var ulDom="<ul class='attach_ul'></ul>";
$("#"+containerId).append(ulDom);
for(var i=0;i<downUrls.length;i++){
var url=downUrls[i];
if(url){
var url1=url.split("/");
var n=url1[url1.length-1];
var title=n.split(".")[0];
var liDom="<li class='attach_li'>"+
"<a href='"+url+"' download='' class='attach_a'>"+
"<img src='"+attachPic+"' width=72 height=72>"+
"<span class='attach_title'>"+title+"</span>"+
"</a>"+
"</li>"; 
}	
$(".attach_ul").append(liDom);
}
}	
}//e


/********************封装展示静态和横向走马灯滚动效果图片(显示传入的图片路径数组，不会清空原来数据,不带删除按钮)*************
 *参数:imgDivContainerId(string):显示图片div容器的id值
 *****imgPaths(Array):显示图片的图片路径数组
 *****imgClickFun(function):展示图片点击回调的函数
 *无返回值
 *注解：
 *1.每次都会累加显示图片，不会清除上一次的图片内容
 *2.需要引入webCustomPlugin.css和jqueryUtilityFun.js文件
 */	
jqueryUtilityFun.staticAndRollPic_noClear=function(imgDivContainerId,imgPaths,imgClickFun){  
window.imgClickFun=imgClickFun || function(){};
if(imgDivContainerId&&imgPaths){
var showpic1="<div class='rollingPic'>"+
				"<ul id='rollingUl'>"+
				"</ul>"+
			 "</div>";
var rollingUlDom=document.getElementById("rollingUl");
if(!rollingUlDom){
$("#"+imgDivContainerId).html(showpic1);    
}
for(var i=0;i<imgPaths.length;i++){
var imgUrl=imgPaths[i];
var imgLi="<li><a><img src='"+imgUrl+"' onclick='imgClickFun(this);'></a></li>";
$('#rollingUl').append(imgLi);
}
$('#rollingUl li img').click(imgClickFun);
var imgLength=$('#rollingUl li').length; 
if(imgLength<=3){//小于4张图片
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();//单张图片li的宽度
var ulWidth=imgLength*aliWidth;	
$('.rollingPic').width(ulWidth);	//设置ul图片的宽度
}
else{
var oul=$('#rollingUl');//获取滚动ul
var oulHtml=oul.html();
oul.html(oulHtml+oulHtml)
var timeId=null;
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();
var aliSize=ali.length;//li元素的个数
var ulWidth=aliWidth*aliSize;
oul.width(ulWidth);	//1600px
var speed = -2;
timeId = setInterval(slider,30);
$('#rollingUl').mouseover(function(){
clearInterval(timeId);// clearInterval()函数的作用是用来清除定时器
});
$('#rollingUl').mouseout(function(){
timeId = setInterval(slider,30);
});   
}
}
function slider(){
if(speed<0){
if(oul.css('left')==-ulWidth/2+'px'){
oul.css('left',0);
}
oul.css('left','+=-2px');
}
if(speed>0){
if(oul.css('left')=='0px'){
oul.css('left',-ulWidth/2+'px');
}
oul.css('left','+='+speed+'px');
}	
}
}//e


/************封装展示静态和横向走马灯滚动效果图片(每次调用会清空原来的数据,带有删除按钮)***********
 *参数:imgDivContainerId(string):显示图片div容器的id值
 *****obj_imgs(Array):包含图片相关属性的对象数组,必须包括imgId,imgUrl字段，例如:[{imgId:"",imgUrl:""}]
 *****imgClickFun(function):展示图片点击回调的函数
 *****closeFun(function):点击关闭按钮回调的函数
 *无返回值
 *注解：
 *1.需要引入webCustomPlugin.css和jqueryUtilityFun.js文件
 */	
jqueryUtilityFun.staticAndRollPic_sc=function(imgDivContainerId,obj_imgs,imgClickFun,closeFun){  
window.imgClickFun=imgClickFun || function(){};
window.closeFun=closeFun || function(){};
if(imgDivContainerId&&obj_imgs){
var imgLength=obj_imgs.length; 
var showpic1="<div class='rollingPic'>"+
				"<ul id='rollingUl'>"+
				"</ul>"+
			 "</div>";
$("#"+imgDivContainerId).html("");
if(imgLength>0){
$("#"+imgDivContainerId).html(showpic1);	
}
for(var i=0;i<obj_imgs.length;i++){
var imgUrl=obj_imgs[i].imgUrl || "";
var imgId=obj_imgs[i].imgId || "";
var imgLi="<li>"+
"<a id='"+imgId+"' class='rollingPic_close' onclick='closeFun(this);'>"+
"<span class='rollingPic_zi'>×</span>"+
"</a>"+
"<a><img src='"+imgUrl+"' onclick='imgClickFun(this);'></a>"+
"</li>";
$('#rollingUl').append(imgLi);
}
$('#rollingUl li img').click(imgClickFun);
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();
var aliSize=ali.length;//li元素的个数
if(imgLength<=3){
var imgUl=aliSize*aliWidth;
$(".rollingPic").css("width",imgUl);
}
else{
$(".rollingPic").css("width","600px");
var oul=$('#rollingUl');//获取滚动ul
var oulHtml=oul.html();
oul.html(oulHtml+oulHtml)
var timeId=null;
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();
var aliSize=ali.length;//li元素的个数
var ulWidth=aliWidth*aliSize;
oul.width(ulWidth);	//1600px
var speed = -2;
timeId = setInterval(slider,30);
$('#rollingUl').mouseover(function(){
clearInterval(timeId);// clearInterval()函数的作用是用来清除定时器
});
$('#rollingUl').mouseout(function(){
timeId = setInterval(slider,30);
});   
}
}
function slider(){
if(speed<0){
if(oul.css('left')==-ulWidth/2+'px'){
oul.css('left',0);
}
oul.css('left','+=-2px');
}
if(speed>0){
if(oul.css('left')=='0px'){
oul.css('left',-ulWidth/2+'px');
}
oul.css('left','+='+speed+'px');
}	
}
}//e


/************封装展示静态和横向走马灯滚动效果图片(仅能显示传入数组中的图片，每次调用会清空原来的数据，不带删除按钮)***********
 *参数:imgDivContainerId(string):显示图片div容器的id值
 *****imgPaths(Array):显示图片的图片路径数组
 *****imgClickFun(function):展示图片点击回调的函数
 *无返回值
 *注解：
 *1.需要引入webCustomPlugin.css和jqueryUtilityFun.js文件
 */	
jqueryUtilityFun.staticAndRollPic=function(imgDivContainerId,imgPaths,imgClickFun){  
window.imgClickFun=imgClickFun || function(){};
if(imgDivContainerId&&imgPaths){
var imgLength=imgPaths.length; 
var showpic1="<div class='rollingPic'>"+
				"<ul id='rollingUl'>"+
				"</ul>"+
			 "</div>";
$("#"+imgDivContainerId).html("");
if(imgLength>0){
$("#"+imgDivContainerId).html(showpic1);	
}
for(var i=0;i<imgPaths.length;i++){
var imgUrl=imgPaths[i];
var imgLi="<li><a><img src='"+imgUrl+"' onclick='imgClickFun(this);'></a></li>";
$('#rollingUl').append(imgLi);
}
$('#rollingUl li img').click(imgClickFun);
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();
var aliSize=ali.length;//li元素的个数
if(imgLength<=3){
var imgUl=aliSize*aliWidth;
$(".rollingPic").css("width",imgUl);
}
else{
//$(".rollingPic").css("width","400px");//大于两张滚动的宽度
$(".rollingPic").css("width","600px");//大于三张滚动的宽度
//$(".rollingPic").css("width","100%");//滚动的宽度适应滚动容器的宽度，必须设置容器宽度
var oul=$('#rollingUl');//获取滚动ul
var oulHtml=oul.html();
oul.html(oulHtml+oulHtml)
var timeId=null;
var ali=$('#rollingUl li');
var aliWidth=ali.eq(0).width();
var aliSize=ali.length;//li元素的个数
var ulWidth=aliWidth*aliSize;
oul.width(ulWidth);	//1600px
var speed = -2;
timeId = setInterval(slider,30);
$('#rollingUl').mouseover(function(){
clearInterval(timeId);// clearInterval()函数的作用是用来清除定时器
});
$('#rollingUl').mouseout(function(){
timeId = setInterval(slider,30);
});   
}
}
function slider(){
if(speed<0){
if(oul.css('left')==-ulWidth/2+'px'){
oul.css('left',0);
}
oul.css('left','+=-2px');
}
if(speed>0){
if(oul.css('left')=='0px'){
oul.css('left',-ulWidth/2+'px');
}
oul.css('left','+='+speed+'px');
}	
}
}//e

/********************封装图片横向走马灯滚动效果(仅滚动)*************
 *参数:ulId(string):滚动图片外层ul的id值
 *****imgClickFun(function):展示图片点击回调的函数
 *无返回值
 */
jqueryUtilityFun.rollPicFun=function(ulId,imgClickFun){
if(ulId){
window.imgClickFun=imgClickFun || function(){};  
var rollingUlId="#"+ulId;   
var oul=$(rollingUlId);//获取滚动ul
var oulHtml=oul.html();
oul.html(oulHtml+oulHtml)
var timeId = null;
var imgs=$(rollingUlId+' li img');
for(var i=0;i<imgs.length;i++){
var img1=imgs[i];
img1.onclick=imgClickFun;
}
var ali = $(rollingUlId+' li');
var aliWidth = ali.eq(0).width();
var aliSize = ali.length;//li元素的个数
var ulWidth = aliWidth*aliSize;
oul.width(ulWidth);	//1600px
var speed = -2;
timeId = setInterval(slider,30);
$(rollingUlId).mouseover(function(){
clearInterval(timeId);// clearInterval()函数的作用是用来清除定时器
});
$(rollingUlId).mouseout(function(){
timeId = setInterval(slider,30);
});
} 
function slider(){
if(speed<0){
if(oul.css('left')==-ulWidth/2+'px'){
oul.css('left',0);
}
oul.css('left','+=-2px');
}
if(speed>0){
if(oul.css('left')=='0px'){
oul.css('left',-ulWidth/2+'px');
}
oul.css('left','+='+speed+'px');
}	
}
}//e

/********************封装jquery ajax请求****************
 *参数:requestUrl(string):请求的路径
 *****CS_data(object):参数对象 
 *****successFun(function):成功回调的函数
 *****errorFun(function):错误回调的函数
 *无返回值
 */
jqueryUtilityFun.ajax_jquery=function(requestUrl,CS_data,successFun,errorFun){
var e_fun=function(){}
errorFun=errorFun || e_fun;   
successFun=successFun || e_fun;
$.ajax({
type:"GET",//post请求
url:requestUrl,
data:CS_data,
async:true,
success:successFun,
error:errorFun
});    
}//e

/**********************封装判断请求路径的访问状态(支持跨域判断)****************
 *参数:requestUrl(string):需要判断访问状态的请求路径
 *****statusFun(function):请求访问状态回调函数，包含一个requestStatus参数
 *****timeOut(number):设置超时的毫秒数
 *注意:在statusFun函数中包含一个requestStatus参数，可通过requestStatus.status属性判断访问状态，
 *如何requestStatus.status=200，说明访问成功，反之访问失败
 *无返回值
 */
jqueryUtilityFun.checkUrlStatus=function(requestUrl,timeOut,statusFun){
$.ajax({
type:"get",//请求方式
url:requestUrl,
cache:false,
dataType:"jsonp",//跨域采用jsonp方式  
processData: false,
timeout:timeOut,//超时时间，毫秒  例如：10000=10秒
complete:statusFun            
}); 
}//e

//export default jqueryUtilityFun;

