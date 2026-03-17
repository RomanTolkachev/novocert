import type { FC } from "react";
import { Box, Grid2, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ASSETS_URL, ExternalLink, formatDateDDMMYYYY, GlobeIcon, InfoCard, Preloader, useDetailedData, type DetailScope } from "@/shared";
import { StatusIcon } from "@/shared/ui/custom-table/ui/cells/StatusIcon";
import type { IOrganDetail } from "./types";

type OrganDetailsProps = {
    scope: DetailScope;
};

export const OrganDetails: FC<OrganDetailsProps> = ({ scope }) => {
    const { data, isFetching, error } = useDetailedData(scope, "organ");

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

    const payload = data?.data as IOrganDetail | undefined;
    if (!payload) {
        return (
            <Typography variant="body1" color="text.secondary">
                Нет данных
            </Typography>
        );
    }

    const {
        organ_name,
        organ_number,
        organ_cert_begin_date,
        organ_cert_end_date,
        organ_accreditation_scope,
        organ_status_,
        system_name,
        system_img_path,
        legal_logo_path,
        docum_web_reference,
        documents = [],

        owner__short_name,
        owner__full_name,
        owner__kpp,
        owner_status__gid,
        owner_status__name,
        owner__head_name,
        owner__head_position,
        owner__okved_code,
        owner__okved_name,
        owner_address__full_address,
        owner_address__name,
        owner__bus_begin,
        owner__liquidation_date,
    } = payload;

    const ownerLegalAddress = owner_address__full_address ?? owner_address__name;
    const ownerActivityCode = [owner__okved_code, owner__okved_name].filter(Boolean).join(" ") || undefined;
    const isLiquidated = owner__liquidation_date && owner__liquidation_date !== "1900-01-01";
    const ownerStatusText = isLiquidated
        ? (owner__liquidation_date ? `Ликвидирован с ${formatDateDDMMYYYY(owner__liquidation_date)}` : "Ликвидирован")
        : (owner__bus_begin ? `Действует с ${formatDateDDMMYYYY(owner__bus_begin)}` : undefined);

    const ownerRows: [string, string | undefined][] = [
        ["Полное наименование", owner__full_name],
        ["КПП", owner__kpp],
        ["Статус", ownerStatusText],
        ["Код основного вида деятельности", ownerActivityCode],
        ["ФИО руководителя", owner__head_name],
        ["Должность руководителя", owner__head_position],
        ["Юридический адрес", ownerLegalAddress],
    ];

    const organDatesText =
        organ_cert_begin_date
            ? `${formatDateDDMMYYYY(organ_cert_begin_date)}${organ_cert_end_date && organ_cert_end_date !== "2399-12-31" ? ` — ${formatDateDDMMYYYY(organ_cert_end_date)}` : ""}`
            : undefined;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ mb: 4, flex: "0 0 auto" }} align="center">
                Орган по сертификации — {organ_name}
            </Typography>

            <Grid2
                sx={{ flex: 1, minHeight: 0, overflowY: "auto", "&>*": { height: "100%" } }}
                container
                spacing={2}
                alignItems="stretch"
            >
                {/* Слева: юр.лицо */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="elevation"
                        title="Компания"
                        statusLiter={owner_status__gid as any}
                        statusTitle={owner_status__name ?? undefined}
                        imageSrc={legal_logo_path ? `${ASSETS_URL}/${legal_logo_path}` : undefined}
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

                {/* Середина: информация об органе */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard
                        variant="outlined"
                        title="Орган"
                        statusLiter={organ_status_ as any}
                        statusTitle={undefined}
                        imageSrc={system_img_path ? `${ASSETS_URL}/${system_img_path}` : undefined}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Система
                                </Typography>
                                <Typography variant="body2">
                                    {system_name ?? "—"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Регистрационный номер
                                </Typography>
                                <Typography variant="body2">
                                    {organ_number ?? "—"}
                                </Typography>
                            </Box>

                            {organDatesText && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Срок действия
                                    </Typography>
                                    <Typography variant="body2">
                                        {organDatesText}
                                    </Typography>
                                </Box>
                            )}

                            {organ_accreditation_scope && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Область уполномачивания
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                        {organ_accreditation_scope}
                                    </Typography>
                                </Box>
                            )}

                            {docum_web_reference && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Ссылка (реестр)
                                    </Typography>
                                    <ExternalLink
                                        href={docum_web_reference}
                                        variant="body2"
                                        sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
                                    >
                                        <GlobeIcon style={{ width: 20, height: 20, flexShrink: 0 }} />
                                        Ссылка
                                    </ExternalLink>
                                </Box>
                            )}
                        </Box>
                    </InfoCard>
                </Grid2>

                {/* Справа: документы */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard variant="outlined" title="Документы">
                        {documents.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Нет данных
                            </Typography>
                        ) : (
                            <List sx={{ listStyle: "none", m: 0, pl: 0 }}>
                                {documents.map((doc) => {
                                    const docId = String(doc.gid ?? doc.id);
                                    const to = scope === "public" ? `/certs/${docId}` : `/personal/certs/${docId}`;
                                    const primary = doc.docum_number || doc.name || "—";
                                    const secondaryParts = [
                                        doc.name && doc.docum_number && doc.name !== doc.docum_number ? doc.name : null,
                                        doc.bus_begin ? `с ${formatDateDDMMYYYY(doc.bus_begin)}` : null,
                                    ].filter(Boolean);
                                    const secondary = secondaryParts.length ? secondaryParts.join(" · ") : null;

                                    return (
                                        <ListItemButton
                                            key={docId}
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
                                            <Box sx={{ pt: 0.25, "& svg": { fontSize: 22 } }}>
                                                <StatusIcon status_liter={doc.docum_status_ as any} />
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

