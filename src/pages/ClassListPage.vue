<template>
  <base-layout page-title="Class Schedule" page-default-back-link="login">
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Class Schedule</h4>-->
          <ion-spinner
            color="primary"
            v-if="stillLoading == true"
          ></ion-spinner>
          <h2 style="font-weight: bold">{{ userName }}</h2>
          <h3 style="font-size:14px">ID: {{ userID }}</h3>
          <h2 style="margin: 0px; margin-top: 10px">Today</h2>
          <h2 style="margin: 0px; margin-top: 0px; font-weight: bold">
            {{ currentTime }}
          </h2>
          <h2 style="margin: 0px; margin-top: 0px; font-weight: bold">
            {{ currentDate }}
          </h2>
          <h2
            style="
              margin: 0px;
              margin-top: 10px;
              font-weight: bold;
              padding-bottom: 10px;
              color: red;
            "
            v-if="!hasClass"
          >
            No class found
          </h2>
        </ion-col>
      </ion-row>
    </ion-grid>

    <!-------------------------------------->
    <!-- 
<ion-grid v-if="isStudent == true">
  <ion-row
    v-for="cuClass in classes"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/submitTime/${cuClass.classID}`)"
  >
  <ion-col size="8" style="text-align: left;">  
        <ion-text>
          <h3 style="margin:0px;" >{{ cuClass.ClassTitle }}</h3>
        </ion-text>
      </ion-col><ion-col size="4" style="text-align: right;"> 
        <ion-text style="text-align: right">
          <h3 style="margin:0px;" >{{ cuClass.classStartTime }}</h3>
        </ion-text></ion-col>
  </ion-row>
</ion-grid>  
-->
    <!------------------------------------
<ion-grid v-if="isStudent == true">
  <ion-row style="background:#54595f;"
    v-for="cuClass in classes"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/submitTime/${cuClass.classID}`)"
  >
        <ion-text style="margin: 5px 0px;">          
          <span>{{ cuClass.classStartTime }}</span><br/>
          <span>{{ cuClass.ClassTitle }} </span>  
          <span> ( {{ cuClass.classID }} )</span>
        </ion-text>
      
  </ion-row>
