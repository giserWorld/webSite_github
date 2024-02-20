/*
 *********************时间:2018.04.17 wxt********************
 *更新时间:2020.11.30 wxt
 *************************插件概述************************
 *该插件封装了一个domUtilityFun对象(es5)，该对象包含着未分类的实用工具的相关方法
 *************************方法*************************
 *generateUuid():封装生成uuid的函数
 *generateUuid_time():封装生成uuid的函数(当前时间戳)
 *getUniqueItems_json(jsonArray,pkField):获取唯一元素的数组(json对象)
 *getExploreName():获取浏览器内核名称(exploreName)
 *getExploreName_version():获取浏览器内核名称及版本号(exploreName+version)
 *getBrowserInfo_detail():获取浏览器详细信息
 *urlParamToObject(url):封装将路径参数解析为对象
 *xzNameTranslate(xzName,xzLeval):封装简写省、市、县、乡镇地区名称，避免名字太长
 *************************说明*************************
 *
 *   
 *    
 *    
 *************************注意*************************
 *1.优先使用domUtilityFun.js文件,如果报错,则使用domUtilityFun_es5.js文件
 *
 * */

var domUtilityFun={};//es5标准编码
window.domUtilityFun_es5=domUtilityFun;



/******************获取唯一元素的数组(json对象)*******************
*参数:jsonArray(Array):json对象数组元素
*****pkField(String)?:主键字段，唯一值，去重依据的字段,默认为id
*返回值:uniqueArray(Array):返回去重后的新数组,不会改变原数组数据
*注解:
*1.
**/
domUtilityFun.getUniqueItems_json=function(jsonArray,pkField){
let uniqueArray=jsonArray;
pkField=pkField||"id";
if(jsonArray&&jsonArray.length>0){
uniqueArray = [];//唯一数组元素
let temArray=[];//临时数组
jsonArray.forEach(function(item){
//id:相同的去掉，去重
if(temArray.indexOf(item[pkField])===-1){
temArray.push(item[pkField]);
uniqueArray.push(item);
}
});
}
return uniqueArray;
}//e



