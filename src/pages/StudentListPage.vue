<template>
    <base-layout 
        page-title="Faculty Acceptance"
        page-default-back-link="classList"
    >
        <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Faculty Acceptance</h4>-->
          <ion-spinner color="primary" v-if="stillLoading == true"></ion-spinner>
          <h2 style="margin:0px;font-weight:bold;">{{ ClassTitle }} ({{ classID }})</h2>
          <h4 style="margin:0px;margin-top: 10px;">{{ currentDate }}</h4>
          <h4 style="margin:0px;margin-top: 10px;">{{classStartTime}} - {{classEndTime}}</h4>
        </ion-col>
      </ion-row>

    </ion-grid>



    <ion-list style="padding-right:10px;">
        <ion-item 
            v-for="student in studentList" 
            :key="student.studentID" style="margin-right:0px;--padding-start: 10px;"
            >
            
            <!-- student.enrollmentStatus == 'graded' -->
            <ion-grid v-if="student.enrollmentStatus == 'graded'" style="opacity: 0.5;">
            <ion-row ion-no-padding >
                <ion-col size="2"><div><ion-img
            :src="student.imageURI"            
          ></ion-img></div></ion-col>
                <ion-col size="10">
                    <div><span style="color:grey">{{student.firstName}} {{student.lastName}} (ID: {{student.studentId}})</span></div>
                    <div v-if="student.isAbsent != 'Y'">
                    <ion-row style="align-content: flex-start;"                     
                     v-for="time in student.clockHistory" :key="time.studentID"
                    >
                            <ion-col size="5" v-if="student.clockHistory.length > 0">
                                <div style="color:grey">{{this.changeTimeTo12(time.studentClockInDateTime)}}</div>
                            </ion-col>
                            <ion-col size="5" v-if="student.clockHistory.length > 0">
                                <div style="color:grey">{{this.changeTimeTo12(time.studentClockOutDateTime)}}</div>
                            </ion-col>
                    </ion-row>
                    </div>
                    <ion-row style="align-content: flex-start;" v-if="student.clockHistory.length == 0 || student.isAbsent == 'Y'">
                        <ion-col size="12"><span style="color:red;">Absent</span></ion-col>
                    </ion-row>
                    <!--
                    <ion-row style="align-content: flex-start;" v-if="student.clockHistory.length >= 1 &&  student.clockHistory.isAbsent == 'Y'"
                    @click="router.push(`/editTimes/${classIDLong}/${student.studentId}`)"
                    >
                        <ion-col size="12"><span style="color:red;">Absent</span></ion-col>
                    </ion-row>
                    -->
                </ion-col>
            </ion-row>    
        </ion-grid>

        <!-- student.enrollmentStatus not set -->
        <ion-grid v-if="student.enrollmentStatus == undefined || student.enrollmentStatus == null ">
            <ion-row ion-no-padding >
                <ion-col size="2"><div><ion-img
            :src="student.imageURI"             
          ></ion-img></div></ion-col>
                <ion-col size="8" @click="router.push(`/editTimes/${classIDLong}/${student.studentId}`)">
                    <div><span style="font-weight:bold;" >{{student.firstName}} {{student.lastName}} (ID: {{student.studentId}})</span></div>
                    <div v-if="student.isAbsent != 'Y'">
                    <ion-row style="align-content: flex-start;"
                     v-for="time in student.clockHistory" :key="time.studentID"
                    >
                            <ion-col size="5" v-if="student.clockHistory.length > 0">
                                <div>{{this.changeTimeTo12(time.studentClockInDateTime)}}</div>
                            </ion-col>
                            <ion-col size="5" v-if="student.clockHistory.length > 0">
                                <div>{{this.changeTimeTo12(time.studentClockOutDateTime)}}</div>
                            </ion-col>                        
                    </ion-row>
                    </div>
                    <ion-row style="align-content: flex-start;" v-if="student.clockHistory.length == 0 || student.isAbsent == 'Y'"
                    @click="router.push(`/editTimes/${classIDLong}/${student.studentId}`)"
                    >
                        <ion-col size="12"><span style="color:red;">Absent</span></ion-col>
                    </ion-row>
                    <!--
                    <ion-row style="align-content: flex-start;" v-if="student.clockHistory.length >= 1 &&  student.clockHistory.isAbsent == 'Y'"
                    @click="router.push(`/editTimes/${classIDLong}/${student.studentId}`)"
                    >
                        <ion-col size="12"><span style="color:red;">Absent</span></ion-col>
                    </ion-row>
                    -->
                </ion-col>
                <ion-col size="2" v-if="absentIfNoTimeClockEntries == false">
                    <div>
                        <ion-toggle slot="start" :checked="student.isAbsent != 'Y'" @click="this.markAbsent($event,student.studentId)"></ion-toggle>
                        </div>
                </ion-col>
            </ion-row>    
        </ion-grid>

             
        </ion-item> 
    </ion-list>

    <ion-grid>
    <ion-row>
      <ion-col size="12">
          <ion-button expand="block" @click="onSubmit"  style="--background:#ff796a;">
      <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
      Accept
    </ion-button>
      </ion-col></ion-row>
