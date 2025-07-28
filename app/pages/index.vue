<script setup lang="ts">
const { data: projects } = await useAsyncData(() => queryCollection('projects').order('release', 'DESC').all());
const { data: tags } = await useAsyncData(async () => Array.from((await queryCollection('projects').select('tags').all()).reduce((r, e) => { e.tags?.forEach(tag => r.add(tag)); return r; }, new Set<string>())));

const search = ref('');
const tag = ref('');
const loading = ref(false);

let debounce = function <F extends Function, T>(func: F, delay: number = 1000) {
	let inDebounce: NodeJS.Timeout;
	return function (this: T) {
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(this, arguments), delay);
	};
};

async function update() {
	loading.value = true;
	let query = queryCollection('projects').order('release', 'DESC');

	if (search.value) query = query.orWhere((g) => g.where('title', 'LIKE', `%${search.value}%`).where('description', 'LIKE', `%${search.value}%`));
	if (tag.value) query = query.where('tags', 'LIKE', `%"${tag.value}"%`);

	projects.value = await query.all();
	loading.value = false;
}
const debouncedUpdate = debounce(update, 300);
</script>

<template>
	<Container :class="$style.filter">
		<select-field name="tag" v-model="tag" label="Тег" @update:model-value="update" clearable :items="tags!">
			<template #prepend>
				<Icon name="mdi:tag" />
			</template>
		</select-field>
		<text-field name="search" v-model="search" label="Поиск" @update:model-value="debouncedUpdate" clearable>
			<template #prepend>
				<Icon name="mdi:magnify" />
			</template>
		</text-field>
	</Container>

	<Container v-if="loading" :class="$style.loading">loading...</Container>
	<Grid v-else>
		<ProjectCard v-for="project in projects" :to="project.path" :key="project.path" v-bind="project" />
	</Grid>
</template>

<style lang="scss" module>
@use '~/scss/colors' as *;

.filter {
	--width: 945px;
	padding-bottom: 0;
	display: flex;
	gap: .5em;
	justify-content: center;

	@media screen and (max-width: 465px) {
		flex-direction: column;
	}
}

.loading {
	--width: 945px;
	display: flex;
	justify-content: center;
}
</style>
