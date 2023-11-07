export async function load({ url }: { url: URL }) {
	const response = await fetch(url.href, {
		headers: {
			origin: 'fetch-load-origin-header'
		}
	});
	const data = await response.json();
	return data;
}
