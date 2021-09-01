<template>
  <base-layout page-title="Student Attendance" page-default-back-link="/cafeweb/mobile/classList">
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Student Attendance</h4>-->
          <h2 style="margin:0px;font-weight:bold;">{{ ClassTitle }}</h2>
          <h2 style="margin:0px;font-weight:bold;">({{ courseNumber }})</h2>
          <h4 style="margin:0px;">{{ currentDate }}</h4>
          <h4 style="margin:0px;">{{classStartTime}} - {{classEndTime}}</h4>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          
        </ion-col>
      </ion-row>

    </ion-grid>

    <ion-grid>
      
      <ion-row v-if="InOutFlag"><ion-col size="12" style="text-align: center">
          <h1 style="font-weight:bold;">Time IN</h1>
          <h1 style="border: solid 1px #dfdfdf;border-radius: 10px;">{{ currentTime }}</h1>
        </ion-col></ion-row>
      <ion-row v-if="!InOutFlag"><ion-col size="12" style="text-align: center">
           <h1 style="font-weight:bold;">Time OUT</h1>
          <h1 style="border: solid 1px #dfdfdf;border-radius: 10px;">{{ currentTime }}</h1>
        </ion-col></ion-row>
      
      <ion-row v-if="activeForClockInOut == true"><ion-col size="12" style="text-align: center">
          <ion-button expand="block" @click="onSubmit" style="--background:#ff796a;">
            <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
            Submit
          </ion-button>
        </ion-col></ion-row>
      <ion-row v-if="activeForClockInOut != true">
        <h3 style="color:red;padding0 30px;text-align:center;">You can't submit time right now, check with your instructor.</h3>
      </ion-row>  
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonButton, toastController } from "@ionic/vue";
import { logOutOutline, logInOutline, paperPlaneOutline  } from "ionicons/icons";

