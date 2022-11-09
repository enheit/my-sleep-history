import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export function MainLayout () {
    const { t } = useTranslation();

    return (
        <div className="max-w-screen-lg mx-auto min-h-full grid grid-rows-[auto_auto_1fr_auto]">
            <div className="flex gap-2 text-red-500 p-4">
                <span className="material-symbols-outlined">
                    warning
                </span>

                {t('layout.please_note')}
            </div>

            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}