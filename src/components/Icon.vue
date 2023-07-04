<script setup lang="ts">
defineProps<{ icon: string }>()
</script>

<script lang="ts">
export default {
	computed: {
		_parts() {
			const parts = this.icon.split(":");
			switch (parts.length) {
				case 0: throw new ReferenceError("Something wrong");

				case 1:
					return ['mdi', '', parts[0]];
				case 2:
					return [parts[0], '', parts[1]];
				default:
					return parts;
			}
		},
		classList() {
			const [family, set, name] = this._parts;

			return [`${family}${set ? `-${set}` : ''}`, `${family}-${name}`];
		},
	}
}
</script>

<template>
	<span :class="classList"></span>
</template>
