<script lang="ts">
	import { format, differenceInMinutes, addMinutes } from 'date-fns';
	import Dialog from '../components/dialog.svelte';
	import AddSleepSessionDialog from './components/add-sleep-session-dialog.svelte';
	import PulsingCircle from './components/pulsing-circle.svelte';

	import MoreVert from './components/more-vert.svelte';

	interface Record {
		id: String;
		date: Date;
		wokeUpAt: Date;
		inBedAt: Date;
	}

	let records: Record[] = [
		{ id: '1', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '2', date: new Date(), wokeUpAt: addMinutes(new Date(), 128), inBedAt: new Date() },
		{ id: '3', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '4', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '5', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '6', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '7', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '8', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '9', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '10', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '11', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '12', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '13', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '14', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() },
		{ id: '15', date: new Date(), wokeUpAt: new Date(), inBedAt: new Date() }
	];

	function getSleepDurationAsText(wokeUpAt: Date, inBedAt: Date): String {
		let sleepDurationInMinutes = differenceInMinutes(wokeUpAt, inBedAt);
		let minutesInHour = 60;

		let fullHoursOfSleepDuration = Math.floor(sleepDurationInMinutes / minutesInHour);
		let minutesOfSleepDuration = sleepDurationInMinutes - minutesInHour * fullHoursOfSleepDuration;

		if (fullHoursOfSleepDuration === 0) {
			return `${minutesOfSleepDuration} min.`;
		} else if (minutesOfSleepDuration === 0) {
			return `${fullHoursOfSleepDuration} h.`;
		} else {
			return `${fullHoursOfSleepDuration} h. ${minutesOfSleepDuration} min.`;
		}
	}

	let isAddSleepSessionDialogOpen = false;

	function closeAddSleepSessionDialog() {
		isAddSleepSessionDialogOpen = false;
	}

	function opneAddSleepSessionDialog() {
		isAddSleepSessionDialogOpen = true;
	}

	let isSleepSessionActive = false;
</script>

<div class="flex flex-col ">
	<div class=" bg-slate-900 mt-12 flex justify-between items-center">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold text-slate-100">History</h1>
			<h2 class="text-xl text-slate-300">Your sleep history</h2>
		</div>

		<div class="flex  gap-2 items-center">
			{#if isSleepSessionActive}
				<button
					class="flex gap-4 bg-gradient-to-r from-slate-800 to-red-800/30 items-center gap-2 text-slate-100 bg-slate-800 px-4 py-2 rounded-full"
					on:click={() => (isSleepSessionActive = false)}
				>
					<div class="flex items-center gap-2">
						<PulsingCircle />
						00:12:34
					</div>

					<div class="flex items-center gap-1 text-red-400">
						<span class="material-symbols-outlined"> stop </span>
						Stop
					</div>
				</button>
			{:else}
				<button
					class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-800 to-blue-700 text-sky-300 font-semibold rounded-full"
					on:click={() => (isSleepSessionActive = true)}
				>
					<span class="material-symbols-outlined text-sky-500"> play_arrow </span>
					Start sleeping
				</button>
			{/if}

			<button
				class="text-slate-100 bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center rounded-full bg-slate-500 p-2 text-slate"
				on:click={opneAddSleepSessionDialog}
			>
				<span class="material-symbols-outlined">add</span>
			</button>
		</div>
	</div>

	<table class="mt-12 table-auto border-slate-400 w-full text-slate-100">
		<thead class="sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900  text-left">
			<th class="p-4">Date</th>
			<th class="p-4">Day</th>
			<th class="p-4">In bed at 🛌</th>
			<th class="p-4">Woke up at ⏰</th>
			<th class="p-4">Sleep duration 😴</th>
			<th class="p-4 text-right">Actions</th>
		</thead>
		<tbody>
			{#each records as record (record.id)}
				<tr class="border-b border-slate-800 last:border-b-0">
					<td class="p-4">{format(record.date, 'd MMM yy')}</td>
					<td class="p-4">{format(record.date, 'EEEE')}</td>
					<td>
						<div class="p-4 flex items-center gap-2">
							{format(record.inBedAt, 'HH:mm')}

							<span class="flex rounded-full w-2 h-2 bg-orange-500" />
						</div>
					</td>
					<td>
						<div class="p-4 flex items-center gap-2">
							{format(record.wokeUpAt, 'HH:mm')}

							<span class="flex rounded-full w-2 h-2 bg-red-500" />
						</div>
					</td>
					<td class="p-4">
						<span
							class="bg-gradient-to-r from-green-500/10 to-green-800/40 text-green-200 py-2 px-4 rounded-full"
						>
							{getSleepDurationAsText(record.wokeUpAt, record.inBedAt)}
						</span>
					</td>
					<td>
						<div class="flex justify-end gap-1">
							<MoreVert on:edit={() => alert('Edit')} on:delete={() => alert('Delete')} />
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<button class="mt-8 mb-8 flex gap-2 self-center items-center text-sky-400">
		<span class="material-symbols-outlined">expand_more</span>
		Load more
	</button>
</div>

<AddSleepSessionDialog isOpen={isAddSleepSessionDialogOpen} on:close={closeAddSleepSessionDialog} />

<style>
</style>
