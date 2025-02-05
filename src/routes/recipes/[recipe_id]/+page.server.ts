/** @format */

import prisma from "$lib/prisma";
import { serializeRecipe } from "$lib/serialization";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ params }) => {
	return {
		recipe: await prisma.recipe.findUniqueOrThrow({
			select: {
				id: true,
				published: true,
				title: true,
				text: true,
				image: true,
				updatedAt: true,
				createdAt: true,
			},
			where: {
				id: parseInt(params.recipe_id)!
			}
		})
			.then((res) => serializeRecipe(res))
			.catch((err) => {
				console.error(err)
				throw redirect(307, "/404");
			}),

	};
});
