<!-- @format -->
<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import EventCard from "../../lib/components/EventCard.svelte";
	import IconButton from "$components/IconButton.svelte";
	import { goto } from "$app/navigation";
	import RecipeCard from "./RecipeCard.svelte";
	import ImageB64 from "$components/ImageB64.svelte";
	import { Carta, Markdown } from "carta-md";
	export let data: PageData;

	const carta = new Carta({
		sanitizer: false
	});

</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Recettes | Chocopoly</title>
	<meta name="title" content="Recettes | Chocopoly" />
	<meta name="description" content={`Liste des recettes de Chocopoly`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Recettes | Chocopoly" />
	<meta property="og:description" content={`Liste des recettes de Chocopoly`} />
</svelte:head>

<main>
	{#if data.admin}
		<div class="add-button-container">
			<IconButton
				action={() => goto("/recipes/create")}
				icon="material-symbols:add"
				inline={true}
				label="Créer une recette"
			/>
		</div>
	{/if}
	{#if data.recipes.length == 0}
		<h1 class="text-secondary">Il n'y a pas de recettes pour le moment</h1>
	{/if}
	<div id="recipe-container" class="w-[90%] mx-auto">
		{#each data.recipes as recipe}
			<a href={`recipes/${recipe.id}`}>
				<div class="bg-white w-full h-[200px] my-5 flex p-2 ">
					<ImageB64 imageb64={recipe.image} alt={recipe.title} alternativeImageSrc="" class_name="h-full w-[200px] object-fit p-3"/>
					<div class="pr-10">
						<h4 class="border-b-2 p-2 text-2xl">{recipe.title}</h4>
						<p class="overflow-hidden p-2 h-[122px]" >
							<Markdown {carta} value={recipe.text} />
						</p>
						
					</div>
				</div>
			</a>
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

	#recipe-container {
		display: flex;
		justify-content: center;
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
