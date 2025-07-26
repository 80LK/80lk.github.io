<script setup lang="ts">
import { NuxtLink } from '#components';

interface BtnProps {
	text?: string;
	href?: string;
	to?: string;
	icon?: string;
	slide?: boolean;
}



const { icon, slide, href, to } = defineProps<BtnProps>();
const { prepend } = useSlots();
const { onClick } = useAttrs();

const enabledSlide = computed(() => slide && !!(icon || prepend));
const tag = computed(() => href ? 'a' : to ? 'nuxt-link' : 'button');
const binds = computed(() => {
	switch (tag.value) {
		case 'a':
			return { href, target: '_blank' }
		case 'nuxt-link':
			return { to }

		default:
			break;
	}
})

function click(event: PointerEvent) {
	if (href || to || onClick)
		event.stopPropagation();

	if (onClick) event.preventDefault();
}
</script>

<template>
	<component :is="tag == 'nuxt-link' ? NuxtLink : tag" v-bind="binds"
		:class="[$style.btn, { [$style.slide]: enabledSlide }]" @click="click">
		<slot name="prepend" v-if="prepend || icon">
			<Icon :name="icon" v-if="icon" />
		</slot>
		<span :class="$style.inner">
			<slot>{{ text }}</slot>
		</span>
		<span :class="$style.overlay" />
	</component>
</template>

<style lang="scss" module>
@use '~/scss/colors.scss' as *;

.btn {
	display: inline-flex;
	align-items: center;
	background-color: $primary-color;
	padding: .3em .5em;
	gap: .2em;
	position: relative;
	vertical-align: middle;
	color: $foreground;
	text-decoration: none;
	font-size: 1.2em;
	border: 0;
	cursor: pointer;
	overflow: hidden;
	max-width: 100%;

	.overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		pointer-events: none;

		opacity: 0;
		background-color: white;
		transition: opacity .3s ease;
	}

	&:hover .overlay {
		opacity: .3;
	}

	.inner {
		overflow-x: hidden;
		white-space: nowrap;
	}

	&.slide {
		gap: 0px;
		transition: gap .3s ease;

		.inner {
			width: 0;
			transition: width .3s ease;
		}

		&:hover {
			gap: .2em;

			.inner {
				width: auto;
			}
		}
	}
}
</style>
