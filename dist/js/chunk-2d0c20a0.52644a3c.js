(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c20a0"],{4938:function(t,n,i){"use strict";i.r(n),i.d(n,"ion_ripple_effect",(function(){return r}));var a=i("037e"),e=i("6606");const o=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}",r=class{constructor(t){Object(a["o"])(this,t),this.type="bounded"}async addRipple(t,n){return new Promise(i=>{Object(a["h"])(()=>{const e=this.el.getBoundingClientRect(),o=e.width,r=e.height,m=Math.sqrt(o*o+r*r),f=Math.max(r,o),d=this.unbounded?f:m+c,u=Math.floor(f*l),p=d/u;let b=t-e.left,w=n-e.top;this.unbounded&&(b=.5*o,w=.5*r);const h=b-.5*u,k=w-.5*u,y=.5*o-b,g=.5*r-w;Object(a["f"])(()=>{const t=document.createElement("div");t.classList.add("ripple-effect");const n=t.style;n.top=k+"px",n.left=h+"px",n.width=n.height=u+"px",n.setProperty("--final-scale",""+p),n.setProperty("--translate-end",`${y}px, ${g}px`);const a=this.el.shadowRoot||this.el;a.appendChild(t),setTimeout(()=>{i(()=>{s(t)})},325)})})})}get unbounded(){return"unbounded"===this.type}render(){const t=Object(e["b"])(this);return Object(a["j"])(a["c"],{role:"presentation",class:{[t]:!0,unbounded:this.unbounded}})}get el(){return Object(a["k"])(this)}},s=t=>{t.classList.add("fade-out"),setTimeout(()=>{t.remove()},200)},c=10,l=.5;r.style=o}}]);
//# sourceMappingURL=chunk-2d0c20a0.52644a3c.js.map