/******************获取浏览器详细信息*******************
*无参数
*无返回值
*注解:
*1.返回结果包含浏览器类型及版本号，例如:"res2 win7|chrome78.0.3904.108(谷歌浏览器)"
**/
domUtilityFun.getBrowserInfo_detail=function(){
	  var that = this;
	  var packageName = "whyun";
	  if (!window[packageName]) {
	    window[packageName] = {};
	  }
	  var MAX_360_CHROME_VERSION = 78; //以360极速浏览器的最大内核版本为准
	  function getIOSVersion(ua) {
	    if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua)) {
	      return parseFloat(RegExp.$1.replace("_", "."));
	    } else {
	      return 2;
	    }
	  }
	  function _mime(where, value, name, nameReg) {
	    var mimeTypes = window.navigator.mimeTypes,
	      i;

	    for (i in mimeTypes) {
	      if (mimeTypes[i][where] == value) {
	        if (name !== undefined && nameReg.test(mimeTypes[i][name])) return !0;
	        else if (name === undefined) return !0;
	      }
	    }
	    return !1;
	  }
	  var browser360 = {
	    result: "Chrome",
	    details: {
	      Chrome: 5,
	      Chromium: 0,
	      _360SE: 0,
	      _360EE: 0
	    },
	    sorted: ["Chrome", "360SE", "360EE", "Chromium"],
	    check: function () {
	      var init = {
	        Chrome: 5,
	        Chromium: 0,
	        _360SE: 0,
	        _360EE: 0
	      };

	      var plugins = window.navigator.plugins;

	      var webstoreLen = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0;
	      var pluginsLen = plugins.length;

	      if (
	        (window.clientInformation.languages || (init._360SE += 8),
	          /zh/i.test(navigator.language) && ((init._360SE += 3), (init._360EE += 3)),
	          window.clientInformation.languages)
	      ) {
	        var lanLen = window.clientInformation.languages.length;
	        if (lanLen >= 3) {
	          (init.Chrome += 10), (init.Chromium += 6);
	        } else if (2 == lanLen) {
	          (init.Chrome += 3), (init.Chromium += 6), (init._360EE += 6);
	        } else if (1 == lanLen) {
	          (init.Chrome += 4), (init.Chromium += 4);
	        }
	      }
	      var pluginFrom,
	        maybe360 = 0;
	      for (var r in plugins) {
	        if ((pluginFrom = /^(.+) PDF Viewer$/.exec(plugins[r].name))) {
	          if ("Chrome" == pluginFrom[1]) {
	            (init.Chrome += 6), (init._360SE += 6), (maybe360 = 1);
	          } else if ("Chromium" == pluginFrom[1]) {
	            (init.Chromium += 10), (init._360EE += 6), (maybe360 = 1);
	          }
	        } else if ("np-mswmp.dll" == plugins[r].filename) {
	          (init._360SE += 20), (init._360EE += 20);
	        }
	      }

	      maybe360 || (init.Chromium += 9);
	      if (webstoreLen <= 1) {
	        init._360SE += 7;
	      } else {
	        init._360SE += 4;
	        init.Chromium += 3;
	        if (pluginsLen >= 30) {
	          (init._360EE += 7), (init._360SE += 7), (init.Chrome += 7);
	        } else if (pluginsLen < 30 && pluginsLen > 10) {
	          (init._360EE += 3), (init._360SE += 3), (init.Chrome += 3);
	        } else {
	          init.Chromium += 6;
	        }
	      }

	      var m = new Object();
	      (m.Chrome = init.Chrome),
	        (m.Chromium = init.Chromium),
	        (m["360SE"] = init._360SE),
	        (m["360EE"] = init._360EE);
	      var s = [];
	      for (var u in m) {
	        s.push([u, m[u]]);
	      }
	      s.sort(function (e, i) {
	        return i[1] - e[1];
	      });
	      this.sorted = s;
	      this.details = init;
	      this.result = s[0][0] || "";

	      return this.result.toLowerCase();
	    }
	  };
	  /**
	   * 获取 Chromium 内核浏览器类型
	   * @link http://www.adtchrome.com/js/help.js
	   * @link https://ext.chrome.360.cn/webstore
	   * @link https://ext.se.360.cn
	   * @return {String}
	   *         360ee 360极速浏览器
	   *         360se 360安全浏览器
	   *         sougou 搜狗浏览器
	   *         liebao 猎豹浏览器
	   *         chrome 谷歌浏览器
	   *         ''    无法判断
	   */

	  function _getChromiumType(version) {
	    if (window.scrollMaxX !== undefined) return "";

	    var doc = document;
	    var _track = "track" in doc.createElement("track"),
	      appVersion = window.navigator.appVersion,
	      external = window.external;

	    // 搜狗浏览器
	    if (external && "SEVersion" in external) return "搜狗浏览器";

	    // 猎豹浏览器
	    if (external && "LiebaoGetVersion" in external) return "猎豹浏览器";

	    if (/QQBrowser/.test(appVersion)) {
	      //qq浏览器
	      return "qq浏览器";
	    }
	    if (/Maxthon/.test(appVersion)) {
	      //遨游浏览器
	      return "遨游浏览器";
	    }
	    if (/TaoBrowser/.test(appVersion)) {
	      //淘宝浏览器
	      return "淘宝浏览器";
	    }
	    if (/BIDUBrowser/.test(appVersion)) {
	      //百度浏览器
	      return "baidu";
	    }
	    if (/UBrowser/.test(appVersion)) {
	      //UC浏览器
	      return "UC浏览器";
	    }

	    if (window.navigator.vendor && window.navigator.vendor.indexOf("Opera") == 0) {
	      //opera
	      return "欧朋浏览器";
	    }
	    // chrome
	    // if (window.clientInformation && window.clientInformation.languages && window.clientInformation.languages.length > 2) {
	    //     return 'chrome';
	    // }
	    var p = navigator.platform.toLowerCase();
	    if (p.indexOf("mac") == 0 || p.indexOf("linux") == 0) {
	      return "谷歌浏览器";
	    }
	    if (parseInt(version) > MAX_360_CHROME_VERSION) {
	      return "谷歌浏览器";
	    }
	    
	    // var webstoreKeysLength = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0;
	    // if (_track) {
	    //     // 360极速浏览器
	    //     // 360安全浏览器
	    //     return webstoreKeysLength > 1 ? '360ee' : '360se';
	    // }

	    return browser360.check();
	  }
	  var client = (function () {
	    var browser = {};

	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    if ((s = ua.match(/rv:([\d.]+)\) like gecko/))) {
	      browser.name = "ie";
	      browser["ie"] = s[1];
	    } else if ((s = ua.match(/msie ([\d.]+)/))) {
	      browser.name = "ie";
	      browser["ie"] = s[1];
	    } else if ((s = ua.match(/edge\/([\d.]+)/))) {
	      browser.name = "edge";
	      browser["edge"] = s[1];
	    } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
	      browser.name = "firefox";
	      browser["firefox"] = s[1];
	    } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
	      browser.name = "chrome";
	      browser["chrome"] = s[1];
	      var type = _getChromiumType(browser["chrome"]);
	      if (type) {
	        browser["chrome"] += "(" + type + ")";
	      }
	    } else if ((s = ua.match(/opera.([\d.]+)/))) {
	      browser.name = "opera";
	      browser["opera"] = s[1];
	    } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
	      browser.name = "safari";
	      browser["safari"] = s[1];
	    } else {
	      browser.name = "unknown";
	      browser["unknow"] = 0;
	    }

	    var system = {};

	    //detect platform
	    //        var p = navigator.platform.toLowerCase();
	    if (ua.indexOf("iphone") > -1) {
	      system.name = "iphone";
	      system.iphone = getIOSVersion(ua);
	    } else if (ua.indexOf("ipod") > -1) {
	      system.name = "ipod";
	      system.ipod = getIOSVersion(ua);
	    } else if (ua.indexOf("ipad") > -1) {
	      system.name = "ipad";
	      system.ipad = getIOSVersion(ua);
	    } else if (ua.indexOf("nokia") > -1) {
	      system.name = "nokia";
	      system.nokia = true;
	    } else if (/android (\d+\.\d+)/.test(ua)) {
	      system.name = "android";
	      system.android = parseFloat(RegExp.$1);
	    } else if (ua.indexOf("win") > -1) {
	      system.name = "win";

	      if (/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
	        if (RegExp["$1"] == "nt") {
	          switch (RegExp["$2"]) {
	            case "5.0":
	              system.win = "2000";
	              break;
	            case "5.1":
	              system.win = "XP";
	              break;
	            case "6.0":
	              system.win = "Vista";
	              break;
	            case "6.1":
	              system.win = "7";
	              break;
	            case "6.2":
	              system.win = "8";
	              break;
	            case "6.3":
	              system.win = "8.1";
	              break;
	            case "10.0":
	              system.win = "10";
	              break;
	            default:
	              system.win = "NT";
	              break;
	          }
	        } else if (RegExp["$1"] == "9x") {
	          system.win = "ME";
	        } else {
	          system.win = RegExp["$1"];
	        }
	      }
	    } else if (ua.indexOf("mac") > -1) {
	      system.name = "mac";
	    } else if (ua.indexOf("linux") > -1) {
	      system.name = "linux";
	    }
	    var str =
	      system.name +
	      (system[system.name] || "") +
	      "|" +
	      browser.name +
	      browser[browser.name];
	    var isMobile =
	      system.android ||
	      system.iphone ||
	      system.ios ||
	      system.ipad ||
	      system.ipod ||
	      system.nokia;
	    // console.log(str, "33333333")
	    that.sysType = system.name + system.win
	    that.browserType = str.split("|")[1]
	    return {
	      browser: browser,
	      system: system,
	      isMobile: isMobile,
	      string: str
	    };
	  })();
	  window[packageName]["browser"] = client;
	  return client.string
}//e



