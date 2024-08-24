import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getByteArrayFromBase64 } from "$lib/utils";

export const POST = (async ({ locals, request }) => {
    if(!locals.admin) throw error(401);

    const body = await request.json();
    const {published = false, title, text, imageB64 }: {published: boolean, title: string, text: string, imageB64?: string} = body
	const image = imageB64 ? getByteArrayFromBase64(imageB64) : null;

    const recipe = await prisma.recipe.create({
        data: {
            published,
            text,
            title,
            image
        }
    })

    return json(recipe)
}) satisfies RequestHandler;

export const PATCH = (async ({ locals, request, url }) => {
    if(!locals.admin) throw error(401);

    const id = parseInt(url.searchParams.get("id") || "null") || null;
    if(!id) {
        throw error(400, "id params url is missing.")
    }
    
    const body = await request.json();
    const {published, title, text, imageB64 }: {published?: boolean, title?: string, text?: string, imageB64?: string} = body
	const image = imageB64 ? getByteArrayFromBase64(imageB64) : undefined;

    const event = await prisma.recipe.update({
        data: {
            published,
            text,
            title,
            image
        },
        where: {
            id: id
        }
    })

    return json(event)
}) satisfies RequestHandler;