/** @type {import('./$types').Actions} */
export const actions = {
	serverFetch: async (event: { request: Request }) => {
		const body = await event.request.json();
		const origin = body.origin;
		const response = await fetch('/', {
			headers: {
				origin: origin
			}
		});
		return response;
	}
};
