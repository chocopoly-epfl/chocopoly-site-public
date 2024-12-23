import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { generateJwtToken } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData()

        const password = data.get('password');

        if(password !== env.ADMIN_PASSWORD) return

        const token = await generateJwtToken()
        cookies.set("token", token,  { path: "/", httpOnly: true, secure: true })
        redirect(302, "/")
	}
} satisfies Actions;