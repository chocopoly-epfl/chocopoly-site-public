import type { Event } from "@prisma/client";
import type { EventClient } from "../app";

export function eventToEventClient(event: Event): EventClient {
    return {
        id: event.id,
        date: event.date.toISOString(),
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
        title: event.title,
        text: event.text,
        image: event.image?.toString()
    } as EventClient
}