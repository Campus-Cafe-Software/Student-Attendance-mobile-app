(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ccb9d"],{"4ec9":function(e,t,s){"use strict";s.r(t),s.d(t,"startFocusVisible",(function(){return i}));const o="ion-focused",n="ion-focusable",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp"],i=()=>{let e=[],t=!0;const s=document,i=t=>{e.forEach(e=>e.classList.remove(o)),t.forEach(e=>e.classList.add(o)),e=t},d=()=>{t=!1,i([])};s.addEventListener("keydown",e=>{t=c.includes(e.key),t||i([])}),s.addEventListener("focusin",e=>{if(t&&e.composedPath){const t=e.composedPath().filter(e=>!!e.classList&&e.classList.contains(n));i(t)}}),s.addEventListener("focusout",()=>{s.activeElement===s.body&&i([])}),s.addEventListener("touchstart",d),s.addEventListener("mousedown",d)}}}]);
//# sourceMappingURL=chunk-2d0ccb9d.2491206c.js.map