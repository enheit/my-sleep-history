import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export function MainLayout () {
    return (
        <div className="max-w-screen-lg mx-auto min-h-full grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}