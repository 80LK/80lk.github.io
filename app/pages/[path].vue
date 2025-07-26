<script setup lang="ts">
const route = useRoute();
const { path } = route.params;
const { data: project } = await useAsyncData(() => queryCollection('projects').path('/' + path as string).first());

console.log(unref(project));
</script>
<template>
	<Container width="720px">
		<ContentRenderer :value="project!" />
	</Container>
</template>
