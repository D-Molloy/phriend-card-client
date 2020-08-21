<template>
  <div>
    <div v-if="loading">
      <loading-spinner />
    </div>
    <div class="dashboard" align="center" v-else>
      <div v-if="activeTab === 'overview'" class="view_container">
        <!-- <user-overview v-if="user.showScoreAverage" /> -->
        <user-overview v-if="user.shows.length > 0" :user="user" />
        <greeting-message v-else />
      </div>
      <div v-if="activeTab === 'shows'" class="view_container">
        <shows-overview
          :toggleRemoveShowDialog="toggleRemoveShowDialog"
          :bestScore="user.showBest.rating.toFixed(3)"
          :worstScore="user.showWorst.rating.toFixed(3)"
          :shows="user.shows"
        />
        <div class="nav_signout">
          <v-dialog v-model="removeShowDialog" width="350">
            <v-card>
              <v-card-title class="dialog_title justify-center">
                Remove this show?
              </v-card-title>
              <v-divider></v-divider>
              <p class="text-center font_md">{{ removeShowInfo.venue }}</p>
              <p class="text-center font_heading">
                {{ removeShowInfo.day }}, {{ removeShowInfo.date }}
              </p>
              <v-card-actions class="justify-center">
                <v-btn color="error" @click="removeShow">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div v-if="activeTab === 'venues'" class="view_container">
        <venues-overview :venues="user.venueSummary || []" />
      </div>
      <div v-if="activeTab === 'songs'" class="view_container">
        <songs-overview
          :songs="user.songFrequency"
          :total-songs-heard="user.totalSongsHeard"
        />
      </div>
    </div>
    <!-- NEW SHOW FORM -->
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          class="add-show-fab"
          fab
          dark
          v-bind="attrs"
          v-on="on"
          @click="resetSheet"
          :disabled="loading"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-sheet class="text-center" height="300px">
        <p class="font_title_light font_shadow_red font_lg pt-3">
          Add a Show
        </p>
        <v-container>
          <v-row no-gutters class="d-flex justify-space-around">
            <v-col cols="4">
              <!-- <div class="input_form"> -->
              <v-select
                :items="dates.years"
                label="Year"
                v-model="newShow.year"
                :error-messages="errors.year"
                class="font_heading"
                solo
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="dates.months"
                label="Month"
                v-model="newShow.month"
                :error-messages="errors.month"
                solo
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="dates.days"
                label="Day"
                v-model="newShow.day"
                :error-messages="errors.day"
                solo
              />
            </v-col>

            <!-- </div> -->
          </v-row>
          <p class="pb-2 font_heading red--text" v-show="errors.message">
            {{ errors.message }}
          </p>
          <v-btn
            color="success"
            large
            @click="addNewShow"
            :disabled="
              !newShow.year || !newShow.month || !newShow.day || loading
            "
          >
            Add Show
          </v-btn>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
    <!-- <credit-footer /> -->
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UserOverview from "@/components/UserOverview.vue";
import SongsOverview from "@/components/SongsOverview.vue";
import ShowsOverview from "@/components/ShowsOverview.vue";
import VenuesOverview from "@/components/VenuesOverview.vue";
import GreetingMessage from "@/components/GreetingMessage.vue";
// import CreditFooter from "@/components/CreditFooter.vue";

import dates from "../utils/dates.js";

export default {
  name: "dashboard",
  components: {
    "loading-spinner": LoadingSpinner,
    "greeting-message": GreetingMessage,
    "user-overview": UserOverview,
    "songs-overview": SongsOverview,
    "shows-overview": ShowsOverview,
    "venues-overview": VenuesOverview
    // "credit-footer": CreditFooter
  },
  data: () => ({
    dates: dates,
    sheet: false,
    removeShowDialog: false,
    removeShowInfo: {
      venue: "",
      date: "",
      day: "",
      _id: ""
    }
  }),
  computed: {
    newShow: {
      get() {
        return this.$store.state.addShowForm;
      },
      set(value) {
        this.$store.commit("updateAddShowForm", value);
      }
    },
    activeTab() {
      return this.$store.getters.getActiveTab;
    },
    loading() {
      return this.$store.getters.getLoadingState;
    },
    user() {
      return this.$store.getters.getUser;
    },
    token() {
      return this.$store.getters.getUserToken;
    },
    errors() {
      return this.$store.getters.getDashboardErrors;
    }
  },
  mounted() {
    const token = localStorage.getItem("phriendToken");
    const phriendData = JSON.parse(localStorage.getItem("phriendData"));
    if (!token) {
      localStorage.removeItem("phriendData");
      localStorage.removeItem("phriendToken");
      return this.$router.push("/");
    }
    this.$store.commit("setToken", token);
    if (phriendData) {
      this.$store.commit("setUser", phriendData);
      this.$store.commit("setLoadingFalse");
    } else {
      this.$store.dispatch("getUserInfo");
      this.$store.commit("setLoadingFalse");
    }
  },
  methods: {
    addNewShow() {
      this.$store.dispatch("addNewShow");
    },
    toggleRemoveShowDialog({ venue, date, day, _id }) {
      this.removeShowInfo = { venue, date, day, _id };
      this.removeShowDialog = true;
    },
    removeShow() {
      this.$store.dispatch("removeShow", this.removeShowInfo._id);
      this.removeShowDialog = false;
      this.removeShowInfo.venue = "";
      this.removeShowInfo.date = "";
      this.removeShowInfo.day = "";
      this.removeShowInfo._id = "";
    },
    resetSheet() {
      this.$store.commit("clearDashboardErrors");
      this.$store.commit("resetAddShowForm");
    }
  }
};
</script>
<style>
.view_container {
  padding-top: 8vh;
}
.card {
  border: 1px solid black;
  max-width: 90%;
}

.add-show-fab {
  position: fixed;
  bottom: 3%;
  right: 2%;
}

.input_form {
  display: flex;
}

@media only screen and (max-width: 775px) {
  .nav_tabs {
    height: 10vh;
  }
  #site_id {
    flex: 0 0 100%;
  }
  .nav_signout {
    /* padding: 0 5px; */
    width: 35px;
  }
  .view_container {
    padding-top: 10vh;
  }
}
</style>
