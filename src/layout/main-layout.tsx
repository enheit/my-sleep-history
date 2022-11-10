import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export function MainLayout () {
    const { t } = useTranslation();

    return (
        <div className="max-w-screen-lg mx-auto min-h-full grid grid-cols-1 grid-rows-[auto_1fr_auto]">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}