<template>
  <v-btn v-bind="$attrs" v-on="$listeners" width="38px"><slot /></v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data() {
    return {};
  },
})
export default class Header extends Vue {}
</script>
