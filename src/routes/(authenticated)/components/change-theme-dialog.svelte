<script lang="ts">
	import Dialog from '../../../components/dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;

	let dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog title="Select theme" {isOpen} on:close={handleClose}>
	<div class="flex items-start my-4 gap-4" slot="body">
		<div class="flex flex-col items-center grow gap-4">
			<div class="w-full border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
				<div class="flex flex-col items-end justify-end rounded-tl-lg ml-4 mt-4 p-4 h-28 bg-slate-800">
					<div class="rounded-full w-24 h-4 bg-sky-500"></div>
				</div>
			</div>

			<p>Dark theme</p>
		</div>


		<div class="flex flex-col items-center grow gap-4">
			<div class="w-full border border-slate-700 rounded-lg grow bg-slate-300 overflow-hidden">
				<div class="flex flex-col items-end justify-end rounded-tl-lg ml-4 mt-4 p-4 h-28 bg-slate-100">
					<div class="rounded-full w-24 h-4 bg-sky-500"></div>
				</div>
			</div>

			<p>Light theme</p>
		</div>


		<div class="flex flex-col items-center grow gap-4">
			<div class="w-full border border-slate-700 rounded-lg grow bg-slate-900 overflow-hidden">
				<div class="flex flex-col items-end justify-end rounded-tl-lg ml-4 mt-4 p-4 h-28 bg-slate-800">
					<div class="rounded-full w-24 h-4 bg-sky-500"></div>
				</div>
			</div>

			<p>System theme</p>
		</div>

	</div>
	<div slot="footer">
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Done</button
		>
	</div>
</Dialog>
