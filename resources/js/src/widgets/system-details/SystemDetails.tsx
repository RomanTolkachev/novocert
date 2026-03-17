import type { FC } from "react";
import { Box, Grid2, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ASSETS_URL, ExternalLink, formatDateDDMMYYYY, GlobeIcon, InfoCard, makeList, Preloader, useDetailedData, type DetailScope } from "@/shared";
import type { ISystemDetail } from "./types";
import { StatusIcon } from "@/shared/ui/custom-table/ui/cells/StatusIcon";

type CertDetailsProps = {
    scope: DetailScope;
};

export const SystemDetails: FC<CertDetailsProps> = ({ scope }) => {
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
        img_path,
        organ_status_,
        status__name,
        status__gid,
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
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column"}}>
            <Typography variant="h3" sx={{ mb: 4, minHeight: 0 }} align="center">
                Система сертификации — {system_name}
            </Typography>
            {/* тутутутуту */}
            <Grid2 sx={{height: "100%", minHeight: 0, overflowY: "auto", "&>*": {height: "100%"}}} container spacing={2} alignItems="stretch">
                {/* Слева: юр.лицо — владелец (по дизайну) */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="elevation"
                        title="Владелец"
                        statusLiter={status__gid as any}
                        statusTitle={status__name ?? undefined}
                        imageSrc={owner__logo_path ? `${ASSETS_URL}/${owner__logo_path}` : undefined}
                    >
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
                    </InfoCard>
                </Grid2>

                {/* Середина: основная информация */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="outlined"
                        title="Свидетельство"
                        statusLiter={organ_status_ as any}
                        statusTitle={status__name ?? undefined}
                        imageSrc={img_path ? `${ASSETS_URL}/${img_path}` : undefined}
                    >
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
                                <Box sx={{ mb: 2 }}>
                                    {makeList(accreditation, { delimiter: ";" })}
                                </Box>
                            </>
                        )}
                        {docum_web_reference != null && docum_web_reference !== "" && (
                            <ExternalLink
                                href={docum_web_reference}
                                variant="body2"
                                sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
                            >
                                <GlobeIcon style={{ width: 20, height: 20, flexShrink: 0 }} />
                                Ссылка
                            </ExternalLink>
                        )}
                    </InfoCard>
                </Grid2>

                {/* Справа: список аккредитованных ОС */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard variant="outlined" title="АККРЕДИТАЦИИ">
                        {organs.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Нет данных
                            </Typography>
                        ) : (
                            <List sx={{ listStyle: "none", m: 0, pl: 0 }}>
                                {organs.map((organ) => {
                                    const organId = String(organ.id ?? organ.gid);
                                    const to = scope === "public" ? `/organs/${organId}` : `/personal/organs/${organId}`;
                                    const primary = organ.name ?? organ.full_name ?? organ.organ_name ?? organ.identifier ?? "—";
                                    const secondary =
                                        organ.identifier != null && organ.identifier !== "" && primary !== organ.identifier
                                            ? organ.identifier
                                            : null;
                                    return (
                                        <ListItemButton
                                            key={organId}
                                            component={RouterLink}
                                            to={to}
                                            sx={{
                                                py: 0.5,
                                                px: 2,
                                                display: "grid",
                                                gridTemplateColumns: "1fr auto",
                                                columnGap: 1,
                                                alignItems: "start",
                                                "&:hover": { textDecoration: "underline", cursor: "pointer" },
                                            }}
                                        >
                                            <ListItemText
                                                primary={primary}
                                                secondary={secondary}
                                                primaryTypographyProps={{ variant: "body2" }}
                                                secondaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                                            />
                                            <Box
                                                sx={{
                                                    pt: 1,
                                                    "& svg": { fontSize: 22 },
                                                }}
                                            >
                                                <StatusIcon status_liter={organ.organ_status_ as any} />
                                            </Box>
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        )}
                    </InfoCard>
                </Grid2>
            </Grid2>
        </Box>
    );
};
