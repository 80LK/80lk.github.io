<script setup lang="ts" generic="T = string">
import type { FieldProps } from './Field.vue';

type Item = { label: string, value: string };
type PropItem = string | Item;
interface SelectProps extends FieldProps {
	items: PropItem[];
}

const { items, ...props } = defineProps<SelectProps>();
const value = defineModel<string | null>();
const focus = ref(false);
const isOpen = ref(false);
const $input = useTemplateRef('wrapper');

const cursor = ref(-1);
const preparedItems = computed(() => items.map((e) => typeof e == "string" ? { label: e, value: e } : e) as Item[]);
const selectedValue = computed(() => value.value ? preparedItems.value.find(e => e.value == value.value)?.label : null);

function toggle() {
	isOpen.value = !isOpen.value;
	if (isOpen.value) focus.value = true;
}
function close() {
	isOpen.value = false;
}
function select(index: number) {
	if (!isOpen.value || index == -1) return;

	const newValue = preparedItems.value[index]?.value;
	value.value = value.value == newValue ? null : newValue;
	isOpen.value = false;
}
enum Direction {
	UP = -1,
	NONE = 0,
	DOWN = 1
}
function moveCursor(direction: Direction) {
	if (!isOpen.value) return;

	const maxIndex = preparedItems.value.length - 1;

	switch (direction) {
		case Direction.UP:
			cursor.value = (cursor.value <= 0 ? maxIndex : cursor.value - 1);
			break;

		case Direction.DOWN:
			cursor.value = (cursor.value >= maxIndex ? 0 : cursor.value + 1);
			break;
	}
}

function blur() {
	isOpen.value = focus.value = false;
}

enum KeycodeControl {
	ArrowDown = 'ArrowDown',
	ArrowUp = 'ArrowUp',

	KeyW = 'KeyW',

	KeyS = 'KeyS',

	Space = 'Space',
	Enter = 'Enter',
	Escape = 'Escape',
}

function onKeydown(event: KeyboardEvent) {
	console.log(event.code);
	if (!(event.code in KeycodeControl)) return;

	switch (event.code) {
		case KeycodeControl.ArrowDown:
		case KeycodeControl.KeyS: moveCursor(Direction.DOWN); break;

		case KeycodeControl.ArrowUp:
		case KeycodeControl.KeyW: moveCursor(Direction.UP); break;

		case KeycodeControl.Space: toggle(); break;
		case KeycodeControl.Escape: close(); break;

		case KeycodeControl.Enter: select(cursor.value); break;
	}
}
</script>

<template>
	<div :class="[$style['select-filed'], { [$style.open]: isOpen }]" v-bind="$attrs" tabindex="0" @focus="focus = true"
		@blur="blur" @keydown="onKeydown" ref="wrapper">
		<field v-bind="props" v-model:focus="focus" v-model="value" :class="$style.field" @click="toggle"
			@focus="$input?.focus()" @blur="$input?.blur()">
			<template #default="{ name }">
				<input :value="selectedValue" :id="name" :name="name" disabled style="pointer-events: none;" />
			</template>
			<template #append>
				<Icon name="mdi:menu-down" :class="$style.button" />
			</template>
			<template v-for="(_, slotName) in $slots" v-slot:[slotName]="binds">
				<slot :name="slotName" v-bind="binds" />
			</template>
		</field>
		<ul :class="$style.dropdown">
			<li v-for="(item, i) of preparedItems" :class="[$style.item, {
				[$style.active]: item.value == value,
				[$style.hover]: i == cursor
			}]" @click.prevent.stop="select(i); blur()" @mouseenter="cursor = i">
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>

<style module lang="scss">
@use '~/scss/colors' as *;
@use 'sass:color';

.select-filed {
	position: relative;
	flex: 1;

	.field {
		cursor: pointer;
	}

	.button {
		transform: rotate(0deg);

		@media (prefers-reduced-motion: no-preference) {
			transition: transform .3s ease;
		}
	}



	.dropdown {
		position: absolute;
		background: $background;
		left: 0;
		right: 0;
		top: 100%;
		border: 1px solid $primary;
		border-top: none;
		list-style: none;
		z-index: 1;
		overflow: hidden;
		height: 0;
		box-sizing: border-box;
		display: none;

		@media (prefers-reduced-motion: no-preference) {
			transition: height .3s ease, display .3s ease allow-discrete;
		}

		.item {
			padding: .3em .5em;
			cursor: pointer;

			&.hover {
				background-color: color.adjust($primary, $lightness: -30%);
			}

			&.active {

				&.hover {
					background-color: color.adjust($primary, $lightness: +10%);
				}

				background-color: $primary;
			}

			@media (prefers-reduced-motion: no-preference) {
				transition: background-color .3s ease;
			}
		}
	}

	&.open {
		.button {
			transform: rotate(180deg);
		}

		.dropdown {
			height: auto;
			display: block;

			@starting-style {
				height: 0;
			}
		}
	}

}
</style>
