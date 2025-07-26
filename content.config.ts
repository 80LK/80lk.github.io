import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { ProjectTag } from "./app/tags";

export default defineContentConfig({
	collections: {
		projects: defineCollection({
			type: 'page',
			source: '**/*.md',
			schema: z.object({
				icon: z.string().url(),
				tags: z.nativeEnum(ProjectTag).array(),
				release: z.date()
			})
		})
	}
})
