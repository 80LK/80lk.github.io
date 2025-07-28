export enum ProjectTag {
	Minecraft = "Minecraft",
	VK = "VK",
	Steam = "Steam",
	DonationAlerts = "DonationAlerts",
	SAMMI = 'SAMMI',
	Stream = 'Stream',
}

type ProjectTagParam = string;

const ProjectTagParams: { [key in ProjectTag]: ProjectTagParam } = {
	'Minecraft': '#70B237',
	'VK': '#0077FF',
	'Steam': '#000000',
	'DonationAlerts': '#F57D07',
	'SAMMI': '#142e50',
	'Stream': '#6441a5'
}

export function getTagParams(tag: string): ProjectTagParam {
	return ProjectTagParams[tag as ProjectTag] ?? '#ff8000';
}
