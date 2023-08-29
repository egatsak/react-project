import { memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon as IconDeprecated } from "../Icon/Icon";
import StarIcon from "@/shared/assets/icons/icon-article-rating-star.svg";

import styles from "./StarRating.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Icon } from "../../redesigned/Icon/Icon";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, size = 30, selectedStars = 0, onSelect } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div
            data-testid="StarRating"
            className={classNames(
                toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => styles.starRatingRedesigned,
                    off: () => styles.starRating,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber) => {
                const commonProps = {
                    Svg: StarIcon,
                    className: classNames(styles.starIcon, {
                        [styles.normal]: currentStarsCount < starNumber,
                        [styles.hover]: currentStarsCount >= starNumber,
                        [styles.selected]: isSelected,
                    }),
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                    "data-testid": `StarRating.${starNumber}`,
                    "data-selected": currentStarsCount >= starNumber,
                };

                return (
                    <ToggleFeatures
                        key={`star-${starNumber}`}
                        feature="isAppRedesigned"
                        on={<Icon clickable={!isSelected} {...commonProps} />}
                        off={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});
