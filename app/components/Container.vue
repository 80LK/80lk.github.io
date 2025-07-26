<script setup lang="ts">
const { width = 'var(--width, 100%)' } = defineProps<{ width?: string }>()
</script>
<template>
	<div :class="$style.container">
		<slot />
	</div>
</template>

<style lang="scss" module>
.container {
	padding: 1em;
	max-width: v-bind(width);
	margin: auto;
}
</style>
