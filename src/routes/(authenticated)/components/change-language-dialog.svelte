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
		<label for="language">Current language</label>
		<select id="language" class="w-full px-4 py-2 bg-slate-700 rounded-lg" name="" placeholder="Language">
			<option value="eng">English</option>
			<option value="uk">Українська</option>
		</select>
	</div>
	<div slot="footer">
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Done</button
		>
	</div>
</Dialog>
