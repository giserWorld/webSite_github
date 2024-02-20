/*
 ***********************时间:2018.04.14 wxt**********************
 *更新时间:2021.04.21 wxt
 *************************overview*****************************
 *该插件封装了一个domUtilityFun对象，该对象包含着关于dom和javascript实用方法
 *****************************note******************************
 *该工具通过运用原生js进行封装的功能方法，有些方法会依赖jquery库
 ***************************document***************************
 *autoImgSize(imgEle,scaleWidth,scaleHeight):封装自动设置图片的大小
 *avgValueArray(array):封装计算数值数组的平均值
 *addDragDomFun(dom,callback,moveDom):给div容器添加可拖动的功能(left,top)
 *addDragDomFun_bottom(dom,callback,moveDom):给div容器添加可拖动的功能(left,bottom)
 *createXMLHttpRequest():创建XMLHttpRequest实例(兼容多个浏览器)
 *clearOption(selectDom):封装解决下拉选项中不可以重复选择同一选项问题
 *childInParentCenter(parentEle,childEle):封装子元素定位到父元素的中心位置方法
 *copyTextCt_all(textId):封装复制input输入框或textarea的全部内容到剪切板
 *calcRatioSize(originSize,targetSize):自动计算等比例大小尺寸
 *dateSubtraction(startDate,endDate):获取两个日期之间的天数
 *dateNumToCN(dateStr):封装将时间转化为大写的时间格式函数
 *dateFormatFun(dateStr):封装将日期格式化各种日期函数
 *dom2HtmlStr(dom):dom对象转换为html字符串
 *fetchRequest_get(requestUrl,callback):封装fetch的get请求
 *fetchRequest_config(url,param,requestType,header,callback):封装fetch请求(可配置请求头)
 *filterArray_repeat(itemArray):过滤数组中重复的元素
 *getCurrentTime():封装获取当前年、月、日、时、分、秒、毫秒时间
 *getAdressParam(win):获取从一个页面向另一个页面传的参数
 *getColorValue_data(valueArray,value):根据数值数组获取渐变颜色值(红色=》黄色=》绿色  渐变)
 *getRandomColor_rgb(type):获取随机颜色(rgb)
 *getRandomColor_rgba(type,alpha):获取随机颜色(rgba)
 *getRandomColor_hex():获取随机颜色(hex)
 *hexColorToRgbaColor(HexColor,alpha):封装将十六进制格式的颜色转RGBA格式的颜色
 *hexColorToRgbColor(HexColor):封装将十六进制格式的颜色转RGB格式的颜色(array)
 *htmlStr2Dom(htmlStr):html字符串转换为dom对象
 *isJsonStr(str):封装判断str字符串是否可以转为json对象
 *insertToArrayByIdx(array,index,item):在数组中的指定index位置插入新元素
 *img2base64(imgUrl,callback):图片转base64格式
 *loadScript_script(scriptUrl,callback):动态加载js脚本文件(script标签)
 *paramObjectToUrl(baseUrl,params):封装将参数对象格式化为url上
 *rgbColorToHexColor(rgbColor):封装将RGB格式的颜色转十六进制格式的颜色
 *randomSortArray(sortArray):封装随机排序数值数组中的元素
 *removeItem_Array(itemArray,item):从数组中删除指定元素
 *reactDom2HtmlDom(reactDom):reactDom转换为htmlDom对象
 *selectSort_array(array):封装数值数组进行选择排序(不改变原数组),升序
 *selectSort_array2(array):封装数值数组进行选择排序(改变原数组),升序
 *timeFormatFun(timeStr):封装将时间格式化各种时间函数
 *Trim_sy(str):封装去除字符串的所有空格的方法
 *Trim_qh(str):封装去除字符串的前后空格的方法
 *urlParamToObject(url):封装将路径参数解析为对象
 *xhrRequest_get(url,callback):原生XMLHttpRequest的get请求
 ****************************path工具包***************************
 *changefileExtension(fname,newExt):修改文件及文件url的后缀名
 *getFileName_url(fname):获取文件url中的文件名(包含后缀)
 *getFileNameExtension(fname):获取文件及文件url的后缀
 *****************************math工具包***************************
 *angle2radian(angle):角度转弧度
 *radian2angle(radian):弧度转角度
 **************************注意事项*************************
 * 1.使用selectDom()法时,使用该方法需要将该方法放到<select>标签的html中的onmousedown事件回调函数中,
 *   同时<select>标签中必须有一个<option style="display:none;"></option>的选项
 *   不要把隐藏的option放到第一个位置，从第二个位置开始到最后之间都可以放置
 *   例如：onmousedown="clearOption(this)"
*2.推荐使用es5的方式编写代码，尽量不要使用es6的新标准，否则IE浏览器会报错,不推荐方式
	1)箭头函数
	2)对象的结构赋值
	3)函数形参尽量不要带默认值
*3.该文件代码进行采用原生的方式进行编写
 * */


//import $ from 'jquery';
var domUtilityFun={
path:{},//url工具包
math:{},
};

window.domUtilityFun=domUtilityFun;


/******************图片转base64格式********************
*参数:imgUrl(String):图片url
*****callback(function):回调函数
*/
domUtilityFun.img2base64=function(imgUrl,callback){
	if(imgUrl){
		let img=new Image();  
		img.src=imgUrl;  
		img.setAttribute("crossOrigin","anonymous");
		img.onload=function(){  
			let base64=getBase64Image(img);  
		    if(callback)callback(base64);
		}
	}
	function getBase64Image(img){  
		let canvas=document.createElement("canvas");  
	    canvas.width=img.width;  
	    canvas.height=img.height;  
	    let ctx=canvas.getContext("2d");  
	    ctx.drawImage(img,0,0,img.width,img.height);  
	    let ext=img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
	    let dataURL=canvas.toDataURL("image/"+ext);  
	    //let dataURL=canvas.toDataURL("image/png");  
	    return dataURL;  
	}//e1
}//e



