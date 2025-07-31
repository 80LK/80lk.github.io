<script setup lang="ts">
interface Link {
	icon?: string;
	title?: string;
	href: string;
	card?: boolean;
	color?: string;
}
const { links } = defineProps<{ title: string; description: string; icon?: string, path: string; tags?: string[], links?: Link[] }>()

const preparedLinks = computed(() => links?.filter(link => link.card && (link.title || link.icon)) ?? []);
const focus = ref(false);
</script>

<template>
	<div :class="[$style.card, { [$style.focus]: focus }]">
		<nuxt-link :to="path" :class="$style.link" @focus="focus = true" @blur="focus = false" />
		<div :class="$style.title">{{ title }}</div>
		<img :class="$style.image" :src="icon" v-if="icon" />
		<div :class="$style.image" v-else>
			<Icon :class="$style.icon" name="mdi:code-braces" />
		</div>
		<div :class="$style.description">
			<span :class="$style.wrapper">{{ description }}</span>
		</div>
		<div :class="$style.block">
			<div :class="$style.line" v-if="tags && tags.length > 0">
				<badge v-for="tag of tags" :tag="tag" />
			</div>
			<div :class="$style.line" v-if="preparedLinks.length > 0">
				<btn v-for="link of preparedLinks" :icon="link.icon" :text="link.title" :href="link.href"
					:style="{ backgroundColor: link.color }" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
@use '~/scss/colors' as *;

.card {
	border: 1px solid $border;
	position: relative;
	display: flex;
	flex-direction: column;

	&:hover,
	&.focus {
		border-color: $primary;
	}

	.link {
		position: absolute;
		inset: 0;
	}

	.title {
		border-bottom: 1px solid;
		border-color: inherit;
		font-weight: bold;
		padding: .5em;
		overflow: hidden;
		text-wrap-mode: nowrap;
		text-overflow: ellipsis;
		font-size: 1.2em;
	}

	.image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 1;
		border-bottom: 1px solid;
		border-color: inherit;

		.icon {
			width: 50%;
			height: 50%;
			color: $border;
			z-index: -1;
		}
	}

	.description {
		padding: .5em;

		.wrapper {
			line-clamp: 2;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			overflow-wrap: break-word;
			word-break: initial;
		}
	}

	.block {
		padding: 0 .5em .5em;
		display: flex;
		flex-direction: column;
		gap: .5em;
		justify-content: space-between;
		flex: 1;

		.line {
			overflow: hidden;
			display: flex;
			gap: .2em;
			flex-wrap: wrap;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		transition: border-color .3s ease;
	}
}
</style>
