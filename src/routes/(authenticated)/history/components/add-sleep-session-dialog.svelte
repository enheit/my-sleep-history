<script lang="ts">
	import Dialog from '../../../../components/dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;

	let dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog title="Add sleep session" {isOpen} on:close={handleClose}>
	<div slot="footer">
		<button class="px-4 py-2 text-slate-100" on:click={handleClose}> Close </button>
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Add session</button
		>
	</div>
</Dialog>
