import type { FC } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { ASSETS_URL, formatDateDDMMYYYY, InfoCard, Preloader, useDetailedData, type DetailScope } from "@/shared";
import { CompanyCard } from "@/widgets/ui";
import type { ICertDetailPayload } from "./types";

type CertDetailsProps = {
    scope: DetailScope;
};

export const CertDetails: FC<CertDetailsProps> = ({ scope }) => {
    const { data, isFetching, error } = useDetailedData(scope, "cert");

    if (isFetching) {
        return <Preloader />;
    }
    if (error) {
        return (
            <Typography variant="body1" color="error">
                Ошибка загрузки
            </Typography>
        );
    }

    const payload = data?.data as ICertDetailPayload | undefined;
    if (!payload) {
        return (
            <Typography variant="body1" color="text.secondary">
                Нет данных
            </Typography>
        );
    }

    const { cert, organ, applicant } = payload;

    const certDatesText =
        cert?.cert__bus_begin
            ? `${formatDateDDMMYYYY(cert.cert__bus_begin)}${cert.cert__data_end && cert.cert__data_end !== "2399-12-31" ? ` — ${formatDateDDMMYYYY(cert.cert__data_end)}` : ""}`
            : undefined;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ mb: 4, flex: "0 0 auto" }} align="center">
                Сертификат — {cert?.cert__id ?? "—"}
            </Typography>

            <Grid2
                sx={{ flex: 1, minHeight: 0, overflowY: "auto", "&>*": { height: "100%" } }}
                container
                spacing={2}
                alignItems="stretch"
            >
                {/* Слева: орган */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="elevation"
                        title="Орган"
                        statusLiter={organ?.organ_status_ as any}
                        statusTitle={organ?.organ_status__name ?? undefined}
                        imageSrc={organ?.organ_logo_path ? `${ASSETS_URL}/${organ.organ_logo_path}` : undefined}
                    >
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                            {organ?.full_name ?? organ?.name ?? "—"}
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Номер ОС
                                </Typography>
                                <Typography variant="body2">
                                    {organ?.identifier ?? "—"}
                                </Typography>
                            </Box>
                            {organ?.organ_fact_address && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Фактический адрес ОС
                                    </Typography>
                                    <Typography variant="body2">
                                        {organ.organ_fact_address}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </InfoCard>
                </Grid2>

                {/* Середина: данные сертификата */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="outlined"
                        title="Сертификат"
                        statusLiter={cert?.cert__status as any}
                        statusTitle={undefined}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="body1" fontWeight={600}>
                                    {cert?.cert__id ?? "—"}
                                </Typography>
                                {certDatesText && (
                                    <Typography variant="body2" color="text.secondary">
                                        {certDatesText}
                                    </Typography>
                                )}
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Наименование
                                </Typography>
                                <Typography variant="body2">
                                    {cert?.cert__name ?? "—"}
                                </Typography>
                            </Box>

                            {cert?.system__name && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Система сертификации
                                    </Typography>
                                    <Typography variant="body2">
                                        {cert.system__name}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </InfoCard>
                </Grid2>

                {/* Справа: заявитель */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CompanyCard
                        title="Заявитель"
                        variant="outlined"
                        company={applicant}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};
