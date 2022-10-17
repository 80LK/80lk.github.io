<template>
  <header class="header">
    <div class="wrapper">
      <h1 class="text-h3 mb-2">
        <a>80LK</a> -
        <a href="https://github.com/80LK" target="_blank">Программист</a> и
        <a href="https://github.com/80LK" target="_blank">что-то</a>
      </h1>
      <nav>
        <template v-for="link in links">
          <expanded-btn
            :key="link.link"
            :color="link.color || 'primary'"
            :dark="link.dark"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </expanded-btn>
        </template>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExpandedBtn from "./ExpandedBtn.vue";

@Component({
  components: { ExpandedBtn },
  mounted() {},
  data() {
    return {
      links: [
        {
          link: "https://github.com/80LK",
          title: "GitHub",
          icon: "mdi-github",
          color: "black",
          dark: true,
        },
      ],
    };
  },
})
export default class Header extends Vue {}
</script>

<style scoped>
.header {
  background: url(../assets/imgs/bg_head.jpg);
  background-attachment: fixed;
  background-size: cover;
  color: white;
  min-height: 250px;
  border-bottom: 0;
}
.wrapper {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
}
</style>
