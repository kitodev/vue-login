<template>
  <section class="hero  is-fullheight">
        <div class="field-body">
            <div class="container has-text-left">
                <div class="column is-4 is-offset-4">
                    <div class="box">
                      <span class="icon-text">
                        <span class="icon">
                          <i class="fas fa-lock"></i>
                        </span>
                        <span>Login</span>
                      </span>
                      <hr class="login-hr">
                        <form @submit="login">
                            <div class="field">
                                <label class="label">User</label>
                                <input class="input" type="text" v-model="username" placeholder="">
                            </div>

                            <div class="field">
                              <label class="label">Password</label>
                              <input class="input" type="password" v-model="password" placeholder="">
                            </div>
                            <span class="error" v-if="errors">{{errors}}</span>
                            <hr class="login-hr">
                            <button class="button is-black is-block">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    }
  },
  methods: {
      ...mapMutations(['setUser', 'setToken']),
    async login(e) {
        e.preventDefault();
        if(this.username !== '' && this.password !== '') {
          if(this.username === this.username && this.password === this.password) {
            const respons = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.username,
                password: this.password,
              }),
            });

            const { user, token } = await respons.json();
            this.setUser(user);
            this.setToken(token);
            this.$router.push('/data');
        } else {
          this.errors = [];
          console.log(this.errors);
          this.errors.push("Hibaüzenet")
        }
      } else {
          this.errors = [];
          console.log(this.errors);
          this.errors.push("Hibaüzenet")
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
