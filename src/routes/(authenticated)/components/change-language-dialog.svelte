<script lang="ts">
	import Dialog from '../../../components/dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;

	let dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog title="Select language" {isOpen} on:close={handleClose}>
	<div class="my-4" slot="body">
		<select class="w-full p-4 bg-slate-700 rounded-lg" name="" id="" placeholder="Language">
			<option value="">English</option>
			<option value="">Українська</option>
		</select>
	</div>
	<div slot="footer">
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Done</button
		>
	</div>
</Dialog>
