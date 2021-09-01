<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="pageDefaultBackLink == '/cafeweb/mobile/classList' || pageDefaultBackLink == '/cafeweb/mobile/studentList'">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="start" v-if="pageDefaultBackLink == '/cafeweb/mobile/login'">
          <!--<ion-button id="changeText" @click="() => router.push('/login')">-->
            <ion-button id="changeText" @click="logout()">
            <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
        <ion-buttons slot="end" v-if="pageDefaultBackLink == '/cafeweb/mobile/login'">
          <ion-button id="changeText" @click="reload()">
            <ion-icon slot="end" :icon="refreshOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" v-if="pageDefaultBackLink == '/cafeweb/mobile/classList' && pageTitle != 'Student Attendance'">
          <ion-button id="changeText" @click="reloadStident()">
            <ion-icon slot="end" :icon="refreshOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" v-if="pageDefaultBackLink != '/cafeweb/mobile/login' && pageDefaultBackLink != '/cafeweb/mobile/classList' ">
          <ion-button id="changeText" >
            <span> </span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons
} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import {
  lockClosedOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      lockClosedOutline,
      refreshOutline,
    };
  },    
  setup() {
    const router = useRouter();
    return { router };
  },
  methods:{
    reload() {
      this.$parent.getRole();
    },
    reloadStident() {
      this.$parent.getStudents();
    },
    logout() {
      this.$store.commit("addToken","");
      this.$store.commit("addStudent", false);
      this.$store.commit("addInstructor", false);

      //this.$store.commit("addSchool",this.school);
      console.log("delete token -"+this.$store.getters.getToken+"-.");
      this.router.push('/cafeweb/mobile/login')
    }
  },
};
</script>