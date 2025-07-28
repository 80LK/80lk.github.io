<script setup lang="ts" generic="V extends string | string[]">
import { nanoid } from 'nanoid';

export interface FieldProps {
	name?: string;
	label?: string;
	clearable?: boolean;
}

const $emit = defineEmits<{
	(name: 'click:clearable', event: PointerEvent): void;
	(name: 'focus' | 'blur' | 'click'): void;
}>();

const value = defineModel<V | null>({ default: null });
const focus = defineModel<boolean>('focus', { default: false });
const isEmpty = computed(() => value.value == null || value.value.length == 0);
const $field = useTemplateRef('field');

const { name = nanoid(), clearable = false } = defineProps<FieldProps>();

function onFocus() {
	$emit('click');
	focus.value = true;
	$emit('focus');
}
function onBlur() {
	focus.value = false;
	$emit('blur');
}


function onClickOutside(e: MouseEvent) {
	if (!$field.value?.contains(e.target as Node)) {
		onBlur();
	}
}

onMounted(() => {
	document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', onClickOutside)
})
</script>

<template>
	<label :class="[$style.field, { [$style.focus]: focus, [$style['with-value']]: !isEmpty }]"
		@mousedown.prevent="onFocus" ref="field" :for="name">
		<div :class="$style.prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</div>
		<div :class="$style.content">
			<div :class="$style.start"></div>
			<div :class="$style.label" v-if="!!label">
				<div :class="$style.content">{{ label }}</div>
			</div>
			<div :class="$style.end"></div>

			<div :class="$style.control">
				<slot v-bind="{ name, focus, value, isEmpty }"></slot>
			</div>

			<div :class="$style.clearable" v-if="clearable">
				<Icon name="mdi:close-circle" @mousedown.prevent.stop="value = null" />
			</div>
		</div>
		<div :class="$style.append" v-if="$slots.append">
			<slot name="append"></slot>
		</div>
	</label>
</template>


<style lang="scss" module>
@use '~/scss/colors' as *;

.field {
	display: grid;
	grid-template: "prepend content append";
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: stretch;
	cursor: text;
	font-size: 1.2em;
	width: 100%;
	outline: none;
	flex: 1;

	&>.prepend,
	&>.append {
		display: flex;
		align-items: center;
		gap: .3em;
		padding-inline: .3em;
		border: 1px solid $border;
	}

	&>.prepend {
		grid-area: prepend;
		border-right: none;
	}

	&>.append {
		grid-area: append;
		border-left: none;
	}



	&>.content {
		grid-area: content;
		display: grid;
		align-items: stretch;
		grid-template: "start label center clearable end";
		grid-template-columns: 0.3em auto minmax(0, 1fr) auto .3em;



		.start,
		.end {
			display: flex;
			align-items: center;
			border-block: 1px solid $border;
		}

		.start {
			grid-area: start;
			border-left: 1px solid $border;
		}

		.label {
			grid-area: label;
			display: flex;
			align-items: center;
			padding-inline: .3em;
			border-block: 1px solid $border;

			&>.content {
				position: relative;
				top: 0;
			}
		}


		.clearable {
			display: none;
			align-items: center;
			grid-area: clearable;
			padding-inline: .3em;
			cursor: inherit;
			opacity: 0;
			// pointer-events: visible;
		}

		.end {
			grid-area: center / center / end / end;
			border-right: 1px solid $border;
		}

		.control {
			grid-area: label/label/center/center;
			display: flex;
			align-items: center;
			padding: .3em;
			min-height: 1.6em;
		}

	}

	&.focus {

		&>.prepend,
		&>.append,
		&>.content .start,
		&>.content .label,
		&>.content .end {
			color: $primary;
			border-color: $primary;
		}
	}

	&.focus>.content,
	&.with-value>.content {
		.label {
			border-top-color: transparent;

			&>.content {
				font-size: .8em;
				top: -50%;
			}
		}
	}

	&.with-value>.content .clearable {
		display: flex;
		opacity: 1;
		cursor: pointer;

		@starting-style {
			opacity: 0;
		}
	}


	@media (prefers-reduced-motion: no-preference) {

		&>.prepend,
		&>.append,
		&>.content .start,
		&>.content .label,
		&>.content .end {
			transition: border-color .3s ease, color .3s ease;
		}

		&>.content .clearable {
			transition-property: opacity, display;
			transition-duration: .3s;
			transition-timing-function: ease;
			transition-behavior: allow-discrete;
		}

		&>.content .label>.content {
			transition:
				font-size .3s ease,
				top .3s ease;
		}
	}
}
</style>
