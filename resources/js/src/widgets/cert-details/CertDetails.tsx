import type { FC } from "react";
import { Box, Grid2, Link, Paper, Typography } from "@mui/material";
import { ASSETS_URL, formatDateDDMMYYYY, Preloader, useDetailedData, type DetailScope } from "@/shared";
import type { ISystemDetail } from "./types";

type CertDetailsProps = {
    scope: DetailScope;
};

export const CertDetails: FC<CertDetailsProps> = ({ scope }) => {
    const { data, isFetching, error } = useDetailedData(scope, "system");

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

    const payload = data?.data as ISystemDetail | undefined;
    if (!payload) {
        return (
            <Typography variant="body1" color="text.secondary">
                Нет данных
            </Typography>
        );
    }

    const {
        owner__short_name,
        owner__full_name,
        owner__inn,
        owner__ogrn,
        owner__kpp,
        owner__logo_path,
        owner__head_name,
        owner__head_position,
        system_name,
        system_cert_number,
        status__name,
        bus_begin,
        accreditation,
        docum_web_reference,
        organs = [],
    } = payload;

    const ownerLegalAddress = payload.owner_address__full_address ?? payload.owner_address__name;
    const ownerActivityCode = [payload.owner__okved_code, payload.owner__okved_name].filter(Boolean).join(" ") || undefined;
    const isLiquidated = payload.owner__liquidation_date && payload.owner__liquidation_date !== "1900-01-01";
    const ownerStatusText = isLiquidated
        ? (payload.owner__liquidation_date ? `Ликвидирован с ${formatDateDDMMYYYY(payload.owner__liquidation_date)}` : "Ликвидирован")
        : (payload.owner__bus_begin ? `Действует с ${formatDateDDMMYYYY(payload.owner__bus_begin)}` : undefined);

    const ownerRows: [string, string | undefined][] = [
        ["Полное наименование", owner__full_name],
        ["ОГРН", owner__ogrn],
        ["ИНН", owner__inn],
        ["КПП", owner__kpp],
        ["Статус", ownerStatusText],
        ["Код основного вида деятельности", ownerActivityCode],
        ["ФИО руководителя", owner__head_name],
        ["Должность руководителя", owner__head_position],
        ["Юридический адрес", ownerLegalAddress],
    ];

    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Система сертификации — {system_name}
            </Typography>
            <Grid2 container spacing={2} alignItems="stretch">
                {/* Слева: юр.лицо — владелец (по дизайну) */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            height: "100%",
                            bgcolor: "background.paper",
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                            Компания (ЮЛ/ИП)
                        </Typography>
                        {owner__logo_path && (
                            <Box sx={{ mb: 1.5 }}>
                                <img
                                    src={`${ASSETS_URL}/${owner__logo_path}`}
                                    alt=""
                                    style={{ maxHeight: 48, objectFit: "contain" }}
                                />
                            </Box>
                        )}
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                            {owner__short_name ?? "—"}
                        </Typography>
                        {ownerRows.map(([label, value]) => (
                            <Box key={label} sx={{ mb: 1 }}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    {label}
                                </Typography>
                                <Typography variant="body2">
                                    {value != null && value !== "" ? value : "—"}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Grid2>

                {/* Середина: основная информация */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            height: "100%",
                            bgcolor: "background.paper",
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Номер свидетельства
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 2 }}>
                            <Typography variant="body1" fontWeight={500}>
                                {system_cert_number ?? "—"}
                            </Typography>
                            {(status__name || bus_begin) && (
                                <Typography variant="body2" color="text.secondary">
                                    {status__name ?? ""} {bus_begin ? `с ${formatDateDDMMYYYY(bus_begin)}` : ""}
                                </Typography>
                            )}
                        </Box>
                        {accreditation != null && accreditation !== "" && (
                            <>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    Область распространения
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
                                    {accreditation}
                                </Typography>
                            </>
                        )}
                        {docum_web_reference != null && docum_web_reference !== "" && (
                            <>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    Основополагающий документ (правила) системы
                                </Typography>
                                <Link href={docum_web_reference} target="_blank" rel="noopener noreferrer" variant="body2">
                                    {docum_web_reference}
                                </Link>
                            </>
                        )}
                    </Paper>
                </Grid2>

                {/* Справа: список аккредитованных ОС */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            height: "100%",
                            bgcolor: "background.paper",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1.5,
                                px: 1.5,
                                py: 0.75,
                                borderRadius: 1,
                                bgcolor: "action.hover",
                                display: "inline-block",
                            }}
                        >
                            АККРЕДИТАЦИИ
                        </Typography>
                        {organs.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Нет данных
                            </Typography>
                        ) : (
                            <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                {organs.map((organ) => (
                                    <Typography component="li" key={organ.id ?? organ.gid} variant="body2" sx={{ mb: 0.75 }}>
                                        {organ.name ?? organ.full_name ?? organ.organ_name ?? organ.identifier ?? "—"}
                                        {organ.identifier != null && organ.identifier !== "" && organ.name !== organ.identifier && (
                                            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                                ({organ.identifier})
                                            </Typography>
                                        )}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
};
