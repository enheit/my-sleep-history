import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase/firebase.config";
import { SupportedLocale } from "../../i18n/i18n.config";
import { SupportedTheme, useTheme } from "../../theme/theme";

export function Welcome() {
    const { t, i18n } = useTranslation();
    let { theme, toggleTheme } = useTheme();

    function toggleLanguage() {
        let language = i18n.language === SupportedLocale.English
            ? SupportedLocale.Ukrainian
            : SupportedLocale.English;

        i18n.changeLanguage(language);
        localStorage.setItem("lang", language);
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

    async function signInWithGoogle() {
        try {

            const provider = new GoogleAuthProvider();

            let user = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Failed to sign in with google", error);
        }
    }

    return (
        <div className="mx-auto max-w-screen-md h-full grid grid-rows-[1fr_auto]">
            <div className="flex items-center justify-center h-full">

                <div className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-4xl font-semibold text-gray-800 dark:text-gray-100">{t('welcome.my_sleep_history')}</p>
                    </div>

                    <button className="border-2 border-blue-500 dark:text-gray-100 px-4 py-2 rounded-full" onClick={signInWithGoogle}>
                        {t('welcome.sign_in_with_google')}
                    </button>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-800">
                            <span className="material-symbols-outlined ">
                                bug_report
                            </span>

                            <p className="text-sm font-semibold uppercase">{t('welcome.public_alpha')}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex items-center items-center justify-between p-4">
                <div className="flex">
                    {/* hover:bg-yellow-500/10 text-yellow-500 */}
                    <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 dark:text-gray-400" onClick={toggleTheme}>
                        {themeBag[theme].title}

                        <span className="material-symbols-outlined">
                            {themeBag[theme].iconName}
                        </span>
                    </button>

                    <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 dark:text-gray-400" onClick={toggleLanguage}>
                        {language[i18n.language]}

                        <span className="material-symbols-outlined">
                            language
                        </span>
                    </button>
                </div>

                <div className="flex">
                    <p className="text-gray-400 dark:text-gray-400">
                        v{process.env.REACT_APP_VERSION}
                    </p>
                </div>
            </div>
        </div>
    )
}