/********************在数组中的指定index位置插入新元素***************
 *参数:array(Array):将要插入新元素的数组
 *****index(Number):插入数组的索引位置,从0开始
 *****item(any):插入数组的item
 *返回值(newArray):返回一个新数组
 *注解:
 *1.该方法不会改变原始数组
 */
domUtilityFun.insertToArrayByIdx=function(array,index,item){
let newArray=array;
if(array&&index>=0){
newArray=[].concat(array);//复制数据
newArray.splice(index,0,item);//数组中添加项目
}
return newArray;
}//e


/*******************原生XMLHttpRequest的get请求********************
*参数:url(string):请求地址
*****callback(function):请求数据完成回调函数
*无返回值
*/
domUtilityFun.xhrRequest_get=function(url,callback){
	if(url){
		callback=callback||function(){};
		let xhr = domUtilityFun.createXMLHttpRequest();//XMLHttpRequest对象用于在后台与服务器交换数据
	    xhr.open('GET',url,true);
	    xhr.responseType="text";//返回的数据类型
	    xhr.onreadystatechange = function () {
	        if(xhr.readyState == 4 && xhr.status ==200) {//readyStatus == 4说明请求已经完成
	        	callback.call(this,xhr);//从服务器获得数据
	        }
	    };
	    xhr.send();//发送数据
	}
}//e



/*****************创建XMLHttpRequest实例(兼容多个浏览器)**************
*无参数
*返回值:xmlHttp(XMLHttpRequest):XMLHttpRequest实例
*/
domUtilityFun.createXMLHttpRequest=function(){
let xmlHttp=null;
try{
xmlHttp = new window.XMLHttpRequest();//适用于大多数浏览器，以及IE7和IE更高版本
}
catch(e){
try {
xmlHttp = new window.ActiveXObject("Msxml2.XMLHTTP");//适用于IE6
}
catch(e){
try{
xmlHttp = new window.ActiveXObject("Microsoft.XMLHTTP");//适用于IE5.5，以及IE更早版本
}
catch(e){
alert("浏览器太老，不能使用ajax!");
}
}
}            
return xmlHttp;
}//e


/******************自动计算等比例大小尺寸*******************
*更新时间:2020.11.25 wxt
*参数:originSize(Array):原始尺寸,参考比例尺寸
****targetSize(Array):目标尺寸
*返回值:ratioSize(Array):等比例缩放的目标尺寸,如[ratioWith,ratioHeight,width_cha,height_cha]
*注解:
*1.
**/
domUtilityFun.calcRatioSize=function(originSize,targetSize){
let ratioSize=null;
if(originSize&&originSize.length===2&&targetSize&&targetSize.length===2){
let originWidth=Number(originSize[0]);
let originHeight=Number(originSize[1]);
let targetWidth=Number(targetSize[0]);
let targetHeight=Number(targetSize[1]);
let calcWidth=(originWidth/originHeight)*targetHeight;//高度不变等比例缩放宽度
let calcHeight=(originHeight/originWidth)*targetWidth;//宽度不变等比例缩放高度
if(targetWidth>calcWidth){//缩放宽度
ratioSize=[calcWidth,targetHeight];
let width_cha=targetWidth-calcWidth;
ratioSize=ratioSize.concat([width_cha,0])
}
else if(targetHeight>calcHeight){//缩放高度
ratioSize=[targetWidth,calcHeight];
let height_cha=targetHeight-calcHeight;
ratioSize=ratioSize.concat([0,height_cha])
}
}
return ratioSize;
}//e



/************************获取随机颜色(rgba)*********************
*更新时间:2020.08.13
 *参数:type(String):[opt] 返回的rgb颜色的格式，默认为:"string",可选值:"string"、"array"
 ****alpha(String|Number):[opt] 颜色的alpha值
 *返回值:rgba(String|Array):rgba颜色
 *注解:
 *1."string"颜色格式为"rgb(255,0,0)"
 *2."array"颜色格式为[255,0,0]
 *3.等同于cesium算法
 */
domUtilityFun.getRandomColor_rgba=function(type,alpha){
alpha=(alpha||eval(alpha)==0)?eval(alpha):1.0;
let r = Math.floor(Math.random()*256);
let g = Math.floor(Math.random()*256);
let b = Math.floor(Math.random()*256);
let rgba = type=="array"?[r,g,b,alpha]:'rgba('+r+','+g+','+b+','+alpha+')';
return rgba;
}//e

/************************获取随机颜色(rgb)*********************
*更新时间:2020.08.13
 *参数:type(String):[opt] 返回的rgb颜色的格式，默认为:"string",可选值:"string"、"array"
 *返回值:rgb(String|Array):rgb颜色
 *注解:
 *1."string"颜色格式为"rgb(255,0,0)"
 *2."array"颜色格式为[255,0,0]
 */
domUtilityFun.getRandomColor_rgb=function(type){
let r = Math.floor(Math.random()*256);
let g = Math.floor(Math.random()*256);
let b = Math.floor(Math.random()*256);
let rgb = type=="array"?[r,g,b]:'rgb('+r+','+g+','+b+')';
return rgb;
}//e


/************************获取随机颜色(hex)*********************
*更新时间:2020.08.13
 *无参数
 *返回值:hex(String):hex颜色字符串，例如:"#31f448"
 */
domUtilityFun.getRandomColor_hex=function(){
let r = Math.floor(Math.random()*256);
let g = Math.floor(Math.random()*256);
let b = Math.floor(Math.random()*256);
let hex = '#'+r.toString(16)+g.toString(16)+b.toString(16);
return hex;
}//e


/************************reactDom转换为htmlDom对象*********************
 *更新时间:2020.08.26
 *参数:reactDom(virtual DOM):react虚拟dom对象,即jsx
 *返回值:htmlDom(dom):html dom对象
 *注解:
 *1.只能渲染jsx中只包含纯html,不能包含react组件
 *2.推荐使用react方式转换
 */
