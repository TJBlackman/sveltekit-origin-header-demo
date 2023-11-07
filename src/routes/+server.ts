/**
 * Check the incoming request headers for 'origin' and return it in the response body.
 */
export async function GET({ request }: { request: Request }) {
	const origin = request.headers.get('origin');
	console.log(`Saw this origin header on the server: ${origin}`);
	return new Response(
		JSON.stringify({
			origin,
			timestamp: Date.now()
		}),
		{
			headers: {
				'content-type': 'application/json'
			}
		}
	);
}

/**
 * Check the incoming request body for 'origin' and use it to call above GET handler, and return it's response.
 */
export async function POST({ request }: { request: Request }) {
	const url = new URL(request.url);

	const body = await request.json();
	const origin = body.origin;
	// call above GET handler, and return it's response
	const response = await fetch(url.href, {
		headers: {
			origin: origin
		}
	});
	return response;
}
