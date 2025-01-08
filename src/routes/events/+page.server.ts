/** @format */

import prisma from "$lib/prisma";
import { serializeEvent } from "$lib/serialization";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	return {
		events: await prisma.event.findMany({})
			.then((data) => {
				return data.map(event => {
					return serializeEvent(event)
				})
			})
			.catch((error) => {
				console.error(error)
				return []
			})
	};
}) satisfies PageServerLoad;