domUtilityFun.reactDom2HtmlDom=function(reactDom){
  if(!reactDom)return null;
  let elem = document.createElement(reactDom.type);//html标签类型
  // 特殊key值映射
  let specialKeyMap = {
    className: 'class',
    fontSize: 'font-size',
  };
  let props = reactDom.props||{};//获取虚拟dom属性
  //遍历虚拟DOM属性
  props && Object.keys(props).forEach(function(key){
    if (key === 'children') {//dom子节点属性
      // 处理子结点
      if(typeof props.children=== 'string'){
          elem.appendChild(document.createTextNode(props.children));
      }
      else{
          props.children.forEach(function(child){
              if(typeof child === 'string') {
                elem.appendChild(document.createTextNode(child));// 纯内容结点
              }
              else {
                elem.appendChild(domUtilityFun.reactDom2HtmlDom(child));// DOM结点
              }
          });
      }
    }
    else if (key === 'style') {// 设置样式属性
      let styleObj = props.style;
      let styleItems = [];
      Object.keys(styleObj).forEach(function(styleKey){
        styleItems.push("${specialKeyMap[styleKey] || styleKey}:${styleObj[styleKey]}");
      });
      elem.setAttribute('style', styleItems.join(';'));
    }
    else{//设置其他属性
      elem.setAttribute(specialKeyMap[key] || key, props[key]);
    }
  });
  return elem;
}//e


/************************dom对象转换为html字符串*********************
 *参数:dom(dom):dom对象 
 *返回值:htmlStr(number):html字符串
 */
domUtilityFun.dom2HtmlStr=function(dom){  
let htmlStr="";
if(dom){
let divDom=document.createElement('div');
divDom.appendChild(dom);
htmlStr=divDom.innerHTML
divDom=dom = null;//解除引用，以便于垃圾回收  
}
return htmlStr;  
}//e

/************************html字符串转换为dom对象*********************
 *参数:htmlStr(number):html字符串
 *返回值:htmlDom(dom):dom对象
 */
domUtilityFun.htmlStr2Dom=function(htmlStr){
if(htmlStr){
let divDom=document.createElement("div");
divDom.innerHTML=htmlStr;
return divDom.childNodes[0];
}
}//e




//==============================math工具包==============================//


/************************角度转弧度*********************
 *参数:angle(number):角度值
 *返回角度值
 */
domUtilityFun.math.angle2radian=function(angle){
return (angle||angle==0)?angle * Math.PI / 180:null;
}//e

/************************弧度转角度*********************
 *参数:radian(number):弧度值
 *返回角度值
 */
domUtilityFun.math.radian2angle=function(radian){
return (radian||radian==0)?radian * 180 / Math.PI:null;
}//e


/************************过滤数组中重复的元素*********************
 *参数:itemArray(Array):将要去除重复元素的数组
 *返回值:newArray(Array):返回去重后的新数组
 *注解:
 *1.该方法不会改变原始数组数据
 */
domUtilityFun.filterArray_repeat=function(itemArray){ 
let newArray=itemArray;
if(itemArray&&itemArray.length>0){
newArray=[];
for(let i=0;i<itemArray.length;i++){
if(newArray.indexOf(itemArray[i])==-1)newArray.push(itemArray[i]);
}
return newArray;
}
}//e

/************************从数组中删除指定元素*********************
 *参数:itemArray(Array):将要删除元素的数组
 *****item(String):将要删除的数组元素
 *返回值:newArray(Array):返回删除元素后的新数组
 *注解:
 *1.该方法不会改变原始数组数据
 */
domUtilityFun.removeItem_Array=function(itemArray,item){ 
let newArray=itemArray;
if(itemArray&&itemArray.length>0&&item){
newArray=itemArray.concat();//数组深拷贝
let index=newArray.indexOf(item); 
if(index>-1){ 
newArray.splice(index,1); 
} 
}
return newArray;
}//e



/************************给div容器添加可拖动的功能(left,top)*********************
 *参数:dom(String||dom):div节点或domId
 *****callback(String):拖动结束后进行回调函数，参数为拖动元素的屏幕坐标[x,y]
 *****moveDom(String||dom):[option] 需要移动的div容器，默认为dom
 *无返回值
 */
domUtilityFun.addDragDomFun=function(dom,callback,moveDom){
	let dragDom=typeof(dom)=="string"?document.getElementById(dom):dom;
	moveDom=moveDom?(typeof(moveDom)=="string"?document.getElementById(moveDom):moveDom):dragDom;
	callback=callback||function(){};
	let disX=null;
	let disY=null;
	if(dragDom){
		let mouseMoveFun=function(mouseMoveEvt){//鼠标移动
			mouseMoveEvt=mouseMoveEvt;
			//设置拖动元素的位置
		    let drag_width=mouseMoveEvt.clientX-moveDom.offsetWidth/2;
		    let drag_height=mouseMoveEvt.clientY-moveDom.offsetHeight/2;
		    if(drag_width>0&&drag_width<window.document.documentElement.clientWidth-moveDom.offsetWidth){
		    	moveDom.style.left=mouseMoveEvt.clientX-disX+"px";
		    	moveDom.style.top=mouseMoveEvt.clientY-disY+"px";
		    }
		    if(drag_height>0&&drag_height<window.document.documentElement.clientHeight-moveDom.offsetWidth){
		    	//moveDom.style.top=mouseMoveEvt.clientY-disY+"px";
		    }
		}
		let mouseUpFun=function(){//鼠标松开
			//dragDom.style.cursor="default";
			//dragDom.removeEventListener("mouseup",mouseUpFun);
			window.document.removeEventListener("mouseup",mouseUpFun);
			window.document.removeEventListener("mousemove",mouseMoveFun);
			let x=moveDom.style.left?moveDom.style.left.replace("px",""):0;
			let y=moveDom.style.top?moveDom.style.top.replace("px",""):0;
			callback([eval(x),eval(y)]);
		}
		dragDom.onmousedown=function(mouseDownEvt){//鼠标按下
			dragDom.style.cursor="move";//设置拖动鼠标样式
			mouseDownEvt=mouseDownEvt;
			disX=mouseDownEvt.clientX-moveDom.offsetLeft;
			disY=mouseDownEvt.clientY-moveDom.offsetTop;
			window.document.addEventListener("mousemove",mouseMoveFun);
			window.document.addEventListener("mouseup",mouseUpFun);
			//dragDom.addEventListener("mouseup",mouseUpFun);
		};
	}
}//e


