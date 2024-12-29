// See https://kit.svelte.dev/docs/types#app

import type { Event } from "@prisma/client";

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

export type EventClient = Omit<Event, "date" | "createdAt" | "updatedAt" | "image"> & {
	date: string,
	createdAt: string,
	updatedAt: string,
	image: string | undefined
}