</ion-grid> 
-->
    <ion-grid v-if="isStudent == true">
      <div v-for="cuClass in studentClasses" :key="cuClass.id">
        <!-- lunch  -->
        <ion-row
          style="background: #a2a2a2; margin: 15px 10px"
          v-if="cuClass.courseNumber == undefined"
          class="course-block"
        >
          <ion-text style="margin: 0px 5px 5px 5px">
            <span style="font-size: 12px">{{
              changeTimeTo12(cuClass.start)
            }}</span
            ><br />
            <span>{{ cuClass.title }}</span>
          </ion-text>
        </ion-row>

        <!-- activeForClockInOut != Y, disable class -->
        <ion-row
          style="background: #727272; margin: 15px 10px"
          v-if="
            cuClass.activeForClockInOut != 'Y' &&
            cuClass.courseNumber != undefined
          "
          class="course-block"
          @click="router.push(`/submitTime/${cuClass.courseNumber}`)"
        >
          <ion-col size="6" style="float: left; font-size: 12px">
            {{ changeTimeTo12(cuClass.start) }}
          </ion-col>
          <ion-col size="6" style="float: right; font-size: 12px">
            <span
              v-if="cuClass.clockHistory.length > 0 && cuClass.isAbsent != 'Y'"
              style="float: right; font-size: 12px"
            >
              <span
                >{{
                  changeTimeTo12(
                    cuClass.clockHistory[cuClass.clockHistory.length - 1]
                      .studentClockInDateTime
                  )
                }}
                -
              </span>
              <span>{{
                changeTimeTo12(
                  cuClass.clockHistory[cuClass.clockHistory.length - 1]
                    .studentClockOutDateTime
                )
              }}</span>
            </span>
            <span
              v-if="cuClass.isAbsent == 'Y'"
              style="float: right; font-size: 12px; color: #f67d7d"
            >
              Absent
            </span>
          </ion-col>

          <ion-text style="margin: 0px 5px 5px 5px">
            <span>{{ cuClass.title }} </span>
            <span> ( {{ cuClass.courseNumber }} )</span>
          </ion-text>
        </ion-row>
        <!--
    <ion-row style="background:#517FC8;margin:15px 10px;"   v-if="cuClass.activeForClockInOut=='Y'"   
    -->
        <!-- activeForClockInOut == Y , enable class -->
        <ion-row
          style="background: #517fc8; margin: 15px 10px"
          v-if="
            cuClass.activeForClockInOut == 'Y' &&
            cuClass.courseNumber != undefined
          "
          class="course-block"
          @click="router.push(`/submitTime/${cuClass.courseNumber}`)"
        >
          <ion-col size="6" style="float: left; font-size: 12px">
            {{ changeTimeTo12(cuClass.start) }}
          </ion-col>
          <ion-col size="6" style="float: right; font-size: 12px">
            <span
              v-if="cuClass.clockHistory.length > 0 && cuClass.isAbsent != 'Y'"
              style="float: right; font-size: 12px"
            >
              <span
                >{{
                  changeTimeTo12(
                    cuClass.clockHistory[cuClass.clockHistory.length - 1]
                      .studentClockInDateTime
                  )
                }}
                -
              </span>
              <span>{{
                changeTimeTo12(
                  cuClass.clockHistory[cuClass.clockHistory.length - 1]
                    .studentClockOutDateTime
                )
              }}</span>
            </span>
            <span
              v-if="cuClass.isAbsent == 'Y'"
              style="float: right; font-size: 12px; color: #f67d7d"
            >
              Absent
            </span>
          </ion-col>

          <ion-text style="margin: 0px 5px 5px 5px">
            <span style="width: 100%"
              >{{ cuClass.title }} ( {{ cuClass.courseNumber }} )</span
            >
            <!--<br/><span>{{cuClass.activeForClockInOut}}</span>-->
          </ion-text>
        </ion-row>
      </div>
    </ion-grid>

    <!-------------------------------------->
    <ion-grid v-if="isStudent != true">
      <ion-row
        style="background: #517fc8; margin: 15px 10px"
        v-for="cuInsClass in instructorClasses"
        :key="cuInsClass.courseNumber"
        class="course-block"
        @click="
          router.push(
            `/studentList/${
              cuInsClass.semester +
              '-' +
              cuInsClass.courseNumber +
              '-' +
              cuInsClass.courseSection +
              '-' +
              cuInsClass.labSection
            }`
          )
        "
      >
        <ion-col size="11">
          <ion-text style="margin: 5px 0px">
            <span style="font-size: 12px">{{
              changeTimeTo12(cuInsClass.startDateTime)
            }}</span
            ><br />
            <span>{{ cuInsClass.title }}</span>
            <span> ( {{ cuInsClass.courseNumber }} )</span>
          </ion-text>
        </ion-col>
        <ion-col size="1">
          <span v-if="cuInsClass.hasIncompleteAttendance != true">
            <ion-icon
              :icon="checkmarkCircleOutline"
              style="font-size: 25px; padding-top: 3px"
            ></ion-icon
          ></span>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!-------------------------------------->

    <!-------------------------------------->
    <ion-button @click="getToken" v-if="1 == 0">
      <ion-icon
        slot="start"
        :icon="gitCompareOutline"
        @click="getToken"
      ></ion-icon>
      <span v-if="isStudent == true">getToken</span>
      <span v-if="isStudent != true">getToken</span>
    </ion-button>
  </base-layout>
</template>
<script>
//import { IonIcon } from "@ionic/vue";
//import {  IonRefresher, IonRefresherContent } from '@ionic/vue';

