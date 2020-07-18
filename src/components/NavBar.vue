<template>
  <div class="nav_tabs" v-if="user.showScoreAverage">
    <div id="site_id">
      <h5 class="font_shadow_red">PhriendScore</h5>
    </div>

    <div class="nav_items" v-if="!loading && user.showScoreAverage">
      <div
        :class="['nav_item', activeTab === 'overview' ? 'nav_active' : '']"
        @click="setActiveTab('overview')"
      >
        <span>Overview</span>
      </div>
      <div
        :class="['nav_item', activeTab === 'shows' ? 'nav_active' : '']"
        @click="setActiveTab('shows')"
      >
        <span>Shows</span>
      </div>
      <div
        :class="['nav_item', activeTab === 'songs' ? 'nav_active' : '']"
        @click="setActiveTab('songs')"
      >
        <span>Songs</span>
      </div>
      <div
        :class="['nav_item', activeTab === 'venues' ? 'nav_active' : '']"
        @click="setActiveTab('venues')"
      >
        <span>Venues</span>
      </div>
      <div class="nav_signout">
        <v-dialog v-model="logOffDialog" width="300">
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
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data: () => ({ logOffDialog: false }),
  computed: {
    activeTab() {
      return this.$store.getters.getActiveTab;
    },
    user() {
      return this.$store.getters.getUser;
    },
    loading() {
      return this.$store.getters.getLoadingState;
    }
  },
  methods: {
    setActiveTab(tab) {
      this.$store.commit("setActiveTab", tab);
    },
    logout() {
      this.logOffDialog = false;
      this.$store.commit("clearUser");
      localStorage.removeItem("phriendData");
      localStorage.removeItem("phriendToken");
      return this.$router.push("/");
    }
  }
};
</script>
<style scoped>
#site_id {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--blue);
}
#site_id > h5 {
  font-family: var(--font-title);
  color: white;
  font-size: 1.4em;
  margin: 0 10px 0 15px;
  letter-spacing: 5px;
}

.nav_items {
  display: flex;
  flex: 4;
}
.nav_tabs {
  height: 8vh;
  position: fixed;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
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
@media only screen and (max-width: 775px) {
  .nav_tabs {
    height: 10vh;
  }
  #site_id {
    justify-content: center;
    flex: 0 0 100%;
  }
  .nav_signout {
    width: 35px;
  }
}
</style>
