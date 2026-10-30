// Stretchy header muppet, after the Super Mario 64 DS title-screen sketch.
// The controller is ported from ~/git/Mario 64 Main Menu (see its README and
// REVERSE_ENGINEERING.md); keep the two copies in step when changing physics.
// Exposes one global, stretchMuppet(svgText) -> Promise<SVGSVGElement>.
const stretchMuppet=(()=>{
"use strict";
// SVG path parser (vendored to keep the runtime self-contained).
/*! svgpath 2.6.0 — MIT license
(The MIT License)

Copyright (C) 2013-2015 by Vitaly Puzrin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var svgpath=(()=>{var A=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports);var V=A((wt,U)=>{"use strict";var X={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},$=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function tt(t){return t===10||t===13||t===8232||t===8233||t===32||t===9||t===11||t===12||t===160||t>=5760&&$.indexOf(t)>=0}function et(t){switch(t|32){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function rt(t){return(t|32)===97}function S(t){return t>=48&&t<=57}function at(t){return t>=48&&t<=57||t===43||t===45||t===46}function it(t){this.index=0,this.path=t,this.max=t.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function Y(t){for(;t.index<t.max&&tt(t.path.charCodeAt(t.index));)t.index++}function nt(t){var i=t.path.charCodeAt(t.index);if(i===48){t.param=0,t.index++;return}if(i===49){t.param=1,t.index++;return}t.err="SvgPath: arc flag can be 0 or 1 only (at pos "+t.index+")"}function ht(t){var i=t.index,r=i,e=t.max,n=!1,h=!1,a=!1,u=!1,s;if(r>=e){t.err="SvgPath: missed param (at pos "+r+")";return}if(s=t.path.charCodeAt(r),(s===43||s===45)&&(r++,s=r<e?t.path.charCodeAt(r):0),!S(s)&&s!==46){t.err="SvgPath: param should start with 0..9 or `.` (at pos "+r+")";return}if(s!==46){if(n=s===48,r++,s=r<e?t.path.charCodeAt(r):0,n&&r<e&&s&&S(s)){t.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+i+")";return}for(;r<e&&S(t.path.charCodeAt(r));)r++,h=!0;s=r<e?t.path.charCodeAt(r):0}if(s===46){for(u=!0,r++;S(t.path.charCodeAt(r));)r++,a=!0;s=r<e?t.path.charCodeAt(r):0}if(s===101||s===69){if(u&&!h&&!a){t.err="SvgPath: invalid float exponent (at pos "+r+")";return}if(r++,s=r<e?t.path.charCodeAt(r):0,(s===43||s===45)&&r++,r<e&&S(t.path.charCodeAt(r)))for(;r<e&&S(t.path.charCodeAt(r));)r++;else{t.err="SvgPath: invalid float exponent (at pos "+r+")";return}}t.index=r,t.param=parseFloat(t.path.slice(i,r))+0}function R(t){var i,r;i=t.path[t.segmentStart],r=i.toLowerCase();var e=t.data;if(r==="m"&&e.length>2&&(t.result.push([i,e[0],e[1]]),e=e.slice(2),r="l",i=i==="m"?"l":"L"),r==="r")t.result.push([i].concat(e));else for(;e.length>=X[r]&&(t.result.push([i].concat(e.splice(0,X[r]))),!!X[r]););}function ut(t){var i=t.max,r,e,n,h,a;if(t.segmentStart=t.index,r=t.path.charCodeAt(t.index),e=rt(r),!et(r)){t.err="SvgPath: bad command "+t.path[t.index]+" (at pos "+t.index+")";return}if(h=X[t.path[t.index].toLowerCase()],t.index++,Y(t),t.data=[],!h){R(t);return}for(n=!1;;){for(a=h;a>0;a--){if(e&&(a===3||a===4)?nt(t):ht(t),t.err.length){R(t);return}t.data.push(t.param),Y(t),n=!1,t.index<i&&t.path.charCodeAt(t.index)===44&&(t.index++,Y(t),n=!0)}if(!n&&(t.index>=t.max||!at(t.path.charCodeAt(t.index))))break}R(t)}U.exports=function(i){var r=new it(i),e=r.max;for(Y(r);r.index<e&&!r.err.length;)ut(r);return r.result.length&&("mM".indexOf(r.result[0][0])<0?(r.err="SvgPath: string should start with `M` or `m`",r.result=[]):r.result[0][0]="M"),{err:r.err,segments:r.result}}});var z=A((kt,B)=>{"use strict";function st(t,i){return[t[0]*i[0]+t[2]*i[1],t[1]*i[0]+t[3]*i[1],t[0]*i[2]+t[2]*i[3],t[1]*i[2]+t[3]*i[3],t[0]*i[4]+t[2]*i[5]+t[4],t[1]*i[4]+t[3]*i[5]+t[5]]}function x(){if(!(this instanceof x))return new x;this.queue=[],this.cache=null}x.prototype.matrix=function(t){return t[0]===1&&t[1]===0&&t[2]===0&&t[3]===1&&t[4]===0&&t[5]===0?this:(this.cache=null,this.queue.push(t),this)};x.prototype.translate=function(t,i){return(t!==0||i!==0)&&(this.cache=null,this.queue.push([1,0,0,1,t,i])),this};x.prototype.scale=function(t,i){return(t!==1||i!==1)&&(this.cache=null,this.queue.push([t,0,0,i,0,0])),this};x.prototype.rotate=function(t,i,r){var e,n,h;return t!==0&&(this.translate(i,r),e=t*Math.PI/180,n=Math.cos(e),h=Math.sin(e),this.queue.push([n,h,-h,n,0,0]),this.cache=null,this.translate(-i,-r)),this};x.prototype.skewX=function(t){return t!==0&&(this.cache=null,this.queue.push([1,0,Math.tan(t*Math.PI/180),1,0,0])),this};x.prototype.skewY=function(t){return t!==0&&(this.cache=null,this.queue.push([1,Math.tan(t*Math.PI/180),0,1,0,0])),this};x.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],this.queue.length===1)return this.cache;for(var t=1;t<this.queue.length;t++)this.cache=st(this.cache,this.queue[t]);return this.cache};x.prototype.calc=function(t,i,r){var e;return this.queue.length?(this.cache||(this.cache=this.toArray()),e=this.cache,[t*e[0]+i*e[2]+(r?0:e[4]),t*e[1]+i*e[3]+(r?0:e[5])]):[t,i]};B.exports=x});var T=A((Ct,H)=>{"use strict";var ot=z(),ct={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},ft=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,lt=/[\s,]+/;H.exports=function(i){var r=new ot,e,n;return i.split(ft).forEach(function(h){if(h.length){if(typeof ct[h]<"u"){e=h;return}switch(n=h.split(lt).map(function(a){return+a||0}),e){case"matrix":n.length===6&&r.matrix(n);return;case"scale":n.length===1?r.scale(n[0],n[0]):n.length===2&&r.scale(n[0],n[1]);return;case"rotate":n.length===1?r.rotate(n[0],0,0):n.length===3&&r.rotate(n[0],n[1],n[2]);return;case"translate":n.length===1?r.translate(n[0],0):n.length===2&&r.translate(n[0],n[1]);return;case"skewX":n.length===1&&r.skewX(n[0]);return;case"skewY":n.length===1&&r.skewY(n[0]);return}}}),r}});var O=A((qt,K)=>{"use strict";var b=Math.PI*2;function J(t,i,r,e){var n=t*e-i*r<0?-1:1,h=t*r+i*e;return h>1&&(h=1),h<-1&&(h=-1),n*Math.acos(h)}function pt(t,i,r,e,n,h,a,u,s,o){var f=o*(t-r)/2+s*(i-e)/2,l=-s*(t-r)/2+o*(i-e)/2,c=a*a,g=u*u,_=f*f,v=l*l,d=c*g-c*v-g*_;d<0&&(d=0),d/=c*v+g*_,d=Math.sqrt(d)*(n===h?-1:1);var C=d*a/u*l,m=d*-u/a*f,D=o*C-s*m+(t+r)/2,y=s*C+o*m+(i+e)/2,M=(f-C)/a,w=(l-m)/u,F=(-f-C)/a,P=(-l-m)/u,I=J(1,0,M,w),q=J(M,w,F,P);return h===0&&q>0&&(q-=b),h===1&&q<0&&(q+=b),[D,y,I,q]}function vt(t,i){var r=1.3333333333333333*Math.tan(i/4),e=Math.cos(t),n=Math.sin(t),h=Math.cos(t+i),a=Math.sin(t+i);return[e,n,e-n*r,n+e*r,h+a*r,a-h*r,h,a]}K.exports=function(i,r,e,n,h,a,u,s,o){var f=Math.sin(o*b/360),l=Math.cos(o*b/360),c=l*(i-e)/2+f*(r-n)/2,g=-f*(i-e)/2+l*(r-n)/2;if(c===0&&g===0)return[];if(u===0||s===0)return[];u=Math.abs(u),s=Math.abs(s);var _=c*c/(u*u)+g*g/(s*s);_>1&&(u*=Math.sqrt(_),s*=Math.sqrt(_));var v=pt(i,r,e,n,h,a,u,s,f,l),d=[],C=v[2],m=v[3],D=Math.max(Math.ceil(Math.abs(m)/(b/4)),1);m/=D;for(var y=0;y<D;y++)d.push(vt(C,m)),C+=m;return d.map(function(M){for(var w=0;w<M.length;w+=2){var F=M[w+0],P=M[w+1];F*=u,P*=s;var I=l*F-f*P,q=f*F+l*P;M[w+0]=I+v[0],M[w+1]=q+v[1]}return M})}});var j=A((At,Z)=>{"use strict";var L=1e-10,Q=Math.PI/180;function E(t,i,r){if(!(this instanceof E))return new E(t,i,r);this.rx=t,this.ry=i,this.ax=r}E.prototype.transform=function(t){var i=Math.cos(this.ax*Q),r=Math.sin(this.ax*Q),e=[this.rx*(t[0]*i+t[2]*r),this.rx*(t[1]*i+t[3]*r),this.ry*(-t[0]*r+t[2]*i),this.ry*(-t[1]*r+t[3]*i)],n=e[0]*e[0]+e[2]*e[2],h=e[1]*e[1]+e[3]*e[3],a=((e[0]-e[3])*(e[0]-e[3])+(e[2]+e[1])*(e[2]+e[1]))*((e[0]+e[3])*(e[0]+e[3])+(e[2]-e[1])*(e[2]-e[1])),u=(n+h)/2;if(a<L*u)return this.rx=this.ry=Math.sqrt(u),this.ax=0,this;var s=e[0]*e[1]+e[2]*e[3];a=Math.sqrt(a);var o=u+a/2,f=u-a/2;return this.ax=Math.abs(s)<L&&Math.abs(o-h)<L?90:Math.atan(Math.abs(s)>Math.abs(o-h)?(o-n)/s:s/(o-h))*180/Math.PI,this.ax>=0?(this.rx=Math.sqrt(o),this.ry=Math.sqrt(f)):(this.ax+=90,this.rx=Math.sqrt(f),this.ry=Math.sqrt(o)),this};E.prototype.isDegenerate=function(){return this.rx<L*this.ry||this.ry<L*this.rx};Z.exports=E});var N=A((St,G)=>{"use strict";var xt=V(),gt=T(),k=z(),dt=O(),_t=j();function p(t){if(!(this instanceof p))return new p(t);var i=xt(t);this.segments=i.segments,this.err=i.err,this.__stack=[]}p.from=function(t){if(typeof t=="string")return new p(t);if(t instanceof p){var i=new p("");return i.err=t.err,i.segments=t.segments.map(function(r){return r.slice()}),i.__stack=t.__stack.map(function(r){return k().matrix(r.toArray())}),i}throw new Error("SvgPath.from: invalid param type "+t)};p.prototype.__matrix=function(t){var i=this,r;t.queue.length&&this.iterate(function(e,n,h,a){var u,s,o,f;switch(e[0]){case"v":u=t.calc(0,e[1],!0),s=u[0]===0?["v",u[1]]:["l",u[0],u[1]];break;case"V":u=t.calc(h,e[1],!1),s=u[0]===t.calc(h,a,!1)[0]?["V",u[1]]:["L",u[0],u[1]];break;case"h":u=t.calc(e[1],0,!0),s=u[1]===0?["h",u[0]]:["l",u[0],u[1]];break;case"H":u=t.calc(e[1],a,!1),s=u[1]===t.calc(h,a,!1)[1]?["H",u[0]]:["L",u[0],u[1]];break;case"a":case"A":var l=t.toArray(),c=_t(e[1],e[2],e[3]).transform(l);if(l[0]*l[3]-l[1]*l[2]<0&&(e[5]=e[5]?"0":"1"),u=t.calc(e[6],e[7],e[0]==="a"),e[0]==="A"&&e[6]===h&&e[7]===a||e[0]==="a"&&e[6]===0&&e[7]===0){s=[e[0]==="a"?"l":"L",u[0],u[1]];break}c.isDegenerate()?s=[e[0]==="a"?"l":"L",u[0],u[1]]:s=[e[0],c.rx,c.ry,c.ax,e[4],e[5],u[0],u[1]];break;case"m":f=n>0,u=t.calc(e[1],e[2],f),s=["m",u[0],u[1]];break;default:for(o=e[0],s=[o],f=o.toLowerCase()===o,r=1;r<e.length;r+=2)u=t.calc(e[r],e[r+1],f),s.push(u[0],u[1])}i.segments[n]=s},!0)};p.prototype.__evaluateStack=function(){var t,i;if(this.__stack.length){if(this.__stack.length===1){this.__matrix(this.__stack[0]),this.__stack=[];return}for(t=k(),i=this.__stack.length;--i>=0;)t.matrix(this.__stack[i].toArray());this.__matrix(t),this.__stack=[]}};p.prototype.toString=function(){var t="",i="",r=!1;this.__evaluateStack();for(var e=0,n=this.segments.length;e<n;e++){var h=this.segments[e],a=h[0];a!==i||a==="m"||a==="M"?(a==="m"&&i==="z"&&(t+=" "),t+=a,r=!1):r=!0;for(var u=1;u<h.length;u++){var s=h[u];u===1?r&&s>=0&&(t+=" "):s>=0&&(t+=" "),t+=s}i=a}return t};p.prototype.translate=function(t,i){return this.__stack.push(k().translate(t,i||0)),this};p.prototype.scale=function(t,i){return this.__stack.push(k().scale(t,!i&&i!==0?t:i)),this};p.prototype.rotate=function(t,i,r){return this.__stack.push(k().rotate(t,i||0,r||0)),this};p.prototype.skewX=function(t){return this.__stack.push(k().skewX(t)),this};p.prototype.skewY=function(t){return this.__stack.push(k().skewY(t)),this};p.prototype.matrix=function(t){return this.__stack.push(k().matrix(t)),this};p.prototype.transform=function(t){return t.trim()?(this.__stack.push(gt(t)),this):this};p.prototype.round=function(t){var i=0,r=0,e=0,n=0,h;return t=t||0,this.__evaluateStack(),this.segments.forEach(function(a){var u=a[0].toLowerCase()===a[0];switch(a[0]){case"H":case"h":u&&(a[1]+=e),e=a[1]-a[1].toFixed(t),a[1]=+a[1].toFixed(t);return;case"V":case"v":u&&(a[1]+=n),n=a[1]-a[1].toFixed(t),a[1]=+a[1].toFixed(t);return;case"Z":case"z":e=i,n=r;return;case"M":case"m":u&&(a[1]+=e,a[2]+=n),e=a[1]-a[1].toFixed(t),n=a[2]-a[2].toFixed(t),i=e,r=n,a[1]=+a[1].toFixed(t),a[2]=+a[2].toFixed(t);return;case"A":case"a":u&&(a[6]+=e,a[7]+=n),e=a[6]-a[6].toFixed(t),n=a[7]-a[7].toFixed(t),a[1]=+a[1].toFixed(t),a[2]=+a[2].toFixed(t),a[3]=+a[3].toFixed(t+2),a[6]=+a[6].toFixed(t),a[7]=+a[7].toFixed(t);return;default:h=a.length,u&&(a[h-2]+=e,a[h-1]+=n),e=a[h-2]-a[h-2].toFixed(t),n=a[h-1]-a[h-1].toFixed(t),a.forEach(function(s,o){o&&(a[o]=+a[o].toFixed(t))});return}}),this};p.prototype.iterate=function(t,i){var r=this.segments,e={},n=!1,h=0,a=0,u=0,s=0,o,f,l;if(i||this.__evaluateStack(),r.forEach(function(c,g){var _=t(c,g,h,a);Array.isArray(_)&&(e[g]=_,n=!0);var v=c[0]===c[0].toLowerCase();switch(c[0]){case"m":case"M":h=c[1]+(v?h:0),a=c[2]+(v?a:0),u=h,s=a;return;case"h":case"H":h=c[1]+(v?h:0);return;case"v":case"V":a=c[1]+(v?a:0);return;case"z":case"Z":h=u,a=s;return;default:h=c[c.length-2]+(v?h:0),a=c[c.length-1]+(v?a:0)}}),!n)return this;for(l=[],o=0;o<r.length;o++)if(typeof e[o]<"u")for(f=0;f<e[o].length;f++)l.push(e[o][f]);else l.push(r[o]);return this.segments=l,this};p.prototype.abs=function(){return this.iterate(function(t,i,r,e){var n=t[0],h=n.toUpperCase(),a;if(n!==h)switch(t[0]=h,n){case"v":t[1]+=e;return;case"a":t[6]+=r,t[7]+=e;return;default:for(a=1;a<t.length;a++)t[a]+=a%2?r:e}},!0),this};p.prototype.rel=function(){return this.iterate(function(t,i,r,e){var n=t[0],h=n.toLowerCase(),a;if(n!==h&&!(i===0&&n==="M"))switch(t[0]=h,n){case"V":t[1]-=e;return;case"A":t[6]-=r,t[7]-=e;return;default:for(a=1;a<t.length;a++)t[a]-=a%2?r:e}},!0),this};p.prototype.unarc=function(){return this.iterate(function(t,i,r,e){var n,h,a,u=[],s=t[0];return s!=="A"&&s!=="a"?null:(s==="a"?(h=r+t[6],a=e+t[7]):(h=t[6],a=t[7]),n=dt(r,e,h,a,t[4],t[5],t[1],t[2],t[3]),n.length===0?[[t[0]==="a"?"l":"L",t[6],t[7]]]:(n.forEach(function(o){u.push(["C",o[2],o[3],o[4],o[5],o[6],o[7]])}),u))}),this};p.prototype.unshort=function(){var t=this.segments,i,r,e,n,h;return this.iterate(function(a,u,s,o){var f=a[0],l=f.toUpperCase(),c;u&&(l==="T"?(c=f==="t",e=t[u-1],e[0]==="Q"?(i=e[1]-s,r=e[2]-o):e[0]==="q"?(i=e[1]-e[3],r=e[2]-e[4]):(i=0,r=0),n=-i,h=-r,c||(n+=s,h+=o),t[u]=[c?"q":"Q",n,h,a[1],a[2]]):l==="S"&&(c=f==="s",e=t[u-1],e[0]==="C"?(i=e[3]-s,r=e[4]-o):e[0]==="c"?(i=e[3]-e[5],r=e[4]-e[6]):(i=0,r=0),n=-i,h=-r,c||(n+=s,h+=o),t[u]=[c?"c":"C",n,h,a[1],a[2],a[3],a[4]]))}),this};G.exports=p});var mt=A((Ft,W)=>{W.exports=N()});return mt();})();

// DS fixed-point arithmetic and controller spring coefficients.
// NitroSDK-style signed Q20.12 arithmetic; source: include/nitro/fx/fx.h.
const Q=4096;
const mul=(a,b)=>Math.floor((a*b+2048)/Q)|0;
const div=(a,b)=>Math.trunc(a/b)|0;
const ratio=(n,lo,hi)=>n<=lo?0:n>=hi?Q:div((n-lo)*Q,hi-lo);
const ease=v=>Math.floor(v*(8192-v)/Q)|0;
// The DS indexes its 4096-entry Q12 sin/cos table with a 16-bit angle >> 4.
const sin=angle=>Math.round(Math.sin(((angle&65535)>>>4)*Math.PI/2048)*Q);
const cos=angle=>sin((angle+16384)&65535);
class DSRandom{
  constructor(seed=1){this.seed=seed>>>0;}
  next(n){this.seed=(Math.imul(this.seed,0x41c64e6d)+0x3039)>>>0;return div(n*((this.seed>>>16)&32767),32768);}
}
const dsSpringCoefficients=[[1000,300,8,4,1000,50],[100,10,5,1,100,10],[1000,300,100,1,1000,300],[1000,300,1000,10,1000,300],[100,10,100,10,100,10],[0,0,100,10,0,0]];
function spring(s,k,d){
  const a=s.a,b=s.b;
  for(let axis=0;axis<2;axis++){
    const force=-mul(k,(a.p[axis]-b.p[axis]-s.rest[axis])|0);
    a.f[axis]=(a.f[axis]+force-mul(d,a.v[axis]))|0;
    b.f[axis]=(b.f[axis]-force-mul(d,b.v[axis]))|0;
  }
}
function integrate(n,drag=100){
  for(let a=0;a<2;a++){
    const force=(n.f[a]-mul(drag,n.v[a]))|0;
    n.v[a]=(n.v[a]+(n.invMass===Q?force:mul(force,n.invMass)))|0;
    n.p[a]=(n.p[a]+n.v[a])|0;
    n.f[a]=0;
  }
}

// DS effect scheduling and held inputs.
const periods=[1,160,200,60,180,1];
// Behavioral port of ov007 020aefb4/020af260, 020bad8c, 020baa10,
// 020bb4b0, and 020bbc08. Frame counters advance at the original 60 Hz.
class DSEffects{
  constructor(owner){this.owner=owner;this.random=new DSRandom(1);this.held=new Map();this.released=new Set();this.idleEnabled=true;this.idleFrames=0;this.menuTicks=0;this.deform=0;this.motion=0;this.deformTicks=0;this.motionTicks=0;this.pendingDeform=-1;this.pendingMotion=-1;this.activityPending=false;this.springSet=0;this.idleLabel='';}
  set(type,active){if(active){if(!this.held.has(type))this.held.set(type,0);}else if(this.held.delete(type))this.released.add(type);this.idleLabel='';}
  activity(){this.activityPending=true;this.idleLabel='';}
  setStates(a,b){if(a!==undefined)this.pendingDeform=a;if(b!==undefined)this.pendingMotion=b;}
  randomize(mode,percent,rx,ry,mult){const e=this.owner;for(const group of e.groups)for(const s of group.anchorLinks){if(this.random.next(1000)<percent*10){const x=mult*(-rx+this.random.next(2*rx)),y=mult*(-ry+this.random.next(2*ry));if(mode===1){s.rest[0]+=x;s.rest[1]+=y;}else s.rest=[e.restAnchor[0]-s.b.rest[0]+x,e.restAnchor[1]-s.b.rest[1]+y];}}}
  restore(recenter=false){const e=this.owner;if(recenter)e.centerAnchor();e.measureAnchors(0);e.measureEdges(true);e.scaleTargets(Q,Q);e.offset=[0,0];}
  schedule(){
    const n=this.menuTicks-60;
    if(!this.idleEnabled||this.idleFrames<240||n<0){this.setStates(0,0);this.idleLabel='';return;}
    if(n%240!==0)return;
    const phase=div(n,240)%8;let a,b;
    if(phase===0||phase===4){a=1;b=this.random.next(2)?1:2;}
    else if(phase===2||phase===6){a=1;b=this.random.next(2)?4:3;}
    else if(phase===1){a=3;b=0;}
    else if(phase===5){a=2;b=6;}
    else{a=4;b=0;}
    if(this.random.next(4)===0)b=0;
    this.setStates(a,b);this.idleLabel=['DISTORT','SQUASH','DISTORT','JOLT','DISTORT','PULSE','DISTORT','JOLT'][phase];
  }
  manual(){
    const e=this.owner;
    for(const[type,t]of this.held)this.held.set(type,t+1);
    const wobble=this.held.get('wobble')||0;
    if(wobble%5===1){this.randomize(1,10,2048,2048,8);this.springSet=0;}
    else if(this.released.has('wobble')){this.restore(true);this.springSet=3;}
    const up=this.held.get('inflate')||0,side=this.held.get('widen')||0,t=Math.max(up,side);
    if(t>0){
      const amount=ease(ratio(t,0,100)),factor=div(ease(ratio(t,80,200)),2)+Q;
      let extra=0;
      if(t>=160){const phase=ratio((t-160)%5,0,5),r=ratio(t,160,200);extra=mul(Math.floor(r*r/Q),sin(div(phase*65535,Q))*10);}
      const long=Q+extra+mul(amount,factor),short=Q-amount;
      e.scaleTargets(up>side?short:long,up>side?long:short);this.springSet=0;
    }else if(this.released.has('inflate')||this.released.has('widen')){this.restore();this.springSet=3;}
    const right=this.held.get('twist')||0,left=this.held.get('untwist')||0,r=Math.max(right,left);
    if(r>0){
      let amp;if(r<100)amp=div(ratio(r,0,100),2);else{const p=ratio(r,100,300);amp=div(Math.floor(p*p/Q),2)+2048;if(r>=300)amp=mul(div(Math.abs(sin(div(ratio(r%100,0,100)*65535,Q))),4)+3072,amp);}
      const mode=r%5;
      if(mode===0)e.rotateRest(Math.floor((right>left?1:-1)*amp*0x3555/Q));
      else{let n=div(e.groups.length,4)+1;if(n===1)n=e.groups.length;for(let i=(mode-1)*n;i<Math.min(mode*n,e.groups.length);i++){e.measureAnchorGroup(i,0);e.measureEdgeGroup(i,true);}}
      this.springSet=2;
    }else if(this.released.has('twist')||this.released.has('untwist')){this.restore();this.springSet=0;}
    this.released.clear();
  }
  idleDeform(){
    if(this.pendingDeform!==-1){if(this.pendingDeform!==this.deform){this.deform=this.pendingDeform;this.deformTicks=-1;}this.pendingDeform=-1;}
    const e=this.owner,t=++this.deformTicks,period=periods[this.deform],phase=ratio(t%period,0,period);
    switch(this.deform){
      case 0:if(t===0)this.restore(true);break;
      case 1:{this.springSet=0;if(t%6===0){const v=phase>=2048?Q-(phase-2048)*2:phase*2;this.randomize(2,10,ease(v),ease(v),6);}break;}
      case 2:{const v=phase>=2048?Q-(phase-2048)*2:phase*2;e.scaleTargets(Q+ease(v),Q+ease(v));this.springSet=phase<=2048?4:0;if(t>=period)this.setStates(0,undefined);break;}
      case 3:{const d=t-20;if(d>=0&&d<=period*3){const amount=mul(sin(div(ratio(d%period,0,period)*65535,Q)),600);e.scaleTargets(Q+amount,Q-amount);this.springSet=2;}break;}
      case 4:this.springSet=2;if(t%60===0)this.restore(true);else if(t%60===30)this.randomize(2,30,mul(phase,2000)+200,mul(phase,2000)+200,6);break;
    }
  }
  idleMotion(){
    if(this.pendingMotion!==-1){if(this.pendingMotion!==this.motion){this.motion=this.pendingMotion;this.motionTicks=-1;}this.pendingMotion=-1;}
    const e=this.owner,t=++this.motionTicks,dx=e.bounds[2]-e.bounds[0],dy=e.bounds[3]-e.bounds[1],r=this.random;
    const phase=ratio(t%60,0,60),s=sin(div(phase*65535,Q));
    switch(this.motion){
      case 0:if(t===0)e.offset=[0,0];break;
      case 1:e.offset=[mul(s,div(dx,3)),-div(dy,32)+r.next(2*div(dy,32))];break;
      case 2:e.offset=[-div(dx,48)+r.next(2*div(dx,48)),mul(s,div(dy,2)-div(dy,8))];break;
      case 3:case 4:{const a=div((this.motion===4?Q-phase:phase)*65535,Q);e.offset=[mul(div(dx,4),cos(a)),mul(div(dy,4),sin(a))];break;}
      case 5:if(t===0){e.anchor.p=[...e.restAnchor];e.offset=[0,0];}break;
      case 6:if(t===0){e.anchor.p=[mul(-div(dx,2)+r.next(2*div(dx,2)),1500),mul(-div(dy,2)+r.next(2*div(dy,2)),1500)];e.offset=[0,0];}break;
    }
  }
  tick(){this.menuTicks++;this.schedule();this.manual();this.owner.updateTouch();if(this.held.size||this.owner.drag||this.activityPending)this.idleFrames=0;else this.idleFrames++;this.activityPending=false;this.idleDeform();this.idleMotion();}
}

// Index of the edge of rect r (minX, minY, maxX, maxY) facing point p: the
// nearest one p is outside of, or simply the nearest if p is inside.
function face(r,p){
  const outside=[0,1,2,3].filter(i=>i<2?p[i]<=r[i]:p[i-2]>=r[i]),pool=outside.length?outside:[0,1,2,3];
  return pool.reduce((best,i)=>Math.abs(p[i%2]-r[i])<Math.abs(p[best%2]-r[best])?i:best);
}
// Pushes n out of rect r through edge i and bounces it.
function pushOut(n,r,i){
  if(n.p[0]<=r[0]||n.p[0]>=r[2]||n.p[1]<=r[1]||n.p[1]>=r[3])return;
  n.p[i%2]=r[i];n.v[i%2]=mul(n.v[i%2],-1000);
}
// Nearest point to p inside box and outside every rect, at most max away; null
// if p is already clear or nothing qualifies. Candidates are p's own axes and
// every rect edge, crossed, which covers single-edge pushes and corner pockets.
function freeSpot(p,rects,box,max){
  const clear=(x,y)=>rects.every(r=>x<=r[0]||x>=r[2]||y<=r[1]||y>=r[3]);
  if(clear(p[0],p[1]))return null;
  const xs=[p[0],...rects.flatMap(r=>[r[0],r[2]])].filter(x=>x>=box[0]&&x<=box[2]&&Math.abs(x-p[0])<=max);
  const ys=[p[1],...rects.flatMap(r=>[r[1],r[3]])].filter(y=>y>=box[1]&&y<=box[3]&&Math.abs(y-p[1])<=max);
  const spots=xs.flatMap(x=>ys.map(y=>[x,y,Math.hypot(x-p[0],y-p[1])])).filter(s=>s[2]<=max).sort((a,b)=>a[2]-b[2]);
  const best=spots.find(([x,y])=>clear(x,y));
  return best?[best[0],best[1]]:null;
}
// Furthest any of points would be pushed to reach the face of its rect.
function caught(points,rects,faces){
  let worst=0;
  for(const p of points)rects.forEach((r,i)=>{if(p[0]>r[0]&&p[0]<r[2]&&p[1]>r[1]&&p[1]<r[3])worst=Math.max(worst,Math.abs(p[faces[i]%2]-r[faces[i]]));});
  return worst;
}

// Planar sketch simulation.
// Source-led planar port of the SM64DS sketch controller. Rendering/input are
// adapted to SVG; spring math, graph order and effect frames remain Q20.12.
// Sketch camera preset 2: distance 10, fovy 30 degrees (020b1fa4).
const angle=div(0x1e0000,0x168);
const focal=Math.floor(mul(sin(angle),0xa000)*Q/cos(angle)+.5);
const world=(x,y)=>[div(mul(Math.round(x*256/800*Q)-0x80000,focal),96),div(mul(-(Math.round(y*192/520*Q)-0x60000),focal),96)];
const screen=([x,y])=>[(x*96/focal+128)*800/256,(96-y*96/focal)*520/192];
const touchWorld=(x,y)=>world(Math.round(x*256/800)*800/256,Math.round(y*192/520)*520/192);
const node=p=>({p:[...p],rest:[...p],v:[0,0],f:[0,0],invMass:Q});
const link=(a,b)=>({a,b,rest:[a.p[0]-b.p[0],a.p[1]-b.p[1]]});
class SoftSVG{
  constructor(shapes){
    this.points=[];this.groups=[];this.drag=null;this.offset=[0,0];this.obstacles=[];
    const lo=world(0,191/192*520),hi=world(255/256*800,0);this.bounds=[lo[0],lo[1],hi[0],hi[1]];
    this.anchor=node([0,0]);this.anchor.invMass=410;this.restAnchor=[0,0];
    for(const shape of shapes)for(const contour of shape.contours){
      const points=contour.points,nodes=points.map(p=>{Object.assign(p,{ox:p.x,oy:p.y,vx:0,vy:0,held:false});this.points.push(p);const n=node(world(p.x,p.y));n.screen=[Math.round(p.x*256/800*Q),Math.round(p.y*192/520*Q)];n.output=p;return n;});
      const edges=[];for(let i=1;i<nodes.length;i++)edges.push(link(nodes[i-1],nodes[i]));if(contour.closed&&nodes.length>1)edges.push(link(nodes.at(-1),nodes[0]));
      this.groups.push({points,nodes,edges,anchorLinks:nodes.map(n=>link(this.anchor,n)),ends:[]});
    }
    // 020c6b58 links BOTH endpoints to their nearest point in ANY other group.
    // There is no distance cutoff. Group 0's endpoint springs aren't stepped.
    for(let i=0;i<this.groups.length;i++){
      const g=this.groups[i];
      for(const p of[g.nodes[0],g.nodes.at(-1)]){
        let best=null,limit=-1;
        for(let j=0;j<this.groups.length;j++)if(j!==i){
          let candidate=null,distance=Infinity;
          for(const q of this.groups[j].nodes){const dx=p.screen[0]-q.screen[0],dy=p.screen[1]-q.screen[1],d=dx*dx+dy*dy;if(d<distance){distance=d;candidate=q;}}
          if(limit<0||limit*limit>=distance){best=candidate;limit=Math.floor((Math.floor(Math.sqrt(distance*4))+1)/2);}
        }
        if(best)g.ends.push(link(p,best));
      }
    }
    this.centerAnchor();this.restAnchor=[...this.anchor.p];this.measureAnchors(0);this.measureEdges(true);
    this.behavior=new DSEffects(this);this.effects=this.behavior.held;this.sync();
  }
  centerAnchor(){const nodes=this.groups.flatMap(g=>g.nodes),xs=nodes.map(n=>n.p[0]),ys=nodes.map(n=>n.p[1]);this.anchor.p=[div(Math.min(...xs)+Math.max(...xs),2),div(Math.min(...ys)+Math.max(...ys),2)];}
  measureAnchorGroup(index,mode){for(const s of this.groups[index].anchorLinks){const a=mode===1?this.anchor.p:this.restAnchor,b=mode===0?s.b.rest:s.b.p;s.rest=[a[0]-b[0],a[1]-b[1]];}}
  measureAnchors(mode){for(let i=0;i<this.groups.length;i++)this.measureAnchorGroup(i,mode);}
  measureEdgeGroup(index,saved){const g=this.groups[index];for(const s of [...g.edges,...g.ends]){const a=saved?s.a.rest:s.a.p,b=saved?s.b.rest:s.b.p;s.rest=[a[0]-b[0],a[1]-b[1]];}}
  measureEdges(saved){for(let i=0;i<this.groups.length;i++)this.measureEdgeGroup(i,saved);}
  scaleTargets(sx,sy){for(const g of this.groups)for(const s of g.anchorLinks)s.rest=[mul(sx,this.restAnchor[0]-s.b.rest[0]),mul(sy,this.restAnchor[1]-s.b.rest[1])];}
  rotateRest(angle){const c=cos(angle),s=sin(angle);for(const g of this.groups)for(const n of g.nodes){const x=n.rest[0]-this.restAnchor[0],y=n.rest[1]-this.restAnchor[1];n.rest=[this.restAnchor[0]+mul(c,x)+mul(s,y),this.restAnchor[1]+mul(-s,x)+mul(c,y)];}}
  // Web-only: page elements are world-space rects. A point inside one is pushed
  // out and bounces, the same response as the bounds. Every point leaves an
  // element through the one face the anchor is on: per-point nearest edges let
  // neighbours pop out opposite sides and wrap the element in chords.
  collide(n){this.obstacles.forEach((r,i)=>pushOut(n,r,this.faces[i]));}
  // A dropped (or idly thrown) drawing overlapping elements just bumps them:
  // strokes leave each element through the face the anchor is on. Only when
  // that would drag some stroke more than half the drawing's size from its
  // rest pose does the anchor move, once, to the nearest spot within a
  // drawing's size where the whole pose clears every element; failing that,
  // it steps out of the element it's in. Clearing every frame (or pushing out
  // of each element in turn) chained through the stacked link lists and flung
  // it across the page.
  clearAnchor(){
    this.faces=this.obstacles.map(r=>face(r,this.anchor.p));
    if(this.drag||this.anchor.p.join()===this.settled)return;
    const nodes=this.groups.flatMap(g=>g.nodes),a=this.restAnchor,p=this.anchor.p;
    const lo=[0,1].map(i=>a[i]-Math.min(...nodes.map(n=>n.rest[i]))),hi=[0,1].map(i=>Math.max(...nodes.map(n=>n.rest[i]))-a[i]);
    const b=this.bounds,size=Math.min(lo[0]+hi[0],lo[1]+hi[1]);
    if(caught(nodes.map(n=>[p[0]+n.rest[0]-a[0],p[1]+n.rest[1]-a[1]]),this.obstacles,this.faces)>size/2){
      const rects=this.obstacles.map(r=>[r[0]-hi[0],r[1]-hi[1],r[2]+lo[0],r[3]+lo[1]]);
      const spot=freeSpot(p,rects,[b[0]+lo[0],b[1]+lo[1],b[2]-hi[0],b[3]-hi[1]],size)||freeSpot(p,this.obstacles,b,size);
      if(spot){this.anchor.p=spot;this.faces=this.obstacles.map(r=>face(r,spot));}
    }
    this.settled=this.anchor.p.join();
  }
  setEffect(type,active){this.behavior.set(type,active);}
  activity(){this.behavior.activity();}
  set idleEnabled(value){this.behavior.idleEnabled=value;this.behavior.idleFrames=0;this.behavior.idleLabel='';}
  get idleEnabled(){return this.behavior.idleEnabled;}
  get idleLabel(){return this.behavior.idleLabel;}
  grab(x,y,radius=Infinity){
    if(!this.points.length)return false;
    if(Number.isFinite(radius)&&!this.groups.some(g=>g.nodes.some(n=>{const [px,py]=screen(n.p);return Math.hypot(px-x,py-y)<=radius;})))return false;
    this.drag={node:null,groupIndex:-1,target:touchWorld(x,y),offset:[0,0],ticks:0,firstFrame:true,releasing:false};this.activity();return true;
  }
  move(x,y){if(this.drag&&!this.drag.releasing){this.drag.target=touchWorld(x,y);this.activity();}}
  release(){if(this.drag)this.drag.releasing=true;}
  // Web-only pose editing while Freeze pauses the DS frame clock.
  poseTouch(x,y){
    if(!this.drag)return;
    if(x!==undefined)this.move(x,y);
    this.drag.firstFrame=false;this.updateTouch();this.sync();
  }
  updateTouch(){
    const d=this.drag;if(!d)return;
    if(d.releasing){
      if(d.ticks<=5)this.behavior.restore();
      else if(d.node){
        // The DS measures against the anchor's home (mode 2), which doubles any
        // distance the drawing has travelled; here it roams the whole page,
        // so measure against the live anchor (mode 1) and keep the stroke where dropped.
        if(this.groups.length>=2)this.measureAnchorGroup(d.groupIndex,1);
        const t=ratio(d.ticks,5,300),g=this.groups[d.groupIndex];
        // 020c5fc8 updates consecutive segments only, leaving a closing edge.
        for(let i=1;i<g.nodes.length;i++){
          const blend=n=>t>=Q?n.p:t<=0?n.rest:[Math.floor(((Q-t)*n.rest[0]+t*n.p[0])/Q),Math.floor(((Q-t)*n.rest[1]+t*n.p[1])/Q)];
          const a=blend(g.nodes[i-1]),b=blend(g.nodes[i]);g.edges[i-1].rest=[a[0]-b[0],a[1]-b[1]];
        }
      }
      this.drag=null;return;
    }
    if(d.firstFrame){d.firstFrame=false;return;}
    d.ticks++;
    this.behavior.springSet=0;
    if(d.ticks===1){
      let limit=-1;
      for(let i=0;i<this.groups.length;i++){
        let best=null,distance=Infinity;
        for(const n of this.groups[i].nodes){const dx=n.p[0]-d.target[0],dy=n.p[1]-d.target[1],dd=dx*dx+dy*dy;if(dd<distance){distance=dd;best=n;}}
        if(limit<0||limit*limit>=distance){d.node=best;d.groupIndex=i;limit=Math.floor((Math.floor(Math.sqrt(distance*4))+1)/2);}
      }
      d.offset=[this.anchor.p[0]-d.node.p[0],this.anchor.p[1]-d.node.p[1]];
    }
    const n=d.node;n.p=[...d.target];n.v=[0,0];n.f=[0,0];
    this.anchor.p=[Math.max(this.bounds[0],Math.min(this.bounds[2],d.target[0]+d.offset[0])),Math.max(this.bounds[1],Math.min(this.bounds[3],d.target[1]+d.offset[1]))];
  }
  reset(){this.drag=null;for(const g of this.groups)for(const n of g.nodes){n.p=world(n.output.ox,n.output.oy);n.rest=[...n.p];n.v=[0,0];n.f=[0,0];}this.centerAnchor();this.restAnchor=[...this.anchor.p];this.offset=[0,0];this.measureAnchors(0);this.measureEdges(true);const enabled=this.idleEnabled;this.behavior=new DSEffects(this);this.effects=this.behavior.held;this.behavior.idleEnabled=enabled;this.sync();}
  sync(){for(const g of this.groups)for(const n of g.nodes){const [x,y]=screen(n.p);Object.assign(n.output,{x,y,vx:n.v[0]*96/focal*800/256,vy:-n.v[1]*96/focal*520/192,held:this.drag?.node===n});}}
  tick(){
    this.behavior.tick();
    this.clearAnchor();
    const k=dsSpringCoefficients[this.behavior.springSet],backup=[...this.anchor.p];
    this.anchor.p=[backup[0]+this.offset[0],backup[1]+this.offset[1]];this.anchor.f=[0,0];
    for(let i=0;i<this.groups.length;i++){
      const g=this.groups[i];for(const s of g.edges)spring(s,k[0],k[1]);if(i>=1)for(const s of g.ends)spring(s,k[4],k[5]);
      for(let j=0;j<g.nodes.length;j++){
        spring(g.anchorLinks[j],k[2],k[3]);const n=g.nodes[j];integrate(n);
        for(let axis=0;axis<2;axis++)if(n.p[axis]<this.bounds[axis]||n.p[axis]>this.bounds[axis+2]){n.p[axis]=Math.max(this.bounds[axis],Math.min(this.bounds[axis+2],n.p[axis]));n.v[axis]=mul(n.v[axis],-1000);}
        this.collide(n);
      }
    }
    this.anchor.p=backup;this.sync();
  }
}

// SVG import/export.
const NS='http://www.w3.org/2000/svg';
const geometry='path,rect,circle,ellipse,line,polyline,polygon';
const allowed=new Set(['svg','g','defs','path','rect','circle','ellipse','line','polyline','polygon','style','title','desc']);
const attrs=new Set(['viewBox','width','height','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','d','points','transform','fill','fill-rule','fill-opacity','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-opacity','stroke-miterlimit','opacity','style','class','id','display','visibility','xmlns']);
const presentation=['fill','fill-rule','fill-opacity','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-opacity','stroke-miterlimit'];
function shapePath(el){
  const n=k=>Number(el.getAttribute(k)||0),tag=el.localName;
  if(tag==='path')return el.getAttribute('d')||'';
  if(tag==='line')return `M${n('x1')} ${n('y1')}L${n('x2')} ${n('y2')}`;
  if(tag==='polygon'||tag==='polyline')return `M${el.getAttribute('points')||'0 0'}${tag==='polygon'?'Z':''}`;
  if(tag==='circle'||tag==='ellipse'){
    const x=n('cx'),y=n('cy'),rx=tag==='circle'?n('r'):n('rx'),ry=tag==='circle'?n('r'):n('ry');
    return `M${x-rx} ${y}A${rx} ${ry} 0 1 0 ${x+rx} ${y}A${rx} ${ry} 0 1 0 ${x-rx} ${y}Z`;
  }
  const x=n('x'),y=n('y'),w=n('width'),h=n('height');
  const rx=Math.min(w/2,n('rx')||n('ry')),ry=Math.min(h/2,n('ry')||n('rx'));
  return `M${x+rx} ${y}H${x+w-rx}Q${x+w} ${y} ${x+w} ${y+ry}V${y+h-ry}Q${x+w} ${y+h} ${x+w-rx} ${y+h}H${x+rx}Q${x} ${y+h} ${x} ${y+h-ry}V${y+ry}Q${x} ${y} ${x+rx} ${y}Z`;
}
function split(d){
  const parsed=svgpath(d).abs();if(parsed.err)throw new Error('This SVG contains an invalid path.');
  const parts=[];let part=[];
  parsed.iterate(seg=>{if(seg[0]==='M'&&part.length){parts.push(part);part=[];}part.push(seg);});if(part.length)parts.push(part);
  return parts.map(segs=>({d:segs.map(s=>s.join(' ')).join(' '),closed:segs.at(-1)[0]==='Z'}));
}
function pathData(shape){return shape.contours.map(c=>c.points.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(' ')+(c.closed?' Z':'')).join(' ');}
async function readSVG(text){
  if(text.length>2_000_000)throw new Error('Please use an SVG smaller than 2 MB.');
  const doc=new DOMParser().parseFromString(text,'image/svg+xml');
  if(doc.querySelector('parsererror')||doc.documentElement.localName!=='svg')throw new Error('That file is not a valid SVG.');
  if(doc.querySelector('text,image,use,foreignObject,linearGradient,radialGradient,mask,clipPath,filter,svg svg'))throw new Error('Use outlined paths and solid fills. Text, images, symbols, gradients, nested SVGs, clipping and filters are not supported.');
  for(const el of doc.querySelectorAll('*'))for(const attr of el.attributes)if(/url\s*\(/i.test(attr.value))throw new Error('URL-based paints, clipping, masks and filters are not supported.');
  const host=document.createElement('div');host.style.cssText='position:fixed;left:-10000px;top:0;width:800px;height:520px;opacity:0;pointer-events:none';
  const shadow=host.attachShadow({mode:'closed'});
  function clean(el){
    if(!allowed.has(el.localName))return null;
    const out=document.createElementNS(NS,el.localName);
    for(const a of el.attributes)if(attrs.has(a.name)&&!/(url\s*\(|javascript:|expression\s*\()/i.test(a.value))out.setAttribute(a.name,a.value);
    if(el.localName==='style'){
      if(/@|url\s*\(|expression|javascript/i.test(el.textContent))throw new Error('External resources and URL-based styles are not supported.');
      out.textContent=el.textContent;
    }else for(const child of el.children){const safe=clean(child);if(safe)out.append(safe);}
    return out;
  }
  const svg=clean(doc.documentElement);svg.style.width='800px';svg.style.height='520px';shadow.append(svg);document.body.append(host);
  try{
    const elements=[...svg.querySelectorAll(geometry)];if(elements.length>300)throw new Error('Please simplify this SVG to 300 shapes or fewer.');
    const inv=svg.getCTM().inverse(),raw=[];let total=0;
    for(const el of elements){
      const cs=getComputedStyle(el);let hidden=cs.visibility==='hidden'||!!el.closest('defs');
      for(let e=el;e;e=e.parentElement)if(getComputedStyle(e).display==='none')hidden=true;
      if(hidden)continue;
      const matrix=inv.multiply(el.getCTM()),style={};
      for(const key of presentation)style[key]=cs.getPropertyValue(key);
      // Fills are removed on import; shapes left with no stroke would be invisible.
      style.fill='none';if(style.stroke==='none')continue;
      let opacity=1;for(let e=el;e&&e!==svg.parentNode;e=e.parentElement)opacity*=Number(getComputedStyle(e).opacity);
      style.opacity=String(opacity);
      const transformed=svgpath(shapePath(el)).matrix([matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f]);
      if(transformed.err)throw new Error('An SVG path could not be read.');
      style['stroke-width']=String(parseFloat(cs.strokeWidth)*Math.sqrt(Math.abs(matrix.a*matrix.d-matrix.b*matrix.c)));
      const contours=[];
      for(const part of split(transformed.toString())){
        const path=document.createElementNS(NS,'path');path.setAttribute('d',part.d);svg.append(path);
        const length=path.getTotalLength();if(!Number.isFinite(length))throw new Error('Invalid SVG geometry.');
        if(length>0){contours.push({...part,path,length});total+=length;}
      }
      if(contours.length)raw.push({style,contours});
    }
    if(!raw.length||!total)throw new Error('No stroked paths found. Fills are removed on import, so fill-only shapes are skipped.');
    const allContours=raw.flatMap(s=>s.contours);
    if(allContours.length>200)throw new Error('Please simplify this SVG to 200 contours or fewer (the DS stroke limit).');
    // Keep the original controller's 500-particle budget, reserving enough
    // samples for every open/closed contour before distributing by arc length.
    const minimum=allContours.reduce((sum,c)=>sum+(c.closed?3:2),0);
    if(minimum>500)throw new Error('This SVG needs more than 500 points. Please simplify its contours.');
    const remaining=500-minimum;
    let allocated=0;
    for(const c of allContours){const share=remaining*c.length/total;c.count=(c.closed?3:2)+Math.floor(share);c.remainder=share%1;allocated+=c.count;}
    const ranked=[...allContours].sort((a,b)=>b.remainder-a.remainder);
    for(let i=0;i<500-allocated;i++)ranked[i%ranked.length].count++;
    const samples=[];
    for(const s of raw)for(const c of s.contours){const count=c.count;c.points=[];for(let i=0;i<count;i++){const p=c.path.getPointAtLength(c.length*i/(c.closed?count:count-1));c.points.push({x:p.x,y:p.y});samples.push(c.points.at(-1));}delete c.path;delete c.d;delete c.count;delete c.remainder;}
    const xs=samples.map(p=>p.x),ys=samples.map(p=>p.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    const scale=Math.min(570/Math.max(maxX-minX,1),350/Math.max(maxY-minY,1)),cx=(minX+maxX)/2,cy=(minY+maxY)/2;
    for(const p of samples){p.x=(p.x-cx)*scale+400;p.y=(p.y-cy)*scale+260;}
    for(const s of raw)s.style['stroke-width']=String(Number(s.style['stroke-width'])*scale);
    return raw;
  }finally{host.remove();}
}

// bajortski.net header: the muppet as a DS sketch.
// readSVG fits drawings into 570×350 around (400,260) of the controller's
// 800×520 stage. The viewBox crops to the muppet so it keeps its old size in
// the slot; overflow is visible, and the bounds are widened to the whole
// page, so it can be thrown anywhere on it.
const effectKeys={KeyL:'wobble',KeyR:'wobble',KeyX:'inflate',ArrowUp:'inflate',KeyB:'widen',ArrowDown:'widen',KeyA:'twist',ArrowRight:'twist',KeyY:'untwist',ArrowLeft:'untwist'};
// Elements the muppet bumps into. Boxes use their border; text uses its own
// extent, so a centred heading isn't a full-width wall.
const solidBoxes='table, img, iframe, video';
const solidText='h1, h2, h3, p, li';

function textRect(el){const r=document.createRange();r.selectNodeContents(el);return r.getBoundingClientRect();}
function pageObstacles(svg){
  const out=[];
  for(const el of document.querySelectorAll(`${solidBoxes}, ${solidText}`)){
    if(svg.contains(el)||el.parentElement.closest(solidBoxes))continue;
    const r=el.matches(solidBoxes)?el.getBoundingClientRect():textRect(el);
    if(r.width&&r.height)out.push(r);
  }
  return out;
}
// Client-pixel rect -> world-space [minX,minY,maxX,maxY], inset by pad (stage units).
function worldRect(inv,r,pad){
  const a=new DOMPoint(r.left,r.top).matrixTransform(inv),b=new DOMPoint(r.right,r.bottom).matrixTransform(inv);
  const lo=world(a.x-pad,b.y+pad),hi=world(b.x+pad,a.y-pad);
  return [Math.min(lo[0],hi[0]),Math.min(lo[1],hi[1]),Math.max(lo[0],hi[0]),Math.max(lo[1],hi[1])];
}
function bindEffectKeys(sim,drawing){
  const held=new Set();
  const typing=t=>t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);
  const inView=()=>{const r=drawing.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;};
  const set=(code,active)=>{
    if(active===held.has(code))return;
    if(active)held.add(code);else held.delete(code);
    const type=effectKeys[code];
    sim.setEffect(type,Object.keys(effectKeys).some(k=>effectKeys[k]===type&&held.has(k)));
  };
  document.addEventListener('keydown',e=>{
    if(!effectKeys[e.code]||e.metaKey||e.ctrlKey||e.altKey||typing(e.target)||!inView())return;
    e.preventDefault();set(e.code,true);
  });
  document.addEventListener('keyup',e=>{if(held.has(e.code))set(e.code,false);});
  const releaseAll=()=>{for(const code of[...held])set(code,false);};
  window.addEventListener('blur',releaseAll);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAll();});
}

async function stretchMuppet(svgText){
  const shapes=await readSVG(svgText);
  // Site theming: strokes take the text colour and fills the background colour,
  // as inline styles so light/dark, the "t" toggle and custom colours all reach it.
  const theme={fill:'var(--background-color)',stroke:'var(--text-color)'};
  const sim=new SoftSVG(shapes);
  const xs=sim.points.map(p=>p.x),ys=sim.points.map(p=>p.y),pad=Math.max(...shapes.map(s=>Number(s.style['stroke-width'])||0))/2;
  const minX=Math.min(...xs)-pad,minY=Math.min(...ys)-pad;
  const svg=document.createElementNS(NS,'svg');
  svg.id='muppet-header';
  svg.setAttribute('viewBox',`${minX} ${minY} ${Math.max(...xs)+pad-minX} ${Math.max(...ys)+pad-minY}`);
  svg.setAttribute('height','250');
  // The svg box itself ignores the pointer; the drawing and a wide invisible
  // stroke around it catch grabs wherever it has been thrown.
  svg.setAttribute('style','display: block; width: 100%; overflow: visible; position: relative; z-index: 1; pointer-events: none; touch-action: none;');
  const paths=shapes.map(s=>{
    const p=document.createElementNS(NS,'path');
    for(const[k,v]of Object.entries(s.style))if(theme[k]&&v!=='none')p.style.setProperty(k,theme[k]);else p.setAttribute(k,v);
    p.setAttribute('pathLength','100');p.classList.add('muppet-draw');
    p.style.pointerEvents='visiblePainted';p.style.cursor='grab';
    svg.append(p);return p;
  });
  const hit=document.createElementNS(NS,'path');
  hit.setAttribute('style','fill: none; stroke: transparent; stroke-width: 30; stroke-linecap: round; stroke-linejoin: round; pointer-events: stroke; cursor: grab;');
  svg.append(hit);
  const render=()=>{shapes.forEach((s,i)=>paths[i].setAttribute('d',pathData(s)));hit.setAttribute('d',shapes.map(pathData).join(' '));};
  render();

  // Page geometry, re-measured every frame (layout, scroll and resizes all move it).
  function measure(){
    const inv=svg.getScreenCTM().inverse(),root=document.documentElement;
    sim.bounds=worldRect(inv,new DOMRect(-scrollX,-scrollY,root.scrollWidth,root.scrollHeight),-pad);
    sim.obstacles=pageObstacles(svg).map(r=>worldRect(inv,r,pad));
  }

  let pointer=null;
  const position=e=>new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  const release=e=>{if(e.pointerId!==pointer)return;sim.release();pointer=null;document.documentElement.style.removeProperty('cursor');};
  svg.addEventListener('pointerdown',e=>{
    if(e.button!==0||pointer!==null)return;
    const p=position(e);
    if(!sim.grab(p.x,p.y))return;
    pointer=e.pointerId;svg.setPointerCapture(pointer);document.documentElement.style.cursor='grabbing';e.preventDefault();
  });
  svg.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;const p=position(e);sim.move(p.x,p.y);});
  svg.addEventListener('pointerup',release);svg.addEventListener('pointercancel',release);svg.addEventListener('lostpointercapture',release);
  for(const type of['pointerdown','keydown'])document.addEventListener(type,()=>sim.activity());
  bindEffectKeys(sim,hit);

  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  sim.idleEnabled=!reduceMotion.matches;
  reduceMotion.addEventListener('change',()=>{sim.idleEnabled=!reduceMotion.matches;});

  // Fixed 60 Hz clock, as on the DS.
  let previous=0,accumulator=0;
  requestAnimationFrame(function frame(now){
    if(previous)accumulator+=Math.min(now-previous,60);
    previous=now;
    if(accumulator>=1000/60&&svg.isConnected)measure();
    let ticked=false;
    while(accumulator>=1000/60){sim.tick();accumulator-=1000/60;ticked=true;}
    if(ticked)render();
    requestAnimationFrame(frame);
  });
  return svg;
}
return stretchMuppet;
})();
