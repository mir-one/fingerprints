/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-cssanimations-cssfilters-cssgrid_cssgridlegacy-csstransforms-csstransforms3d-csstransitions-forcetouch-objectfit-touchevents-mq-prefixed-prefixedcss-prefixes-setclasses-testallprops-testprop-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */
!function(e,t,n){var o=[],i=[],s={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){i.push({name:e,fn:t,options:n})},addAsyncTest:function(e){i.push({name:null,fn:e})}},r=function(){};r.prototype=s,r=new r;var a=s._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];function l(e,t){return typeof e===t}s._prefixes=a;var d=t.documentElement,u="svg"===d.nodeName.toLowerCase();function f(e){return e.replace(/([a-z])-([a-z])/g,(function(e,t,n){return t+n.toUpperCase()})).replace(/^-/,"")}function c(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()})).replace(/^ms-/,"-ms-")}function p(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):u?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}var m,g=(m=!("onblur"in t.documentElement),function(e,t){var o;return!!e&&(t&&"string"!=typeof t||(t=p(t||"div")),!(o=(e="on"+e)in t)&&m&&(t.setAttribute||(t=p("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o)});s.hasEvent=g;
/*!
    {
      "name": "CSS Supports",
      "property": "supports",
      "caniuse": "css-featurequeries",
      "tags": ["css"],
      "builderAliases": ["css_supports"],
      "notes": [{
        "name": "W3 Spec",
        "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
      },{
        "name": "Related Github Issue",
        "href": "https://github.com/Modernizr/Modernizr/issues/648"
      },{
        "name": "W3 Info",
        "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
      }]
    }
    !*/
var v="CSS"in e&&"supports"in e.CSS,b="supportsCSS"in e;function h(e,n,o,i){var s,r,a,l,f="modernizr",c=p("div"),m=function(){var e=t.body;return e||((e=p(u?"svg":"body")).fake=!0),e}();if(parseInt(o,10))for(;o--;)(a=p("div")).id=i?i[o]:f+(o+1),c.appendChild(a);return(s=p("style")).type="text/css",s.id="s"+f,(m.fake?m:c).appendChild(s),m.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),c.id=f,m.fake&&(m.style.background="",m.style.overflow="hidden",l=d.style.overflow,d.style.overflow="hidden",d.appendChild(m)),r=n(c,e),m.fake?(m.parentNode.removeChild(m),d.style.overflow=l,d.offsetHeight):c.parentNode.removeChild(c),!!r}r.addTest("supports",v||b);var y,w=(y=e.matchMedia||e.msMatchMedia)?function(e){var t=y(e);return t&&t.matches||!1}:function(t){var n=!1;return h("@media "+t+" { #modernizr { position: absolute; } }",(function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position})),n};s.mq=w;var S=s.testStyles=h;
/*!
    {
      "name": "Touch Events",
      "property": "touchevents",
      "caniuse" : "touch",
      "tags": ["media", "attribute"],
      "notes": [{
        "name": "Touch Events spec",
        "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
      }],
      "warnings": [
        "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
      ],
      "knownBugs": [
        "False-positive on some configurations of Nokia N900",
        "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
      ]
    }
    !*/r.addTest("touchevents",(function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",a.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");S(o,(function(e){n=9===e.offsetTop}))}return n}));var C="Moz O ms Webkit",x=s._config.usePrefixes?C.split(" "):[];s._cssomPrefixes=x;var T=function(t){var o,i=a.length,s=e.CSSRule;if(void 0===s)return n;if(!t)return!1;if((o=(t=t.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in s)return"@"+t;for(var r=0;r<i;r++){var l=a[r];if(l.toUpperCase()+"_"+o in s)return"@-"+l.toLowerCase()+"-"+t}return!1};s.atRule=T;var _=s._config.usePrefixes?C.toLowerCase().split(" "):[];function P(e,t){return function(){return e.apply(t,arguments)}}s._domPrefixes=_;var E={elem:p("modernizr")};r._q.push((function(){delete E.elem}));var O={style:E.elem.style};function A(t,o){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(c(t[i]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];i--;)s.push("("+c(t[i])+":"+o+")");return h("@supports ("+(s=s.join(" or "))+") { #modernizr { position: absolute; } }",(function(t){return"absolute"==function(t,n,o){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,t,n);var s=e.console;null!==i?o&&(i=i.getPropertyValue(o)):s&&s[s.error?"error":"log"].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}else i=!n&&t.currentStyle&&t.currentStyle[o];return i}(t,null,"position")}))}return n}function G(e,t,o,i){if(i=!l(i,"undefined")&&i,!l(o,"undefined")){var s=A(e,o);if(!l(s,"undefined"))return s}for(var r,a,d,u,c,m=["modernizr","tspan","samp"];!O.style&&m.length;)r=!0,O.modElem=p(m.shift()),O.style=O.modElem.style;function g(){r&&(delete O.style,delete O.modElem)}for(d=e.length,a=0;a<d;a++)if(u=e[a],c=O.style[u],~(""+u).indexOf("-")&&(u=f(u)),O.style[u]!==n){if(i||l(o,"undefined"))return g(),"pfx"!=t||u;try{O.style[u]=o}catch(e){}if(O.style[u]!=c)return g(),"pfx"!=t||u}return g(),!1}r._q.unshift((function(){delete O.style}));s.testProp=function(e,t,o){return G([e],n,t,o)};function M(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+x.join(s+" ")+s).split(" ");return l(t,"string")||l(t,"undefined")?G(r,t,o,i):function(e,t,n){var o;for(var i in e)if(e[i]in t)return!1===n?e[i]:l(o=t[e[i]],"function")?P(o,n||t):o;return!1}(r=(e+" "+_.join(s+" ")+s).split(" "),t,n)}s.testAllProps=M;var z=s.prefixed=function(e,t,n){return 0===e.indexOf("@")?T(e):(-1!=e.indexOf("-")&&(e=f(e)),t?M(e,t,n):M(e,"pfx"))};s.prefixedCSS=function(e){var t=z(e);return t&&c(t)};function L(e,t,o){return M(e,n,n,t,o)}
