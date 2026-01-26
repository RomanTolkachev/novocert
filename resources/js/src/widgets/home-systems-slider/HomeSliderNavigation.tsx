import type { FC, MouseEventHandler, ReactNode } from "react";
import { Box, Button } from "@mui/material";
import styles from "./HomeSystemsSlider.module.css";

export interface HomeSliderNavigationProps {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
    disabledPrev?: boolean;
    disabledNext?: boolean;
    children: ReactNode;
}

const SliderArrowLeftIcon: FC<{ size?: number }> = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
);

const SliderArrowRightIcon: FC<{ size?: number }> = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </svg>
);

export const HomeSliderNavigation: FC<HomeSliderNavigationProps> = ({
    onPrev,
    onNext,
    disabledPrev,
    disabledNext,
    children,
}) => {
    return (
        <Box
            className={styles.navRoot}
            sx={{ gap: 1 }}
        >
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onPrev}
                disabled={disabledPrev}
                className={styles.navButton}
                sx={{ boxShadow: 1, opacity: 0.9 }}
            >
                <SliderArrowLeftIcon />
            </Button>

            <Box className={styles.navMiddle}>
                {children}
            </Box>

            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onNext}
                disabled={disabledNext}
                className={styles.navButton}
                sx={{ boxShadow: 1, opacity: 0.9 }}
            >
                <SliderArrowRightIcon />
            </Button>
        </Box>
    );
};
