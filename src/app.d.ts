// See https://kit.svelte.dev/docs/types#app

import type { Event, Recipe } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message?: string;
			status?: number;
		}

		interface Locals {
			admin: boolean;
		}
	}
}

export type SerializedEvent = Omit<Event, "date" | "createdAt" | "updatedAt" | "image"> & {
	date: string,
	createdAt: string,
	updatedAt: string,
	image: string | undefined
}

export type SerializedRecipe = Omit<Recipe, "createdAt" | "updatedAt" | "image"> & {
	createdAt: string,
	updatedAt: string,
	image: string | undefined
}
