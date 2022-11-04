<script lang="ts">
	import PulsingCircle from './(authenticated)/history/components/pulsing-circle.svelte';
	import { goto } from '$app/navigation';

	import ArrowOne from '../assets/arrows/ArrowOne.svg';
	import ArrowTwo from '../assets/arrows/ArrowTwo.svg';
	import ArrowThree from '../assets/arrows/ArrowThree.svg';
	import ArrowFour from '../assets/arrows/ArrowFour.svg';

	let records = [
		{ id: '1', date: new Date(), inBedAt: new Date(), wokeUpAt: new Date() },
		{ id: '2', date: new Date(), inBedAt: new Date(), wokeUpAt: new Date() },
		{ id: '3', date: new Date(), inBedAt: new Date(), wokeUpAt: new Date() },
		{ id: '4', date: new Date(), inBedAt: new Date(), wokeUpAt: new Date() },
		{ id: '5', date: new Date(), inBedAt: new Date(), wokeUpAt: new Date() }
	];
</script>

<svelte:head>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<div class="flex gap-4 flex-col items-center mt-24">
	<h1 class="text-6xl font-bold">My Sleep History</h1>
	<h2 class="text-2xl text-slate-300">Track and analyze your 🛏️ activity!</h2>

	<div class="flex items-center text-slate-500">
		<span class="material-symbols-outlined"> attach_money </span>
		<p class="">Free to use</p>
	</div>

	<button
		class="z-10 px-8 py-4 text-xl font-semibold mt-10 border-2 border-sky-500 rounded-full"
		on:click={() => goto('/history')}
	>
		Sign in with Google
	</button>


</div>

<div class="flex relative justify-center items-end gap-14" style="margin-top: -100px;">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			<h1 class="text-slate-300">Step 1</h1>
			<p class="font-semibold text-xl">Start sleeping</p>
		</div>

		<div class="relative left-14">
			<ArrowOne />
		</div>
	</div>

	<button
		class="flex relative top-3 items-center gap-2 px-4 py-2 w-48 bg-gradient-to-r from-sky-800 to-blue-700 text-sky-300 font-semibold rounded-full"
	>
		<span class="material-symbols-outlined text-sky-500"> play_arrow </span>
		Start sleeping
	</button>

	<div class="flex flex-col gap-8 relative top-52">
		<div class="flex flex-col relative left-20 top-4" style="max-width: 150px;">
			<h1 class="text-slate-300 inline-block">Step 2</h1>
			<p class="font-semibold text-xl inline-block">Stop sleeping</p>
		</div>

		<ArrowTwo />

		<div class="flex flex-col gap-8">
			<button
				class="flex gap-4 bg-gradient-to-r w-48 from-slate-800 to-red-800/30 items-center gap-2 text-slate-100 bg-slate-800 px-4 py-2 rounded-full"
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

			<div class="flex gap-8 relative" style="left: -310px;">
				<div class="flex flex-col items-end">
					<h1 class="text-slate-300">Then</h1>
					<p class="font-semibold text-xl">Record added to your history</p>
				</div>

				<ArrowThree />
			</div>
		</div>
	</div>
</div>

