import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase/firebase.config";
import { SupportedLocale } from "../../i18n/i18n.config";
import { SupportedTheme, useTheme } from "../../theme/theme";
import { UserProfile } from './components/user-profile/user-profile';
import { UserProfileSkeleton } from './components/user-profile/user-profile.skeleton';

export function Header() {
    const [ user, userError ] = useAuthState(auth);
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
        <div className="flex items-center justify-between p-4">
            {user 
                ? <UserProfile 
                    displayName={user.displayName}
                    email={user.email}
                    photoUrl={user.photoURL} /> 
                : <UserProfileSkeleton />
            }

            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-yellow-500/10 text-yellow-500" onClick={toggleTheme}>
                    {themeBag[theme].title}

                    <span className="material-symbols-outlined">
                        {themeBag[theme].iconName}
                    </span>
                </button>

                <button className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-sky-500/10 text-sky-500" onClick={toggleLanguage}>
                    {language[i18n.language]}

                    <span className="material-symbols-outlined">
                        language
                    </span>
                </button>

                <button className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-red-500/10 text-red-500" onClick={logout}>
                    {t('logout')}
                    
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
        </div>
    )
}