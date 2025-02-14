<script lang="ts">
	export let imageb64: string | undefined;
	export let alternativeImageSrc: string;
	export let alt: string;	
	export let class_name: string = "";
</script>

{#if imageb64}
	<img src={`data:image/png;base64,${imageb64}`} {alt} class={class_name}/>
{:else}
	<img src={alternativeImageSrc} {alt} class={class_name}/>
{/if}

