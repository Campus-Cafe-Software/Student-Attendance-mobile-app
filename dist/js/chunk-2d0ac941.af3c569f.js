(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac941"],{"19ad":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=Object(o["h"])("h1",null," Student Attendance ",-1),a={key:0,style:{color:"red",padding:"0 10px","text-align":"center"}},c=Object(o["g"])(" Login ");function u(e,t,n,u,s,l){var i=Object(o["y"])("ion-img"),d=Object(o["y"])("ion-input"),f=Object(o["y"])("ion-item"),b=Object(o["y"])("ion-col"),p=Object(o["y"])("ion-row"),g=Object(o["y"])("ion-grid"),O=Object(o["y"])("ion-icon"),j=Object(o["y"])("ion-button"),h=Object(o["y"])("base-layout");return Object(o["q"])(),Object(o["e"])(h,{"page-title":"","page-default-back-link":"/"},{default:Object(o["D"])((function(){return[Object(o["h"])(g,null,{default:Object(o["D"])((function(){return[Object(o["h"])(p,null,{default:Object(o["D"])((function(){return[Object(o["h"])(b,{size:"12",style:{"text-align":"center"}},{default:Object(o["D"])((function(){return[r,Object(o["h"])(i,{src:"../../assets/campus.cafe.logo.png",style:{padding:"40px 80px"}}),1==s.loginError?(Object(o["q"])(),Object(o["e"])("h3",a,"Incorrect email or password!")):Object(o["f"])("",!0),Object(o["h"])(f,{style:{padding:"0 20px"}},{default:Object(o["D"])((function(){return[Object(o["h"])(d,{placeholder:"Email",modelValue:s.userInfo.username,"onUpdate:modelValue":t[1]||(t[1]=function(e){return s.userInfo.username=e})},null,8,["modelValue"])]})),_:1}),Object(o["h"])(f,{style:{padding:"0 20px"}},{default:Object(o["D"])((function(){return[Object(o["h"])(d,{placeholder:"Password",type:"password",modelValue:s.userInfo.password,"onUpdate:modelValue":t[2]||(t[2]=function(e){return s.userInfo.password=e})},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(o["h"])(p,null,{default:Object(o["D"])((function(){return[Object(o["h"])(b,{size:"12",style:{"text-align":"center"}},{default:Object(o["D"])((function(){return[Object(o["h"])(j,{expand:"block",onClick:t[3]||(t[3]=function(e){return l.loginSubmit()}),style:{"--background":"#ff796a",padding:"0 80px"}},{default:Object(o["D"])((function(){return[Object(o["h"])(O,{slot:"start",icon:s.lockOpenOutline},null,8,["icon"]),c]})),_:1})]})),_:1})]})),_:1})]})),_:1})}n("d3b7"),n("96cf");var s=n("1da1"),l=n("8a30"),i=n("ff79"),d=n("6c02"),f={name:"login",components:{IonInput:l["i"],IonItem:l["j"],IonImg:l["h"]},setup:function(){var e=Object(d["f"])();return{router:e}},data:function(){return{lockOpenOutline:i["o"],timeOutline:i["z"],alarmOutline:i["b"],img:"../../assets/campus.cafe.logo.png",schools:[],school:"",loginError:!1,userInfo:{username:"",password:""}}},methods:{loadToken:function(){var e=localStorage.getItem("token");console.log(e)},createStorage:function(){localStorage.setItem("token",this.$store.getters.getToken),console.log("token saved to localstorage")},getSchools:function(){},loginSubmit:function(){var e=this,t={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer token"},body:JSON.stringify({username:this.userInfo.username,password:this.userInfo.password})};fetch("/cafeweb/mobileApi/authenticate/token",t).then(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(n){var o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.json();case 2:if(o=t.sent,n.ok){t.next=6;break}return r=o&&o.message||n.status,t.abrupt("return",Promise.reject(r));case 6:e.$store.commit("addToken",o.token),console.log("saved to state "+e.$store.getters.getToken),e.createStorage(),e.$router.push("/classList");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.errorMessage=t,console.error("There was an error!",t),e.loginError=!0,e.$router.push("/classList")}))}},mounted:function(){this.loadToken(),console.log("login page mounted")}};f.render=u;t["default"]=f}}]);
//# sourceMappingURL=chunk-2d0ac941.af3c569f.js.map