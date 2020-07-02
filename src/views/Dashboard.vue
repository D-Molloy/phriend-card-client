<template>
  <div>
    <div v-if="loading">
      <loading-spinner />
    </div>
    <div class="dashboard" align="center" v-else>
      <!-- Start Nav -->
      <div class="nav_tabs" v-if="user.showScoreAverage">
        <div id="site_id">
          <h5 class="font_shadow_red">PhriendScore</h5>
        </div>
        <div
          :class="['nav_item', activeTab === 'overview' ? 'nav_active' : '']"
          @click="activeTab = 'overview'"
        >
          <span>Overview</span>
        </div>
        <div
          :class="['nav_item', activeTab === 'shows' ? 'nav_active' : '']"
          @click="activeTab = 'shows'"
        >
          <span>Shows</span>
        </div>
        <div
          :class="['nav_item', activeTab === 'songs' ? 'nav_active' : '']"
          @click="activeTab = 'songs'"
        >
          <span>Songs</span>
        </div>
        <div
          :class="['nav_item', activeTab === 'venues' ? 'nav_active' : '']"
          @click="activeTab = 'venues'"
        >
          <span>Venues</span>
        </div>

        <div class="nav_signout">
          <v-dialog v-model="dialog" width="300">
            <template v-slot:activator="{ on, attrs }">
              <span>
                <v-icon dark v-bind="attrs" v-on="on">mdi-power</v-icon>
              </span>
            </template>

            <v-card>
              <v-card-title class="dialog_title justify-center">
                Would you like to logout?
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="justify-center">
                <v-btn color="error" @click="logout">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <!-- END NAV -->
      <div v-if="activeTab === 'overview'" class="view_container">
        <template v-if="user.showScoreAverage">
          <user-overview :user="user" />
        </template>
        <template v-else>
          <p class="font_lg text-center">
            Press the green button to get started!
          </p>
        </template>
      </div>
      <div v-if="activeTab === 'shows'" class="view_container">
        <shows-overview
          :bestScore="user.showBest.rating.toFixed(3)"
          :worstScore="user.showWorst.rating.toFixed(3)"
          :shows="user.shows || []"
        />
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
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-sheet class="text-center" height="300px">
        <p class="font_title_light font_shadow_red font_lg pt-3">
          Add a new show
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
            :disabled="!newShow.year || !newShow.month || !newShow.day"
          >
            Add Show
          </v-btn>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<style>
.nav_tabs {
  height: 8vh;
  position: fixed;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
}

#site_id {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: var(--blue);
  width: 100%;
}
#site_id > h5 {
  font-family: var(--font-title);
  color: white;
  font-size: 1.4em;
  margin: 0 10px;
  letter-spacing: 5px;
}

.nav_item {
  font-family: var(--font-primary);
  background-color: var(--blue);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;
}

.nav_item:hover,
.nav_active {
  background-color: var(--red);
}

.nav_signout {
  /* padding: 0 5px; */
  width: 55px;
  background-color: var(--blue);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.dialog_title {
  font-family: var(--font-title);
  background-color: var(--blue);
  color: white;
  text-shadow: 1px 1px 2px var(--red);
}

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

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UserOverview from "@/components/UserOverview.vue";
import SongsOverview from "@/components/SongsOverview.vue";
import ShowsOverview from "@/components/ShowsOverview.vue";
import VenuesOverview from "@/components/VenuesOverview.vue";

import API from "../utils/API.js";
import dates from "../utils/dates.js";

const initialNewShow = {
  year: "",
  month: "",
  day: ""
};
export default {
  name: "dashboard",
  components: {
    "loading-spinner": LoadingSpinner,
    "user-overview": UserOverview,
    "songs-overview": SongsOverview,
    "shows-overview": ShowsOverview,
    "venues-overview": VenuesOverview
  },
  data: () => ({
    user: {},
    token: "",
    errors: {},
    loading: true,
    dates: dates,
    activeTab: "overview",
    newShow: initialNewShow,
    sheet: false,
    dialog: false
  }),
  mounted() {
    const token = localStorage.getItem("phriendToken");
    const phriendData = JSON.parse(localStorage.getItem("phriendData"));

    if (!token) {
      localStorage.clear();
      return this.$router.push("/");
    }
    this.token = token;
    if (phriendData) {
      this.user = phriendData;
      this.loading = false;
    } else {
      API.getUserInfo(this.token)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
          this.loading = false;
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  methods: {
    addNewShow() {
      this.loading = true;
      this.errors = {};
      API.addNewShow(this.token, this.newShow)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
          this.loading = false;
        })
        .catch(err => {
          // console.log("err.response", err.response);
          if (err.response.status === 403) {
            localStorage.clear();
            return this.$router.push("/");
          }
          // TODO: check bad dates
          this.errors = err.response.data;
          this.loading = false;
        });
    },
    resetSheet() {
      this.errors.message = "";
      this.newShow.year = "";
      this.newShow.month = "";
      this.newShow.day = "";
    },
    logout() {
      localStorage.clear();
      return this.$router.push("/");
    }
  }
};
</script>
