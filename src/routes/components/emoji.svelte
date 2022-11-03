<script lang="ts">
	let counter = 0;

	const emoji = ['🤗', '😠', '😡', '🤬', '💥'];

	function handleEmojiClick() {
		counter++;

        if (counter > 40) {
            counter = 0;
        }
	}
</script>

<button on:click={handleEmojiClick}>
	{#if counter > 30}
		{emoji[4]}
	{:else if counter > 20}
		{emoji[3]}
	{:else if counter > 10}
		{emoji[2]}
	{:else if counter > 5}
		{emoji[1]}
	{:else}
		{emoji[0]}
	{/if}
</button>