/*!
    {
      "name": "Force Touch Events",
      "property": "forcetouch",
      "authors": ["Kraig Walker"],
      "notes": [{
        "name": "Responding to Force Touch Events from JavaScript",
        "href": "https://developer.apple.com/library/prerelease/mac/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Articles/RespondingtoForceTouchEventsfromJavaScript.html"
      }]
    }
    !*/
r.addTest("forcetouch",(function(){return!!g(z("mouseforcewillbegin",e,!1),e)&&(MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN&&MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN)})),
/*!
    {
      "name": "CSS Object Fit",
      "caniuse": "object-fit",
      "property": "objectfit",
      "tags": ["css"],
      "builderAliases": ["css_objectfit"],
      "notes": [{
        "name": "Opera Article on Object Fit",
        "href": "https://dev.opera.com/articles/css3-object-fit-object-position/"
      }]
    }
    !*/
r.addTest("objectfit",!!z("objectFit"),{aliases:["object-fit"]}),s.testAllProps=L,
/*!
    {
      "name": "CSS Animations",
      "property": "cssanimations",
      "caniuse": "css-animation",
      "polyfills": ["transformie", "csssandpaper"],
      "tags": ["css"],
      "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
      "notes": [{
        "name" : "Article: 'Dispelling the Android CSS animation myths'",
        "href": "https://goo.gl/OGw5Gm"
      }]
    }
    !*/
r.addTest("cssanimations",L("animationName","a",!0)),
/*!
    {
      "name": "CSS Grid (old & new)",
      "property": ["cssgrid", "cssgridlegacy"],
      "authors": ["Faruk Ates"],
      "tags": ["css"],
      "notes": [{
        "name": "The new, standardized CSS Grid",
        "href": "https://www.w3.org/TR/css3-grid-layout/"
      }, {
        "name": "The _old_ CSS Grid (legacy)",
        "href": "https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/"
      }]
    }
    !*/
r.addTest("cssgridlegacy",L("grid-columns","10px",!0)),r.addTest("cssgrid",L("grid-template-rows","none",!0)),
/*!
    {
      "name": "CSS Filters",
      "property": "cssfilters",
      "caniuse": "css-filters",
      "polyfills": ["polyfilter"],
      "tags": ["css"],
      "builderAliases": ["css_filters"],
      "notes": [{
        "name": "MDN article on CSS filters",
        "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
      }]
    }
    !*/
