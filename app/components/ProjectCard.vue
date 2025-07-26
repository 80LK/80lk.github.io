<script setup lang="ts">

defineProps<{ title: string; description: string; icon?: string, path: string }>()
</script>

<template>
	<div :class="$style.card">
		<nuxt-link :to="path">
			<div :class="$style.title">{{ title }}</div>
			<img :class="$style.image" :src="icon" v-if="icon" />
			<div :class="$style.image" v-else>
				<Icon :class="$style.icon" name="uil:brackets-curly" />
			</div>
		</nuxt-link>
		<div :class="$style.description">
			<span :class="$style.wrapper">{{ description }}</span>
		</div>
		<div :class="$style.block">
			<div :class="$style.line">Tags</div>
			<div :class="$style.line">Links</div>
		</div>
	</div>
</template>

<style lang="scss" module>
@use '~/scss/colors' as *;

.card {
	border: 1px solid $border;
	position: relative;

	.title {
		border-bottom: 1px solid $border;
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
		border-bottom: 1px solid $border;

		.icon {
			width: 50%;
			height: 50%;
			color: $border;
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

		.line {
			overflow: hidden;
		}
	}
}
</style>
