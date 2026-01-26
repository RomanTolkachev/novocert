import type { FC } from "react";
import { Box, Typography } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/shared/api";
import { CustomTable } from "@/shared/ui/custom-table";
import type { ICertificate } from "@/entities/cert";
import { config as certsConfig } from "../certs/config";
import { HomeSystemsSlider } from "@/widgets";

export const HomePage: FC = () => {
    const { data, isFetching } = useQuery<AxiosResponse<{ data: ICertificate[] }>, AxiosError>({
        queryKey: ["last-five-certs"],
        queryFn: () => api.get<{ data: ICertificate[] }>("/last-five-certs"),
        placeholderData: keepPreviousData,
    });

    return (
        <Box sx={{ paddingTop: 3, height: "100%", display: "grid", gridTemplateRows: "auto 1fr", rowGap: 2, width: "100%", }}>
            <Box sx={{width: "100%", minWidth: 0}}>
                <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                    Системы сертификации
                </Typography>
                <div style={{ width: "100%", overflowX: "auto", minWidth: 0, paddingTop: 3 }}>
                    <HomeSystemsSlider />
                </div>
            </Box>

            <Box sx={{overflowY: "auto", height: "100%", display: "grid", gridTemplateRows: "auto 1fr"}}>
                <Typography variant="h5" sx={{ mb: 1, textAlign: "center",  }}>
                    Последние добавленные сертификаты
                </Typography>

                <CustomTable<ICertificate>
                    data={data?.data.data ?? []}
                    translations={certsConfig.translations}
                    hiddenColumns={certsConfig.hiddenColumns}
                    columnOrder={certsConfig.columnOrder}
                    loading={isFetching}
                    actions={[]}
                    size="small"
                    withRowActions={false}
                />
            </Box>
        </Box>
    );
};
