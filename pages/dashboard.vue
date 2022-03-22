<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="h3 text-center mt-3">
          Welcome to your dashboard {{ user.name }}
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="text-center my-3">
        <h2 class="h5">User profile</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4" offset-lg="4" class="name">
        <p class="">Name: {{ user.name }}</p>
      </b-col>
      <b-col class="email" lg="4" offset-lg="4">
        <p>Email: {{ user.email }}</p>
      </b-col>
      <b-col class="email" lg="4" offset-lg="4">
        <p>Date created: {{ user.created_at | moment }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    moment(value) {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  middleware: 'auth',
}
</script>

<style lang="sass" scoped></style>
