<script lang="ts">
	import type { PageData } from "../$types";

	export let data: PageData
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
			<form method="post" action="?/logout">
				<button type="submit">Submit</button>
			</form>
		</div>
	{/if}
	
</div>

