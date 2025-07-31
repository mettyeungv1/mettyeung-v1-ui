function getYouTubeThumbnail(embeddedUrl: string): string | null {
	const match = embeddedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
	if (!match) return null;
	const videoId = match[1];
	return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
