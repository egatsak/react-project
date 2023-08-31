import { memo } from "react";

import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import CircleUpIcon from "@/shared/assets/icons/icon-circle-up.svg";

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Icon
            Svg={CircleUpIcon}
            onClick={onClick}
            clickable
            width={32}
            height={32}
            className={className}
        />
    );
});
