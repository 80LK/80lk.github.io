<template>
	<Container :class="[$style.grid, $style.flex]">
		<slot />
	</Container>
</template>

<style lang="scss" module>
.grid {
	--columns: 4;
	--width: 945px;

	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(var(--columns, 4), minmax(0, 1fr));

	&.flex {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		justify-content: center;

		--gap: 1em;
		--column-width: calc((100% - (var(--columns) - 1) * var(--gap)) / var(--columns));

		>* {
			flex: 0 0 var(--column-width);
			max-width: var(--column-width);
		}
	}
}

@media screen and (max-width: 945px) {
	.grid {
		--width: 705px;
		--columns: 3;
	}
}

@media screen and (max-width: 705px) {
	.grid {
		--width: 465px;
		--columns: 2;
	}
}

@media screen and (max-width: 465px) {
	.grid {
		--width: 100%;
		--columns: 1;
	}
}
</style>
