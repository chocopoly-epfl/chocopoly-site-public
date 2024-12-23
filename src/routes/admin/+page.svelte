<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import type { PageData } from "../$types";

	export let data: PageData

	async function logout() {
		await fetch("/admin/logout", { method: "POST" });
		await goto("/");
		invalidateAll();
	}
</script>
<div class="bg-primary h-fit min-h-full py-5">
	{#if !data.admin}
		<div class="bg-gray-200 p-5">
			<h3 class="text-xl font-semibold">Login</h3>
			<form method="post" action="?/login">
				<label>
					Password :
					<input name="password" type="password" class="border-1"/>
				</label>
			
				<button type="submit">Submit</button>
			</form>
		</div>

	{:else}
		<div class="bg-gray-200 p-5">
			<h3 class="text-xl font-semibold">Logout</h3>
			<form>
				<button on:click={() => {logout()}}>Submit</button>
			</form>
		</div>
	{/if}
	
</div>

