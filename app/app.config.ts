interface Link {
	color?: string;
	icon: string;
	title: string;
	href: string;
}

interface AppConfig {
	title: string;
	description?: string;
	links?: Link[]
}

export default defineAppConfig<AppConfig>({
	title: "80LK",
	links: [
		{
			color: "#161b22",
			icon: 'mdi:github',
			title: 'GitHub',
			href: 'https://github.com/80LK'
		},
		{
			color: "#6441a5",
			icon: 'mdi:twitch',
			title: 'Twitch',
			href: 'https://www.twitch.tv/80lk'
		},
		{
			color: "#24A1DE",
			icon: 'mdi:telegram',
			title: 'Telegram',
			href: 'https://t.me/tv80lk'
		},
		{
			color: "#000000",
			icon: 'mdi:steam',
			title: 'steam',
			href: 'https://steamcommunity.com/id/80lk/'
		}
	] as Link[]
})
