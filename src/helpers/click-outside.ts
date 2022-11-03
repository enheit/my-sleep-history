export default function clickOutside(node: HTMLElement): SvelteActionReturnType {
	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent("outclick"));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}