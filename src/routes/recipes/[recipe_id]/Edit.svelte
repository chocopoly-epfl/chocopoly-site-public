<!-- @format -->
<script lang="ts">
	import * as Dialog from '$components/ui/dialog';
	import Label from '$components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input, type FormInputEvent } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { error, warning } from '$lib/stores';
	import { getBase64FromFile } from '$lib/utils';
	import Compressor from 'compressorjs';
	import { DateInput } from 'date-picker-svelte';
	import type { Writable } from 'svelte/store';
	import type { SerializedEvent, SerializedRecipe } from '../../../app';
	import Checkbox from '$components/ui/checkbox/checkbox.svelte';
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */

	export let recipe: SerializedRecipe;

	export let open: Writable<boolean>;

	let image: File | Blob | undefined;
	let isImageProcessing = false;

	async function handleImageChange(value: FormInputEvent) {
		const images = (value.target as HTMLInputElement).files;
		if (images && images[0]) {
			if (images[0].size > 4e6) {
				$warning = 'Image max 4MB';
				(value.target as HTMLInputElement).value = '';
				image = undefined;
			} else {
				isImageProcessing = true;
				console.log('Processing image');

				new Compressor(images[0], {
					quality: 0.6,
					mimeType: 'image/webp',
					maxWidth: 1536,
					maxHeight: 864,
					async success(result) {
						console.log('Image processing finished.');
						image = result;
						isImageProcessing = false;
					},
					error(err) {
						(value.target as HTMLInputElement).value = '';
						$error = 'An error occured, see console';
						console.error(err.message);
					}
				});
			}
		}
	}

	async function submit() {
		if (isImageProcessing) {
			$warning = "L'image est en cours de traitement. Attendez 5 secondes et recommencez.";
			return;
		}

		const searchParam = new URLSearchParams({ id: `${recipe.id}` });
		fetch(`/api/recipes?${searchParam}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				title: recipe.title,
				text: recipe.text,
				published: recipe.published,
				imageB64: image ? await getBase64FromFile(image) : undefined
			})
		})
			.then((res) => {
				location.reload();
			})
			.catch((err) => {
				$error = err.message;
			});
	}

	$: submitDisabled = (() => {
		if (!recipe.title || !recipe.text) return true;
		return false;
	})();

	const carta = new Carta({
		sanitizer: false
	})
</script>

{#if recipe != undefined}
	<Dialog.Root
		open={$open}
		onOutsideClick={() => ($open = false)}
		onOpenChange={(newOpen) => {
			if (!newOpen && $open) {
				$open = false;
			}
		}}
	>
		<!-- onOpenChange is here only because clicking on the 'x' button to close the dialog doesn't update the
		store $open 
	-->
		<Dialog.Content class="!max-w-4xl h-[95%]">
			<Dialog.Header>
				<Dialog.Title>Editer la recette</Dialog.Title>
			</Dialog.Header>
			<div id="scroll-component" class="overflow-y-scroll overflow-x-clip">
				<div class="flex w-full max-w-sm flex-col gap-1.5 dialog-input-elem">
					<Label for="title">Titre</Label>
					<Input type="text" id="title" bind:value={recipe.title} />
				</div>
	
				<div class="flex items-center space-x-2">
					<Checkbox id="published" bind:checked={recipe.published} aria-labelledby="published-label" />
					<Label
						id="published-label"
						for="published"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Publique ?
					</Label>
				</div>
	
				<MarkdownEditor {carta} bind:value={recipe.text} />

				<div class="grid w-full max-w-sm items-center gap-1.5 dialog-input-elem">
					<Label for="image">Image</Label>
					<Input id="image" type="file" on:change={handleImageChange} />
				</div>
			</div>
			<Dialog.Footer>
				<Button
					on:click={() => {
						$open = false;
					}}>Annuler</Button
				>
				<Button
					on:click={() => {
						$open = false;
						submit();
					}}
					disabled={submitDisabled}>Modifier</Button
				>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<style lang="scss">
	:root {
		--date-input-width: fit-content; //Makes date input take more width space
	}

	.dialog-input-elem {
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
		margin-left: 0.5rem;
	}

	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
	}
</style>