import {
  chevronForward,
  lockClosedOutline,
  refreshOutline,
  gitCompareOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    //IonIcon,
  },
  data() {
    return {
      checkmarkCircleOutline,
      classes: [],
      studentClasses: [],
      instructorClasses: [],
      currentDate: "",
      currentTime: "",
      chevronForward,
      lockClosedOutline,
      refreshOutline,
      gitCompareOutline,
      msg: "hi",
      userName: "",
      firstName: "",
      lastName: "",
      userRole: "",
      userID: "",
      isStudent: this.$store.getters.getIsStudent,
      isInstructor: this.$store.getters.getIsInstructor,
      hasClass: false,
      stillLoading: true,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      var hours = today.getHours();
      var minutes = today.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      today =
        mm +
        "/" +
        dd +
        "/" +
        yyyy +
        " -- " +
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      return today;
    },

    getTodayDay() {
      var today = new Date();
      var yyyy = today.getFullYear().toString();
      var mm = today.getMonth() + 1;
      if (mm < 10) {
        mm = "0" + mm.toString();
      }
      var dd = today.getDate();
      if (dd < 10) {
        dd = "0" + dd.toString();
      }
      today.getDate();
      return yyyy + mm + dd;
    },

    getCurrentTime() {
      let time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      time = hours + ":" + minutes + " " + ampm;
      console.log("current time is " + time.toString());
      this.currentTime = time;
    },

    getClass() {
      this.classes = [];
      this.userRole = "";
      this.userName = "";
      this.userID = "";

      fetch("https://flexcode.org/classes.json")
        .then((response) => response.json())
        .then((data) => {
          this.classes = data.classes;
          this.userRole = data.role;
          this.userName = data.name;
          this.userID = data.id;
          this.$store.commit("addUserID", data.id);
          //this.$store.commit("addClasses",data.classes);
        });
      console.log("got data");
      this.getRole();
      //this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
      //this.$store.commit("addUserID", this.userID?this.userID:"123");
    },

    updateTime() {
      setInterval(() => {
        this.getCurrentTime();
      }, 60000);
    },

    switchRole() {
      this.isStudent = !this.isStudent;
      var myToken = this.$store.getters.getToken;
      console.log("token is " + myToken);
      this.getRole();
    },

    // show token in console
    loadToken() {
      var token = localStorage.getItem("token");
      console.log("token in localstorage " + token);
    },

    // save token to localstorage
    createStorage() {
      //var currStorage = window.localStorage;
      localStorage.setItem("token", this.$store.getters.getToken);
      console.log("token saved to localstorage");
    },

    // check if got token,
    // if got token,
    // ask server for token, and save to localstorage
    // if has token, goto getRole()
    // if no token, goto /cafeweb/mobile/
    getToken() {
      // get token from local storage
      var token = localStorage.getItem("token");

      // if has token, check using whoami api, if work run getRole, else to login page
      if (token != null) {
        console.log("getToken, token is not null - " + token);
        const requestOptions1 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        fetch("/cafeweb/mobileApi/authenticate/whoAmI", requestOptions1)
          .then(async (response) => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            // got token, try run get row
            console.log("getToken, token good -" + token);
            this.getRole();
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error! not login - ", error);
            //this.$router.push("/login");
            // failed get authenticate, kick to login
            localStorage.removeItem("token");
            window.location.href = "/cafeweb/mobile/";
          });
      }
      // if no token, use token api get one, then call getRole, on error goto login
      else {
        console.log("getToken, token is null - " + token + ".");
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
          //body: JSON.stringify({"username":this.userInfo.username,"password":this.userInfo.password})
          //body: JSON.stringify({"username":"instructor2","password":"instructor2"})
          //body: JSON.stringify({"username":"student2","password":"student2"})
          //body: JSON.stringify({"username":"student3","password":"student3"})
        };
        fetch("/cafeweb/mobileApi/authenticate/token", requestOptions)
          .then(async (response) => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            //console.log(data.token);
            this.$store.commit("addToken", data.token);
            //this.$store.commit("addSchool",this.school);
            console.log("saved to state " + this.$store.getters.getToken);
            //console.log('school = ' + this.$store.getters.getSchool);
            //this.createStorage();
            localStorage.setItem("token", data.token);
            //this.$router.push('/classList');
            //this.postId = data.id;
            //this.getClasses();

            // got token, try run get row
            console.log("getToken, got token, run getRole - " + data.token);
            this.getRole();
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
            this.loginError = true;
            // failed get authenticate, kick to login
            localStorage.removeItem("token");
            window.location.href = "/cafeweb/mobile/";
          });
      }
    },

    getRole() {
      this.stillLoading = true;

      //var token = this.$store.getters.getToken;
      var token = localStorage.getItem("token");
      console.log("getRole, got token - " + token);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetch("/cafeweb/mobileApi/authenticate/whoAmI", requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("isInstructor = " + data.isInstructor);
          console.log("isStudent = " + data.isStudent);
          //this.userName = data.firstName + " " + data.lastName;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.userID = data.userId;
          this.isStudent = data.isStudent;
          this.isInstructor = data.isInstructor;
          this.$store.commit(
            "addUserName",
            data.firstName + " " + data.lastName
          );

          if (data.isInstructor == false && data.isStudent == true) {
            this.getStudentClasses();
          } else if (data.isInstructor == true && data.isStudent == false) {
            this.getInstructorClasses();
          } else if (data.isInstructor == true && data.isStudent == true) {
            this.getStudentClasses();
            this.getInstructorClasses();
          }

          let stateObj = { id: "100" };
          window.history.replaceState(stateObj, "Attendance", "/");
          //this.postId = data.id;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error! not login - ", error);
          //this.$router.push("/login");
          // failed get authenticate, kick to login
          localStorage.removeItem("token");
          window.location.href = "/cafeweb/mobile/";
        });
    },

    // build student's class list
    getStudentClasses() {
      var myToken = localStorage.getItem("token");
      console.log("getRole, got token - " + myToken);

      //if(myToken == null || myToken ==""){
      //// goto new login page
      //window.location.href = "/cafeweb/mobile/";
      //}

      console.log("token is " + myToken);
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myToken,
        },
      };
      fetch("/cafeweb/mobileApi/student/schedule?dateFilter=D", requestOptions)
        //fetch('/cafeweb/mobileApi/student/schedule', requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("classes = " + JSON.stringify(data));
          //console.log("classes = " + JSON.stringify(data.classes[0].startDateTime));
          this.studentClasses = [];
          this.studentClasses = this.cleanupStudentClassListData(data.events);
          console.log("new classes = " + JSON.stringify(this.studentClasses));
          this.$store.commit("addClasses", this.studentClasses);

          //console.log("class count = "+ this.studentClasses.length);
          if (this.studentClasses.length >= 1) {
            this.hasClass = true;
          } else {
            this.hasClass = false;
          }

          this.userName = this.$store.getters.getUserName;

          this.stillLoading = false;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
          //this.$router.push('/login');
          this.stillLoading = false;

          // goto new login page
          localStorage.removeItem("token");
          window.location.href = "/cafeweb/mobile/";
        });
    },

    // asking token from server
    requestToken() {
      var myToken = this.$store.getters.getToken;
      console.log("token is " + myToken + ".");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      fetch("/cafeweb/mobileApi/authenticate/token", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          console.log("token = " + JSON.stringify(data.token));

          localStorage.setItem("token", data.token);
          this.$store.commit("addToken", data.token);
          console.log("write token to localStorage, and save to store");
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },

    // build instructor's class list
    getInstructorClasses() {
      ///cafeweb/mobileApi/instructor/classes
      //var myToken = this.$store.getters.getToken;
      var myToken = localStorage.getItem("token");
      console.log("token is " + myToken);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myToken,
        },
      };
      fetch(
        "/cafeweb/mobileApi/instructor/classes?date=" + this.getTodayDay(),
        requestOptions
      )
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("ins classes = " + JSON.stringify(data.classes));
          this.instructorClasses = [];
          this.instructorClasses = data.classes;
          this.$store.commit("addInsClasses", data.classes);
          console.log(
            "instructor has class = " +
              this.instructorClasses.length +
              this.isStudent
          );
          if (this.instructorClasses.length > 0) {
            this.hasClass = true;
          } else {
            this.hasClass = false;
          }
          this.userName = this.$store.getters.getUserName;
          this.stillLoading = false;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
          //this.$router.push('/login');
          this.stillLoading = false;

          localStorage.removeItem("token");
          // goto new login page
          window.location.href = "/cafeweb/mobile/";
        });
    },

    // remove date, time only
    cleanupTime(classes) {
      if (classes.length >= 1) {
        for (var i = 0; i < classes.length; i++) {
          classes[i].startDateTime = this.changeTimeTo12(
            classes[i].startDateTime
          );
          classes[i].endDateTime = this.changeTimeTo12(classes[i].endDateTime);
        }
      }

      return classes;
    },

    // change to 12hr AMPM
    changeTimeTo12(time) {
      if (time == null || time == undefined || time == "") {
        return "";
      } else {
        var hh = time.split("T")[1].split(":")[0];
        var mm = time.split("T")[1].split(":")[1];
        var AMPM = " AM";
        if (hh[0] == "0") {
          AMPM = " AM";
          hh = hh[1];
        } else if (hh <= 11) {
          AMPM = " AM";
        } else if (hh == 12) {
          AMPM = " PM";
        } else if (hh > 12) {
          AMPM = " PM";
          hh -= 12;
        }

        //console.log(hh+":"+mm+AMPM);
        return hh + ":" + mm + AMPM;
      }
    },

    // cleanup student  class list data, fill place holder with ""
    cleanupStudentClassListData(list) {
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (
            list[i].clockHistory != undefined &&
            list[i].clockHistory.length > 0
          ) {
            list[i]["isAbsent"] = ""; // add isAbsent flag
            for (var j = 0; j < list[i].clockHistory.length; j++) {
              if (
                list[i].clockHistory[j].isAbsent != undefined &&
                list[i].clockHistory[j].isAbsent == "Y"
              ) {
                list[i]["isAbsent"] = "Y"; // set isAbsent to true if there is one in array
              }

              // build empty student in and out time holder
              if (list[i].clockHistory[j].studentClockInDateTime == undefined) {
                list[i].clockHistory[j]["studentClockInDateTime"] = "";
              }
              if (
                list[i].clockHistory[j].studentClockOutDateTime == undefined
              ) {
                list[i].clockHistory[j]["studentClockOutDateTime"] = "";
              }

              //copy instructor time into student time
              if (
                list[i].clockHistory[j].instructorClockInDateTime !=
                  undefined &&
                list[i].clockHistory[j].instructorClockInDateTime != ""
              ) {
                list[i].clockHistory[j].studentClockInDateTime =
                  list[i].clockHistory[j].instructorClockInDateTime;
              } else {
                list[i].clockHistory[j]["instructorClockInDateTime"] = "";
              }
              if (
                list[i].clockHistory[j].instructorClockOutDateTime !=
                  undefined &&
                list[i].clockHistory[j].instructorClockOutDateTime != ""
              ) {
                list[i].clockHistory[j].studentClockOutDateTime =
                  list[i].clockHistory[j].instructorClockOutDateTime;
              } else {
                list[i].clockHistory[j]["instructorClockOutDateTime"] = "";
              }
            }
          }
        }
      }
      return list;
    },
  },
  mounted: function () {
    // check user token
    // if work getRole
    // else push to login
    // get role
    //this.getRole();
    this.getToken();

    //update table display onload
    //this.getClass();
    let today = new Date();
    this.currentDate = today.toDateString();
    this.getCurrentTime();
    this.updateTime();
    console.log("today is = " + this.currentDate);
    console.log("classlistpage mounted");

    var token = localStorage.getItem("token");
    console.log("localstorage token=" + token);
  },
  computed: {
    loadUserID() {
      //return this.$store.getters.memories;
      //return this.$store.getters.cuClass('154');
      //return this.$store.state.userID;
      //console.log(this.$store.state.tesmpClasses);
      console.log(this.$store.state.classes);
      return this.$store.state.classes.legnth;
    },
  },
  beforeMount: function () {
    console.log("classlistpage beforeMount");
  },
  Created: function () {
    console.log("classlistpage Created");
    //this.$root.$refs.ClassListPage = this;
  },
  Updated: function () {
    console.log("classlistpage Updated");
  },
  onUpdated: function () {
    console.log("onUpdated Updated");
  },
  watch: {
    $route(to, from) {
      if (to.name == "classList") {
        //console.log("in watch, isStudent="+this.isStudent +", isInstructor="+this.isInstructor);
        //if(this.isStudent) {this.getStudentClasses();}
        //else if(this.isInstructor) {this.getInstructorClasses();}
        //else {
        this.getToken();
        //}
      }
      console.log("classlistpage" + to + from);
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
.course-block {
  display: flex;
  background-color: #3880ff;
  color: white;
  border-radius: 5px;
  padding: 0px 10px;
  margin-bottom: 10px;
}
</style>