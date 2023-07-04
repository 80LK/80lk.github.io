<script setup lang="ts">
import Link from './Link';
import Btn from './Btn.vue';
import Tag from './Tag.vue';
interface ProjectInfo {
	name: string;
	description: string;
	tags: string[];
	icon?: string;
	links: Link[];
}

defineProps<ProjectInfo>()

</script>

<template>
	<div class="card">
		<h2 class="card--title">{{ name }}</h2>
		<img class="card--image" :src="icon ? icon : '/imgs/project_placeholder.png'" />
		<div class="card--content">
			{{ description }}
			<div class="card--tags">
				<Tag v-for="tag in tags" :tag="tag"></Tag>
			</div>
			<div class="card--btns">
				<Btn v-for="{ title, icon, href, color } in links" :color="color" :title="title" :icon="icon" :href="href">
				</Btn>

			</div>
		</div>
	</div>
</template>

<style scoped>
.card {
	border: 1px solid gray;
	display: flex;
	flex-direction: column;
}

.card--title {
	border-bottom: 1px solid gray;
	padding: .5em 1em .2em;
	font-size: 1.5em;
	margin: 0;
}

.card--image {
	display: block;
	width: 100%;
	aspect-ratio: 1;
}

.card--image-2 {
	display: block;
	width: 100%;
}

.card--image-2::after {
	content: ' ';
	/* padding: 100%; */
	width: 100%;

}

.card--content {
	border-top: 1px solid gray;
	padding: .5em 1em 1em;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	grid-gap: 0.4em;
}

.card--tags {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	grid-gap: 5px;
}

.tag {
	font-size: .8em;
	border-radius: .5em;
	padding: .2em .5em;
	position: relative;
	display: inline-block;
	vertical-align: bottom;

	color: var(--text-color-with-bg, white);
	background: var(--general, #FF8100);
	vertical-align: middle;
}

.card--btns {
	display: flex;
	grid-gap: 10px;
	flex-wrap: wrap;
}
</style>
