import "swiper/css";
import type { FC } from "react";
import type { AxiosError, AxiosResponse } from "axios";
import type { Swiper as SwiperInstance } from "swiper";
import type { ISystem } from "@/entities/system";
import styles from "./HomeSystemsSlider.module.css";
import { useRef } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { PieChart } from "@mui/x-charts/PieChart";
import { api } from "@/shared/api";
import { translations as systemTranslations } from "@/entities/system";
import { Preloader } from "@/shared";
import { HomeSliderNavigation } from "./HomeSliderNavigation";

type SystemsResponse = AxiosResponse<ILaravelPaginator<ISystem>>;

export const HomeSystemsSlider: FC = () => {
    const theme = useTheme();
    const swiperRef = useRef<SwiperInstance | null>(null);
    const { data, isFetching } = useQuery<SystemsResponse, AxiosError>({
        queryKey: ["home-systems-slider"],
        queryFn: () => api.get<ILaravelPaginator<ISystem>>("/public/get-systems-list", {
            params: {
                page: 1,
                perPage: 100,
            },
        }),
        placeholderData: keepPreviousData,
    });

    const systems = data?.data.data ?? [];

    const repeats = systems.length >= 3 ? 3 : 6;
    const sliderItems: ISystem[] = systems.length
        ? Array.from({ length: repeats }, () => systems).flat()
        : [];

    if (isFetching) {
        return (
            <Box className={styles.preloaderWrapper} sx={{ px: 4 }}>
                <Preloader />
            </Box>
        );
    }

    if (!sliderItems.length && !isFetching) {
        return null;
    }

    return (
        <HomeSliderNavigation
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
        >
            <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    loop={sliderItems.length > 1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onSwiper={(instance) => {
                        swiperRef.current = instance;
                    }}
                    style={{ paddingTop: 8, paddingBottom: 8 }}
                >
                    {sliderItems.map((system, index) => {
                        const organsCount = Number(system.organs_count) || 0;
                        const documentsCount = Number(system.documents_count) || 0;
                        const total = organsCount + documentsCount;

                        const hasAnyData = total > 0;

                        return (
                            <SwiperSlide
                                key={`${system.gid}-${index}`}
                                className={styles.slide}
                            >
                                <Card className={styles.cardRoot}>
                                    <CardContent className={styles.cardContent}>
                                        <Typography
                                            variant="subtitle2"
                                            className={styles.titleClamp}
                                            sx={{ mb: 1 }}
                                        >
                                            {system.system_name}
                                        </Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <PieChart
                                                width={140}
                                                height={140}
                                                series={[{
                                                    innerRadius: 40,
                                                    outerRadius: 60,
                                                    data: hasAnyData
                                                        ? [
                                                            {
                                                                id: 0,
                                                                value: organsCount,
                                                                label: "ОС",
                                                                color: theme.palette.primary.main,
                                                            },
                                                            {
                                                                id: 1,
                                                                value: documentsCount,
                                                                label: "СС",
                                                                color: theme.palette.secondary.main,
                                                            },
                                                        ]
                                                        : [
                                                            {
                                                                id: 0,
                                                                value: 1,
                                                                label: "",
                                                                color: theme.palette.grey[400],
                                                            },
                                                        ],
                                                }]}
                                            />

                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {systemTranslations.organs_count}: {organsCount}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {systemTranslations.documents_count}: {documentsCount}
                                                </Typography>
                                                <Typography variant="caption" color="text.disabled">
                                                    Всего: {hasAnyData ? total : 0}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>
        </HomeSliderNavigation>
    );
};

