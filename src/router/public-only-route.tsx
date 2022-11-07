import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

interface Props {
    children: JSX.Element;
}

export function PublicOnlyRoute(props: Props): JSX.Element | null {
    // const [user, loading, error] = useAuthState(auth);

    // let isAuthenticated = user !== undefined && user !== null;

    // if (loading) {
    //     return null;
    // }

    // if (isAuthenticated) {
    //     return <Navigate to={"/"} />
    // }

    return props.children
}