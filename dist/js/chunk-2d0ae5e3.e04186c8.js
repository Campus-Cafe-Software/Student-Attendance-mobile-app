(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae5e3"],{"0a84":function(t,e,s){"use strict";s.r(e);var r=s("7a23"),n=Object(r["E"])("data-v-2a405858");Object(r["t"])("data-v-2a405858");var i={style:{margin:"0px","font-weight":"bold"}},c={style:{margin:"0px","font-weight":"bold"}},a={style:{margin:"0px"}},o={style:{margin:"0px"}},u=Object(r["h"])("h1",{style:{"font-weight":"bold"}},"Time IN",-1),l={style:{border:"solid 1px #dfdfdf","border-radius":"10px"}},h=Object(r["h"])("h1",{style:{"font-weight":"bold"}},"Time OUT",-1),d={style:{border:"solid 1px #dfdfdf","border-radius":"10px"}},g=Object(r["g"])(" Submit "),b=Object(r["h"])("h3",{style:{color:"red","text-align":"center"}},"You can't submit time right now, check with your instructor.",-1);Object(r["r"])();var m=n((function(t,e,s,m,f,p){var O=Object(r["y"])("ion-col"),j=Object(r["y"])("ion-row"),k=Object(r["y"])("ion-grid"),T=Object(r["y"])("ion-icon"),I=Object(r["y"])("ion-button"),C=Object(r["y"])("base-layout");return Object(r["q"])(),Object(r["e"])(C,{"page-title":"Student Attendance","page-default-back-link":"classList"},{default:n((function(){return[Object(r["h"])(k,null,{default:n((function(){return[Object(r["h"])(j,null,{default:n((function(){return[Object(r["h"])(O,{size:"12",style:{"text-align":"center"}},{default:n((function(){return[Object(r["h"])("h2",i,Object(r["A"])(f.ClassTitle),1),Object(r["h"])("h2",c,"("+Object(r["A"])(f.courseNumber)+")",1),Object(r["h"])("h4",a,Object(r["A"])(f.currentDate),1),Object(r["h"])("h4",o,Object(r["A"])(f.classStartTime)+" - "+Object(r["A"])(f.classEndTime),1)]})),_:1})]})),_:1}),Object(r["h"])(j,null,{default:n((function(){return[Object(r["h"])(O,{size:"12"})]})),_:1})]})),_:1}),Object(r["h"])(k,null,{default:n((function(){return[f.InOutFlag?(Object(r["q"])(),Object(r["e"])(j,{key:0},{default:n((function(){return[Object(r["h"])(O,{size:"12",style:{"text-align":"center"}},{default:n((function(){return[u,Object(r["h"])("h1",l,Object(r["A"])(f.currentTime),1)]})),_:1})]})),_:1})):Object(r["f"])("",!0),f.InOutFlag?Object(r["f"])("",!0):(Object(r["q"])(),Object(r["e"])(j,{key:1},{default:n((function(){return[Object(r["h"])(O,{size:"12",style:{"text-align":"center"}},{default:n((function(){return[h,Object(r["h"])("h1",d,Object(r["A"])(f.currentTime),1)]})),_:1})]})),_:1})),1==f.activeForClockInOut?(Object(r["q"])(),Object(r["e"])(j,{key:2},{default:n((function(){return[Object(r["h"])(O,{size:"12",style:{"text-align":"center"}},{default:n((function(){return[Object(r["h"])(I,{expand:"block",onClick:p.onSubmit,style:{"--background":"#ff796a"}},{default:n((function(){return[Object(r["h"])(T,{slot:"start",icon:f.paperPlaneOutline},null,8,["icon"]),g]})),_:1},8,["onClick"])]})),_:1})]})),_:1})):Object(r["f"])("",!0),1!=f.activeForClockInOut?(Object(r["q"])(),Object(r["e"])(j,{key:3},{default:n((function(){return[b]})),_:1})):Object(r["f"])("",!0)]})),_:1})]})),_:1})})),f=(s("d3b7"),s("ac1f"),s("25f0"),s("4d90"),s("1276"),s("96cf"),s("1da1")),p=s("8a30"),O=s("ff79"),j={name:"SubmitTime",props:["cuClass","classProp","msg"],components:{IonButton:p["c"]},data:function(){return{currentDate:"",currentTime:"",classID:this.$route.params.id,gotit:"",ClassTitle:"",courseNumber:"",userName:"",logOutOutline:O["q"],logInOutline:O["p"],paperPlaneOutline:O["t"],classStartTime:"",classEndTime:"",InOutFlag:!0,clockId:"",submitClockId:"",activeForClockInOut:!0}},computed:{},methods:{getTodayDate:function(){var t=new Date,e=String(t.getDate()).padStart(2,"0"),s=String(t.getMonth()+1).padStart(2,"0"),r=t.getFullYear();return t=s+"/"+e+"/"+r+String(t.getHours()).padStart(2,"0")+String(t.getMinutes()).padStart(2,"0"),t},getCurrentTime:function(){var t=new Date,e=t.getHours(),s=t.getMinutes(),r=e>=12?"PM":"AM";e%=12,e=e||12,s=s<10?"0"+s:s,t=e+":"+s+" "+r,console.log("current time is "+t.toString()),this.currentTime=t;var n={id:"100"};window.history.replaceState(n,"Attendance","/cafeweb/mobile/")},changeTimeTo12:function(t){if(null==t||void 0==t||""==t)return"";var e=t.split("T")[1].split(":")[0],s=t.split("T")[1].split(":")[1],r=" AM";return"0"==e[0]?(r=" AM",e=e[1]):e<=11?r=" AM":12==e?r=" PM":e>12&&(r=" PM",e-=12),e+":"+s+r},getClassTitle:function(){var t=[];t=this.$store.getters.cuClass(this.$route.params.id).clockHistory,0==t.length?(this.InOutFlag=!0,this.submitClockId="clockIn?"):""!=t[t.length-1].studentClockInDateTime&&""==t[t.length-1].studentClockOutDateTime&&""!=t[t.length-1].clockId?(this.InOutFlag=!1,this.clockId=t[t.length-1].clockId,this.submitClockId="clockOut?clockId="+this.clockId+"&"):""==t[t.length-1].studentClockInDateTime&&""==t[t.length-1].studentClockOutDateTime&&""!=t[t.length-1].clockId?(this.InOutFlag=!0,this.clockId=t[t.length-1].clockId,this.submitClockId="clockOut?clockId="+this.clockId+"&"):(this.InOutFlag=!0,this.submitClockId="clockIn?"),console.log("id="+this.$route.params.id),console.log("class="+JSON.stringify(this.$store.getters.getClasses)),console.log(JSON.stringify(this.$store.getters.cuClass(this.$route.params.id))),this.ClassTitle=this.$store.getters.cuClass(this.$route.params.id).title,this.classStartTime=this.$store.getters.cuClass(this.$route.params.id).startDateTime,this.classEndTime=this.changeTimeTo12(this.$store.getters.cuClass(this.$route.params.id).end),this.courseNumber=this.$route.params.id,console.log("title="+this.ClassTitle),this.classStartTime=this.changeTimeTo12(this.$store.getters.cuClass(this.$route.params.id).start),this.activeForClockInOut="Y"==this.$store.getters.cuClass(this.$route.params.id).activeForClockInOut},updateTime:function(){var t=this;setInterval((function(){t.getCurrentTime()}),6e4)},onSubmit:function(){var t=this,e={method:this.submitClockId.length>8?"PUT":"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.$store.getters.getToken}},s="/cafeweb/mobileApi/student/"+this.submitClockId+"semester="+this.$store.getters.cuClass(this.$route.params.id).semester+"&courseNumber="+this.$route.params.id+"&courseSection="+this.$store.getters.cuClass(this.$route.params.id).courseSection+"&labSection="+this.$store.getters.cuClass(this.$route.params.id).labSection;fetch(s,e).then(function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(s){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:s.ok?t.openToastSuccessful():t.openToastFailed();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.errorMessage=e,console.error("There was an error!",e),t.openToastFailed()}))},openToastSuccessful:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["q"].create({message:"Submit Successful.",position:"top",duration:1e3,color:"success"});case 2:s=e.sent,s.present(),s.onDidDismiss().then((function(){t.$router.go(-1)}));case 5:case"end":return e.stop()}}),e)})))()},openToastFailed:function(){return Object(f["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["q"].create({message:"Failed submit, server error, please try again.",position:"top",duration:3e3,color:"danger"});case 2:e=t.sent,e.present();case 4:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.gotit=this.msg;var t=new Date;this.currentDate=t.toDateString(),this.getCurrentTime(),this.classID=this.$route.params.id,console.log("today is = "+this.currentDate),this.getClassTitle(),this.updateTime()}};j.render=m,j.__scopeId="data-v-2a405858";e["default"]=j}}]);
//# sourceMappingURL=chunk-2d0ae5e3.e04186c8.js.map