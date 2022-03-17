<template>
  <div class="container-fluid">
    <b-navbar toggleable="lg" type="light" variant="light">
      <nuxt-link class="navbar-brand" to="/">JWT Project</nuxt-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="authenticated">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
            </li>
            <li>
              <nuxt-link class="nav-link" to="/movies/trending"
                >Trending Movies</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/movies/popular"
                >Popular Movies</nuxt-link
              >
            </li>
          </template>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <template v-if="authenticated">
              <b-nav-item-dropdown>
                <template slot="button-content">
                  {{ user.name }}
                </template>
                <b-dropdown-item @click.prevent="logout">
                  logout
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
            <template v-else>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/auth/login">Login</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/auth/register"
                  >Register</nuxt-link
                >
              </li>
            </template>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="less" scoped></style>
