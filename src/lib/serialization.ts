import type { Event } from "@prisma/client";
import type { SerializedEvent } from "../app";
import { getBase64FromByteArray } from "$utils";

export function serializeEvent(event: Event): SerializedEvent {
    return {
        id: event.id,
        date: event.date.toISOString(),
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
        title: event.title,
        text: event.text,
        link: event.link,
        image: event.image ? getBase64FromByteArray(event.image) : undefined
    } as SerializedEvent
}