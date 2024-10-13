<!-- @format -->
<script lang="ts">
	import { page } from '$app/stores';
	import ImageB64 from '$lib/components/ImageB64.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';


	export let data: PageData;

	const { event_id } = $page.params;

	const dateFormater = new Intl.DateTimeFormat('fr-Fr', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Europe/Paris'
	});

	const dateStringUser = dateFormater.format(Date.parse(data.event.date))
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.event.title}</title>
	<meta name="title" content={`Chocopoly | ${data.event.title} `} />
	<meta
		name="description"
		content={`Un événement de Chocopoly le ${dateStringUser}`}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={`Chocopoly | ${data.event.title}`} />
	<meta
		property="og:description"
		content={`Un événement de Chocopoly le ${dateStringUser}`}
	/>
</svelte:head>

<main class="h-[100%] bg-black">
	<div class="h-full py-2 relative">
		<div id="wrapper" class="mx-auto w-3/4">
			{#if data.event.image}
				<ImageB64 imageb64={data.event.image} alt="Événement" alternativeImageSrc="" />
			{/if}
			<h2>{data.event.title}</h2>
			<h3>
				{dateStringUser}
			</h3>

			<div id="split">
				<p id="description">
					{data.event.text}
				</p>
				<p>
					<Button>Envie de staffer ?</Button>
				</p>
			</div>

			

		</div>
	</div>

</main>

<style lang="scss">
	main > div {
		background: url("/events/banner.jpg");
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
</style>
