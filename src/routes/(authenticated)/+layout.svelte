<script lang="ts">
	
	import Emoji from './components/emoji.svelte';
	import { goto } from '$app/navigation';

	import Menu from '@smui/menu';
	import SleepConfigDialog from './components/sleep-config-dialog.svelte';
	import ChangeThemeDialog from './components/change-theme-dialog.svelte';
	import { isLastDayOfMonth } from 'date-fns';
	import ChangeLanguageDialog from './components/change-language-dialog.svelte';

	let menu: Menu;

	let isChangeLanguageDialogOpen = false;
	let isChangeThemeDialogOpen = false;
	let isChangeSleepConfigDialogOpen = false;

	function toggleChangeLanguageDialog() {
		isChangeLanguageDialogOpen = !isChangeLanguageDialogOpen;
	}

	function toggleThemeDialogOpenDialog() {
		isChangeThemeDialogOpen = !isChangeThemeDialogOpen;
	}

	function toggleSleepConfigDialog() {
		isChangeSleepConfigDialogOpen = !isChangeSleepConfigDialogOpen;
	}

	function handleChangeSleepConfig() {
		toggleSleepConfigDialog();
		closeMenu();
	}

	function handleChangeTheme() {
		toggleThemeDialogOpenDialog();
		closeMenu();
	}

	function handleChangeLanguage() {
		toggleChangeLanguageDialog();
		closeMenu();
	}

	function handleInsights() {
		closeMenu();
		goto('/insights');
	}

	function handleLogout() {
		closeMenu();
	}

	function closeMenu() {
		menu.setOpen(false);
	}

	function openMenu() {
		menu.setOpen(true);
	}
</script>

<header class="flex justify-between">
	<div>
		<button on:click={() => goto('/')}>
			<p class="text-4xl">💤</p>
		</button>
	</div>

	<div class="flex gap-4 items-center">
		<div class="flex flex-col items-end">
			<p class="leading-none text-slate-100">Roman Mahotskyi</p>
			<p class="text-slate-500 text-sm">roman.mahotskyi@gmail.com</p>
		</div>

		<div class="rounded-lg w-10 h-10 bg-slate-400" />

		<div>
			<button
				class="flex items-center justify-center rounded-full hover:bg-slate-800 items-center justify-center p-1 rounded-full"
				on:click={openMenu}
			>
				<span class="text-slate-100 material-symbols-outlined"> arrow_drop_down </span>
			</button>

			<Menu
				class="bg-slate-800 rounded-lg"
				style="min-width: 200px;"
				bind:this={menu}
				anchorCorner="BOTTOM_LEFT"
			>
				<div class="flex flex-col py-2">
					<button
						on:click={handleChangeSleepConfig}
						class="flex items-center gap-4 p-2 hover:bg-slate-700"
					>
						<span class="material-symbols-outlined"> tune </span>
						Sleep config
					</button>

					<button
						on:click={handleInsights}
						class="flex text-slate-100 items-center gap-4 p-2 hover:bg-slate-700"
					>
						<span class="material-symbols-outlined"> insights </span>
						Insights
					</button>

					<div class="h-px bg-slate-700 my-2" />

					<button
						on:click={handleChangeLanguage}
						class="flex items-center gap-4 p-2 hover:bg-slate-700"
					>
						<span class="material-symbols-outlined"> language </span>

						<div class="flex flex-col items-start">
							Change language
							<span class="text-xs text-slate-300">English</span>
						</div>
					</button>
					<button
						on:click={handleChangeTheme}
						class="flex items-center gap-4 p-2 hover:bg-slate-700"
					>
						<span class="material-symbols-outlined"> palette </span>

						<div class="flex flex-col items-start">
							Change theme
							<span class="text-xs text-slate-300">Dark</span>
						</div>
					</button>

					<div class="h-px bg-slate-700 my-2" />

					<button on:click={handleLogout} class="flex items-center gap-4 p-2 hover:bg-red-500/70">
						<span class="material-symbols-outlined"> logout </span>
						Log out
					</button>
				</div>
			</Menu>
		</div>
	</div>
</header>

<main class="grow">
	<slot />
</main>

<footer class="p-4 flex justify-center">
	<p class="text-slate-100">Sleep well <Emoji /></p>
</footer>

<SleepConfigDialog isOpen={isChangeSleepConfigDialogOpen} on:close={toggleSleepConfigDialog} />
<ChangeThemeDialog isOpen={isChangeThemeDialogOpen} on:close={toggleThemeDialogOpenDialog} />
<ChangeLanguageDialog isOpen={isChangeLanguageDialogOpen} on:close={toggleChangeLanguageDialog} />
