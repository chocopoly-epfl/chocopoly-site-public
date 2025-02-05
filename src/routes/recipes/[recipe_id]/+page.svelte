<!-- @format -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IconButton from '$components/IconButton.svelte';
	import ImageB64 from '$lib/components/ImageB64.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { error } from '$lib/stores';
	import { Carta, Markdown } from 'carta-md';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const menuOpen: Writable<Boolean> = getContext('menuOpen');

	const openDeleteConfirmDialog = writable(false);
	const openEditDialog = writable(false);

	const carta = new Carta({
		sanitizer: false
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.recipe.title}</title>
	<meta name="title" content={`Chocopoly | ${data.recipe.title} `} />
	<meta name="description" content={`Recette de ${data.recipe.title}`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={`Chocopoly | ${data.recipe.title}`} />
	<meta property="og:description" content={`Recette de ${data.recipe.title}`} />
</svelte:head>

<main class="h-[100%] bg-black">
	<div class="h-full relative">
		<div class="h-full w-full backdrop-blur py-2">
			<div id="wrapper" class="mx-auto {$menuOpen ? 'w-3/4' : 'w-4/5'} duration-500 relative">
				{#if data.recipe.image}
					<ImageB64
						imageb64={data.recipe.image}
						alt="Recette de ${data.recipe.title}"
						alternativeImageSrc=""
					/>
				{/if}
				<h2>{data.recipe.title}</h2>

				<Markdown {carta} value={data.recipe.text} />

				{#if data.admin}
					<div class="absolute top-4 flex flex-row black right-5">
						<div class="admin-btn" style="right: 60px;">
							<IconButton
								icon="material-symbols:delete-outline"
								action={() => ($openDeleteConfirmDialog = true)}
								label={`Supprimer la recette ${data.recipe.title}`}
								inline={true}
							/>
						</div>
						<div class="admin-btn" style="right: 120px;">
							<IconButton
								icon="material-symbols:edit"
								action={() => openEditDialog.set(true)}
								label="Éditer la recette"
								inline={true}
							/>
						</div>
					</div>

					<Dialog.Root
						open={$openDeleteConfirmDialog}
						onOutsideClick={() => ($openDeleteConfirmDialog = false)}
					>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Supprimer ?</Dialog.Title>
								<Dialog.Description
									>Êtes vous sûr de vouloir supprimer cette recette?</Dialog.Description
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
										const searchParam = new URLSearchParams({ id: `${data.recipe.id}` });
										fetch(`/api/recipes?${searchParam}`, {
											method: 'DELETE'
										})
											.then((res) => {
												goto(`/recipes`);
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

		:global(img) {
			max-height: 45vh;
			margin: 2em auto;
			display: block;
			object-fit: cover;
			width: 100%;
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
