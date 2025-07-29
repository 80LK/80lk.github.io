<script setup lang="ts">
const route = useRoute();
const { path } = route.params;
const { data: project } = await useAsyncData(() => queryCollection('projects').path('/' + path as string).first());
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
}

.block {
	display: flex;
	gap: .3em;
	margin-top: .5em;
}
</style>
