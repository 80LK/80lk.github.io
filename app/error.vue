<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error?: NuxtError }>()
</script>

<template>
	<app>
		<Container style="text-align: center;">
			<h2 style="margin-bottom: 1em;">Ничего не найдено ;(</h2>
			<btn to="/">Пора домой...</btn>

			<DevOnly>
				<div>{{ error }}</div>
			</DevOnly>
		</Container>
	</app>
</template>
