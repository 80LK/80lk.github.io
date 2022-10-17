<template>
  <v-app>
    <v-main>
      <MyHeader />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/header.vue";

@Component({
  components: { MyHeader: Header },
  data() {
    return {};
  },
})
export default class App extends Vue {}
</script>
