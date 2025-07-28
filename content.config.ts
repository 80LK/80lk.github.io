import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { ProjectTag } from "./app/tags";

export default defineContentConfig({
	collections: {
		projects: defineCollection({
			type: 'page',
			source: '**/*.md',
			schema: z.object({
				icon: z.string().url().optional(),
				tags: z.nativeEnum(ProjectTag).array().optional(),
				release: z.date().optional(),
				links: z.object({
					href: z.string(),
					card: z.boolean().default(false),
					title: z.string().optional(),
					icon: z.string().optional(),
					color: z.string().optional()
				}).array().optional()
			})
		})
	}
})
