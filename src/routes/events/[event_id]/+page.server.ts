/** @format */

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { eventToEventClient } from "$lib/toClient";

export const load: PageServerLoad = (async ({ params }) => {
	return {
		event: await prisma.event.findUniqueOrThrow({
			select: {
				id: true,
				date: true,
				title: true,
				text: true,
				image: true,
				link: true,
				updatedAt: true,
				createdAt: true,
			},
			where: {
				id: parseInt(params.event_id)!
			}
		})
			.then((res) => {return eventToEventClient(res)})
			.catch((err) => {
				console.error(err)
				throw redirect(307, "/404");
			}),
	
	};
});
