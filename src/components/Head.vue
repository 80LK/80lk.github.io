<script setup lang="ts">
import Btn from "./Btn.vue"
import Link from "./Link";

interface HeadProps {
	title: string;
	links: Link[];
	background: string;
	full?: boolean;
}
defineProps<HeadProps>()

</script>

<template>
	<header :style="{ 'background-image': `url(${background})` }" :class="['head', { 'head-full': full ?? false }]">
		<div class="head-wrapper">
			<h1 v-html="title"></h1>
			<nav class="nav">
				<template v-for="{ href, title, icon, color } in  links  ">
					<Btn :title="title" :icon="icon" :color="color" sized :href="href" />
				</template>
			</nav>
		</div>
	</header>
</template>

<style scoped>
.head {
	background-attachment: fixed;
	background-size: cover;
	color: white;
	border-bottom: 0;
	min-height: 250px;
}

.head-full {
	height: 100vh;
}

.head-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	min-height: 250px;
	padding: 1em;
}

.nav {
	display: flex;
	grid-gap: 10px;
	font-size: 1.2em;
}
</style>
