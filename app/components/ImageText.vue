<script setup lang="ts">
const { text, image = 'var(--text-image)' } = defineProps<{
	text: string;
	image?: string;
}>()
const cssText = computed(() => `'${text.replaceAll("'", "\\'")}'`)
</script>
<template>
	<span :class="$style['gradient-text']">
		{{ text }}
	</span>
</template>

<style lang="scss" module>
.gradient-text {
	position: relative;
	color: transparent;

	&::after {
		content: v-bind(cssText);
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		color: transparent;
		background-clip: text;
		background-image: v-bind(image);
		text-shadow: none;
	}
}
</style>
