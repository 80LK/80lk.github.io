<script setup lang="ts">
const { data: projects } = await useAsyncData(() => queryCollection('projects').order('release', 'DESC').all());
</script>

<template>
	<Container :class="$style.filter">
		<btn>Тут должны быть фильтры и поиск</btn>
	</Container>
	<Grid>
		<ProjectCard v-for="project in projects" :to="project.path" :key="project.path" v-bind="project" />
	</Grid>
</template>

<style lang="scss" module>
@use '~/scss/colors' as *;

.filter {
	--width: 945px;
	padding-bottom: 0;
}
</style>
