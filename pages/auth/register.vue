<template>
  <div class="container">
    <section class="">
      <div class="mask d-flex align-items-center mt-4">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card gradient-custom-3 reg-card-body">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form @submit.prevent="register">
                    <div class="form-outline mb-4">
                      <label class="form-label w-100 text-center" for="userName">Your Name</label>
                      <input
                        id="userName"
                        v-model="form.name"
                        :class="{ 'is-invalid': errors.name }"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Full Name"
                      />
                      <div v-if="errors.name" class="invalid-feedback">
                        {{ errors.name[0] }}
                      </div>
                    </div>

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
                        placeholder="Email"
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
                        placeholder="Password"
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
                        Register
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
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async register() {
      await this.$axios
        .post('/api/register', this.form)
        .then((response) => {
          this.$auth.login({ data: this.form })
          this.$router.push({ name: 'dashboard' })
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
