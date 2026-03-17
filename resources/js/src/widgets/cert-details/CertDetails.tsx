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

    const applicantShort = applicant?.applicant__short_name ?? applicant?.name;
    const applicantLegalAddress = applicant?.applicant_address__full_address ?? applicant?.applicant_address__name;
    const applicantOkved = [applicant?.applicant__okved_code, applicant?.applicant__okved_name].filter(Boolean).join(" ") || undefined;

    const certDatesText =
        cert?.bus_begin
            ? `${formatDateDDMMYYYY(cert.bus_begin)}${cert.bus_end && cert.bus_end !== "2399-12-31" ? ` — ${formatDateDDMMYYYY(cert.bus_end)}` : ""}`
            : undefined;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ mb: 4, flex: "0 0 auto" }} align="center">
                Сертификат — {cert?.docum_number ?? "—"}
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
                        statusLiter={cert?.docum_status_ as any}
                        statusTitle={cert?.cert_status__name ?? undefined}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="body1" fontWeight={600}>
                                    {cert?.docum_number ?? "—"}
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
                                    {cert?.name ?? "—"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Номер бланка
                                </Typography>
                                <Typography variant="body2">
                                    {cert?.blank_number ?? "—"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Учетный номер регистра
                                </Typography>
                                <Typography variant="body2">
                                    {cert?.doc_reg_num ?? "—"}
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

                            {cert?.docum_accreditation_scope && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Область распространения
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                        {cert.docum_accreditation_scope}
                                    </Typography>
                                </Box>
                            )}

                            {cert?.standart && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Стандарты
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                        {cert.standart}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </InfoCard>
                </Grid2>

                {/* Справа: заявитель */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CompanyCard
                        company={{
                            title: "Заявитель",
                            variant: "outlined",
                            logoPath: applicant?.logo_path ?? null,
                            shortName: applicantShort ?? null,
                            statusLiter: applicant?.applicant_status__gid as any,
                            statusTitle: applicant?.applicant_status__name ?? undefined,
                            fullName: applicant?.name ?? null,
                            inn: applicant?.inn ?? null,
                            ogrn: applicant?.ogrn ?? null,
                            kpp: applicant?.applicant__kpp ?? null,
                            busBegin: applicant?.bus_begin ?? null,
                            liquidationDate: null,
                            okvedCode: applicant?.applicant__okved_code ?? null,
                            okvedName: applicant?.applicant__okved_name ?? null,
                            headName: applicant?.applicant__head_name ?? null,
                            headPosition: null,
                            addressFull: applicantLegalAddress ?? null,
                            addressName: null,
                        }}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};
