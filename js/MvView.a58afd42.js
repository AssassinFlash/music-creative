(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MvView"],{"0cb2":function(e,t,n){var r=n("7b0b"),a=Math.floor,i="".replace,c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,o=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,n,s,u,l){var v=n+e.length,b=s.length,d=o;return void 0!==u&&(u=r(u),d=c),i.call(l,d,(function(r,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(v);case"<":c=u[i.slice(1,-1)];break;default:var o=+i;if(0===o)return r;if(o>b){var l=a(o/10);return 0===l?r:l<=b?void 0===s[l-1]?i.charAt(1):s[l-1]+i.charAt(1):r}c=s[o-1]}return void 0===c?"":c}))}},1148:function(e,t,n){"use strict";var r=n("a691"),a=n("577e"),i=n("1d80");e.exports=function(e){var t=a(i(this)),n="",c=r(e);if(c<0||c==1/0)throw RangeError("Wrong number of repetitions");for(;c>0;(c>>>=1)&&(t+=t))1&c&&(n+=t);return n}},"1e84":function(e,t,n){"use strict";n.r(t);var r=n("7a23");Object(r["H"])("data-v-63440f4c");var a={id:"MvView"},i={class:"MvView",ref:"myView"},c={class:"playMv"},o={key:0,class:"block"},s=Object(r["i"])("use",{"xlink:href":"#icon-bofang"},null,-1),u=[s],l=["src","poster","controls"],v={class:"singer"},b={class:"top"},d={class:"singer-avatar"},f=["src"],O={class:"singer-desc"},p={class:"singer-name"},j={class:"singer-songs"},m={class:"center"},g={class:"mv-name"},h={class:"bottom"},w={class:"playCount"},x={class:"publishTime"},y={class:"moreList"},k={class:"top"},M={class:"list"},R=["onClick"],$={class:"thumbnail"},C=["src"],J={class:"mv-item-desc"},L={class:"mv-item-name"},E={class:"mv-item-time"};function F(e,t,n,s,F,V){var S=Object(r["L"])("LottieLoading");return Object(r["E"])(),Object(r["h"])("div",a,[Object(r["i"])("div",i,[Object(r["i"])("div",c,[s.showBlock?(Object(r["E"])(),Object(r["h"])("div",o,[(Object(r["E"])(),Object(r["h"])("svg",{class:"icon","aria-hidden":"true",onClick:t[0]||(t[0]=Object(r["W"])((function(){return s.playMv&&s.playMv.apply(s,arguments)}),["stop"]))},u))])):Object(r["g"])("",!0),Object(r["i"])("video",{ref:"video",src:s.mvUrl.url,poster:s.mvDetail.cover,controls:s.showController},null,8,l)]),Object(r["i"])("div",v,[e.$store.state.loading?(Object(r["E"])(),Object(r["f"])(S,{key:0})):Object(r["g"])("",!0),Object(r["i"])("div",b,[Object(r["i"])("div",d,[Object(r["i"])("img",{src:s.singer.cover,alt:""},null,8,f)]),Object(r["i"])("div",O,[Object(r["i"])("div",p,Object(r["O"])(s.singer.name),1),Object(r["i"])("div",j,Object(r["O"])(s.singer.musicSize)+"首歌曲，"+Object(r["O"])(s.singer.mvSize)+"个MV",1)])]),Object(r["i"])("div",m,[Object(r["i"])("div",g,Object(r["O"])(s.singer.name)+" - "+Object(r["O"])(s.mvDetail.name),1)]),Object(r["i"])("div",h,[Object(r["i"])("span",w,Object(r["O"])(s.playCount)+"次播放",1),Object(r["i"])("span",x,Object(r["O"])(s.mvDetail.publishTime),1)])]),Object(r["i"])("div",y,[Object(r["i"])("div",k,"更多 "+Object(r["O"])(s.singer.name)+" 的MV",1),Object(r["i"])("div",M,[(Object(r["E"])(!0),Object(r["h"])(r["a"],null,Object(r["K"])(s.singerMvs,(function(e,t){return Object(r["E"])(),Object(r["h"])("div",{class:"mv-item",onClick:function(t){return s.goToMv(e.id)},key:t},[Object(r["i"])("div",$,[Object(r["i"])("img",{src:e.imgurl16v9,alt:""},null,8,C)]),Object(r["i"])("div",J,[Object(r["i"])("div",L,Object(r["O"])(e.artistName)+" - "+Object(r["O"])(e.name),1),Object(r["i"])("div",E,[Object(r["i"])("span",null,Object(r["O"])(s.getPlayCount(e.playCount))+"次播放",1),Object(r["i"])("span",null,Object(r["O"])(e.publishTime),1)])])],8,R)})),128))])])],512)])}Object(r["F"])();var V=n("1da1"),S=(n("d3b7"),n("25f0"),n("b680"),n("ac1f"),n("5319"),n("96cf"),n("6c02")),I=n("5502"),T=n("7a5c"),N=n("c8b5"),D=n.n(N),A=n("f96a"),B={name:"MvView",components:{LottieLoading:A["a"]},setup:function(){var e=Object(S["c"])(),t=Object(S["d"])(),n=Object(I["d"])(),a=Object(r["J"])(),i=Object(r["J"])(!1),c=Object(r["J"])(!0),o=Object(r["J"])(""),s=Object(r["J"])({}),u=Object(r["J"])({}),l=function(){var t=Object(V["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(T["c"])(e.params.id);case 2:n=t.sent,s.value=n.data.data,o.value=b(s.value.playCount);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),v=function(){var t=Object(V["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(T["d"])(e.params.id);case 2:n=t.sent,u.value=n.data.data;case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),b=function(e){return e<1e4?e.toString():e>=1e4&&e<1e8?(e/1e4).toFixed(2).toString()+"万":e>=1e8?(e/1e8).toFixed(2).toString()+"亿":void 0},d=Object(r["J"])({}),f=function(){var e=Object(V["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(T["f"])(s.value.artistId);case 2:t=e.sent,d.value=t.data.data.artist;case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=Object(r["J"])([]),p=function(){var e=Object(V["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(T["g"])(d.value.id);case 2:t=e.sent,O.value=t.data.mvs;case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=Object(r["J"])(),m=function(){!0===c.value?(c.value=!1,j.value.play()):(c.value=!0,i.value=!1,j.value.pause())},g=function(){var e=Object(V["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.replace({name:"MvView",params:{id:r}});case 2:return n.commit("setLoading",!0),e.next=5,l();case 5:return e.next=7,v();case 7:return e.next=9,f();case 9:return e.next=11,p();case 11:n.commit("setLoading",!1),window.location.reload();case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r["x"])(Object(V["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.commit("setLoading",!0),e.next=3,l();case 3:return e.next=5,v();case 5:return e.next=7,f();case 7:return e.next=9,p();case 9:n.commit("setLoading",!1);case 10:case"end":return e.stop()}}),e)})))),Object(r["B"])((function(){var e=new D.a(j.value),n=new D.a(a.value);e.on("tap",(function(){i.value=!i.value})),e.on("doubletap",(function(){m()})),n.on("swipe",(function(e){e.deltaX<=-100&&t.go(-1)}))})),{myView:a,showController:i,showBlock:c,video:j,playMv:m,mvDetail:s,playCount:o,getPlayCount:b,mvUrl:u,singer:d,singerMvs:O,goToMv:g}}};n("d55b");B.render=F,B.__scopeId="data-v-63440f4c";t["default"]=B},"408a":function(e,t,n){var r=n("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=r(e))throw TypeError("Incorrect invocation");return+e}},5319:function(e,t,n){"use strict";var r=n("d784"),a=n("d039"),i=n("825a"),c=n("a691"),o=n("50c4"),s=n("577e"),u=n("1d80"),l=n("8aa5"),v=n("0cb2"),b=n("14c3"),d=n("b622"),f=d("replace"),O=Math.max,p=Math.min,j=function(e){return void 0===e?e:String(e)},m=function(){return"$0"==="a".replace(/./,"$0")}(),g=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),h=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));r("replace",(function(e,t,n){var r=g?"$":"$0";return[function(e,n){var r=u(this),a=void 0==e?void 0:e[f];return void 0!==a?a.call(e,r,n):t.call(s(r),e,n)},function(e,a){var u=i(this),d=s(e);if("string"===typeof a&&-1===a.indexOf(r)&&-1===a.indexOf("$<")){var f=n(t,u,d,a);if(f.done)return f.value}var m="function"===typeof a;m||(a=s(a));var g=u.global;if(g){var h=u.unicode;u.lastIndex=0}var w=[];while(1){var x=b(u,d);if(null===x)break;if(w.push(x),!g)break;var y=s(x[0]);""===y&&(u.lastIndex=l(d,o(u.lastIndex),h))}for(var k="",M=0,R=0;R<w.length;R++){x=w[R];for(var $=s(x[0]),C=O(p(c(x.index),d.length),0),J=[],L=1;L<x.length;L++)J.push(j(x[L]));var E=x.groups;if(m){var F=[$].concat(J,C,d);void 0!==E&&F.push(E);var V=s(a.apply(void 0,F))}else V=v($,d,C,J,E,a);C>=M&&(k+=d.slice(M,C)+V,M=C+$.length)}return k+d.slice(M)}]}),!h||!m||g)},"5e07":function(e,t,n){},b680:function(e,t,n){"use strict";var r=n("23e7"),a=n("a691"),i=n("408a"),c=n("1148"),o=n("d039"),s=1..toFixed,u=Math.floor,l=function(e,t,n){return 0===t?n:t%2===1?l(e,t-1,n*e):l(e*e,t/2,n)},v=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},b=function(e,t,n){var r=-1,a=n;while(++r<6)a+=t*e[r],e[r]=a%1e7,a=u(a/1e7)},d=function(e,t){var n=6,r=0;while(--n>=0)r+=e[n],e[n]=u(r/t),r=r%t*1e7},f=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var r=String(e[t]);n=""===n?r:n+c.call("0",7-r.length)+r}return n},O=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){s.call({})}));r({target:"Number",proto:!0,forced:O},{toFixed:function(e){var t,n,r,o,s=i(this),u=a(e),O=[0,0,0,0,0,0],p="",j="0";if(u<0||u>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(p="-",s=-s),s>1e-21)if(t=v(s*l(2,69,1))-69,n=t<0?s*l(2,-t,1):s/l(2,t,1),n*=4503599627370496,t=52-t,t>0){b(O,0,n),r=u;while(r>=7)b(O,1e7,0),r-=7;b(O,l(10,r,1),0),r=t-1;while(r>=23)d(O,1<<23),r-=23;d(O,1<<r),b(O,1,1),d(O,2),j=f(O)}else b(O,0,n),b(O,1<<-t,0),j=f(O)+c.call("0",u);return u>0?(o=j.length,j=p+(o<=u?"0."+c.call("0",u-o)+j:j.slice(0,o-u)+"."+j.slice(o-u))):j=p+j,j}})},d55b:function(e,t,n){"use strict";n("5e07")}}]);
//# sourceMappingURL=MvView.a58afd42.js.map