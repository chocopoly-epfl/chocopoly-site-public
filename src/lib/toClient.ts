import type { Event } from "@prisma/client";
import type { EventClient } from "../app";
import { getBase64FromByteArray } from "$utils";

export function eventToEventClient(event: Event): EventClient {
    return {
        id: event.id,
        date: event.date.toISOString(),
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
        title: event.title,
        text: event.text,
        link: event.link,
        image: event.image ? getBase64FromByteArray(event.image) : undefined
    } as EventClient
}