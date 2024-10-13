/** @format */

import prisma from "$lib/prisma";
import { eventToEventClient } from "$lib/toClient";
import type { PageServerLoad } from "./$types";

export const load = (async ( ) => {
	return {
		events: await prisma.event.findMany({})
		.then((data) => {
			return data.map(event => {
				return eventToEventClient(event)
			})
		})
		.catch((error) => {
			console.error(error)
			return []
		})
	};
}) satisfies PageServerLoad;
