<script setup lang="ts">
defineProps<{ vertical?: boolean }>()
</script>

<template>
	<div :class="[$style.divider, { [$style.vertical]: vertical ?? false }]"></div>
</template>

<style lang="scss" module>
@use '~/scss/colors.scss' as *;

.divider {
	width: 100%;
	height: 1px;
	box-sizing: content-box;
	position: relative;

	background-color: $border;

	&.vertical {
		width: 1px;
		height: 100%;
	}
}
</style>
