import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export function MainLayout () {
    return (
        <div className="max-w-screen-lg mx-auto min-h-full grid grid-rows-[auto_auto_1fr_auto]">
            <div className="flex gap-2 text-red-500 p-4">
                <span className="material-symbols-outlined">
                    warning
                </span>

                Please note, it's demo release
            </div>

            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}