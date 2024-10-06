<script lang="ts">
	import type { Committee } from './Committee';
	import CommitteePage from './CommitteePage.svelte';

	const committees: Committee[] = [
		{
			name: 'Test Test',
			title: 'Chocoprésident',
			email: 'president@chocopoly.ch',
			desc: 'Le chocoprésident'
		}];
</script>

<div
	class="bg-primary h-fit min-h-full flex flex-wrap flex-row justify-center align-middle content-center py-5"
>
	{#each committees as committee}
		<CommitteePage {committee} />
	{/each}
</div>
