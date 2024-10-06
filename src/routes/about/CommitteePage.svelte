<script lang="ts">
	import type { Committee } from "./Committee";

	export let committee: Committee;

	let {name, title, desc, imagePath, email}: Committee = committee

</script>

<div class="bg-white text-center mx-5 my-5 w-64 h-[540px] overflow-y-scroll p-2 relative overflow-x-clip">
	
	{#if imagePath}
		<img alt={`${name} photo`} src={imagePath} class="rounded-full mx-auto mb-4 w-1/2"/>
	{:else}
		<img alt={`empty photo`} src="./committee/default.png" class="rounded-full mx-auto mb-4 w-1/2"/>
	{/if}

	<h5 class="my-2">{name}</h5>
	<span class="d-block text-primary my-1" >{title}</span>
	
	<p class="text-gray-400 text-sm my-3 w-4/5 mx-auto text-justify">{desc}</p>

	<p class="block absolute bottom-2 text-xs w-full">&gt; <a href={`mailto:${email}`} class="underline text-primary">{email}</a> &lt;</p>


</div>