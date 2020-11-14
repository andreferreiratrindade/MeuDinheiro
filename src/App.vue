<template>
  <div id="q-app">
    
    <router-view /> 
    
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {OrdemConfig} from '../src/services/OrdemConfig'
@Component
export default class App extends Vue {


 mounted() {
      
     // OrdemConfig.recuperaInstancia().montaOrdem();
  }

}
</script>
