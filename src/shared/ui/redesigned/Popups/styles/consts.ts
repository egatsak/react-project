import { DropdownDirection } from "../../../../types/ui";
import styles from "./popup.module.scss";

export const mapDirectionToClass: Record<DropdownDirection, string> = {
    "top-left": styles.optionsTopLeft,
    "bottom-left": styles.optionsBottomLeft,
    "top-right": styles.optionsTopRight,
    "bottom-right": styles.optionsBottomRight,
};
