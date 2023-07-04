<script setup lang="ts">
import Head from "../components/Head.vue";
import ProjectCard from "../components/ProjectCard.vue";
</script>
<script lang="ts">
import head from "../assets/head.json";
import links from "../assets/links.json";
import projects from "../assets/projects.json";
export default {
	data() {
		return {
			head,
			links,
			projects
		}
	}
}
</script>
<template>
	<Head :title="head.title" :links="links" :background="head.background"></Head>
	<main class="card-list">
		<template v-for="{ name, description, links, icon, tags } in projects">
			<ProjectCard :name="name" :description="description" :links="links" :icon="icon" :tags="tags"></ProjectCard>
		</template>
	</main>
</template>

<style scoped>
.card-list {
	--columns: 4;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: repeat(var(--columns, 4), minmax(0, 1fr));
	width: 945px;
	margin: 15px auto;
}


@media screen and (max-width:974px) {
	.card-list {
		width: 705px;
		--columns: 3;
	}
}

@media screen and (max-width:734px) {
	.card-list {
		width: 465px;
		--columns: 2;
	}
}

@media screen and (max-width:494px) {
	.card-list {
		width: 90%;
		--columns: 1;
	}
}
</style>
