<script lang="ts">
	import Dialog from '../../../components/dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;

	let dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog title="Adjust config" {isOpen} on:close={handleClose}>
	<div slot="body" class="flex flex-col gap-4 my-4">
		<div class="flex flex-col gap-2">
			<h1>Wake up config</h1>

			<div class="flex flex-col gap-4">
				<div class="flex gap-2">
					<div class="grow">
						<label for="">From</label>
						<input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="time" />
					</div>

					<div class="grow">
						<label for="">To</label>
						<input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="time" />
					</div>
				</div>

				<div class="flex gap-2">
					
					<div class="flex flex-col grow">
						<label for="">Allow before</label>
						<input type="range" min="0" max="180" step="5">
						<!-- <input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="number" /> -->
					</div>

					
					<div class="flex flex-col grow">
						<label for="">Allow after</label>
						<input type="range" min="0" max="180" step="5">
						<!-- <input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="number" /> -->
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h1>In bed config</h1>

			<div class="flex flex-col gap-4">
				<div class="flex gap-2">
					<div class="grow">
						<label for="">From</label>
						<input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="time" />
					</div>

					<div class="grow">
						<label for="">To</label>
						<input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="time" />
					</div>
				</div>

				<div class="flex gap-2">
					<div class="flex flex-col grow">
						<label for="">Allow before</label>
						<input type="range" min="0" max="180" step="5">
						<!-- <input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="number" /> -->
					</div>

					<div class="flex flex-col grow">
						<label for="">Allow after</label>
						<input type="range" min="0" max="180" step="5">
						<!-- <input class="w-full px-4 py-2 bg-slate-700 rounded-lg" type="number" /> -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<div slot="footer">
		<button class="px-4 py-2 rounded-full text-slate-100 font-semibold" on:click={handleClose}
			>Close</button
		>
		<button
			class="px-4 py-2 bg-sky-500 rounded-full text-slate-100 font-semibold"
			on:click={handleClose}>Apply</button
		>
	</div>
</Dialog>