/******************获取浏览器内核名称及版本号(exploreName+version)*******************
*无参数
*无返回值
*注解:
*1.返回结果包含浏览器名称及版本号，例如:"Chrome:78.0.3904.108"
**/
domUtilityFun.getExploreName_version=function(){
 let Sys = {};  
 let ua = window.navigator.userAgent.toLowerCase();//获取用户代理  
 let s;  
 (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
 (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
 (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
 (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :  
 (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :  
 (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :  
 (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;  
  // 根据关系进行判断
 if (Sys.ie) return ('IE:' + Sys.ie);  
 if (Sys.edge) return ('EDGE:' + Sys.edge);
 if (Sys.firefox) return ('Firefox:' + Sys.firefox);  
 if (Sys.chrome) return ('Chrome:' + Sys.chrome);  
 if (Sys.opera) return ('Opera:' + Sys.opera);  
 if (Sys.safari) return ('Safari:' + Sys.safari);
 return 'Unkonwn';
}//e



/******************获取浏览器内核名称(exploreName)*******************
*更新时间：2020.08.26
*无参数
*返回值:result(string):返回浏览器名称,可选值:"Chrome"、"Firefox"
*注解:
*1.返回结果包含浏览器名称，例如:"Chrome"
**/
domUtilityFun.getExploreName=function(){
let userAgent = window.navigator.userAgent;
if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
return 'Opera';
}
else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
return 'IE';
}
else if(userAgent.indexOf("Edge") > -1){
return 'Edge';
}
else if(userAgent.indexOf("Firefox") > -1){
return 'Firefox';
}
else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
return 'Safari';
}
else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
return 'Chrome';
}
else if(!!window.ActiveXObject || "ActiveXObject" in window){
return 'IE>=11';
}
else{
return 'Unkonwn';
}
}//e




/***************封装将路径参数解析为对象**************
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


/***************封装生成uuid的函数(当前时间戳)**************
 *参数:无参数
 *返回值:timestamp(number):返回当前时间戳
 *注解:因为每个时间戳是唯一的，所以当做uuid
 */
domUtilityFun.generateUuid_time=function(){
let date=new Date();//中国标准时间对象
let timestamp=date.getTime();//当前时间的时间戳
return timestamp;
}//e


/*************************封装验证输入身份证号格式正确性********************
 *参数:idCardValue(string):输入的身份证值，必须是身份证字符串,不能为数字
 *返回值:如果格式正确返回true,否则返回错误的提示信息
 */
domUtilityFun.inspectIdCard=function(idCardValue){
var res;
var sBirthday="";
var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
res=isCardID(idCardValue);
return res;
function isCardID(sId){
var iSum=0 ;
if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
sId=sId.replace(/x$/i,"a");
if(aCity[parseInt(sId.substr(0,2))]==null) return "身份证号格式错误";
sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
var d=new Date(sBirthday.replace(/-/g,"/")) ;
if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证号格式错误";
for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
if(iSum%11!=1) return "身份证号格式错误！";
//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
return true;
}//e1
}//e


/*****************************封装生成uuid的函数************************
 *无参数
 *无返回值 
 */
domUtilityFun.generateUuid=function(){
var s=[];
var hexDigits="0123456789abcdef";
for(var i=0;i<36;i++) {
s[i]=hexDigits.substr(Math.floor(Math.random()*0x10),1);
}
s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the
// clock_seq_hi_and_reserved
// to 01
s[8]=s[13]=s[18]=s[23]="-";
var uuid=s.join("").toUpperCase();
return uuid;
}//e

/************************封装简写省、市、县、乡镇地区名称，避免名字太长*****************
 * 参数:xzmc(string):将要转换的省、市、县、乡镇行政名称
 * ****xzLeval(string):将要转换的省、市、县、乡镇名称的的行政级别  可能值为 省  州市  县区  乡镇
 * 注意:该方法用于将省、市、县、乡镇名称进行缩写(简写)，避免名称太长
 * 例如：“禄劝彝族苗族自治县”转为“禄劝县”
 */
domUtilityFun.xzNameTranslate=function(xzName,xzLeval){
var resName;
if(xzLeval && xzName){
if(xzLeval=="省"){

}
else if(xzLeval=="州市"){//州市转换   
   
}
else if(xzLeval=="县区"){//县区转换   
var xzmc=xzName.split("");//行政名称
var xzmclen=xzmc.length; 
if(xzmclen>4){//行政名称超过4个字就会简写
var mc1=xzmc[0];//第一个字 
var mc2=xzmc[1];//第二个字  
resName=mc1+mc2+"县";
}
else{
resName=xzName;    
}
}
else if(xzLeval=="乡镇"){//乡镇转换   
    
}
return resName;
}    
}//e

//export default domUtilityFun;//暴露出去
