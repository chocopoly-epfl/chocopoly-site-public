<script lang="ts">
	import { writable } from "svelte/store";
	import "../app.css";
	import { setContext } from "svelte";
	import type { PageData } from "./$types";
	import Button from "$lib/components/ui/button/button.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import AlertDisplay from "$components/AlertDisplay.svelte";

	export let data: PageData

	const links: {href: string, name: string}[] =[
		{href: '/', name: 'Accueil'},
		{href: '/recipes', name: 'Recettes'},
		{href: '/events', name: 'Événements'},
		{href: '/committee', name: 'Comité'},
	]

	const menuOpen = writable(false)
	setContext("menuOpen", menuOpen)	

	async function logout() {
		await fetch("/admin/logout", { method: "POST" });
		await goto("/");
		invalidateAll();
	}
	
</script>
<div class="h-full">
	<nav class="{$menuOpen ? 'md:w-[250px] w-full' : 'w-0'} h-screen fixed z-20 top-0 right-0 bg-primary overflow-x-hidden pt-4 md:pt-16 duration-500">
		<div class="w-fit mx-auto my-20">
			{#each links as link}
				<a href={link.href} on:click={() => {$menuOpen = false}} class="m-2 ml-8 w-fit text-xl text no-underline  text-secondary block duration-300 transition-colors hover:text-[#ff0000] hover:border-b-2 md:text-xl">{link.name}</a>
			{/each}
		</div>

		<div class:hidden={!data.admin} class="absolute bottom-0 w-full bg-slate-200 p-5">
			<Button class="mx-auto block" on:click={logout}>Se déconnecter</Button>

		</div>
	</nav>
	
	<div id="notnav-container" class="{$menuOpen ? 'md:mr-[250px]' : 'mr-0'} transition-margin duration-500 h-full flex flow-col">
		<header class="h-[7rem] bg-accent flex justify-between content-center items-center grow-0 shrink basis-auto">
			<a href="/" class="h-[80%] translate-y-[-0.45rem] mx-8 mt-[1rem] flex"><img src="/logo-header.svg" alt="Logo chocopoly" class="object-contain"></a>
			<button id="menu-button" class="mx-8 my-2 h-fit z-50 right-0 {$menuOpen ? 'fixed md:block' : ''}" on:click={() => $menuOpen = !$menuOpen} class:menuOpen={$menuOpen} >
				<div id="bar1" class="bg-secondary"></div>
				<div id="bar2" class="bg-secondary"></div>
				<div id="bar3" class="bg-secondary"></div>
			</button>
		</header>
		
		<main class="grow shrink basis-auto">
			<slot></slot>
		</main>
	</div>
</div>

<AlertDisplay/>

<style lang="postcss">
	#menu-button > div {
		width: 35px;
		height: 5px;
		margin: 6px 0;
		transition: 0.4s;
	}

	/* Rotate first bar */
	.menuOpen > #bar1 {
		transform: translate(0, 11px) rotate(-45deg);
	}

	/* Fade out the second bar */
	.menuOpen > #bar2 {opacity: 0;}

	/* Rotate last bar */
	.menuOpen > #bar3 {
	transform: translate(0, -11px) rotate(45deg);
	}
</style>