"use strict";!function(){var r={PATH:1,SELECTOR:2,OBJ_PRED:3,POS_PRED:4,LOGICAL_EXPR:5,COMPARISON_EXPR:6,MATH_EXPR:7,CONCAT_EXPR:8,UNARY_EXPR:9,POS_EXPR:10,LITERAL:11},n=function(){var n,t,e,u,o={ID:1,NUM:2,STR:3,BOOL:4,NULL:5,PUNCT:6,EOP:7},i={UNEXP_TOKEN:'Unexpected token "%0"',UNEXP_EOP:"Unexpected end of path"};function a(){for(var n,t=f();P("|");)L(),(n||(n=[t])).push(f());return n?{type:r.CONCAT_EXPR,args:n}:t}function f(){return P("(")?s():c()}function s(){A("(");var n=a();A(")");for(var t,e=[];t=p();)e.push(t);return e.length?n.type===r.PATH?(n.parts=n.parts.concat(e),n):(e.unshift(n),{type:r.PATH,parts:e}):n}function p(){return P("[")?function(){A("[");var n=function(){if(P(":"))return L(),{type:r.POS_EXPR,toIdx:y()};var n=y();if(P(":"))return L(),P("]")?{type:r.POS_EXPR,fromIdx:n}:{type:r.POS_EXPR,fromIdx:n,toIdx:y()};return{type:r.POS_EXPR,idx:n}}();return A("]"),{type:r.POS_PRED,arg:n}}():P("{")?function(){A("{");var n=l();return A("}"),{type:r.OBJ_PRED,arg:n}}():P("(")?s():void 0}function c(){O()||S(L());var n,t=!1;P("^")?(L(),t=!0):R()&&(n=L().val.substr(1));for(var e,u=[];e=E()?function(){var n,t=L().val,e=d();(P("*")||e.type===o.ID||e.type===o.STR)&&(n=L().val);return{type:r.SELECTOR,selector:t,prop:n}}():p();)u.push(e);return{type:r.PATH,fromRoot:t,subst:n,parts:u}}function l(){for(var n,t=h();P("||");)L(),(n||(n=[t])).push(h());return n?{type:r.LOGICAL_EXPR,op:"||",args:n}:t}function h(){for(var n,t=g();P("&&");)L(),(n||(n=[t])).push(g());return n?{type:r.LOGICAL_EXPR,op:"&&",args:n}:t}function g(){for(var n=function n(){var t=function(){var n=v();for(;P("+")||P("-");)n={type:r.MATH_EXPR,op:L().val,args:[n,v()]};return n}();for(;P("<")||P(">")||P("<=")||P(">=");)t={type:r.COMPARISON_EXPR,op:L().val,args:[t,n()]};return t}();P("==")||P("!=")||P("===")||P("!==")||P("^==")||P("==^")||P("^=")||P("=^")||P("$==")||P("==$")||P("$=")||P("=$")||P("*==")||P("==*")||P("*=")||P("=*");)n={type:r.COMPARISON_EXPR,op:L().val,args:[n,g()]};return n}function v(){for(var n=y();P("*")||P("/")||P("%");)n={type:r.MATH_EXPR,op:L().val,args:[n,v()]};return n}function y(){return P("!")||P("-")?{type:r.UNARY_EXPR,op:L().val,arg:y()}:function(){var n=d().type;if(n===o.STR||n===o.NUM||n===o.BOOL||n===o.NULL)return{type:r.LITERAL,val:L().val};if(O())return c();if(P("("))return function(){A("(");var r=l();return A(")"),r}();return S(L())}()}function P(r){var n=d();return n.type===o.PUNCT&&n.val===r}function O(){return E()||R()||P("^")}function E(){var r=d();if(r.type===o.PUNCT){var n=r.val;return"."===n||".."===n}return!1}function R(){var r=d();return r.type===o.ID&&"$"===r.val[0]}function A(r){var n=L();n.type===o.PUNCT&&n.val===r||S(n)}function d(){if(null!==e)return e;var r=t;return e=T(),t=r,e}function T(){for(;r=n[t]," \r\n\t".indexOf(r)>-1;)++t;var r;if(t>=u)return{type:o.EOP,range:[t,t]};var e=function(){var r=t,e=n[t],u=n[t+1];if("."===e){if(C(u))return;return"."===n[++t]?{type:o.PUNCT,val:"..",range:[r,++t]}:{type:o.PUNCT,val:".",range:[r,t]}}if("="===u){var i=n[t+2];if("="===i){if("=!^$*".indexOf(e)>=0)return{type:o.PUNCT,val:e+u+i,range:[r,t+=3]}}else if("^$*".indexOf(i)>=0){if("="===e)return{type:o.PUNCT,val:e+u+i,range:[r,t+=3]}}else if("=!^$*><".indexOf(e)>=0)return{type:o.PUNCT,val:e+u,range:[r,t+=2]}}else if("="===e&&"^$*".indexOf(u)>=0)return{type:o.PUNCT,val:e+u,range:[r,t+=2]};if(e===u&&("|"===e||"&"===e))return{type:o.PUNCT,val:e+u,range:[r,t+=2]};if(":{}()[]^+-*/%!><|".indexOf(e)>=0)return{type:o.PUNCT,val:e,range:[r,++t]}}();if(e||(e=function(){var r=n[t];if(!_(r))return;var e=t,i=r;for(;++t<u&&N(r=n[t]);)i+=r;switch(i){case"true":case"false":return{type:o.BOOL,val:"true"===i,range:[e,t]};case"null":return{type:o.NULL,val:null,range:[e,t]};default:return{type:o.ID,val:i,range:[e,t]}}}())||(e=function(){if('"'!==n[t]&&"'"!==n[t])return;var r,e=n[t],i=++t,a="",f=!1;for(;t<u;){if("\\"===(r=n[t++]))r=n[t++];else if(('"'===r||"'"===r)&&r===e){f=!0;break}a+=r}if(f)return{type:o.STR,val:a,range:[i,t]}}())||(e=function(){var r=t,e=n[t],i="."===e;if(i||C(e)){for(var a=e;++t<u;){if("."===(e=n[t])){if(i)return;i=!0}else if(!C(e))break;a+=e}return{type:o.NUM,val:i?parseFloat(a):parseInt(a,10),range:[r,t]}}}()))return e;e={range:[t,t]},t>=u?e.type=o.EOP:e.val=n[t],S(e)}function L(){var r;return e?(t=e.range[1],r=e,e=null,r):T()}function C(r){return"0123456789".indexOf(r)>=0}function _(r){return"$"===r||"@"===r||"_"===r||r>="a"&&r<="z"||r>="A"&&r<="Z"}function N(r){return _(r)||r>="0"&&r<="9"}function S(r){r.type===o.EOP&&b(r,i.UNEXP_EOP),b(r,i.UNEXP_TOKEN,r.val)}function b(r,n){var t=Array.prototype.slice.call(arguments,2),e=n.replace(/%(\d)/g,function(r,n){return t[n]||""}),u=new Error(e);throw u.column=r.range[0],u}return function(r){n=r.split(""),t=0,e=null,u=n.length;var i=a(),f=L();return f.type!==o.EOP&&S(f),i}}(),t=function(){var n,t,e,u;function o(){if(u.length)return u.shift();var r="v"+ ++e;return t.push(r),r}function i(){for(var r=arguments,n=r.length;n--;)u.push(r[n])}function a(r,t,e){if(r.prop){var u=g(r.prop),a=o(),f=o(),s=o(),p=o(),c=o(),l=o(),h=o();n.push(a,"= [];",f,"= 0;",s,"=",e,".length;",h,"= [];","while(",f,"<",s,") {",p,"=",e,"[",f,"++];","if(",p,"!= null) {"),"*"===r.prop?(n.push("if(typeof ",p,'=== "object") {',"if(isArr(",p,")) {",a,"=",a,".concat(",p,");","}","else {","for(",c," in ",p,") {","if(",p,".hasOwnProperty(",c,")) {",l,"=",p,"[",c,"];"),v(a,l),n.push("}","}","}","}")):(n.push(l,"=",p,"[",u,"];"),v(a,l,h,s)),n.push("}","}",t,"=",s,"> 1 &&",h,".length?",h,".length > 1?","concat.apply(",a,",",h,") :",a,".concat(",h,"[0]) :",a,";"),i(a,f,s,p,c,l,h)}}function f(r,t,e){var u=r.prop,a=o(),f=o(),s=o(),p=o(),c=o(),l=o(),h=o(),g=o();n.push(a,"=",e,".slice(),",g,"= [];","while(",a,".length) {",f,"=",a,".shift();"),u?n.push("if(typeof ",f,'=== "object" &&',f,") {"):n.push("if(typeof ",f,"!= null) {"),n.push(s,"= [];","if(isArr(",f,")) {",p,"= 0,",h,"=",f,".length;","while(",p,"<",h,") {",l,"=",f,"[",p,"++];"),u&&n.push("if(typeof ",l,'=== "object") {'),v(s,l),u&&n.push("}"),n.push("}","}","else {"),u?"*"!==u&&(n.push(l,"=",f,'["'+u+'"];'),v(g,l)):(v(g,f),n.push("if(typeof ",f,'=== "object") {')),n.push("for(",c," in ",f,") {","if(",f,".hasOwnProperty(",c,")) {",l,"=",f,"[",c,"];"),v(s,l),"*"===u&&v(g,l),n.push("}","}"),u||n.push("}"),n.push("}",s,".length &&",a,".unshift.apply(",a,",",s,");","}","}",t,"=",g,";"),i(a,f,s,p,c,l,h,g)}function s(r,t,e){var u=o(),a=o(),f=o(),s=o(),p=o();n.push(u,"= [];",a,"= 0;",f,"=",e,".length;","while(",a,"<",f,") {",p,"=",e,"[",a,"++];"),c(r.arg,s,p),n.push(P(r.arg,s),"&&",u,".push(",p,");","}",t,"=",u,";"),i(u,a,f,p,s)}function p(r,t,e){var u,a,f=r.arg;if(f.idx){var s=o();return c(f.idx,s,e),n.push(s,"< 0 && (",s,"=",e,".length +",s,");",t,"=",e,"[",s,"] == null? [] : [",e,"[",s,"]];"),i(s),!1}f.fromIdx?f.toIdx?(c(f.fromIdx,u=o(),e),c(f.toIdx,a=o(),e),n.push(t,"=",e,".slice(",u,",",a,");"),i(u,a)):(c(f.fromIdx,u=o(),e),n.push(t,"=",e,".slice(",u,");"),i(u)):(c(f.toIdx,a=o(),e),n.push(t,"=",e,".slice(0,",a,");"),i(a))}function c(t,e,u){switch(t.type){case r.PATH:!function(t,e,u){var o=t.parts,i=0,c=o.length;for(n.push(e,"=",t.fromRoot?"data":t.subst?"subst."+t.subst:u,";","isArr("+e+") || ("+e+" = ["+e+"]);");i<c;){var l=o[i++];switch(l.type){case r.SELECTOR:".."===l.selector?f(l,e,e):a(l,e,e);break;case r.OBJ_PRED:s(l,e,e);break;case r.POS_PRED:p(l,e,e);break;case r.CONCAT_EXPR:h(l,e,e)}}}(t,e,u);break;case r.CONCAT_EXPR:h(t,e,u);break;case r.COMPARISON_EXPR:!function(t,e,u){var a=o(),f=o(),s=o(),p=o(),h=o(),g=o(),v=o(),y=o(),P=t.args[0],O=t.args[1];n.push(e,"= false;"),c(P,a,u),c(O,f,u);var E=P.type===r.PATH,R=O.type===r.LITERAL;n.push(s,"="),E?n.push("true;"):n.push("isArr(",a,");"),n.push(p,"="),R?n.push("false;"):n.push("isArr(",f,");"),n.push("if("),E||n.push(s,"&&"),n.push(a,".length === 1) {",a,"=",a,"[0];",s,"= false;","}"),R||n.push("if(",p,"&&",f,".length === 1) {",f,"=",f,"[0];",p,"= false;","}"),n.push(h,"= 0;","if(",s,") {",v,"=",a,".length;"),R||(n.push("if(",p,") {",y,"=",f,".length;","while(",h,"<",v,"&& !",e,") {",g,"= 0;","while(",g,"<",y,") {"),l(t.op,[a,"[",h,"]"].join(""),[f,"[",g,"]"].join("")),n.push(e,"= true;","break;","}","++",g,";","}","++",h,";","}","}","else {"));n.push("while(",h,"<",v,") {"),l(t.op,[a,"[",h,"]"].join(""),f),n.push(e,"= true;","break;","}","++",h,";","}"),R||n.push("}"),n.push("}"),R||(n.push("else if(",p,") {",y,"=",f,".length;","while(",h,"<",y,") {"),l(t.op,a,[f,"[",h,"]"].join("")),n.push(e,"= true;","break;","}","++",h,";","}","}"));n.push("else {",e,"=",C[t.op](a,f),";","}"),i(a,f,s,p,h,g,v,y)}(t,e,u);break;case r.MATH_EXPR:!function(r,t,e){var u=o(),a=o(),f=r.args;c(f[0],u,e),c(f[1],a,e),n.push(t,"=",C[r.op](O(f[0],u),O(f[1],a)),";"),i(u,a)}(t,e,u);break;case r.LOGICAL_EXPR:!function(r,t,e){var u,a=[],f=r.args,s=f.length,p=0;switch(n.push(t,"= false;"),r.op){case"&&":for(;p<s;)a.push(u=o()),c(f[p],u,e),n.push("if(",P(f[p++],u),") {");n.push(t,"= true;");break;case"||":for(;p<s;)a.push(u=o()),c(f[p],u,e),n.push("if(",P(f[p],u),") {",t,"= true;","}"),1+p++<s&&n.push("else {");--s}for(;s--;)n.push("}");i.apply(null,a)}(t,e,u);break;case r.UNARY_EXPR:!function(r,t,e){var u=o(),a=r.arg;switch(c(a,u,e),r.op){case"!":n.push(t,"= !",P(a,u)+";");break;case"-":n.push(t,"= -",O(a,u)+";")}i(u)}(t,e,u);break;case r.LITERAL:n.push(e,"="),v=t.val,n.push("string"==typeof v?g(v):null===v?"null":v),n.push(";")}var v}function l(r,t,e){n.push("if(",C[r](t,e),") {")}function h(r,t,e){for(var u=[],a=r.args,f=a.length,s=0;s<f;)u.push(o()),c(a[s],u[s++],e);n.push(t,"= concat.call(",u.join(","),");"),i.apply(null,u)}function g(r){return"'"+r.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'"}function v(r,t,e,u){n.push("if(typeof ",t,'!== "undefined") {',"if(isArr(",t,")) {"),e&&(n.push(u,"> 1?"),y(e,t),n.push(":")),n.push(r,"=",r,".length?",r,".concat(",t,") :",t,".slice()",";","}","else {"),e&&n.push("if(",e,".length) {",r,"= concat.apply(",r,",",e,");",e,"= [];","}"),y(r,t),n.push(";","}","}")}function y(r,t){n.push(r,".length?",r,".push(",t,") :",r,"[0] =",t)}function P(n,t){switch(n.type){case r.LOGICAL_EXPR:return t;case r.LITERAL:return"!!"+t;case r.PATH:return t+".length > 0";default:return["(typeof ",t,'=== "boolean"?',t,":","isArr(",t,")?",t,".length > 0 : !!",t,")"].join("")}}function O(n,t){switch(n.type){case r.LITERAL:return t;case r.PATH:return t+"[0]";default:return["(isArr(",t,")?",t,"[0] : ",t,")"].join("")}}function E(r,n){return["typeof ",r,'=== "string" && typeof ',n,'=== "string" &&',r,".indexOf(",n,") === 0"].join("")}function R(r,n){return[r,"!= null &&",n,"!= null &&",r,".toString().toLowerCase().indexOf(",n,".toString().toLowerCase()) === 0"].join("")}function A(r,n){return["typeof ",r,'=== "string" && typeof ',n,'=== "string" &&',r,".length >=",n,".length &&",r,".lastIndexOf(",n,") ===",r,".length -",n,".length"].join("")}function d(r,n){return[r,"!= null &&",n,"!= null &&","(",r,"=",r,".toString()).length >=","(",n,"=",n,".toString()).length &&","(",r,".toLowerCase()).lastIndexOf(","(",n,".toLowerCase())) ===",r,".length -",n,".length"].join("")}function T(r,n){return["typeof ",r,'=== "string" && typeof ',n,'=== "string" &&',r,".indexOf(",n,") > -1"].join("")}function L(r,n){return[r,"!= null && ",n,"!= null &&",r,".toString().toLowerCase().indexOf(",n,".toString().toLowerCase()) > -1"].join("")}var C={"===":function(r,n){return r+"==="+n},"==":function(r,n){return["typeof ",r,'=== "string" && typeof ',n,'=== "string"?',r,".toLowerCase() ===",n,".toLowerCase() :"+r,"==",n].join("")},">=":function(r,n){return r+">="+n},">":function(r,n){return r+">"+n},"<=":function(r,n){return r+"<="+n},"<":function(r,n){return r+"<"+n},"!==":function(r,n){return r+"!=="+n},"!=":function(r,n){return r+"!="+n},"^==":E,"==^":function(r,n){return E(n,r)},"^=":R,"=^":function(r,n){return R(n,r)},"$==":A,"==$":function(r,n){return A(n,r)},"$=":d,"=$":function(r,n){return d(n,r)},"*==":T,"==*":function(r,n){return T(n,r)},"=*":function(r,n){return L(n,r)},"*=":L,"+":function(r,n){return r+"+"+n},"-":function(r,n){return r+"-"+n},"*":function(r,n){return r+"*"+n},"/":function(r,n){return r+"/"+n},"%":function(r,n){return r+"%"+n}};return function(o){if(n=[],t=["res"],e=0,u=[],c(o,"res","data"),n.unshift("var ",Array.isArray?"isArr = Array.isArray":'toStr = Object.prototype.toString, isArr = function(o) { return toStr.call(o) === "[object Array]"; }',", concat = Array.prototype.concat",",",t.join(","),";"),o.type===r.PATH){var i=o.parts[o.parts.length-1];i&&i.type===r.POS_PRED&&"idx"in i.arg&&n.push("res = res[0];")}return n.push("return res;"),n.join("")}}();function e(r){return Function("data,subst",t(n(r)))}var u={},o=[],i={cacheSize:100},a={cacheSize:function(r,n){if(n<r&&o.length>n)for(var t=o.splice(0,o.length-n),e=t.length;e--;)delete u[t[e]]}},f=function(r,n,t){return u[r]||(u[r]=e(r),o.push(r)>i.cacheSize&&delete u[o.shift()]),u[r](n,t||{})};f.version="0.3.4",f.params=function(r){if(!arguments.length)return i;for(var n in r)r.hasOwnProperty(n)&&(a[n]&&a[n](i[n],r[n]),i[n]=r[n])},f.compile=e,f.apply=f,"object"==typeof module&&"object"==typeof module.exports?module.exports=f:"object"==typeof modules?modules.define("jspath",function(r){r(f)}):"function"==typeof define?define(function(r,n,t){t.exports=f}):window.JSPath=f}();
