function t(){}function e(t,e){for(const r in e)t[r]=e[r];return t}function r(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(r)}function o(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,r,n,s){return t[1]&&s?e(n.ctx.slice(),t[1](s(r))):n.ctx}function c(t,e,r,n,s,o,i){const c=function(t,e,r,n){if(t[2]&&n){const s=t[2](n(r));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],r=Math.max(e.dirty.length,s.length);for(let n=0;n<r;n+=1)t[n]=e.dirty[n]|s[n];return t}return e.dirty|s}return e.dirty}(e,n,s,o);if(c){const s=a(e,r,n,i);t.p(s,c)}}function u(t,e){t.appendChild(e)}function l(t,e,r){t.insertBefore(e,r||null)}function f(t){t.parentNode.removeChild(t)}function h(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function d(){return p(" ")}function g(){return p("")}function m(t,e,r,n){return t.addEventListener(e,r,n),()=>t.removeEventListener(e,r,n)}function $(t,e,r){null==r?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function y(t){return Array.from(t.childNodes)}function _(t,e,r,n){for(let n=0;n<t.length;n+=1){const s=t[n];if(s.nodeName===e){let e=0;const o=[];for(;e<s.attributes.length;){const t=s.attributes[e++];r[t.name]||o.push(t.name)}for(let t=0;t<o.length;t++)s.removeAttribute(o[t]);return t.splice(n,1)[0]}}return n?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):h(e)}function b(t,e){for(let r=0;r<t.length;r+=1){const n=t[r];if(3===n.nodeType)return n.data=""+e,t.splice(r,1)[0]}return p(e)}function w(t){return b(t," ")}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function E(t,e,r,n){t.style.setProperty(e,r,n?"important":"")}function x(t,e=document.body){return Array.from(e.querySelectorAll(t))}let S;function L(t){S=t}function N(){if(!S)throw new Error("Function called outside component initialization");return S}function R(t){N().$$.on_mount.push(t)}const k=[],q=[],T=[],O=[],j=Promise.resolve();let A=!1;function C(t){T.push(t)}let P=!1;const I=new Set;function U(){if(!P){P=!0;do{for(let t=0;t<k.length;t+=1){const e=k[t];L(e),V(e.$$)}for(L(null),k.length=0;q.length;)q.pop()();for(let t=0;t<T.length;t+=1){const e=T[t];I.has(e)||(I.add(e),e())}T.length=0}while(k.length);for(;O.length;)O.pop()();A=!1,P=!1,I.clear()}}function V(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const J=new Set;let K;function z(){K={r:0,c:[],p:K}}function B(){K.r||s(K.c),K=K.p}function D(t,e){t&&t.i&&(J.delete(t),t.i(e))}function M(t,e,r,n){if(t&&t.o){if(J.has(t))return;J.add(t),K.c.push((()=>{J.delete(t),n&&(r&&t.d(1),n())})),t.o(e)}}function H(t,e){const r={},n={},s={$$scope:1};let o=t.length;for(;o--;){const i=t[o],a=e[o];if(a){for(const t in i)t in a||(n[t]=1);for(const t in a)s[t]||(r[t]=a[t],s[t]=1);t[o]=a}else for(const t in i)s[t]=1}for(const t in n)t in r||(r[t]=void 0);return r}function Y(t){return"object"==typeof t&&null!==t?t:{}}function F(t){t&&t.c()}function G(t,e){t&&t.l(e)}function W(t,e,n){const{fragment:i,on_mount:a,on_destroy:c,after_update:u}=t.$$;i&&i.m(e,n),C((()=>{const e=a.map(r).filter(o);c?c.push(...e):s(e),t.$$.on_mount=[]})),u.forEach(C)}function X(t,e){const r=t.$$;null!==r.fragment&&(s(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(k.push(t),A||(A=!0,j.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Z(e,r,o,i,a,c,u=[-1]){const l=S;L(e);const h=r.props||{},p=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:n(),dirty:u,skip_bound:!1};let d=!1;if(p.ctx=o?o(e,h,((t,r,...n)=>{const s=n.length?n[0]:r;return p.ctx&&a(p.ctx[t],p.ctx[t]=s)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](s),d&&Q(e,t)),r})):[],p.update(),d=!0,s(p.before_update),p.fragment=!!i&&i(p.ctx),r.target){if(r.hydrate){const t=y(r.target);p.fragment&&p.fragment.l(t),t.forEach(f)}else p.fragment&&p.fragment.c();r.intro&&D(e.$$.fragment),W(e,r.target,r.anchor),U()}L(l)}class tt{$destroy(){X(this,1),this.$destroy=t}$on(t,e){const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(e),()=>{const t=r.indexOf(e);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function et(t){let e,r,n=t[1].stack+"";return{c(){e=h("pre"),r=p(n)},l(t){e=_(t,"PRE",{});var s=y(e);r=b(s,n),s.forEach(f)},m(t,n){l(t,e,n),u(e,r)},p(t,e){2&e&&n!==(n=t[1].stack+"")&&v(r,n)},d(t){t&&f(e)}}}function rt(e){let r,n,s,o,i,a,c,m=e[1].message+"",$=e[1].stack&&et(e);return{c(){r=h("h1"),n=p(e[0]),s=d(),o=h("p"),i=p(m),a=d(),$&&$.c(),c=g()},l(t){r=_(t,"H1",{});var u=y(r);n=b(u,e[0]),u.forEach(f),s=w(t),o=_(t,"P",{});var l=y(o);i=b(l,m),l.forEach(f),a=w(t),$&&$.l(t),c=g()},m(t,e){l(t,r,e),u(r,n),l(t,s,e),l(t,o,e),u(o,i),l(t,a,e),$&&$.m(t,e),l(t,c,e)},p(t,[e]){1&e&&v(n,t[0]),2&e&&m!==(m=t[1].message+"")&&v(i,m),t[1].stack?$?$.p(t,e):($=et(t),$.c(),$.m(c.parentNode,c)):$&&($.d(1),$=null)},i:t,o:t,d(t){t&&f(r),t&&f(s),t&&f(o),t&&f(a),$&&$.d(t),t&&f(c)}}}function nt(t,e,r){let{status:n}=e,{error:s}=e;return t.$$set=t=>{"status"in t&&r(0,n=t.status),"error"in t&&r(1,s=t.error)},[n,s]}class st extends tt{constructor(t){super(),Z(this,t,nt,rt,i,{status:0,error:1})}}function ot(t){let r,n,s;const o=[t[4]||{}];var i=t[2][1];function a(t){let r={};for(let t=0;t<o.length;t+=1)r=e(r,o[t]);return{props:r}}return i&&(r=new i(a())),{c(){r&&F(r.$$.fragment),n=g()},l(t){r&&G(r.$$.fragment,t),n=g()},m(t,e){r&&W(r,t,e),l(t,n,e),s=!0},p(t,e){const s=16&e?H(o,[Y(t[4]||{})]):{};if(i!==(i=t[2][1])){if(r){z();const t=r;M(t.$$.fragment,1,0,(()=>{X(t,1)})),B()}i?(r=new i(a()),F(r.$$.fragment),D(r.$$.fragment,1),W(r,n.parentNode,n)):r=null}else i&&r.$set(s)},i(t){s||(r&&D(r.$$.fragment,t),s=!0)},o(t){r&&M(r.$$.fragment,t),s=!1},d(t){t&&f(n),r&&X(r,t)}}}function it(t){let e,r;return e=new st({props:{status:t[0],error:t[1]}}),{c(){F(e.$$.fragment)},l(t){G(e.$$.fragment,t)},m(t,n){W(e,t,n),r=!0},p(t,r){const n={};1&r&&(n.status=t[0]),2&r&&(n.error=t[1]),e.$set(n)},i(t){r||(D(e.$$.fragment,t),r=!0)},o(t){M(e.$$.fragment,t),r=!1},d(t){X(e,t)}}}function at(t){let e,r,n,s;const o=[it,ot],i=[];function a(t,e){return t[1]?0:1}return e=a(t),r=i[e]=o[e](t),{c(){r.c(),n=g()},l(t){r.l(t),n=g()},m(t,r){i[e].m(t,r),l(t,n,r),s=!0},p(t,s){let c=e;e=a(t),e===c?i[e].p(t,s):(z(),M(i[c],1,1,(()=>{i[c]=null})),B(),r=i[e],r?r.p(t,s):(r=i[e]=o[e](t),r.c()),D(r,1),r.m(n.parentNode,n))},i(t){s||(D(r),s=!0)},o(t){M(r),s=!1},d(t){i[e].d(t),t&&f(n)}}}function ct(t){let r,n;const s=[t[3]||{}];let o={$$slots:{default:[at]},$$scope:{ctx:t}};for(let t=0;t<s.length;t+=1)o=e(o,s[t]);return r=new t[5]({props:o}),{c(){F(r.$$.fragment)},l(t){G(r.$$.fragment,t)},m(t,e){W(r,t,e),n=!0},p(t,[e]){const n=8&e?H(s,[Y(t[3]||{})]):{};279&e&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){n||(D(r.$$.fragment,t),n=!0)},o(t){M(r.$$.fragment,t),n=!1},d(t){X(r,t)}}}function ut(t,e,r){let{status:n}=e,{error:s}=e,{stores:o}=e,{page:i}=e,{components:a}=e,{props_0:c=null}=e,{props_1:u=null}=e;const l=a[0];var f,h,p;return f="__svelte__",h=o,N().$$.context.set(f,h),p=o.page.notify,N().$$.after_update.push(p),t.$$set=t=>{"status"in t&&r(0,n=t.status),"error"in t&&r(1,s=t.error),"stores"in t&&r(6,o=t.stores),"page"in t&&r(7,i=t.page),"components"in t&&r(2,a=t.components),"props_0"in t&&r(3,c=t.props_0),"props_1"in t&&r(4,u=t.props_1)},t.$$.update=()=>{192&t.$$.dirty&&o.page.set(i)},[n,s,a,c,u,l,o,i]}class lt extends tt{constructor(t){super(),Z(this,t,ut,ct,i,{status:0,error:1,stores:6,page:7,components:2,props_0:3,props_1:4})}}function ft(t){let e;const r=t[1].default,n=function(t,e,r,n){if(t){const s=a(t,e,r,n);return t[0](s)}}(r,t,t[0],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,r){n&&n.m(t,r),e=!0},p(t,[e]){n&&n.p&&1&e&&c(n,r,t,t[0],e,null,null)},i(t){e||(D(n,t),e=!0)},o(t){M(n,t),e=!1},d(t){n&&n.d(t)}}}function ht(t,e,r){let{$$slots:n={},$$scope:s}=e;return t.$$set=t=>{"$$scope"in t&&r(0,s=t.$$scope)},[s,n]}var pt=Object.freeze({__proto__:null,default:class extends tt{constructor(t){super(),Z(this,t,ht,ft,i,{})}}});const dt=[()=>Promise.all([import("./index-1a7d6c19.js"),]).then((function(t){return t[0]})),()=>Promise.all([import("./terms-and-conditions-463da866.js"),]).then((function(t){return t[0]})),()=>Promise.all([import("./privacy-policy-f59bf951.js"),]).then((function(t){return t[0]}))],gt=[{pattern:/^\/$/,parts:[[dt[0]]]},{pattern:/^\/terms-and-conditions\/?$/,parts:[[dt[1]]]},{pattern:/^\/privacy-policy\/?$/,parts:[[dt[2]]]}],mt=[],$t=[];function yt(e,r=t){let n;const s=[];function o(t){if(i(e,t)&&(e=t,n)){const t=!$t.length;for(let t=0;t<s.length;t+=1){const r=s[t];r[1](),$t.push(r,e)}if(t){for(let t=0;t<$t.length;t+=2)$t[t][0]($t[t+1]);$t.length=0}}}return{set:o,update:function(t){o(t(e))},subscribe:function(i,a=t){const c=[i,a];return s.push(c),1===s.length&&(n=r(o)||t),i(e),()=>{const t=s.indexOf(c);-1!==t&&s.splice(t,1),0===s.length&&(n(),n=null)}}}}let _t,bt;function wt(t){_t=t.router,bt=t.renderer}function vt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Et(){return{x:pageXOffset,y:pageYOffset}}class xt{constructor({base:t,pages:e,ignore:r}){this.base=t,this.pages=e,this.ignore=r,this.uid=1,this.cid=null,this.scroll_history={},this.history=window.history||{pushState:()=>{},replaceState:()=>{},scrollRestoration:"auto"}}init({renderer:t}){this.renderer=t,t.router=this,"scrollRestoration"in this.history&&(this.history.scrollRestoration="manual"),addEventListener("beforeunload",(()=>{this.history.scrollRestoration="auto"})),addEventListener("load",(()=>{this.history.scrollRestoration="manual"})),addEventListener("click",(t=>{if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return;if(t.defaultPrevented)return;const e=vt(t.target);if(!e)return;if(!e.href)return;const r="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,n=String(r?e.href.baseVal:e.href);if(n===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(r?e.target.baseVal:e.target)return;const s=new URL(n);if(s.pathname===location.pathname&&s.search===location.search)return;const o=this.select(s);if(o){const r=e.hasAttribute("sapper:noscroll");this.navigate(o,null,r,s.hash),t.preventDefault(),this.history.pushState({id:this.cid},"",s.href)}})),addEventListener("popstate",(t=>{if(this.scroll_history[this.cid]=Et(),t.state){const e=new URL(location.href),r=this.select(e);r?this.navigate(r,t.state.id):location.href=location.href}else this.uid+=1,this.cid=this.uid,this.history.replaceState({id:this.cid},"",location.href)})),this.history.replaceState({id:this.uid},"",location.href),this.scroll_history[this.uid]=Et();const e=this.select(new URL(location.href));if(e)return this.renderer.start(e)}select(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(this.base))return null;let e=t.pathname.slice(this.base.length);if(""===e&&(e="/"),!this.ignore.some((t=>t.test(e))))for(const r of this.pages){const n=r.pattern.exec(e);if(n){const s=new URLSearchParams(t.search),o=r.parts[r.parts.length-1],i=o.params?o.params(n):{},a={host:location.host,path:e,query:s,params:i};return{href:t.href,route:r,match:n,page:a}}}}async navigate(t,e,r,n){const s=!!e;if(s)this.cid=e;else{const t=Et();this.scroll_history[this.cid]=t,this.cid=e=++this.uid,this.scroll_history[this.cid]=r?t:{x:0,y:0}}if(await this.renderer.render(t),document.activeElement instanceof HTMLElement&&document.activeElement.blur(),!r){let t,r=this.scroll_history[e];n&&(t=document.getElementById(n.slice(1)),t&&(r={x:0,y:t.getBoundingClientRect().top+scrollY})),this.scroll_history[this.cid]=r,s||t?scrollTo(r.x,r.y):scrollTo(0,0)}}}function St(t){const e=yt(t);let r=!0;return{notify:function(){r=!0,e.update((t=>t))},set:function(t){r=!1,e.set(t)},subscribe:function(t){let n;return e.subscribe((e=>{(void 0===n||r&&e!==n)&&t(n=e)}))}}}class Lt{constructor({Root:t,layout:e,target:r,error:n,status:s,preloaded:o,session:i}){this.Root=t,this.layout=e,this.layout_loader=()=>e,this.target=r,this.initial={preloaded:o,error:n,status:s},this.current_branch=[],this.prefetching={href:null,promise:null},this.stores={page:St({}),navigating:yt(!1),session:yt(i)},this.$session=null,this.session_dirty=!1,this.root=null;const a=t=>{const e=vt(t.target);e&&"prefetch"===e.rel&&this.prefetch(new URL(e.href))};let c;addEventListener("touchstart",a),addEventListener("mousemove",(t=>{clearTimeout(c),c=setTimeout((()=>{a(t)}),20)}));let u=!1;this.stores.session.subscribe((async t=>{if(this.$session=t,!u)return;this.session_dirty=!0;const e=this.router.select(new URL(location.href));this.render(e)})),u=!0}async start(t){const e={stores:this.stores,error:this.initial.error,status:this.initial.status};if(!this.initial.error){const r=await this.hydrate(t);if(r.redirect)throw new Error("TODO client-side redirects");Object.assign(e,r.props),this.current_branch=r.branch,this.current_query=r.query,this.current_path=r.path}this.root=new this.Root({target:this.target,props:e,hydrate:!0}),this.initial=null}async render(t){const e=this.token={};this.stores.navigating.set(!0);const r=await this.hydrate(t);this.token===e&&(this.current_branch=r.branch,this.current_query=r.query,this.current_path=r.path,this.root.$set(r.props),this.stores.navigating.set(!1))}async hydrate({route:t,page:e}){let r=null;const n={error:null,status:200,components:[]},s={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(r&&(r.status!==t||r.location!==e))throw new Error("Conflicting redirects");r={status:t,location:e}},error:(t,e)=>{n.error="string"==typeof e?new Error(e):e,n.status=t}},o=e.query.toString(),i=o!==this.current_query;let a;try{const r=t.pattern.exec(e.path);a=await Promise.all([[this.layout_loader],...t.parts].map((async([t,o],a)=>{const c=o?o(r):{},u=JSON.stringify(c),l=this.current_branch[a];if(l){if(!(l.loader!==t||l.uses_session&&this.session_dirty||l.uses_query&&i||l.stringified_params!==u))return n.components[a]=l.component,l}const{default:f,preload:h}=await t(),p=h&&h.length>1;let d=!1;const g=this.initial?.preloaded[a]||(h?await h.call(s,{get query(){return d=!0,e.query},host:e.host,path:e.path,params:c},this.$session):{});return n.components[a]=f,n[`props_${a}`]=g,{component:f,params:c,stringified_params:u,props:g,match:r,loader:t,uses_session:p,uses_query:d}}))),e.path!==this.current_path&&(n.page={...e,params:a[a.length-1].params})}catch(t){n.error=t,n.status=500,a=[]}return{redirect:r,props:n,branch:a,query:o,path:e.path}}async prefetch(t){const e=this.router.select(t);if(e)return t.href!==this.prefetching.href&&(this.prefetching={href:t.href,promise:this.hydrate(e)}),this.prefetching.promise;throw new Error(`Could not prefetch ${t.href}`)}}async function Nt({base:t,target:e,session:r,preloaded:n,error:s,status:o}){const i=new xt({base:t,pages:gt,ignore:mt}),a=new Lt({Root:lt,layout:pt,target:e,preloaded:n,error:s,status:o,session:r});wt({router:i,renderer:a}),await i.init({renderer:a})}export{tt as S,d as a,y as b,_ as c,b as d,h as e,f,w as g,$ as h,Z as i,E as j,l as k,u as l,F as m,t as n,G as o,W as p,x as q,D as r,i as s,p as t,M as u,X as v,m as w,s as x,R as y,Nt as z};
//# sourceMappingURL=start-13422530.js.map
