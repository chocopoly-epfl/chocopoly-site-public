/** @format */

import type { RequestHandler } from "./$types.js";

export const POST = (({ cookies }) => {
	cookies.delete("token", {
		path: "/",
		httpOnly: true,
		secure: true,
	});
	return new Response();
}) satisfies RequestHandler;
