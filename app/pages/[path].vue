<script setup lang="ts">
function getFirst<T>(value: T | T[] | undefined): T | undefined {
	return Array.isArray(value) ? value[0] : value;
}

const path = '/' + (getFirst(useRoute().params.path) ?? '');
const { data: project } = await useAsyncData(path, () => queryCollection('projects').path(path).first());

useSeoMeta({
	title: project.value?.title + " | " + useAppConfig().title,
	description: project.value?.description
})
</script>

<template>
	<Container width="720px">
		<img :class="$style.icon" :src="project?.icon" v-if="project?.icon" />
		<ContentRenderer :value="project!" />
		<div :class="$style.block">
			<badge v-for="tag of project?.tags" :tag="tag" />
		</div>
		<div :class="$style.block">
			<btn v-for="link of project?.links" :icon="link.icon" :text="link.title" :href="link.href"
				:style="{ backgroundColor: link.color }" />
		</div>
	</Container>
</template>

<style lang="scss" module>
.icon {
	width: 250px;
	float: left;
	margin-right: 1em;
	margin-bottom: 1em;

	@media screen and (max-width: 465px) {
		display: block;
		margin-inline: auto;
		float: none;
		width: 100%;
		max-width: 250px;
	}
}

.block {
	display: flex;
	gap: .3em;
	margin-top: .5em;
}
</style>
