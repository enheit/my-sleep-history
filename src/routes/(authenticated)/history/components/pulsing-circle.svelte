<span class="pulsating-circle" />

<style>
    .pulsating-circle {
		width: 8px;
		height: 8px;
		background: orange;
		border-radius: 50%;
	}

	.pulsating-circle::before {
		content: '';
		position: relative;
		display: block;
		width: 300%;
		height: 300%;
		box-sizing: border-box;
		margin-left: -100%;
		margin-top: -100%;
		border-radius: 45px;
		background-color: orange;
		animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(0.33);
		}
		80%,
		100% {
			opacity: 0;
		}
	}
</style>