<script setup lang="ts">
import type { FieldProps } from './Field.vue';


const props = defineProps<FieldProps>();
const value = defineModel<string>();
const focus = ref(false);
const $input = useTemplateRef('input');
</script>

<template>
	<field v-model:focus="focus" v-model="value" v-bind="{ ...$attrs, ...props }" @focus="$input?.focus()"
		@blur="$input?.blur()">
		<template #default="{ name }">
			<input v-model="value" :id="name" :name="name" @focus="focus = true" @blur="focus = false" ref="input" />
		</template>
		<template v-for="(_, slotName) in $slots" v-slot:[slotName]="binds">
			<slot :name="slotName" v-bind="binds"></slot>
		</template>
	</field>
</template>
