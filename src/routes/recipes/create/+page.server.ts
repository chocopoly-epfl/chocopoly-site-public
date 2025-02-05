/** @format */

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

/** @type {import('./$types').PageServerLoad} */
export const load = (({ locals }) => {
	if (!locals.admin) {
		throw redirect(307, "/recipes");
	}
}) satisfies PageServerLoad;
