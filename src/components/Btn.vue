<script setup lang="ts">
import Link from './Link';
import Icon from "./Icon.vue";
type BtnInfo = Link & { sized?: boolean };
defineProps<BtnInfo>()

</script>

<script lang="ts">
export default {
	mounted() {
		const inner = <HTMLSpanElement>this.$refs.inner;
		// console.log(inner.scrollWidth, inner.offsetWidth, inner.innerText)
		let width = inner.scrollWidth || inner.offsetWidth;
		if (width != 0 && this.icon)
			width += 10;
		inner.style.setProperty('--width-text', width + "px")
	},
	computed: {
		classList() {
			const classes = ['btn'];
			if (this.sized) classes.push('btn-sized');
			return classes;
		},
		style() {
			if (!this.color) return {}
			return {
				'--general': this.color,
				'--general-sub-3': this.color
			}
		}
	}
}
</script>

<template>
	<RouterLink v-if="href && href.startsWith('/')" :to="href" :class="classList" :style="style">
		<Icon v-if="icon" :icon="icon" />
		<span class="btn--inner" ref="inner">
			{{ title }}
		</span>
	</RouterLink>
	<a v-else-if="href" target="_blank" :class="classList" :style="style" :href="href">
		<Icon v-if="icon" :icon="icon" />
		<span class="btn--inner" ref="inner">
			{{ title }}
		</span>
	</a>
	<button v-else :class="classList" :style="style">
		<Icon v-if="icon" :icon="icon" />
		<span class="btn--inner" ref="inner">
			{{ title }}
		</span>
	</button>
</template>

<style scoped>
.btn {
	user-select: none;
	text-decoration: none;
	display: inline-block;
	padding: 6px 12px;
	font-weight: normal;
	cursor: pointer;
	outline: none;
	overflow: hidden;
	vertical-align: middle;
	text-align: center;
	position: relative;

	border: 2px solid var(--general, #FF8100);
	background: var(--general, #FF8100);
	color: var(--text-color-with-bg, white);

	transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
}

.btn.large {
	font-size: 1.3rem;
	padding: 8px 16px;
}

.btn:hover {
	color: var(--text-color-with-bg, white);
	border-color: var(--general-sub-3, #FFA040);
	background: var(--general-sub-3, #FFA040);
}

.btn.ghost {
	border-color: var(--general, #FF8100);
	color: var(--general, #FF8100);
	background: transparent;
}

.btn.ghost:hover {
	color: var(--text-color-with-bg, white);
	background: var(--general, #FF8100);
}

.btn * {
	pointer-events: none;
}

.btn .btn--wave {
	--radius: 300px;

	position: absolute;
	border-radius: 50%;
	display: block;
	transform: translate(-50%, -50%);
	pointer-events: none;

	width: var(--radius);
	height: var(--radius);
	opacity: 1;
	animation: button-wave 1s ease;

	background: rgba(255, 255, 255, 0.4);
}

.btn.wave-dark .btn--wave {
	background: rgba(0, 0, 0, 0.2);
}

.btn .btn--wave.btn--wave--hidding {
	opacity: 0;
	transition: opacity .5s ease;
}

@keyframes button-wave {
	0% {
		width: 0;
		height: 0;
		opacity: 0;
	}

	100% {
		width: var(--radius);
		height: var(--radius);
		opacity: 1;
	}
}


.btn.btn-sized {
	display: flex;
}

.btn .btn--inner {
	display: inline-block;
	width: var(--width-text, auto);
	vertical-align: bottom;
	text-align: right;
	overflow: hidden;
	white-space: nowrap;
}

.btn.btn-sized .btn--inner {
	width: 0;
	transition: width .2s ease;
}

.btn.btn-sized:hover .btn--inner {
	width: var(--width-text);
}
</style>
