<script lang="ts">
	import type { Committee } from './Committee';
	import CommitteePage from './CommitteePage.svelte';

	const committees: Committee[] = [
		{
			name: 'Fabrice Nemo',
			title: 'Chocoprésident',
			email: 'fabrice.nemo@epfl.ch',
			desc: 'Le chocoprésident'
		},
		{
			name: 'Laura Paraboschi',
			title: 'Chocoprésidente',
			email: 'laura.paraboschi@epfl.ch',
			desc: 'La chocoprésidente'
		},
		{
			name: 'Ryo Saito',
			title: 'Vice-Président',
			email: 'contact@chocopoly.ch',
			desc: 'Le vice-président'
		},
		{
			name: 'Camille Constantin',
			title: 'Trésorière',
			email: 'contact@chocopoly.ch',
			desc: 'La trésorière'
		},
		{
			name: 'Victor Lancieux',
			title: 'Respo Logistique',
			email: 'contact@chocopoly.ch',
			desc: 'Le respo log'
		},
		{
			name: 'Uri Jaquet',
			title: 'Respo Chocommunication',
			email: 'contact@chocopoly.ch',
			desc: 'Le respo chocommunication'
		},
		{
			name: 'Nada Waly',
			title: 'Graphiste',
			email: 'contact@chocopoly.ch',
			desc: 'La graphiste'
		},
		{
			name: 'Sophia Pheng',
			title: 'Respo R&D',
			email: 'contact@chocopoly.ch',
			desc: 'La respo R&D'
		},
		{
			name: 'Antoine Pelletier',
			title: 'Respo Informatique',
			email: 'contact@chocopoly.ch',
			desc: 'Un respo info'
		},
		{
			name: 'Simon Lefort',
			title: 'Respo Informatique',
			email: 'contact@chocopoly.ch',
			desc: 'Un respo info'
		},
		{
			name: 'Alam Khan Burguete',
			title: 'Respo Informatique',
			email: 'contact@chocopoly.ch',
			desc: 'Un respo info'
		},
		{
			name: 'Matthew Meyer',
			title: 'Staff régulier',
			email: 'contact@chocopoly.ch',
			desc: 'Un staff régulier'
		},
		{
			name: 'Adélie Teissier',
			title: 'Staff régulière',
			email: 'contact@chocopoly.ch',
			desc: 'Une staff régulière'
		},
		{
			name: 'Mathieu Zufferey',
			title: 'Staff régulier',
			email: 'contact@chocopoly.ch',
			desc: 'Un staff régulier'
		},
		{
			name: 'Evelyne Sonneville',
			title: 'Staff régulière',
			email: 'contact@chocopoly.ch',
			desc: 'Une staff régulière'
		},
		{
			name: 'Louis Belloir',
			title: 'Staff régulier',
			email: 'contact@chocopoly.ch',
			desc: 'Un staff régulier'
		}
		];
</script>

<div
	class="bg-primary h-fit min-h-full flex flex-wrap flex-row justify-center align-middle content-center py-5"
>
	{#each committees as committee}
		<CommitteePage {committee} />
	{/each}
</div>