/************************给div容器添加可拖动的功能(left,bottom)*********************
 *参数:dom(String||dom):div节点或domId
 *****callback(String):拖动结束后进行回调函数，参数为拖动元素的屏幕坐标[x,y]
 *****moveDom(String||dom):[option] 需要移动的div容器，默认为dom
 *无返回值
 */
domUtilityFun.addDragDomFun_bottom=function(dom,callback,moveDom){
	let dragDom=typeof(dom)=="string"?document.getElementById(dom):dom;
	moveDom=moveDom?(typeof(moveDom)=="string"?document.getElementById(moveDom):moveDom):dragDom;
	callback=callback||function(){};
	let disX=null;
	let disY=null;
	if(dragDom){
		let mouseMoveFun=function(mouseMoveEvt){//鼠标移动
			mouseMoveEvt=mouseMoveEvt;
			//设置拖动元素的位置
		    let drag_width=mouseMoveEvt.clientX-moveDom.offsetWidth/2;
		    let drag_height=mouseMoveEvt.clientY-moveDom.offsetHeight/2;
		    if(drag_width>0&&drag_width<window.document.documentElement.clientWidth-moveDom.offsetWidth){
				moveDom.style.left=mouseMoveEvt.clientX-disX+"px";
				let moveDomTop=mouseMoveEvt.clientY-disY;
				moveDom.style.bottom=-eval(moveDomTop)-moveDom.clientHeight+"px";
		    }
		    if(drag_height>0&&drag_height<window.document.documentElement.clientHeight-moveDom.offsetWidth){
		    	//moveDom.style.top=mouseMoveEvt.clientY-disY+"px";
		    }
		}
		let mouseUpFun=function(){//鼠标松开
			//dragDom.style.cursor="default";
			dragDom.addEventListener("mouseup",mouseUpFun);
			//window.document.removeEventListener("mouseup",mouseUpFun);
			window.document.removeEventListener("mousemove",mouseMoveFun);
			let x=moveDom.style.left?moveDom.style.left.replace("px",""):0;
			let y=moveDom.style.bottom?moveDom.style.bottom.replace("px",""):0;
			callback([eval(x),eval(y)]);
		}
		dragDom.onmousedown=function(mouseDownEvt){//鼠标按下
			dragDom.style.cursor="move";//设置拖动鼠标样式
			mouseDownEvt=mouseDownEvt;
			disX=mouseDownEvt.clientX-moveDom.offsetLeft;
			disY=mouseDownEvt.clientY-moveDom.offsetTop;
			window.document.addEventListener("mousemove",mouseMoveFun);
			//window.document.addEventListener("mouseup",mouseUpFun);
			dragDom.addEventListener("mouseup",mouseUpFun);
		};
	}
}//e



//==============================path工具包==============================//


/************************修改文件及文件url的后缀名*********************
 *参数:fname(String):文件或文件url
 *****newExt(String):新的后缀名
 *返回值:fileDir(String):文件目录url,如果文件不包含目录，则返回""
 */
domUtilityFun.path.changefileExtension=function(fname,newExt){
return fname.replace(domUtilityFun.path.getFileNameExtension(fname),newExt);
}//e


/************************获取文件目录url*********************
 *参数:fname(String):文件url
 *返回值:fileDir(String):文件目录url,如果文件不包含目录，则返回""
 */
domUtilityFun.path.getFileDirUrl=function(fname){
let start=fname.lastIndexOf("/");
if(start<0){
return "";
}
return fname.substring(0,start);
}//e


/************************获取文件url中的文件名(包含后缀)*********************
 *参数:fileName(String):文件url
 *返回值:fileName(String):文件名(包含后缀)
 */
domUtilityFun.path.getFileName_url=function(fname){
let start=fname.lastIndexOf("/");
if(start<0){
return fname;
}
return fname.substring(start+1,fname.length);
}//e


/************************获取文件及文件url的后缀名*********************
 *参数:fileName(String):文件名或文件url
 *返回值:extension(String):文件后缀,若该文件名不包含后缀则返回""
 */
domUtilityFun.path.getFileNameExtension=function(fname){
let start=fname.lastIndexOf(".");
if(start>=0){
return fname.substring(start,fname.length);
}
return "";
}//e



/************************封装将参数对象格式化为url上*********************
 *更新时间:2020.06.14
 *参数:baseUrl(string):基础路径,可以为"",如果为"",则没有"?"字符，例如"id=1",否则为"?id=1"
 *返回值:params(object):参数对象
 */