r.addTest("cssfilters",(function(){if(r.supports)return L("filter","blur(2px)");var e=p("a");return e.style.cssText=a.join("filter:blur(2px); "),!!e.style.length&&(t.documentMode===n||t.documentMode>9)})),
/*!
    {
      "name": "CSS Transforms",
      "property": "csstransforms",
      "caniuse": "transforms2d",
      "tags": ["css"]
    }
    !*/
r.addTest("csstransforms",(function(){return-1===navigator.userAgent.indexOf("Android 2.")&&L("transform","scale(1)",!0)})),
/*!
    {
      "name": "CSS Transforms 3D",
      "property": "csstransforms3d",
      "caniuse": "transforms3d",
      "tags": ["css"],
      "warnings": [
        "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
      ]
    }
    !*/
r.addTest("csstransforms3d",(function(){return!!L("perspective","1px",!0)})),
/*!
    {
      "name": "CSS Transitions",
      "property": "csstransitions",
      "caniuse": "css-transitions",
      "tags": ["css"]
    }
    !*/
r.addTest("csstransitions",L("transition","all",!0)),function(){var e,t,n,s,a,d;for(var u in i)if(i.hasOwnProperty(u)){if(e=[],(t=i[u]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=l(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)1===(d=e[a].split(".")).length?r[d[0]]=s:(!r[d[0]]||r[d[0]]instanceof Boolean||(r[d[0]]=new Boolean(r[d[0]])),r[d[0]][d[1]]=s),o.push((s?"":"no-")+d.join("-"))}}(),function(e){var t=d.className,n=r._config.classPrefix||"";if(u&&(t=t.baseVal),r._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}r._config.enableClasses&&(t+=" "+n+e.join(" "+n),u?d.className.baseVal=t:d.className=t)}(o),delete s.addTest,delete s.addAsyncTest;for(var j=0;j<r._q.length;j++)r._q[j]();e.Modernizr=r}(window,document);var dtGlobals={};dtGlobals.isMobile=/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|windows phone)/.test(navigator.userAgent),dtGlobals.isAndroid=/(Android)/.test(navigator.userAgent),dtGlobals.isiOS=/(iPhone|iPod|iPad)/.test(navigator.userAgent),dtGlobals.isiPhone=/(iPhone|iPod)/.test(navigator.userAgent),dtGlobals.isiPad=/(iPad)/.test(navigator.userAgent),dtGlobals.winScrollTop=0,window.onscroll=function(){dtGlobals.winScrollTop=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop},dtGlobals.isWindowsPhone=navigator.userAgent.match(/IEMobile/i),document.documentElement.className+=" mobile-"+dtGlobals.isMobile,dtGlobals.logoURL=!1,dtGlobals.logoH=!1,dtGlobals.logoW=!1,jQuery(document).ready((function(e){var t=document.getElementsByTagName("html")[0],n=document.body;if(dtGlobals.isiOS?t.classList.add("is-iOS"):t.classList.add("not-iOS"),-1!=navigator.userAgent.indexOf("Safari")&&-1==navigator.userAgent.indexOf("Chrome")&&n.classList.add("is-safari"),dtGlobals.isWindowsPhone&&(n.classList.add("ie-mobile"),n.classList.add("windows-phone")),dtGlobals.isMobile||n.classList.add("no-mobile"),dtGlobals.isiPhone&&n.classList.add("is-iphone"),dtGlobals.isPhone=!1,dtGlobals.isTablet=!1,dtGlobals.isDesktop=!1,dtGlobals.isMobile){var o=window.getComputedStyle(document.body,":after").getPropertyValue("content");-1!=o.indexOf("phone")?dtGlobals.isPhone=!0:-1!=o.indexOf("tablet")&&(dtGlobals.isTablet=!0)}else dtGlobals.isDesktop=!0;e(window).on("the7_widget_resize",(function(t){e(".mini-widgets, .mobile-mini-widgets").find(" > *").removeClass("first last"),e(".mini-widgets, .mobile-mini-widgets").find(" > *:visible:first").addClass("first"),e(".mini-widgets, .mobile-mini-widgets").find(" > *:visible:last").addClass("last")})).trigger("the7_widget_resize")}));