<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '../firebase/initialize';
	import { onMount } from 'svelte';
    import '../app.css';
    import { goto } from '$app/navigation';

    // onMount(() => {
	// 	onAuthStateChanged(auth, async (user) => {
	// 		if (user) {
	// 			console.log('USER SIGNED IN');
	// 			// User is signed in, see docs for a list of available properties
	// 			// https://firebase.google.com/docs/reference/js/firebase.User
	// 			const uid = user.uid;
	// 			console.log('USER ID', uid);
	// 			// ...
	// 			await goto("/history");
	// 		} else {
	// 			console.log('USER HAS BEEN SIGNED OUT');
	// 			// User is signed out
	// 			// ...
	// 			await goto("/");
	// 		}
	// 	});
	// });
</script>

<slot />