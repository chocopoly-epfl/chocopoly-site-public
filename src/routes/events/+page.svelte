<!-- @format -->
<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import EventCard from "../../lib/components/EventCard.svelte";
	import IconButton from "$components/IconButton.svelte";
	import { goto } from "$app/navigation";
	export let data: PageData;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Événements | Chocopoly</title>
	<meta name="title" content="Événements | Chocopoly" />
	<meta name="description" content={`Liste des événements de Chocopoly`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Événements | Chocopoly" />
	<meta property="og:description" content={`Liste des événements de Chocopoly`} />
</svelte:head>

<main>
	{#if data.admin}
		<div class="add-button-container">
			<IconButton
				action={() => goto("/events/create")}
				icon="material-symbols:add"
				inline={true}
				label="Créer un événement"
			/>
		</div>
	{/if}
	{#if data.events.length == 0}
		<h1 class="text-secondary">Il n'y a aucun événement prévu pour le moment</h1>
	{/if}
	<div id="event-container">
		{#each data.events as event}
			<EventCard {event} />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		min-height: 90vh;
		position: relative;
		background: rgb(205,0,0);
		background: linear-gradient(138deg, rgba(205,0,0,1) 0%, rgba(205,0,0,1) 59%, rgba(85,19,8,1) 100%); 

		h1 {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
			font-size: 2.5rem;
		}
	}

	#event-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 4em 0;
	}

	.add-button-container {
		position: fixed;
		bottom: 40px;
		right: 40px;
		z-index: 3;
		:global(button) {
			background-color: limegreen;
			border-radius: 200px;
		}

		:global(svg) {
			font-size: 60px;
		}
	}
</style>
