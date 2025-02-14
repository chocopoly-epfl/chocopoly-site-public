/** @format */

import prisma from "$lib/prisma";
import { serializeRecipe } from "$lib/serialization";
import type { PageServerLoad } from "./$types";

export const load = (async ({locals}) => {
	return {
		recipes: await prisma.recipe.findMany({})
			.then((data) => {
				return data.map(recipe => {
					return serializeRecipe(recipe)
				})
			})
			.then((data) => {
				return data.filter((recipe) => locals.admin || recipe.published)
			})
			.catch((error) => {
				console.error(error)
				return []
			})
	};
}) satisfies PageServerLoad;
