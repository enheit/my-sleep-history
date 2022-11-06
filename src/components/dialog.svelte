<script lang="ts">
	import clickOutside from '../helpers/click-outside';
	import { createEventDispatcher } from 'svelte';
	import focusTrap from '../helpers/focus-trap';
	import { browser } from '$app/environment';

	export let title: String;
	export let isOpen = false;

	const dispatch = createEventDispatcher();

	$: if (browser) { document.body.classList[isOpen ? 'add' : 'remove']('overflow-hidden') }

	function handleClose() {
		dispatch('close');
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.code === 'Escape') {
			handleClose();
		}
	}
</script>

{#if isOpen}
	<div
		use:focusTrap
		class="flex fixed justify-center items-center top-0 right-0 left-0 bottom-0 bg-black/70"
		on:keydown={handleKeyDown}
	>
		<div
			class="max-w-screen-sm w-full bg-slate-800 p-4 rounded-lg drop-shadow-lg m-4"
			use:clickOutside
			on:outclick={handleClose}
		>
			<div>
				<slot name="header">
					<h1 class="text-2xl font-semibold text-slate-100">{title}</h1>
				</slot>
			</div>
			<div>
				<slot name="body" />
			</div>
			<div class="flex justify-end">
				<slot name="footer" />
			</div>
		</div>
	</div>
{/if}
