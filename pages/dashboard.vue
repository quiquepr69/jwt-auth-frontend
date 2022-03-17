<template>
  <div class="container-fluid">
    <h1 class="text-center">Welcome to your dashboard {{ user.name }}</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style lang="sass" scoped></style>
