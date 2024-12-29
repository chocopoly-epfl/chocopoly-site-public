<!-- @format -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Label from "$components/ui/label/label.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input, type FormInputEvent } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { error, info, warning } from "$lib/stores";
	import { getBase64FromFile } from "$lib/utils";
	import Compressor from "compressorjs";
	import { DateInput } from 'date-picker-svelte';

	let title = "";
	let text = "";
	let date: Date = new Date(Date.now());
	let image: File | Blob | undefined;
	let link = "";

	//Not stored values in the database
	let submitDisabled = true;
	let isImageProcessing = false;

	const maxDate = new Date(new Date(Date.now()).setFullYear(date.getFullYear() + 2) )

	async function submit() {
		if (isImageProcessing) {
			$warning = "L'image est en cours de traitement. Attendez 5 secondes et recommencez.";
			return;
		}

		fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				date: date,
				imageB64: image ? await getBase64FromFile(image) : null,
				text,
				link
			}),
		}).then(async (res) => {
			const body = await res.json();
			if (res.ok) {
				goto("/events/" + body.id);
				$info = "L'évènement a bien été créé";
			} else {
				$error = body.message;
			}
		});
	}


	function handleImageChange(value: FormInputEvent) {
		const images = (value.target as HTMLInputElement).files
		if (images && images[0]) {
			if (images[0].size > 4e6) {
				$warning = "Image max 4MB";
				(value.target as HTMLInputElement).value = ""
				image = undefined;
			} else {
				isImageProcessing = true;
				console.log("Processing image");

				new Compressor(images[0], {
					quality: 0.6,
					mimeType: "image/webp",
					maxWidth: 1536,
					maxHeight: 864,
					async success(result) {
						console.log("Image processing finished.");
						image = result;
						isImageProcessing = false;
					},
					error(err) {
						(value.target as HTMLInputElement).value = ""
						$error = "An error occured, see console"
						console.log(err.message);
					},
				});
			}
		}
	}
</script>
<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Créer un événement</title>
	<meta name="title" content="Créer un événement" />
	<meta name="description" content="Créer un événement." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Créer un événement" />
	<meta property="og:description" content="Créer un événement." />
</svelte:head>

<main>
	<div id="img" />
	<div id="wrapper">
		<form
			on:change={() => {
				submitDisabled = (() => {
					if (!title || !text || !date) return true;
					return false;
				})();
			}}
		>
		<div class="flex w-full max-w-sm flex-col gap-1.5 dialog-input-elem">
			<Label for="title">Titre</Label>
			<Input type="text" id="title" bind:value={title} />
		</div>

		<div class="grid w-11/12 gap-1.5 dialog-input-elem">
			<Label for="description">Description</Label>
			<Textarea id="description" bind:value={text} class="min-h-64"/>
		</div>

		<div class="flex w-full max-w-sm flex-col gap-1.5 dialog-input-elem">
			<Label for="link">Lien staff</Label>
			<Input type="text" id="link" bind:value={link} />
		</div>

		<div class="flex w-full max-w-sm flex-col gap-1.5 dialog-input-elem">
			<Label for="date">Date</Label>
			<DateInput bind:value={date} max={maxDate} timePrecision="minute" id="date" closeOnSelection/>
		</div>

		<div class="grid w-full max-w-sm items-center gap-1.5 dialog-input-elem">
			<Label for="image">Image</Label>
			<Input id="image" type="file" on:change={handleImageChange}/>
		</div>

			<Button disabled={submitDisabled} on:click={submit}>Créer l'événement</Button>
		</form>
	</div>
</main>

<style lang="scss">

	:root {
			--date-input-width: fit-content; //Makes date input take more width space
		}
	main {
		min-height: 90vh;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		padding: 15px;

		#img {
			filter: blur(3px);
			background: url("/images/events/banner.webp") center/cover;
			position: absolute;
			height: 100%;
			width: 100%;
		}

		.dialog-input-elem {
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			margin-left: 0.5rem;
		}
	}

	#wrapper {
		width: 700px;
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		padding: 72px 55px 90px;
		z-index: 1;

	}

</style>