export default {
  name: "SubmitTime",
  props: ["cuClass", "classProp", "msg"],
  components: { IonButton },
  data() {
    return {
      currentDate: "",
      currentTime: "",
      classID: this.$route.params.id,
      gotit: "",
      ClassTitle: "",
      courseNumber:"",
      userName: "",
      logOutOutline,
      logInOutline,
      paperPlaneOutline,
      classStartTime: "",
      classEndTime: "",
      InOutFlag: true,
      clockId: "",
      submitClockId:"",
      activeForClockInOut: true,
    };
  },
  computed: {},

  methods: {
    getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today =
        mm +
        "/" +
        dd +
        "/" +
        yyyy +
        String(today.getHours()).padStart(2, "0") +
        String(today.getMinutes()).padStart(2, "0");

      //this.currentTime = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
      return today;
    },
    getCurrentTime() {
      let time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      time =
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      console.log("current time is "+ time.toString());
      this.currentTime = time;
    },
      // change to 12hr AMPM
            changeTimeTo12(time) {
                if( time == null || time == undefined || time == "") {return "";}
                else {
                    var hh = time.split('T')[1].split(":")[0];
                    var mm = time.split('T')[1].split(":")[1];
                    var AMPM = " AM";
                    if (hh[0]=="0") {AMPM = " AM"; hh=hh[1];}
                    else if (hh <= 11) {AMPM = " AM";}
                    else if (hh == 12) {AMPM = " PM";}    
                    else if (hh > 12) {AMPM = " PM"; hh -=12;}

                    //console.log(hh+":"+mm+AMPM);
                    return hh+":"+mm+AMPM;
                }
            },
    getClassTitle() {
      /*
      this.ClassTitle = this.$store.getters.cuClass(
        this.$route.params.id
      ).ClassTitle;
      this.classStartTime = this.$store.getters.cuClass(
        this.$route.params.id
      ).classStartTime;
      this.classEndTime = this.$store.getters.cuClass(
        this.$route.params.id
      ).classEndTime;
      this.userName = this.$store.getters.getUserName;
      console.log("username = "+JSON.stringify(this.$store.getters.getUserName));
      
      this.InOutFlag = (this.$store.getters.cuClass(
        this.$route.params.id
      ).clockHistory.length % 2 == 0 )  ? true : false;
      */

      // get clock history
      var ch=[];
      ch = this.$store.getters.cuClass(
        this.$route.params.id
      ).clockHistory;

      // no history
      if(ch.length == 0) { this.InOutFlag = true;  this.submitClockId="clockIn?";}
      else { 
        // find last obj, 
        // if has studentClockOutDateTime, new in time
        // else it is out time, add clock id on submit
        //var lastTimeStemp = ch[ch.lenght-1]; 
        if (ch[ch.length-1].studentClockInDateTime != "" && ch[ch.length-1].studentClockOutDateTime == "" && ch[ch.length-1].clockId != "" ) {
          // got id and in time, no out time, this is out time 
          this.InOutFlag = false; this.clockId = ch[ch.length-1].clockId; this.submitClockId= "clockOut?clockId="+this.clockId+"&";
        } 
        else if (ch[ch.length-1].studentClockInDateTime == "" && ch[ch.length-1].studentClockOutDateTime == "" && ch[ch.length-1].clockId != ""){
          // got it, both empty, this is in time
          this.InOutFlag = true; this.clockId = ch[ch.length-1].clockId; this.submitClockId= "clockOut?clockId="+this.clockId+"&";
        } else {
          // else new in time
          this.InOutFlag = true; this.submitClockId="clockIn?";
        }
        //if(ch[ch.length-1].studentClockInDateTime != "" && ch[ch.length-1].studentClockOutDateTime == "" ) { this.InOutFlag = true; this.submitClockId="clockIn?";} 
        //else { this.InOutFlag = false; this.clockId = ch[ch.length-1].clockId; this.submitClockId= "clockOut?clockId="+this.clockId+"&";}
      }


     console.log("id="+this.$route.params.id);
     console.log("class="+JSON.stringify(this.$store.getters.getClasses));
     console.log(JSON.stringify(this.$store.getters.cuClass(
        this.$route.params.id
      )));
      this.ClassTitle = this.$store.getters.cuClass(
        this.$route.params.id
      ).title;
      this.classStartTime = this.$store.getters.cuClass(
        this.$route.params.id
      ).startDateTime;
      this.classEndTime = this.changeTimeTo12(this.$store.getters.cuClass(
        this.$route.params.id
      ).end);
      this.courseNumber = this.$route.params.id;
      console.log("title="+this.ClassTitle);
      this.classStartTime = this.changeTimeTo12(this.$store.getters.cuClass(
        this.$route.params.id
      ).start);

      this.activeForClockInOut = ( this.$store.getters.cuClass(
        this.$route.params.id).activeForClockInOut == "Y" ) ? true : false ;
      
    },

    updateTime(){
      setInterval(() => {
        this.getCurrentTime();
      }, 60000)
    },
    
    // on submit button click,
    // add time, student id, class id
    // push to server
    // add to local storage
    // on successful call openToastSuccessful
    // on faile call openToastFailed
    onSubmit(){
      /*
      this.$store.getters.cuClass(
        this.$route.params.id
      ).timeInOut.push(this.currentTime);
      
      console.log(this.$store.getters.cuClass(
        this.$route.params.id
      ).timeInOut);
      */
      const requestOptions = {
        method: (this.submitClockId.length>8)?"PUT":"POST",
        headers: { 'Content-Type': 'application/json', 
                  'Authorization': 'Bearer '+ this.$store.getters.getToken,                  
                  }
      };

      var url = "/cafeweb/api/student/"+ 
                this.submitClockId +
                "semester=" + this.$store.getters.cuClass(this.$route.params.id).semester +                
                "&courseNumber=" + this.$route.params.id + 
                "&courseSection=" + this.$store.getters.cuClass(this.$route.params.id).courseSection + 
                "&labSection=" + this.$store.getters.cuClass(this.$route.params.id).labSection
      fetch(url, requestOptions)
        .then(async response => {
          // check for error response
          if (!response.ok) {
            this.openToastFailed();
          } else {
            this.openToastSuccessful();
          }

        })
        .catch(error => {
          this.errorMessage = error;
          console.log('There was an error! '+error.toString());
          this.openToastFailed();
        });
    },

    async openToastSuccessful() {
      const toast = await toastController
        .create({
          message: 'Submit Successful.',
          position: 'top',
          duration: 1000,
          color: 'success'
        })
      toast.present();
      
      toast.onDidDismiss().then(()=>{
        //this.$root.$refs.ClassListPage.getRole();
        this.$router.go(-1);
      })
      
    },
    

    async openToastFailed() {
      const toast = await toastController
        .create({
          message: 'Failed submit, server error, please try again.',
          position: 'top',
          duration: 3000,
          color: 'danger'
        })
      toast.present();
    },
  },
  mounted: function () {
    //update table display onload
    this.gotit = this.msg;
    let today = new Date();
    this.currentDate = today.toDateString();
    this.getCurrentTime();
    this.classID = this.$route.params.id;
    console.log("today is = " + this.currentDate);
    this.getClassTitle();
    this.updateTime();
  },
};
</script>

<style scoped>

</style>