<div class="flex flex-col">
	<div class="mt-12 flex justify-between items-center">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold text-slate-100">Insights</h1>
			<h2 class="text-xl text-slate-300">Your sleep history</h2>
		</div>

		<select class="bg-slate-800 px-4 py-2 rounded-full" name="" id="" placeholder="This week">
			<option value="">This week</option>
			<option value="">This Moth</option>
			<option value="">Last 3 month</option>
			<option value="">Last 6 month</option>
			<option value="">Last year</option>
		</select>
	</div>
</div>

<div class="flex flex-col gap-2 mt-12 mb-8">
	<div class="flex gap-2">
		<div class="bg-slate-800/50 rounded-lg p-4 grow">
			<span class="material-symbols-outlined text-slate-300"> sentiment_satisfied </span>
			<h1 class="text-lg text-slate-300">Sleep welthness</h1>
			<p>98%</p>
		</div>

		<div class="flex flex-col grow gap-2">
			<div class="bg-slate-800/50 rounded-lg p-4">
				<!-- <span class="material-symbols-outlined text-slate-300"> hourglass_top </span> -->
				<div class="flex items-center gap-1">
					<h1 class="text-lg text-slate-300">Shortest sleep duration</h1>
				</div>

				<div class="flex flex-col items-center mt-4">
					<div class="flex gap-1 items-center">
						<div class="h-2 w-12 bg-orange-500 rounded-lg" />
						<div class="h-2 w-12 bg-orange-500 rounded-lg" />
						<div class="h-2 w-12 bg-orange-500 rounded-lg" />
						<div class="h-2 w-12 bg-orange-500 rounded-lg" />
						<div class="h-2 w-12 bg-gray-500 rounded-lg" />
						<div class="h-2 w-12 bg-gray-500 rounded-lg" />
						<div class="h-2 w-12 bg-gray-500 rounded-lg" />
						<p>7+</p>
					</div>

					<p>4 h. 36 min.</p>
				</div>
			</div>

			<div class="bg-slate-800/50 rounded-lg p-4">
				<span class="material-symbols-outlined text-slate-300"> hourglass_bottom </span>
				<div class="flex items-center gap-1">
					<h1 class="text-lg text-slate-300">Longests sleep duration</h1>
				</div>

				<div class="flex flex-col items-center mt-4">
					<div class="flex gap-1 items-center">
						<div class="h-2 w-12 bg-green-500 rounded-lg" />
						<div class="h-2 w-12 bg-green-500 rounded-lg" />
						<div class="h-2 w-12 bg-green-500 rounded-lg" />
						<div class="h-2 w-12 bg-green-500 rounded-lg" />
						<div class="h-2 w-12 bg-green-500 rounded-lg" />
						<div class="h-2 w-12 bg-gray-500 rounded-lg" />
						<div class="h-2 w-12 bg-gray-500 rounded-lg" />
						<p>7+</p>
					</div>

					<p>9 h. 36 min.</p>
				</div>
			</div>

			<div class="bg-slate-800/50 rounded-lg p-4">
				<span class="material-symbols-outlined text-slate-300"> hourglass_full </span>
				<div class="flex items-center gap-1">
					<h1 class="text-lg text-slate-300">Average sleep duration</h1>
				</div>
				<p class="font-semibold text-xl">9 h. 36 min.</p>

				<div class="w-full h-2 bg-slate-800 rounded-lg"></div>
			</div>
		</div>
	</div>

	<div class="flex items-start gap-2 grow">
		<div class="bg-slate-800/50 rounded-lg p-4 grow">
			<span class="material-symbols-outlined text-slate-300"> bed </span>
			<div class="flex items-center gap-1">
				<h1 class="text-lg text-slate-300">Target bed time</h1>
				<span class="material-symbols-outlined"> info </span>
			</div>

			<div class="flex flex-col gap-2 mt-4">
				<div class="flex flex-col">
					<p>At time</p>

					<div class="flex items-center gap-2">
						<div class="h-2 w-48 bg-green-500 rounded-lg" />
						<p>28</p>
					</div>
				</div>

				<div class="flex flex-col">
					<p>Almost at time</p>
					<div class="flex items-center gap-2">
						<div class="h-2 w-24 bg-orange-500 rounded-lg" />
						<p>12</p>
					</div>
				</div>

				<div class="flex flex-col">
					<p>Out of time</p>
					<div class="flex items-center gap-2">
						<div class="h-2 w-12 bg-red-500 rounded-lg" />
						<p>12</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-slate-800/50 rounded-lg p-4 grow">
			<span class="material-symbols-outlined text-slate-300"> alarm </span>
			<div class="flex items-center gap-1">
				<h1 class="text-lg text-slate-300">Target wake up time</h1>
				<span class="material-symbols-outlined"> info </span>
			</div>

			<div class="flex flex-col gap-2 mt-4">
				<div class="flex gap-2">
					<div style="width: 66%;" class="h-4 bg-green-500 rounded-xl" />
					<div style="width: 22%;" class="h-4 bg-orange-500 rounded-xl" />
					<div style="width: 12%;" class="h-4 bg-red-500 rounded-xl" />
				</div>

				<div class="flex gap-4">
					<div class="flex flex-col">
						<p>At time</p>

						<div class="flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-green-500" />
							<p>24</p>
						</div>
					</div>

					<div class="flex flex-col">
						<p>Almost at time</p>

						<div class="flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-orange-500" />
							<p>12</p>
						</div>
					</div>

					<div class="flex flex-col">
						<p>Out of time</p>

						<div class="flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-red-500" />
							<p>12</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
