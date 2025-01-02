<!-- @format -->
<script lang="ts">
	import ImageB64 from '$lib/components/ImageB64.svelte';
	import type { EventClient } from '../../app';
	import Button from './ui/button/button.svelte';

	export let event: EventClient;

	let regexExpr = /(\n){2,}/g;
</script>

<div class="event bg-background">
	<div class="img h-1/2 w-full">
		{#if event.image}
			<ImageB64 imageb64={event.image} alt={`Événement ${event.title}`} alternativeImageSrc="" />
		{/if}
	</div>
	<div class="h-1/2">
		<h3>{event.title}</h3>
		<h5>
			{new Intl.DateTimeFormat('fr-Fr', {
				dateStyle: 'medium',
				timeStyle: 'short',
				timeZone: 'Europe/Paris'
			}).format(Date.parse(event.date))}
		</h5>
		<div class="flex flex-col justify-between h-full">
			<p class="my-2 max-h-2/3 overflow-hidden line-clamp-[11]">{event.text}</p>
			<Button href={'/events/' + event.id} class="text-secondary w-56 text-xl mx-auto"
				>Voir l'événement</Button
			>
		</div>
	</div>
</div>

<style lang="scss">
	.event {
		padding: 2em 2em 7em 2em;
		color: black;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		color: #353535;
		position: relative;
		border-radius: 8px;
		max-width: 20vw;
		min-width: 330px;
		margin: 2em;
		width: 18vw;
		height: 70vh;
		min-height: 580px;
		font-size: small;

		.img {
			overflow: hidden;
			border-radius: 8px;
			position: relative;

			:global(img) {
				border-radius: 8px;
				margin: auto;
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		h3 {
			margin: 8px 5px 4px 5px;
			letter-spacing: 0.025em;
			font-size: 1.2rem;
		}

		h5 {
			margin: 0 0 0 5px;
		}
	}
</style>
