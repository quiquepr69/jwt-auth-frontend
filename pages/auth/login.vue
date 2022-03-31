<template>
  <div class="container">
    <section class="">
      <div class="mask d-flex align-items-center mt-4">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card gradient-custom-3 reg-card-body">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Login</h2>
                  <form @submit.prevent="login">
                    <div class="form-outline mb-4">
                      <label class="form-label w-100 text-center" for="userEmail"
                        >Your Email</label
                      >
                      <input
                        id="userEmail"
                        v-model="form.email"
                        :class="{ 'is-invalid': errors.email }"
                        type="email"
                        class="form-control form-control-lg"
                      />
                      <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email[0] }}
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label w-100 text-center" for="userPassword1"
                        >Password</label
                      >
                      <input
                        id="userPassword1"
                        v-model="form.password"
                        :class="{ 'is-invalid': errors.password }"
                        type="password"
                        class="form-control form-control-lg"
                      />
                      <div v-if="errors.password" class="invalid-feedback">
                        {{ errors.password[0] }}
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        type="submit"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      await this.$auth
        .login({ data: this.form })
        .then((response) => {
          this.$router.push(
            this.$route.query.redirect
              ? this.$route.query.redirect
              : '/dashboard'
          )
        })
        // eslint-disable-next-line node/handle-callback-err
        .catch((error) => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.reg-card-body {
  border-radius: 15px;
}
.gradient-custom-3 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );
}
.gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );
}
</style>
