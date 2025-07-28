<script lang="ts" setup>
import { getTagParams } from '~/tags';

const { tag } = defineProps<{ tag: string }>()
const color = getTagParams(tag);
</script>

<template>
	<div :class="$style.badge">
		{{ tag }}
	</div>
</template>

<style lang="scss" module>
.badge {
	background-color: v-bind(color);
	padding: .1em .2em;
	font-size: .9em;
	line-height: 1;
	vertical-align: middle;
}
</style>
