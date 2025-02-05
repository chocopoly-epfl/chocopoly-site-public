import type { Event, Recipe } from "@prisma/client";
import type { SerializedEvent, SerializedRecipe } from "../app";
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

export function serializeRecipe(recipe: Recipe): SerializedRecipe {
    return {
        id: recipe.id,
        createdAt: recipe.createdAt.toISOString(),
        updatedAt: recipe.updatedAt.toISOString(),
        title: recipe.title,
        text: recipe.text,
        image: recipe.image ? getBase64FromByteArray(recipe.image) : undefined,
        published: recipe.published
    } as SerializedRecipe
}