<template>
  <div class="q-pa-md" style="max-width: 400px">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <q-form @submit="submit" class="q-gutter-md">
      <q-input
        id="email"
        type="text"
        name="email"
        label="E-mail"
        value
        required
        autofocus
        v-model="usuario.email"
      />

      <q-input
        id="senha"
        type="text"
        name="senha"
        label="Senha"
        value
        required
        autofocus
        v-model="usuario.password"
      />

      <q-btn type="submit" class="btn btn-primary">Login</q-btn>
    </q-form>
  </div>
</template>


<script lang="ts">
import { IAuthService } from "src/services/interfaces/IAuthService";
import { Component, Vue } from "vue-property-decorator";
import { _model } from "src/models/_models";
import { inject, injectable } from "inversify";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";

@Component
export default class Login extends Vue {
  private _authService: any = myContainer.myContainer.get<IAuthService>(
    TYPES.NotaCorretagemService
  );

  usuario: _model.UsuarioLogin = {
    email: "",
    password: "",
    nome: "",
  };

  error: string = "";

  submit() {
    this._authService
      .login(this.usuario)
      .then((result: any) => {
        this.$router.replace({ name: "painelGerencial" });
      })
      .catch((err: any) => {
        this.error = err;
      });
  }
}
</script>
