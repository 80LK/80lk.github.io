<script setup lang="ts">
import Head from "../components/Head.vue";
</script>

<script lang="ts">
import head from "../assets/head.json";
import links from "../assets/links.json";
export default {
	data() {
		return {
			head,
			links
		}
	}
}
</script>

<template>
	<Head :title="head.title" :links="links" :background="head.background" full></Head>
</template>