</ion-grid> 
    </base-layout>
</template>
<script>
import { IonList, IonItem, toastController } from '@ionic/vue';
import {
  paperPlaneOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
export default {

    components:{
        IonList, IonItem, 
    },
    
  setup() {
    const router = useRouter();
    return { router };
  },
    data() {
        return {
            classes:[],
            students:[],
            studentList: [],
            currentDate : '',
            msg:'hi',
            userName: '',
            userRole:'',
            userID:'',
            classID:'',
            classIDLong:'',
            ClassTitle:'',
            refreshOutline,
            paperPlaneOutline,            
            classStartTime: "",
            classEndTime: "",
            cuInsClass: {},
            stillLoading: true,
            absentIfNoTimeClockEntries: false,
        }
    },
    methods:{
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
            getTodayDay(){
                var today = new Date();
                var yyyy = today.getFullYear().toString();
                var mm = today.getMonth()+1;
                if(mm<10) { mm = "0" + mm.toString();}
                var dd = today.getDate();
                if(dd<10) { dd = "0" + dd.toString();}
                today.getDate();
                return yyyy+mm+dd;
            },

        getStudents(){
            /*this.students = this.$store.getters.cuClass(this.$route.params.id).students;  
            console.log(this.students);   
            this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.classStartTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classStartTime;
            this.classEndTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classEndTime;
            */
            //var token = this.$store.getters.getToken;
            this.stillLoading = true;
            console.log("class info = "+JSON.stringify(this.$store.getters.cuInsClass(this.$route.params.id)));
            this.classIDLong = this.$route.params.id;
            this.cuInsClass = this.$store.getters.cuInsClass(this.$route.params.id);
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken,                  
                         }
            };

            var url = "/cafeweb/mobileApi/instructor/classClockTimes?"+ 
                        "date=" + this.getTodayDay() +
                        "&semester=" + this.cuInsClass.semester +                
                        "&courseNumber=" + this.cuInsClass.courseNumber + 
                        "&courseSection=" + this.cuInsClass.courseSection + 
                        "&labSection=" + this.cuInsClass.labSection
            fetch(url, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        this.openToastFailed();
                    } else {
                        //this.openToastSuccessful();
                        console.log("studnet list = "+JSON.stringify(data));
                        console.log("class info = "+JSON.stringify(this.$store.getters.cuInsClass(this.$route.params.id)));

                        this.absentIfNoTimeClockEntries = data.absentIfNoTimeClockEntries;
                        
                        this.ClassTitle = this.cuInsClass.title;
                        this.classID = this.cuInsClass.courseNumber;
                        this.classStartTime = this.changeTimeTo12(this.cuInsClass.startDateTime);
                        this.classEndTime = this.changeTimeTo12(this.cuInsClass.endDateTime);
                        this.studentList = this.cleanupStudentData(data);
                        this.$store.commit("addStudentList",data.students);
                        this.stillLoading = false;
                        
                    }
                })
                .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this.openToastFailed();
                this.stillLoading = false;
                }); 
        },

        onSubmit(){
            // post /cafeweb/mobileApi/instructor/studentClockTime
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('/cafeweb/mobileApi/instructor/confirmClassClockTimes?'+            
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay()
                , requestOptions)
                .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);                    
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("accepted all time");
                    this.openToastSuccessful();
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
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
                this.$router.go(-1);
            })
            },
            

            async openToastFailed() {
            const toast = await toastController
                .create({
                message: 'Failed get student list, server error, please try again.',
                position: 'top',
                duration: 1000,
                color: 'danger'
                })
            toast.present();
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

            cleanupStudentData(cuClass){
                var students = cuClass.students;
                if(cuClass.students.length > 0) {
                    for (var i = 0; i < cuClass.students.length; i++){
                             //console.log("i="+i);                            
                            if(cuClass.students[i].clockHistory.length > 0) {
                                for (var j = 0; j < cuClass.students[i].clockHistory.length; j++){
                                    //console.log("j="+j);
                                    if(cuClass.students[i].clockHistory[j].clockId == undefined) {
                                        cuClass.students[i].clockHistory[j]["clockId"] = "";
                                    }
                                    
                                    // setup empty instructor time
                                    if(cuClass.students[i].clockHistory[j].instructorClockInDateTime == undefined) {
                                        cuClass.students[i].clockHistory[j]["instructorClockInDateTime"] = "";
                                    }
                                    if(cuClass.students[i].clockHistory[j].instructorClockOutDateTime == undefined) {
                                        cuClass.students[i].clockHistory[j]["instructorClockOutDateTime"] = "";
                                    }
                                    
                                    // if student clock is empty, set canDel to true
                                    if((cuClass.students[i].clockHistory[j].studentClockInDateTime == undefined && cuClass.students[i].clockHistory[j].studentClockOutDateTime == undefined) ||
                                        (cuClass.students[i].clockHistory[j].studentClockInDateTime == "" && cuClass.students[i].clockHistory[j].studentClockOutDateTime == "") ) {
                                            cuClass.students[i].clockHistory[j]["canDel"] = true;
                                        } else {
                                            cuClass.students[i].clockHistory[j]["canDel"] = false;
                                        }
                                    
                                    // if instructor clock not empty, over write student clock
                                    if(cuClass.students[i].clockHistory[j]["instructorClockInDateTime"] != "") {
                                        cuClass.students[i].clockHistory[j]["studentClockInDateTime"] = cuClass.students[i].clockHistory[j].instructorClockInDateTime;
                                    } 
                                    if(cuClass.students[i].clockHistory[j]["instructorClockOutDateTime"] != "") {
                                        cuClass.students[i].clockHistory[j]["studentClockOutDateTime"] = students[i].clockHistory[j].instructorClockOutDateTime;
                                    } 

                                    // setup isAbsent flag
                                    if(cuClass.students[i].clockHistory[j].isAbsent == undefined) {
                                        cuClass.students[i].clockHistory[j]["isAbsent"] = "";
                                    }                                    
                                    if(cuClass.students[i].clockHistory[j].isAbsent == "Y") {
                                        if(cuClass.students[i].isAbsent == undefined) {
                                            // set isAbsent flag on the outside
                                            cuClass.students[i]["isAbsent"] = "Y";
                                        }
                                        console.log("isAbsent flag got");
                                    }
                                    //console.log("j="+j);   
                            }
                            //console.log("i="+i);
                        } else if (this.absentIfNoTimeClockEntries != true) {
                            //console.log("no clock found")
                            var newClockHistory = {};
                            newClockHistory = {
                                "studentClockInDateTime": this.cuInsClass.startDateTime,
                                "studentClockOutDateTime": this.cuInsClass.endDateTime,
                                "instructorClockInDateTime": this.cuInsClass.startDateTime,
                                "instructorClockOutDateTime": this.cuInsClass.endDateTime,
                            }
                            cuClass.students[i].clockHistory.push(newClockHistory);
                            cuClass.students[i].isAbsent = "";
                        }                   

                        // update student image path
                        if(cuClass.students[i].imageURI == undefined || cuClass.students[i].imageURI == null ) {
                            cuClass.students[i].imageURI = "../../assets/default-avatar.png"; 
                        }
                    }
                } else { console.log('no students found'); }
                console.log("student list after cleanup" + JSON.stringify(cuClass.students));
                return cuClass.students;
            },

            markAbsent(event,id) {
                console.log("student id =" + id);
                console.log("checked =" + event.currentTarget.checked);
                if(event.currentTarget.checked){
                    // mark absent
                    this.submitAddAbsent(id);
                } else {
                    // remove absent
                    this.submitDelAbsent(id);
                }
            },

        submitAddAbsent(id){
            // POST  /cafeweb/mobileApi/instructor/studentAbsent
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            fetch('/cafeweb/mobileApi/instructor/studentAbsent?'+
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + id
                , requestOptions)
                .then(async response => {
                //const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    //const error = (data && data.message) || response.status;
                    this.errorCount++;
                    this.errorAbsent = true;
                    return Promise.reject(response.status);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("mark absent Y");
                    this.errorAbsent = false;
                    this.getStudents();
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                    this.errorAbsent = true;
                });
        },

        // Absent flag is stored in clock hour record with no instructor or student clock in/out hours.
        // remove absent flag to "N"
        submitDelAbsent(id) {
            // DELETE  /cafeweb/mobileApi/instructor/studentAbsent
            var myToken = this.$store.getters.getToken;
            console.log("token is "+myToken);
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': 'Bearer '+ this.$store.getters.getToken}
            };
            
            //var listClockhistory = [];
            var clockId = this.studentList.find((s)=>s.studentId == id).clockHistory.find((s)=>s.isAbsent == "Y").clockId;
            //var clockId = listClockhistory.find((s)=>s.isAbsent == "Y").clockId;

            fetch('/cafeweb/mobileApi/instructor/studentAbsent?'+
                "semester=" + this.cuInsClass.semester + 
                "&courseNumber=" + this.cuInsClass.courseNumber +
                "&courseSection=" + this.cuInsClass.courseSection +
                "&labSection=" + this.cuInsClass.labSection +
                "&date=" + this.getTodayDay() +
                "&studentId=" + id + 
                "&clockId=" + clockId
                , requestOptions)
                .then(async response => {
                //const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    //const error = (data && data.message) || response.status;
                    this.errorCount++;
                    this.errorAbsent = true;
                    return Promise.reject(response.status);
                }
                //console.log("ins classes = " + JSON.stringify(data.classes));
                    console.log("mark absent N");
                    this.errorAbsent = false;
                    this.getStudents();
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                    this.errorCount++;
                    this.errorAbsent = true;
                });
        },

    },
    mounted: function () {
      //update table display onload
      this.getStudents();
      let today = new Date();
      this.currentDate = today.toDateString();
  },
  watch:{
     $route (to,from){
        //this.getStudents();
        if(to.name == "studentList") {
            this.getStudents();
        }
        console.log("studentListPage"+to+from);
    }
  },
    
}
</script>
<style>
ion-toggle {
  --background: red;
  --background-checked: green;
}
</style>