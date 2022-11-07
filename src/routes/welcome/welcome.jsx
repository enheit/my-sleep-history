import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export function Welcome() {
    async function signInWithGoogle() {
        try {
            
            const provider = new GoogleAuthProvider();

            let user = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Failed to sign in with google", error);
        }
    }

    return (
        <div class="flex items-center justify-center h-full">

            <div class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-2">
                    <p class="text-xl font-semibold text-gray-800 dark:text-gray-100">My Sleep History</p>
                    <p class="text-sm font-semibold text-gray-400 dark:text-gray-800">ALPHA</p>
                </div>
                
                <button className="bg-sky-500 text-white px-4 py-2 rounded-full font-semibold" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>

        </div>
    )
}