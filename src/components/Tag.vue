<script setup lang="ts">
interface Tag {
	color?: string;
	tag: string;
}

defineProps<Tag>()

// const ColorList = [
// 	"#E97961"
// ];
// console.log(ColorList[0])
</script>

<script lang="ts">
const ColorList = [
	"#E97961",
	"#62B7FF",
	"#057D9F",
	"#19C55E",
	"#FF8100"
];
let i = 0;
const TagColorMap: { [key: string]: string } = {
	"mcpe": "#E97961",
	"innercore": "#62B7FF",
	"mod": "#057D9F",
	"addon": "#19C55E",
	"library": "#FF8100",
	"vk": "#0077ff"
};

export default {
	computed: {
		calcColor() {
			const tag = this.tag.toLowerCase();
			if (TagColorMap[tag])
				return TagColorMap[tag];

			if (this.color) {
				TagColorMap[tag] = this.color;
				return this.color;
			}

			TagColorMap[tag] = ColorList[i % ColorList.length];
			i++;
			return TagColorMap[tag];
		}
	}
}
</script>

<template>
	<span class="tag" :style="{
		'background-color': calcColor
	}">
		{{ tag }}
	</span>
</template>


<style scoped>
.tag {
	font-size: .8em;
	border-radius: .5em;
	padding: .2em .5em;
	position: relative;
	display: inline-block;
	vertical-align: bottom;

	color: var(--text-color-with-bg, white);
	background: var(--general, #FF8100);
	vertical-align: middle;
}
</style>
