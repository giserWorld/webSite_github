(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[16],{746:function(e,t,n){"use strict";n.r(t);var a=n(17),u=n(18),r=n(19),l=n(20),c=n(0),i=n.n(c),o=n(21),s=Object(o.b)((function(e){return{redux_value:e.bookData.redux_value}}),(function(e){return{}}))((function(e){return console.log("historyFun-render()"),i.a.createElement("div",null,i.a.createElement("h2",null,"historyFun"),i.a.createElement("div",null,e.redux_value,i.a.createElement("p",null)))}));var h=Object(o.b)((function(e){return{redux_value:"ssss"}}),(function(e){return{}}))((function(e){return console.log("EnglishFun-render()"),i.a.createElement("div",null,i.a.createElement("h2",null,"EnglishFfun"),i.a.createElement("div",null,e.redux_value))})),v=function(e){Object(l.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(a.a)(this,n);for(var u=arguments.length,r=new Array(u),l=0;l<u;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={inputValue:"dd"},e}return Object(u.a)(n,[{key:"handelChange",value:function(e,t){var n=e||"",a=t&&t.target?t.target.value:t,u={};n&&(u[n]=a),n&&this.setState(u)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h2",null,"book"),i.a.createElement("input",{type:"text",value:this.state.inputValue,onChange:this.handelChange.bind(this,"inputValue")}),i.a.createElement("button",{onClick:function(){return e.props.changeData(e.state.inputValue)}},"\u6539\u53d8\u5bb9\u5668redux\u5bb9\u5668\u72b6\u6001"),i.a.createElement("hr",null),i.a.createElement(s,null),i.a.createElement("hr",null),i.a.createElement(h,null))}},{key:"componentDidMount",value:function(){}}]),n}(c.Component);var d=Object(o.b)(null,(function(e){return{changeData:function(t){e.bookData.changeData(t)}}}))(v),m=function(e){Object(l.a)(n,e);var t=Object(r.a)(n);function n(e){var u;return Object(a.a)(this,n),(u=t.call(this,e)).state={name:"reduxViewer"},u}return Object(u.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"wrap"},i.a.createElement(d,null))}},{key:"componentDidMount",value:function(){}}]),n}(c.Component);t.default=m}}]);
//# sourceMappingURL=16.cb119eb0.chunk.js.map