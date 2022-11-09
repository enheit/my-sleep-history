import { useTranslation } from "react-i18next";
import { Menu } from "../../../../components/menu/menu";

interface MoreVertMenuProps {
    isOpen: boolean
    anchorEl: HTMLElement | null,
    onClose: () => void

    onEdit: () => void
    onDelete: () => void
}

export function MoreVertMenu(props: MoreVertMenuProps) {
    const { t } = useTranslation();

    return (
        <Menu isOpen={props.isOpen} onClose={props.onClose} anchorEl={props.anchorEl}>
            <div className="w-32 p-4 drop-shadow-sm rounded-xl bg-white dark:bg-black border-2 border-gray-200  dark:border-orange-500">
                <div className="flex flex-col justify-start">
                    <button className="text-left dark:text-gray-100" onClick={props.onEdit}>
                        {t('home.table.actions.edit')}
                    </button>
                    <button className="text-left dark:text-gray-100" onClick={props.onDelete}>
                        {t('home.table.actions.delete')}
                    </button>
                </div>
            </div>
        </Menu>
    )
}