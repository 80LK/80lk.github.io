<script setup lang="ts">
import { NuxtLink } from '#components';

interface BtnProps {
	text?: string;
	href?: string;
	to?: string;
	icon?: string;
	slide?: boolean;
}



const { icon, slide, href, to, text } = defineProps<BtnProps>();
const { prepend, default: defaultSlot } = useSlots();
const { onClick } = useAttrs();

const hasIcon = computed(() => !!(icon || prepend))
const hasText = computed(() => !!(text || defaultSlot))

const enabledSlide = computed(() => slide && hasIcon.value && hasText.value);

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
		<slot name="prepend" v-if="hasIcon">
			<Icon :name="icon" v-if="icon" />
		</slot>
		<span :class="$style.inner" v-if="hasText">
			<slot>{{ text }}</slot>
		</span>
		<span :class="$style.overlay" />
	</component>
</template>

<style lang="scss" module>
@use '~/scss/colors.scss' as *;

.btn {
	--gap: .3em;

	display: inline-flex;
	align-items: center;
	background-color: $primary;
	padding: .3em .5em;
	gap: var(--gap);
	position: relative;
	vertical-align: middle;
	color: $foreground;
	text-decoration: none;
	font-size: 1.2em;
	border: 0;
	cursor: pointer;
	overflow: hidden;
	max-width: 100%;
	text-transform: uppercase;
	text-align: center;
	min-width: fit-content;

	.overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		pointer-events: none;

		opacity: 0;
		background-color: white;
	}

	&:focus .overlay,
	&:hover .overlay {
		opacity: .3;
	}

	.inner {
		overflow-x: hidden;
		white-space: nowrap;
	}

	&.slide {
		gap: 0px;

		.inner {
			width: 0;
		}

		&:hover,
		&:focus {
			gap: var(--gap);

			.inner {
				width: auto;
			}
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.overlay {
			transition: opacity .3s ease;
		}

		&.slide {
			transition: gap .3s ease;

			.inner {
				transition: width .3s ease;
			}
		}
	}
}
</style>
