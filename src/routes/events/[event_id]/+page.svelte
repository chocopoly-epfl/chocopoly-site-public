<!-- @format -->
<script lang="ts">
	import { page } from '$app/stores';
	import ImageB64 from '$lib/components/ImageB64.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import IconButton from '$components/IconButton.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Edit from './Edit.svelte';
	import { goto } from '$app/navigation';
	import { error } from '$lib/stores';

	export let data: PageData;

	const dateFormater = new Intl.DateTimeFormat('fr-Fr', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Europe/Paris'
	});

	const dateStringUser = dateFormater.format(Date.parse(data.event.date));

	const menuOpen: Writable<Boolean> = getContext('menuOpen');

	const openDeleteConfirmDialog = writable(false);
	const openEditDialog = writable(false);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.event.title}</title>
	<meta name="title" content={`Chocopoly | ${data.event.title} `} />
	<meta name="description" content={`Un événement de Chocopoly le ${dateStringUser}`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={`Chocopoly | ${data.event.title}`} />
	<meta property="og:description" content={`Un événement de Chocopoly le ${dateStringUser}`} />
</svelte:head>

<main class="h-[100%] bg-black">
	<div class="h-full relative">
		<div class="h-full w-full backdrop-blur py-2">
			<div id="wrapper" class="mx-auto {$menuOpen ? 'w-3/4' : 'w-4/5'} duration-500 relative">
				{#if data.event.image}
					<ImageB64 imageb64={data.event.image} alt="Événement" alternativeImageSrc="" />
				{/if}
				<h2>{data.event.title}</h2>
				<h3>
					{dateStringUser}
				</h3>

				<div class="flex flex-col md:flex-row">
					<p id="description" class="pr-14 whitespace-pre-line">
						{data.event.text}
					</p>
					<p class="mr-4">
						{#if data.event.link}
							<Button href={data.event.link}>Envie de staffer ?</Button>
						{:else}
							<p>Nous n'avons pas besoin de staff pour cet événement.</p>
						{/if}
					</p>
				</div>

				{#if data.admin}
					<div class="absolute top-4 flex flex-row black right-5">
						<div class="admin-btn" style="right: 60px;">
							<IconButton
								icon="material-symbols:delete-outline"
								action={() => ($openDeleteConfirmDialog = true)}
								label={`Supprimer l'événement ${data.event.title}`}
								inline={true}
							/>
						</div>
						<div class="admin-btn" style="right: 120px;">
							<IconButton
								icon="material-symbols:edit"
								action={() => openEditDialog.set(true)}
								label="Supprimer l'événement"
								inline={true}
							/>
						</div>
					</div>
					<Edit event={data.event} open={openEditDialog} />

					<Dialog.Root
						open={$openDeleteConfirmDialog}
						onOutsideClick={() => ($openDeleteConfirmDialog = false)}
					>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Supprimer ?</Dialog.Title>
								<Dialog.Description
									>Êtes vous sûr de vouloir supprimer cet événement?</Dialog.Description
								>
							</Dialog.Header>
							<Dialog.Footer>
								<Button
									on:click={() => {
										$openDeleteConfirmDialog = false;
									}}>Annuler</Button
								>
								<Button
									on:click={() => {
										$openDeleteConfirmDialog = false;
										const searchParam = new URLSearchParams({ id: `${data.event.id}` });
										fetch(`/api/events?${searchParam}`, {
											method: 'DELETE'
										})
											.then((res) => {
												goto(`/events`);
											})
											.catch((err) => {
												$error = err.message;
											});
									}}>Oui</Button
								>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
				{/if}
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	main > div {
		background: url('/events/banner.jpg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		backdrop-filter: blur(5px);
	}
	#wrapper {
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		padding: 40px 55px 90px;
		z-index: 1;
		position: relative;

		h2 {
			font-size: 1.65em;
			font-weight: 400;
			letter-spacing: 4px;
			margin: 0 0 0.5em 0;
			line-height: 1.75em;
		}

		h3 {
			font-weight: 400;
			letter-spacing: 2px;
			margin-bottom: 2em;
		}

		:global(img) {
			max-height: 45vh;
			margin: 2em auto;
			display: block;
			object-fit: cover;
			width: 100%;
		}

		#description {
			display: block;
			width: 100%;
			font-size: 20px;
			letter-spacing: 1px;
			line-height: 1.25em;
			text-align: justify;
		}
	}

	.admin-btn {
		:global(button) {
			padding: 10px;
			border-radius: 200px;

			&:hover {
				background-color: lightgray;
				transition: 0.5s;
			}

			&:active {
				background-color: white;
			}
		}

		:global(svg) {
			font-size: 24px;
			color: black;
		}
	}
</style>
