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
import { Preloader } from "@/shared";
import { HomeSliderNavigation } from "./HomeSliderNavigation";
import { PieLegendWithTotal } from "./PieLegendWithTotal";

type SystemsResponse = AxiosResponse<ILaravelPaginator<ISystem>>;

const DONUT_SIZE = { width: 100, height: 100, innerRadius: 28, outerRadius: 42 };

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

    const responseBody = data?.data;
    const systems = responseBody?.data ?? [];
    const totalOrgans = responseBody?.meta?.total_organs ?? 0;
    const totalDocuments = responseBody?.meta?.total_documents ?? 0;

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
                                            textAlign="center"
                                        >
                                            {system.system_name}
                                        </Typography>

                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "flex-start" }}>
                                            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", minWidth: 0 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    Доля от общего количества ОС
                                                </Typography>
                                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                                                    <PieChart
                                                        width={DONUT_SIZE.width}
                                                        height={DONUT_SIZE.height}
                                                        hideLegend
                                                        series={[{
                                                            innerRadius: DONUT_SIZE.innerRadius,
                                                            outerRadius: DONUT_SIZE.outerRadius,
                                                            data: [
                                                                {
                                                                    id: 0,
                                                                    value: organsCount,
                                                                    label: "данная СДС",
                                                                    color: theme.palette.primary.main,
                                                                    labelMarkType: "line"
                                                                },
                                                                {
                                                                    id: 1,
                                                                    value: totalOrgans - organsCount,
                                                                    label: "другие",
                                                                    color: theme.palette.grey[300],
                                                                    labelMarkType: "line"
                                                                },
                                                            ],
                                                        }]}
                                                    />
                                                    <PieLegendWithTotal
                                                        total={totalOrgans}
                                                        items={[
                                                            { label: "данная СДС", value: organsCount, color: theme.palette.primary.main },
                                                            { label: "другие", value: Math.max(0, totalOrgans - organsCount), color: theme.palette.grey[300] },
                                                        ]}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", minWidth: 0 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    Доля от общего количества сертификатов
                                                </Typography>
                                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                                                    <PieChart
                                                        width={DONUT_SIZE.width}
                                                        height={DONUT_SIZE.height}
                                                        hideLegend
                                                        series={[{
                                                            innerRadius: DONUT_SIZE.innerRadius,
                                                            outerRadius: DONUT_SIZE.outerRadius,
                                                            data: [
                                                                {
                                                                    id: 0,
                                                                    value: documentsCount,
                                                                    label: "данная СДС",
                                                                    color: theme.palette.secondary.main,
                                                                    labelMarkType: "line",
                                                                },
                                                                {
                                                                    id: 1,
                                                                    value: totalDocuments - documentsCount,
                                                                    label: "другие",
                                                                    color: theme.palette.grey[300],
                                                                    labelMarkType: "line"
                                                                },
                                                            ],
                                                        }]}
                                                    />
                                                    <PieLegendWithTotal
                                                        total={totalDocuments}
                                                        items={[
                                                            { label: "данная СДС", value: documentsCount, color: theme.palette.secondary.main },
                                                            { label: "другие", value: Math.max(0, totalDocuments - documentsCount), color: theme.palette.grey[300] },
                                                        ]}
                                                    />
                                                </Box>
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

