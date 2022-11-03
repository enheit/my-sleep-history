<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Menu from '@smui/menu';

	let menu: Menu;

	const dispatch = createEventDispatcher();
</script>

<div>
	<button
		class="flex items-center justify-center rounded-full hover:bg-slate-800 items-center justify-center p-1 rounded-full"
		on:click={() => menu.setOpen(true)}
	>
		<span class="material-symbols-outlined">more_vert</span>
	</button>

	<Menu class="bg-slate-800 rounded-lg" bind:this={menu} anchorCorner="BOTTOM_LEFT">
		<div class="flex flex-col">
			<button
				class="flex items-center gap-2 p-2 hover:bg-slate-700"
				on:click={() => dispatch('edit')}
			>
				<span class="material-symbols-outlined"> edit </span>
				Edit
			</button>
			<button
				class="flex items-center gap-2 p-2 hover:bg-red-500/70"
				on:click={() => dispatch('delete')}
			>
				<span class="material-symbols-outlined"> delete </span>
				Remove
			</button>
		</div>
	</Menu>
</div>
