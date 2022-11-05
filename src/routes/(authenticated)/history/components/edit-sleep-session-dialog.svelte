<script lang="ts">
	import Dialog from '../../../../components/dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;

	let dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog title="Edit sleep session" {isOpen} on:close={handleClose}>
	<div slot="body" class="flex flex-col gap-4 my-4">
		<div>
			<label for="in-bed-at">In bed at</label>
			<input
				id="in-bed-at"
				class="rounded-lg bg-slate-700 px-4 py-2 w-full"
				type="datetime-local"
			/>
		</div>

		<div>
			<label for="woke-up-at">Woke up at</label>
			<input
				id="woke-up-at"
				class="rounded-lg bg-slate-700 px-4 py-2 w-full"
				type="datetime-local"
			/>
		</div>

		<div class="flex gap-2 items-center">
			<label for="nap">Is it napping?</label>
			<input id="nap" type="checkbox" />
		</div>
	</div>
	<div slot="footer">
		<button class="px-4 py-2 text-slate-100" on:click={handleClose}> Close </button>
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Update</button
		>
	</div>
</Dialog>
