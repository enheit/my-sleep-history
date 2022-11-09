import { signOut } from 'firebase/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase/firebase.config";
import { SupportedLocale } from "../../i18n/i18n.config";
import { SupportedTheme, useTheme } from "../../theme/theme";

export function Footer() {
    const { t, i18n } = useTranslation();
    let { theme, toggleTheme } = useTheme();

    function toggleLanguage() {
        let language = i18n.language === SupportedLocale.English
            ? SupportedLocale.Ukrainian
            : SupportedLocale.English;

        i18n.changeLanguage(language);
        localStorage.setItem("lang", language);
    }

    function logout() {
        signOut(auth);
    }

    const language = {
        [SupportedLocale.English]: "Eng",
        [SupportedLocale.Ukrainian]: "Укр"
    }

    const themeBag = {
        [SupportedTheme.Light]: {
            title: t("theme.light"),
            iconName: 'light_mode'
        },
        [SupportedTheme.Dark]: {
            title: t("theme.dark"),
            iconName: 'dark_mode'
        },
    }

    return (
        <div className="flex text-gray-900 dark:text-gray-100 p-4">
            <div className="flex flex-1">
                {/* hover:bg-yellow-500/10 text-yellow-500 */}
                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 dark:text-gray-400" onClick={toggleTheme}>
                    {themeBag[theme].title}

                    <span className="material-symbols-outlined">
                        {themeBag[theme].iconName}
                    </span>
                </button>

                {/* hover:bg-sky-500/10 text-sky-500 */}
                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 dark:text-gray-400" onClick={toggleLanguage}>
                    {language[i18n.language]}

                    <span className="material-symbols-outlined">
                        language
                    </span>
                </button>
            </div>


            <div className="flex flex-1 justify-center items-center">
                <p className="dark:text-gray-400">
                    v{process.env.REACT_APP_VERSION}
                </p>
            </div>
            

            <div className="flex flex-1 justify-end">
                <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 dark:text-gray-400" onClick={logout}>
                    {t('logout')}
                    
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
            
        </div>
    )
}