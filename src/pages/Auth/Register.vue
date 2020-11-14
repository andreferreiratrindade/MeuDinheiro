<template>
  <div class="q-pa-md" style="max-width: 400px">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <q-form @submit="submit" class="q-gutter-md">
      <q-input
        id="nome"
        type="text"
        name="nome"
        label="Nome"
        value
        required
        v-model="usuario.nome"
      />

      <q-input
        id="email"
        type="text"
        name="email"
        label="E-mail"
        value
        required
        v-model="usuario.email"
      />

      <q-input
        id="senha"
        type="text"
        name="senha"
        label="Senha"
        value
        required
        v-model="usuario.password"
      />

      <q-btn type="submit" class="btn btn-primary">Register</q-btn>
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
export default class Register extends Vue {
   _authService: IAuthService|undefined;

  usuario: _model.UsuarioLogin = {
    email: "",
    password: "",
    nome: "",
  };

  error: string = "";

  submit() {
    debugger;
    this._authService?.novoCadastro(this.usuario)
      .then((result: any) => {
        this.$router.replace({ name: "login" });
      })
      .catch((er: any) => {});
  }

  created (): void {
    debugger
    this._authService = myContainer.myContainer.get<
    IAuthService
  >(TYPES.AuthService);
  }
}
</script>
