import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { generateJwtToken } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_GLOBAL_DOMAIN } from '$env/static/public';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData()

        const password = data.get('password');

        if(password !== env.ADMIN_PASSWORD) return

        const token = await generateJwtToken()
        
        cookies.set("token", token,  { path: "/", httpOnly: true, secure: true, domain: PUBLIC_GLOBAL_DOMAIN ? PUBLIC_GLOBAL_DOMAIN : undefined })
        
        redirect(302, "/")
	}
} satisfies Actions;