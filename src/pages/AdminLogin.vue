<template>
  <v-row no-gutters>
    <v-col cols="6" class="mb-2">
      <v-container fluid fill-height>
        <!-- <v-layout align-center justify-center> -->
        <!-- <v-flex xs12 sm8 md3> -->
        <v-card>
          <v-toolbar color="primary" :dark="true">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                type="text"
                v-model="loginFormData.email"
                label="E-mail"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                type="password"
                v-model="loginFormData.password"
                label="Senha"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
        <!-- </v-flex> -->
        <!-- </v-layout> -->
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import useValidate from '@vuelidate/core';
import { reactive, computed } from 'vue';
import { required, email } from '@vuelidate/validators';
import userStore from '@/stores/user';

export default {
  name: 'AdminLogin',
  data() {
    return {
      userState: userStore(),
      loading: false,
    };
  },
  setup() {
    const loginFormData = reactive({
      email: '',
      password: '',
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required },
      };
    });
    const v$ = useValidate(rules, loginFormData);
    return {
      loginFormData,
      v$,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        this.v$.$validate();
        if (this.v$.$error) throw new Error('Campos inválidos');
        await this.user.login(this.loginFormData);
        this.$router.push('/');
      } catch (err) {
        this.toast.error(err + '');
        this.loading = false;
      }
    },
    async formatEmailInput() {
      this.loginFormData.email = this.loginFormData.email.toLowerCase().replace(/\s/g, '');
    },
  },
};
</script>

<style scoped>
::placeholder {
  font-style: italic;
  color: #465145;
}
</style>
