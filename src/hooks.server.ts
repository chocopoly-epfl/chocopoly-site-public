/** @format */

import { JWT_REFRESH_TTL, generateJwtToken, verifyJwtToken } from "$lib/auth";
import {type Handle, type HandleServerError } from "@sveltejs/kit";

//Handle is fired before each request, it handles authentification already connected clients.
export const handle: Handle = async function ({ event, resolve }) {
	const token = event.cookies.get("token");

	//Default data to pass to sveltekit if no session
	event.locals.admin = false;

	const hasVerifiedToken = token && (await verifyJwtToken(token));
	if (!hasVerifiedToken) {
		return resolve(event);
	}

	const { exp } = hasVerifiedToken;
	if (exp && exp * 1e3 - Date.now() < JWT_REFRESH_TTL) {
		const newToken = await generateJwtToken();
		event.cookies.set("token", newToken, {
			path: "/"
		});
	}
	event.locals.admin = true;

	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	const newError = error as App.Error;
	if (event.route.id === null) {
		//On route not found, redirect to page 404
		return {
			status: 404,
			message: event.url.href,
		};
	} else {
		console.error(newError);
		return {
			status: newError.status,
			message: "Internal error",
		};
	}
};