<div class="mt-64">
	<!-- <div class="flex flex-col">
        <h1 class="text-2xl font-bold">Sleep History</h1>
        <h2 class="text-xl text-slate-500">Your sleep history</h2>
    </div> -->

	<table class="table-auto w-full m-2">
		<thead class="text-left">
			<tr>
				<th class="p-2">Day</th>
				<th class="p-2">Date</th>
				<th class="p-2">In bed at 🛌</th>
				<th class="p-2">Woke up at ⏰</th>
				<th class="p-2">Sleep duration 😴</th>
			</tr>
		</thead>
		<tbody>
			{#each records as record (record.id)}
				<tr class="border-b border-slate-800">
					<td class="p-4">4 nov 22</td>
					<td class="p-4">Friday</td>
					<td>
						<div class="flex p-4 items-center gap-2">
							22:00
							<span class="flex rounded-full w-2 h-2 bg-red-500" />
						</div>
					</td>
					<td>
						<div class="flex p-4 items-center gap-2">
							08:30
							<span class="flex rounded-full w-2 h-2 bg-green-500" />
						</div>
					</td>
					<td class="p-4">9 h. 30 min.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="flex justify-center my-10 gap-8 relative">
	<ArrowFour />

	<div class="flex flex-col absolute left-1/2 ml-16">
		<h1 class="text-slate-300">At the end</h1>
		<p class="font-semibold text-xl">Investigate your sleeping</p>
	</div>
</div>

<div class="flex justify-center relative mt-14 mb-20">
	<div class="bg-slate-800/50 rounded-lg p-4" style="width: 350px;">
		<span class="material-symbols-outlined text-slate-300"> bed </span>
		<div class="flex items-center gap-1">
			<h1 class="text-lg text-slate-300">Target bed time</h1>
		</div>

		<div class="flex flex-col gap-2 mt-4">
			<div class="flex flex-col">
				<p>At time</p>

				<div class="flex items-center gap-2">
					<div class="h-2 w-full bg-green-500 rounded-lg" />
					<p>28</p>
				</div>
			</div>

			<div class="flex flex-col">
				<p>Almost at time</p>
				<div class="flex items-center gap-2">
					<div class="h-2 w-3/6 bg-orange-500 rounded-lg" />
					<p>12</p>
				</div>
			</div>

			<div class="flex flex-col">
				<p>Out of time</p>
				<div class="flex items-center gap-2">
					<div class="h-2 w-1/4 bg-red-500 rounded-lg" />
					<p>12</p>
				</div>
			</div>
		</div>
	</div>

	<div
		class="bg-slate-800 relative rounded-lg p-4 drop-shadow-lg"
		style="width: 200px; left: -50px; top: -50px;"
	>
		<span class="material-symbols-outlined text-slate-300"> sentiment_satisfied </span>
		<h1 class="text-lg text-slate-300">Sleep welthness</h1>

		<div class="flex items-center justify-center mt-4">
			<div class="pie animate" style="--p:88;--c:#22C55E;">88%</div>
		</div>
	</div>

	<div
		class="bg-slate-700 absolute self-start rounded-lg p-4 drop-shadow-lg"
		style="width: 300px; bottom: -50px;"
	>
		<div class="flex items-center gap-1">
			<h1 class="text-lg text-slate-300">Longests sleep duration</h1>
		</div>

		<div class="flex flex-col items-center mt-4">
			<div class="flex gap-1 items-center">
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<div class="h-2 w-8 bg-green-500 rounded-lg" />
				<p>7+</p>
			</div>

			<p>8 h. 36 min.</p>
		</div>
	</div>
</div>

<h1 class="text-center my-4 text-slate-300">Stay healthy!</h1>

<style>
	@property --p {
		syntax: '<number>';
		inherits: true;
		initial-value: 0;
	}

	.pie {
		--p: 20;
		--b: 22px;
		--c: darkred;
		--w: 150px;

		width: var(--w);
		aspect-ratio: 1;
		position: relative;
		display: inline-grid;
		margin: 5px;
		place-content: center;
		font-size: 25px;
		font-weight: bold;
		font-family: sans-serif;
	}
	.pie:before,
	.pie:after {
		content: '';
		position: absolute;
		border-radius: 50%;
	}
	.pie:before {
		inset: 0;
		background: radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b) no-repeat,
			conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
		-webkit-mask: radial-gradient(
			farthest-side,
			#0000 calc(99% - var(--b)),
			#000 calc(100% - var(--b))
		);
		mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
	}
	.pie:after {
		inset: calc(50% - var(--b) / 2);
		background: var(--c);
		transform: rotate(calc(var(--p) * 3.6deg)) translateY(calc(50% - var(--w) / 2));
	}
	.animate {
		animation: p 1s 0.5s both;
	}
	.no-round:before {
		background-size: 0 0, auto;
	}
	.no-round:after {
		content: none;
	}
	@keyframes p {
		from {
			--p: 0;
		}
	}
</style>