domUtilityFun.paramObjectToUrl=function(baseUrl,params){
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


/************************封装将路径参数解析为对象*********************
 *更新时间:2020.06.14
 *参数:url(string):带参数的请求地址
 *返回值:paramObject(object):解析的参数对象
 */
domUtilityFun.urlParamToObject=function(url){
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


/**********************动态加载js脚本文件(script标签)***********************
 *参数:scriptUrl(Array):js脚本url
 *****callback(function):js脚本文件加载完成后回调
 *无返回值
 *注解:
 */
domUtilityFun.loadScript_script=function(scriptUrl,callback){
let script=document.createElement("script");//创建脚本标签
script.type="text/javascript";
if(script.readyState){//ie浏览器
script.onreadystatechange=function(){
if(script.readyState=="loaded" || script.readyState=="complete"){
script.onreadystatechange=null;
callback();
}
}
}
else{//其他浏览器
script.onload=function(){
callback();
}
}
script.src=scriptUrl;
document.getElementsByTagName("head")[0].appendChild(script);//插入到<head>标签的后面
}//end


/*************************根据数值数组获取渐变颜色值(红色=》黄色=》绿色  渐变)******************************************
 *参数:valueArray(Array):数值数组，例如:[100,2,30,5,88]
 ****value(number):数值数组中的某一项值
 *返回值:color(array):返回颜色值,例如[255,0,0,0.8]
 *注解:
 */
domUtilityFun.getColorValue_data=function(valueArray,value){
let color=[0,0,0,0.8];
if(valueArray&&valueArray.length>0){
let dataArray=valueArray.sort(sortFun);//数值从大到小排序
let max=dataArray[0];//数值数组中的最大值
if(max==0)max=1;//如果最大值为0，则设置为1
let number=value;//当前数值
/*计算动态颜色*/
let zhi = parseInt(255/dataArray.length);//颜色值求平均取整。
let midIndex = parseInt(dataArray.length/2);//中间数据的index
let idx=dataArray.indexOf(value);//当前数据索引
let dataIdx;
if(idx==0){
dataIdx=1;
}else{
dataIdx=idx;
}
let midDataValue;//中间数据值大小
if(eval(dataArray[midIndex])==0){//处理值为0的情况
midDataValue=1;
}else{
midDataValue=eval(dataArray[midIndex]);
}
var green = parseInt(255-number/(max*(dataIdx/2))*255);//值取整
var red = parseInt(number/midDataValue*255);//值取整
//处理color值在0~255内
if(red>255)red=255;
if(red<0)red=255+red;
if(green>255)green=255;
if(green<0)green=255+green;
if(idx<=midIndex){//当前数据位于前面部分
color=[255,green,0,0.8];//红色=>黄色 渐变
}else{//当前数据位于后面部分
color =[red,255, 0,0.8];
}
if(dataArray[midIndex+1]==dataArray[idx]){//中间数据的颜色
color = [red,255,0,0.8];
}
var rgb="rgb("+color[0]+","+color[1]+","+color[2]+")";
var rgba="rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
return {rgb:rgb,rgba:rgba,color:rgba};
}
//数组大到小排序
function sortFun(data2,data1){
var value1 = eval(data1); 
var value2 = eval(data2); 
if (value1 < value2) {//第一个值小于第值,返回一个小于 0 的值
return -1; 
}else if (value1 > value2) {//第一个值大于第值,返回一个大于 0 的值
return 1; 
}else {//第一个值等于第值,返回 0
return 0; 
}
}
}//e



/*************************封装判断str字符串是否可以转为json对象******************************************
 *参数:str(string):字符串
 *返回值(boolean):返回判断结果
 *注解:
 */
domUtilityFun.isJsonStr=function(str){
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



/*******************************封装fetch的get请求**************************************************
 *参数:requestUrl(string):请求地址,包含请求参数
 *****callback(function):请求数据完成回调函数
 *无返回值
 *注解:
 *1.如果请求失败则“status”为-1，数据请求成功“status”为200
 */
domUtilityFun.fetchRequest_get=function(requestUrl,callback){
callback=callback||function(){};
if(requestUrl){
let requestUrl2=window.decodeURIComponent(requestUrl);
var urlObj=urlParamToObject(requestUrl2) || {};
let param2=JSON.stringify(urlObj);
fetch(requestUrl).then((response)=>{
let status=response.status;
let param=param2;
return {status:response.status,param:param,promise:response.text()};
}).then(function(result){
if(result.promise){
result.promise.then((data)=>{
result.data=data;
result.text=data;
result.json=null;
if(domUtilityFun.isJsonStr(data))result.json=JSON.parse(data);
if(domUtilityFun.isJsonStr(result.param))result.param=JSON.parse(result.param);
callback(result);
})
}
}).catch(function(err){
callback({status:-1,data:err});
});
}
function urlParamToObject(url=""){
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
}//e


/*******************************封装fetch请求(可配置请求头)*******************************
 *参数:url(string):请求地址
 *****param(objext):请求参数,post请求会导致405，目前使用不了
 *****requestType(string):请求类型,"GET","POST",目前只能使用"GET"请求
 *****header(object):配置的请求头
 *****callback(function):请求数据完成回调函数
 *无返回值
 *注解:fetch请求适用于"GET"请求
 */
domUtilityFun.fetchRequest_config=function(url="",param={},requestType="GET",header,callback=function(){}){
	var options={//fetch请求配置
		//cache:"no-cache",//请求是否缓存
		credentials:"include",//为了在当前域名内自动发送 cookie，必须提供这个选项
		//body:JSON.stringify(param),//请求体,存放需要传的参数，注意参数的格式要与"content-type"的值得类型相对应
		//method:"POST",//请求方法
		//mode:"cors",//请求的模式"no-cors","cors"
	    headers:{//请求的头
	      "Accept":"application/json",
    	  "Authorization": "Basic YWRtaW46Z2Vvc2VydmVy"//身份验证
	    }
	};
	header=header||{};
	for(let key in header){
		options.headers[key]=header[key];
	}
	fetch(url,options).then((response)=>response.text()).then(function(result){
		var data=eval("("+result+")");
		callback(data);
	});
}//e



/***************封装将时间格式化各种时间函数**************
 *参数:dateStr(string):Date类所支持的日期格式字符串
 *返回值:formatObj(object):包含4种日期格式的对象
 *注解:返回一个包含4种当前时间类型的对象，属性如下：
 *1.everyTime:(包含字段：year、month、day、hour、minute、second、milliseconds)
 *2.timeType1：(date:2018-10-24、time：15:00:57)
 *3.timeType2：(date:2018年10月24日、time：15时00分57秒)
 *4.timeType3：(20181024150057)
 *5.timeType4[时间戳]:(1540364457101)
 */
domUtilityFun.timeFormatFun=function(timeStr=""){
let formatObj={};
if(timeStr){
let dateObj=new Date(timeStr);
var year=dateObj.getFullYear();//四位年份
var month=dateObj.getMonth() + 1;//月份 0-11
var day=dateObj.getDate();//日
var hour=dateObj.getHours();//时
var minute=dateObj.getMinutes();//分钟
var second=dateObj.getSeconds();//秒
var milliseconds=dateObj.getMilliseconds();//毫秒
if(month<10){
month="0"+month;
}
if(day<10){
day="0"+day;
}
if(hour<10){
hour="0"+hour;
}
if(minute<10){
minute="0"+minute;
}
if(second<10){
second="0"+second;
}
var everyTime={//当前每个时刻时间
year:year,
month:month,
day:day,
hour:hour,
minute:minute,
second:second,
milliseconds:milliseconds
};
var timeType1={
date:year+"-"+month+"-"+day,
time:hour+":"+minute+":"+second
};
var timeType2={
date:year+"年"+month+"月"+day+"日",
time:hour+"时"+minute+"分"+second+"秒"
};
var timeType3=String(year)+String(month)+String(day)+hour+minute+second;
var timeType4=dateObj.getTime();//当前时间的时间戳
formatObj={//时间类型格式不包括毫秒数
everyTime:everyTime,
timeType1:timeType1,
timeType2:timeType2,
timeType3:timeType3,
timeType4:timeType4
};
return formatObj;
}	
}//e


/***************封装将日期格式化各种日期函数**************
 *参数:dateStr(string):Date类所支持的日期格式字符串
 *返回值:formatObj(object):包含5种日期格式的对象
 *注解:使用该方法的前提是必须提供Date类所支持的日期格式字符串，否则使用不了
 */
domUtilityFun.dateFormatFun=function(dateStr=""){
let formatObj={};
if(dateStr){
let dateObj=new Date(dateStr);
let year=dateObj.getFullYear();//四位年份
let month=dateObj.getMonth() + 1;//月份 0-11
let day=dateObj.getDate();//日
if(month<10){
month="0"+month;
}
if(day<10){
day="0"+day;
}
var timeType3=String(year)+String(month)+String(day);
var timeType4=dateObj.getTime();//当前时间的时间戳
formatObj={
type1:year+"-"+month+"-"+day,
type2:year+"/"+month+"/"+day,
type3:year+"年"+month+"月"+day+"日",
type4:timeType3,
type5:timeType4
};
return formatObj;
}	
}//e


/*************************封装将RGB格式的颜色转十六进制格式的颜色************************
 *更新时间:2020.04.05
 *参数:rgbColor(string):rgb格式(rgba格式)的颜色,例如:“rgb(255,255,255)”或“rgba(255,255,255,0.5)”
 *返回值:hexColor(string):十六进制格式的颜色
 *注解:
 *1.支持rgb颜色或rgba颜色
 */
domUtilityFun.rgbColorToHexColor=function(rgbColor=""){
let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
let hexColor=null;
if(rgbColor){
if(/^(rgb|RGB)/.test(rgbColor)){
var aColor = rgbColor.replace(/(?:\(|\)|rgb|RGB|a|A)*/g,"").split(",");
if(aColor&&aColor.length>3)aColor=aColor.slice(0,3);
var strHex = "#";
for(var i=0; i<aColor.length; i++){
var hex = Number(aColor[i]).toString(16);
if(hex === "0"){
hex += hex;    
}
strHex += hex;
}
if(strHex.length !== 7){
strHex = rgbColor;    
}
hexColor=strHex;
}
else if(reg.test(rgbColor)){
var aNum = rgbColor.replace(/#/,"").split("");
if(aNum.length === 6){
hexColor=rgbColor;    
}
else if(aNum.length === 3){
var numHex = "#";
for(var i=0; i<aNum.length; i+=1){
numHex += (aNum[i]+aNum[i]);
}
hexColor=numHex;
}
}
else{
hexColor=rgbColor;    
}
}
return hexColor;
}//e

/*************************封装将十六进制格式的颜色转rgba格式的颜色************************
 *更新时间:2021.03.23 wxt
 *参数:HexColor(string):十六进制格式的颜色,即css,html中使用的格式，例如:“#FFFFFF”
 ****alpha(number):染色透明度，默认为1.0
 *返回值:rgbaColor(string):rgba格式的颜色,例如:"rgba(255,0,0,1.0)"
 */
domUtilityFun.hexColorToRgbaColor=function(HexColor="",alpha=1.0){
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
rgbaColor="rgba(" + sColorChange.join(",") + ")";
}
else{
rgbaColor=sColor;    
}
}
return rgbaColor;
}//e


/*************************封装将十六进制格式的颜色转RGB格式的颜色(array)************************
 *更新时间:2020.04.05
 *参数:HexColor(string):十六进制格式的颜色,即css,html中使用的格式，例如:“#FFFFFF”
 *返回值:sColorChange(array):rgba数组格式，例如:[255,0,0,0.5]
 */
domUtilityFun.hexColorToRgbColor=function(HexColor=""){
let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
let rgbaColor=null;
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
rgbaColor="rgb(" + sColorChange.join(",") + ")";
}
else{
rgbaColor=sColor;    
}
}
return rgbaColor;
}//e


/***********************封装将时间转化为大写的时间格式函数***********************
 *参数:dateStr(string):日期字符串 ，时间的格式必须为  “*年*月*日”，不支持其他的时间格式，否则返回的结果有问题
 *返回值:返回一个大写的日期的字符串   例如：二〇一八年十〇月十五日
 *注解：使用该方法时，时间字符串的格式必须为 “*年*月*日”，例如 “2018年10月15日” 转为 "二〇一八年十〇月十五日"，
 *不支持其他时间格式
 */
domUtilityFun.dateNumToCN=function(dateStr){
var s=dateStr || "";
var sCN = '〇一二三四五六七八九';
function getCN(s){
var c = s.charAt(0), cCN = sCN.charAt(c);
return s.length == 1 ? cCN : (c == '1' ? '' : cCN) + '十' + sCN.charAt(s.charAt(1))
}
return s.replace(/(\d+)([月日])/g, function ($0, $1, $2) {
return getCN($1) + $2;
}).replace(/\d/g, function ($0) { return sCN.charAt($0) });
}//e


/****************获取两个日期之间的天数*****************
 *参数:startDate(string):起始日期，时间的格式的设置必须为：2018.11.10、2018-11-10、2018/11/10，其他时间格式不支持使用
 *****endDate(string):结束日期，时间的格式的设置必须为：2018.11.10、2018-11-10、2018/11/10，其他时间格式不支持使用
 *返回值:day(number):返回两个日期之间的天数
 *注解：使用该方法时注意输入的时间格式
 */    
domUtilityFun.dateSubtraction=function(startDate,endDate){
var sdate = new Date(startDate);
var now = new Date(endDate);
var days = now.getTime() - sdate.getTime();
var day = parseInt(days / (1000 * 60 * 60 * 24));
return day;
}//e

/****************获取从一个页面向另一个页面传的参数*****************
 *参数:win(window):将要获取页面窗口的地址的参数
 *返回值:param(Object):获取的参数对象
 */
domUtilityFun.getAdressParam=function(win){
var param={};
var winAdress=win.location.href.toString();//浏览器窗口的地址    
var params_Str=winAdress.split("?")[1];//取参数的地址
if(params_Str){
var pams=params_Str.split("&&");   
pams.forEach(function(item,idx){
var p=item.split("=");
param[p[0]]=p[1];
});
}
return param;
}//e

/****************封装复制input输入框或textarea的全部内容到剪切板*************
 *参数:textId(string):input输入框或textarea的id值
 *无返回值
 */
domUtilityFun.copyTextCt_all=function (textId){
if(textId){
var textAreaDom=document.getElementById(textId);
textAreaDom.select(); // 选择对象	   
document.execCommand("Copy"); // 执行浏览器复制命令
alert("成功复制到剪切板！");
}	
}//e

/*******************封装自动设置图片的大小***************
 *参数:imgEle(imgId/dom):图片Id值或者dom节点
 *****scaleWidth(number):
 *****scaleHeight(number):
 *无返回值
 *注解:如何设置了图片的宽度与高度值，就会按照指定的值设置，同时如果设置的宽、高的值大于图片中的真实值，
 *图片会按照真实时改变，反之就会按照指定的值设置大小
 *如果只设置宽高一个值，另一个值会自动缩放
 */

domUtilityFun.autoImgSize=function(imgEle,scaleWidth,scaleHeight){
var dataType=typeof(imgEle);
var imgobj;
scaleWidth=scaleWidth || "";
scaleHeight=scaleHeight || "";
if(dataType=="string"){
imgobj= document.getElementById(imgEle);
}
else{
imgobj= imgEle;   
}
if(imgobj&&scaleWidth&&scaleHeight){//宽高为固定值
imgobj.style.width="auto";
imgobj.style.height="auto";//释放图片本来的大小    
var imgwidth=imgobj.width;//图片真实的宽度
var imgheight=imgobj.height;//图片真实的高度
if(imgwidth>imgheight){//判断是width和height哪一个大。大的先处理。
if(imgwidth>scaleWidth){
imgobj.style.width=scaleWidth+"px";
}
if(imgheight>scaleHeight){
imgobj.style.height=scaleHeight+"px";
}
}
else{//图片的真实的高度大于宽度
if(imgheight>scaleHeight){
imgobj.style.height=scaleHeight+"px";
}
if(imgwidth>scaleWidth){
imgobj.style.width =scaleWidth+"px";
}
} 
}
else if(imgobj&&scaleWidth&&!scaleHeight){//设置宽度，高度为等比例缩放
imgobj.style.width=scaleWidth+"px"; 
imgobj.style.height="auto";  
}
else if(imgobj&&!scaleWidth&&scaleHeight){
imgobj.style.width="auto"; 
imgobj.style.height=scaleHeight+"px";      
}
}//e

/***************封装去除字符串的所有空格的方法**********
 *参数:str(string):将要去除空格的字符串
 *返回值:result(string):返回一个掉前后空格的字符串
 */
domUtilityFun.Trim_sy=function(str){
if(str){
var result;
result = str.replace(/(^\s+)|(\s+$)/g,"");
result = result.replace(/\s/g,"");
return result;
}
}//e

/***************封装去除字符串的前后空格的方法**********
 *参数:str(string):将要去除空格的字符串
 *返回值:n_str(string):返回一个掉前后空格的字符串
 */
domUtilityFun.Trim_qh=function(str){
var n_str;
if(str){
n_str=str.replace(/(^\s*)|(\s*$)/g, ""); 
}
return n_str;
}//e
/*****************封装子元素定位到父元素的中心位置方法***************
 *参数:parentEle(string/dom):父元素的id值或者dom节点
 *****childEle(string/dom):子元素的id值或者dom节点
 *无返回值
 *注解:parentEle的父级元素必须要预先设置width、height的宽度值，不能设置为百分比，只能设置px,否则不会定位中心
 */
domUtilityFun.childInParentCenter=function(parentEle,childEle){
var dataType1=typeof(parentEle);
var dataType2=typeof(childEle);
var parentDom;
var childDom;
if(dataType1=="string" || dataType2=="string"){
parentDom=document.getElementById(parentEle);
childDom=document.getElementById(childEle);    
}
else{
parentDom=parentEle;
childDom=childEle;        
}
if(parentDom&&childDom){
var parent_w=parentDom.getBoundingClientRect().width;   
var parent_h=parentDom.getBoundingClientRect().height; 
var child_w=childDom.getBoundingClientRect().width;   
var child_h=childDom.getBoundingClientRect().height; 
if(!parent_w || !parent_h){//获取父节点的宽度与高度
parent_w=Number(parentDom.style.width.split("px")[0]);
parent_h=Number(parentDom.style.height.split("px")[0]);
}
if(!parent_w || !parent_h){
parent_w=parentDom.width;
parent_h=parentDom.height;    
}
if(!parent_w || !parent_h){//如果前面获取不到值，就通过jquery获取值
parent_w=$(parentDom).width() || 0;
parent_h=$(parentDom).height() || 0;    
}
if(!child_w || !child_h){//获取子节点的宽度与高度
child_w=Number(childDom.style.width.split("px")[0]);
child_h=Number(childDom.style.height.split("px")[0]);
}
if(!child_w || !child_h){
child_w=childDom.width;
child_h=childDom.height;    
}
if(!child_w || !child_h){
child_w=$(childDom).width() || 0;
child_h=$(childDom).height() || 0;    
}
var f_w=parent_w/2;
var f_h=parent_h/2;
var z_w=child_w/2;
var z_h=child_h/2;
var child_left=f_w-z_w;
var child_top=f_h-z_h;
childDom.style.position="absolute";
childDom.style.left=child_left+"px";
childDom.style.top=child_top+"px";  
}	  	   
}//e

/**********************封装计算数值数组的平均值*********************
 *参数:array(Array):将要计算平均值的数值数组      
 *返回值:avgValue(number):返回数值数组的平均值
 */
domUtilityFun.avgValueArray=function(array){
var avgValue;//平均值
if(array && array.length>1){
var sumValue=0;
for(var i=0;i<array.length;i++){
sumValue=sumValue+array[i];  
}
if(sumValue){
avgValue=sumValue/array.length;   
}
return avgValue;
}
}//e

/*************************封装随机排序数值数组中的元素**********************
 *参数:sortArray(Array):将要进行排序的数组
 *无返回值
 *注解:改变输入数组的原有元素的位置
 */
domUtilityFun.randomSortArray=function(sortArray){
if(sortArray && sortArray.length>1){
for(var i=0;i<sortArray.length;i++){
var randomIndex=(Math.random())*sortArray.length;//随机生成数组中的元素索引数
var a=sortArray[i];
sortArray[i]=sortArray[Math.floor(randomIndex)];
sortArray[Math.floor(randomIndex)]=a;
}    
}      
}//e

/***************封装获取当前年、月、日、时、分、秒、毫秒时间**************
 *参数:无参数
 *返回值一个对象
 *注解:返回一个包含多种当前时间类型的对象，属性如下：
 *1.everyTime:(包含字段：year、month、day、hour、minute、second、milliseconds)
 *2.timeType1：(date:2018-10-24、time：15:00:57)
 *3.timeType2：(date:2018年10月24日、time：15时00分57秒)
 *4.timeType3：(20181024150057)
 *5.timeType4[时间戳]:(1540364457101)
 */
domUtilityFun.getCurrentTime=function(){
var date=new Date();//中国标准时间对象
var year=date.getFullYear();//四位年份
var month=date.getMonth() + 1;//月份 0-11
var day=date.getDate();//日
var hour=date.getHours();//时
var minute=date.getMinutes();//分钟
var second=date.getSeconds();//秒
var milliseconds=date.getMilliseconds();//毫秒
if(month<10){
month="0"+month;
}
if(day<10){
day="0"+day;
}
if(hour<10){
hour="0"+hour;
}
if(minute<10){
minute="0"+minute;
}
if(second<10){
second="0"+second;
}
var everyTime={//当前每个时刻时间
year:year,
month:month,
day:day,
hour:hour,
minute:minute,
second:second,
milliseconds:milliseconds
};
var timeType1={
date:year+"-"+month+"-"+day,
time:hour+":"+minute+":"+second
};
var timeType2={
date:year+"年"+month+"月"+day+"日",
time:hour+"时"+minute+"分"+second+"秒"
};
var timeType3=String(year)+String(month)+String(day)+hour+minute+second;
var timeType4=date.getTime();//当前时间的时间戳
var returnTime={//时间类型格式不包括毫秒数
everyTime:everyTime,
timeType1:timeType1,
timeType2:timeType2,
timeType3:timeType3,
timeType4:timeType4
};
return returnTime;
}//e

/**********************封装数值数组进行选择排序(不改变原数组),升序*********************
 *参数:array(Array):将要进行排序的数值数组      
 *返回值:arr(Array):返回一个排序好的新数组
 *注解:不改变原有的数组元素的索引位置,(代码有点复杂),可以有重复元素，重复元素排序后会放在一起位置
 */
domUtilityFun.selectSort_array=function(array){
var arr=[];
if(array && array.length>1){
for(var i=0;i<array.length;i++){
var ele=array[i]   
arr.push(ele);
}    
var i,j,len = arr.length;
for(i=0;i<len-1;i++){
var k=i;
var current=arr[k];
for(j=i+1;j<len;j++){
if(arr[j]<current){
current=arr[j];
k=j;
}
}
if(k!==i){
arr[k]=arr[i];
arr[i]=current;
}
}
}
return arr;
}//e

/**********************封装数值数组进行选择排序(改变原数组),升序*********************
 *参数:array(Array):将要进行排序的数值数组      
 *返回值:arr(Array):返回一个排序好的新数组
 *注解:不改变原有的数组元素的索引位置,(代码最简单)，可以有重复元素，重复元素排序后会放在一起位置
 */
function selectSort_array2(arr){
var i,j,len = arr.length;
for(i=0;i<len-1;i++){
for(j=i+1;j<len;j++){
if(arr[j]<arr[i]){//如果后面的值小于当前值，进行位置互换
var tem=arr[i];
arr[i]=arr[j];
arr[j]=tem;
}
}
}
}//e

/*****************封装解决下拉选项中不可以重复选择同一选项问题*************
 *参数:selectDom(dom):<select>dom节点对象
 *无返回值
 *注意:使用该方法需要将该方法放到<select>标签的html中的onmousedown事件回调函数中,
 *同时<select>标签中必须有一个<option value="null" style="display:none;"></option>的选项,
 *不要把隐藏的option放到第一个位置，从第二个位置开始到最后之间都可以放置
 *例如：onmousedown="clearOption(this)"  
 */
var tmp_selectedIndex=0;//全局变量
domUtilityFun.clearOption=function(selectDom){
tmp_selectedIndex = selectDom.selectedIndex;
var ops=selectDom.options;
var optionNullIndex;
if(ops && ops.length>0){
for(var i=0;i<ops.length;i++){
var op=ops[i]; 
var display_css=op.style.display;
if(display_css=="none"){//找到隐藏的option的索引值
optionNullIndex=op.index; 
break;
}
} 
if(optionNullIndex>=0){
selectDom.selectedIndex =optionNullIndex;    
}
}
selectDom.onblur=function(){//失去焦点调用的函数
var va=selectDom.value;
if(va=="null"){
if(tmp_selectedIndex || tmp_selectedIndex==""){
selectDom.selectedIndex=tmp_selectedIndex;   
}  
}
}
}//e

//export default domUtilityFun;