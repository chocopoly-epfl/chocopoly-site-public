import type { Actions } from './$types';
import { ADMIN_PASSWORD } from '$env/static/private';
import { generateJwtToken } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData()

        const password = data.get('password');

        if(password !== ADMIN_PASSWORD) return

        const token = await generateJwtToken()
        cookies.set("token", token,  { path: "/" })
        redirect(302, "/")
	},
    logout: async ({ cookies }) => {
        cookies.set("token", "",  { path: "/" })
        redirect(302, "/")
	},
} satisfies Actions;