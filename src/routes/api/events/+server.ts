import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getByteArrayFromBase64 } from "$lib/utils";
import prisma from "$lib/prisma";

export const POST = (async ({ request }) => {
    //if(!locals.admin) throw error(401);

    const body = await request.json();
    const { date, title, text, imageB64, link }: { date: Date, title: string, text: string, imageB64?: string, link?: string } = body
    const image = imageB64 ? getByteArrayFromBase64(imageB64) : null;

    const event = await prisma.event.create({
        data: {
            date,
            text,
            title,
            image,
            link
        }
    })

    return json(event)
}) satisfies RequestHandler;

export const PATCH = (async ({ locals, request, url }) => {
    if (!locals.admin) throw error(401);

    const id = parseInt(url.searchParams.get("id") || "null") || null;
    if (!id) {
        throw error(400, "id params url is missing.")
    }

    const body = await request.json();
    const { date, title, text, imageB64, link }: { date?: Date, title?: string, text?: string, imageB64?: string, link?: string } = body
    const image = imageB64 ? getByteArrayFromBase64(imageB64) : undefined;

    const event = await prisma.event.update({
        data: {
            date,
            text,
            title,
            image,
            link
        },
        where: {
            id: id
        }
    })

    return json(event)
}) satisfies RequestHandler;


export const DELETE = (async ({ locals, url }) => {
    if (!locals.admin) throw error(401);

    const id = parseInt(url.searchParams.get("id") || "null") || null;
    if (!id) {
        throw error(400, "id params url is missing.")
    }



    const event = await prisma.event.delete({
        where: {
            id: id
        }
    })

    return json(event)
}) satisfies RequestHandler;