import type { FC } from "react";
import { Box, Grid2, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import { formatDateDDMMYYYY, InfoCard, Preloader, useDetailedData, type DetailScope } from "@/shared";
import { CompanyCard } from "@/widgets/ui";
import type { ICompanyDetailPayload } from "./types";

type CompanyDetailsProps = {
    scope: DetailScope;
};

const groupByType = (docs: ICompanyDetailPayload["receivedDocs"]) => {
    const map = new Map<string, typeof docs>();
    docs.forEach(doc => {
        const key = doc.docum_type_name || "Без типа";
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(doc);
    });
    return Array.from(map.entries());
};

export const CompanyDetails: FC<CompanyDetailsProps> = ({ scope }) => {
    const { data, isFetching, error } = useDetailedData(scope, "company");

    if (isFetching) return <Preloader />;

    if (error) {
        return (
            <Typography variant="body1" color="error">
                Ошибка загрузки
            </Typography>
        );
    }

    const payload = data?.data as ICompanyDetailPayload | undefined;
    if (!payload) {
        return (
            <Typography variant="body1" color="text.secondary">
                Нет данных
            </Typography>
        );
    }

    const { company, receivedDocs, madeDocs } = payload;

    const groupedReceived = groupByType(receivedDocs);
    const groupedMade = groupByType(madeDocs);

    const renderDocsGroup = (groups: ReturnType<typeof groupByType>, sideTitle: string) => (
        <Box>
            {groups.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Нет документов
                </Typography>
            ) : (
                groups.map(([typeName, docs]) => (
                    <Accordion key={`${sideTitle}-${typeName}`} disableGutters>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2">{typeName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense disablePadding>
                                {docs.map(doc => {
                                    const subtitleParts: string[] = [];
                                    if (doc.fb_bus_begin) {
                                        const period =
                                            `${formatDateDDMMYYYY(doc.fb_bus_begin)}` +
                                            (doc.fb_bus_end && doc.fb_bus_end !== "2399-12-31"
                                                ? ` — ${formatDateDDMMYYYY(doc.fb_bus_end)}`
                                                : "");
                                        subtitleParts.push(period);
                                    }
                                    if (doc.fb_doc_reg_num) {
                                        subtitleParts.push(`№ ${doc.fb_doc_reg_num}`);
                                    }

                                    return (
                                        <ListItemButton
                                            key={doc.fb_gid}
                                            component={RouterLink}
                                            to={`/docs/${doc.fb_gid}`}
                                            sx={{ py: 0.5 }}
                                        >
                                            <ListItemText
                                                primary={doc.fb_name || "Без наименования"}
                                                secondary={subtitleParts.join(" • ") || undefined}
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Box>
    );

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ mb: 4, flex: "0 0 auto" }} align="center">
                Компания — {company.company_short_name ?? company.company_name ?? company.name ?? "—"}
            </Typography>

            <Grid2
                sx={{ flex: 1, minHeight: 0, overflowY: "auto", "&>*": { height: "100%" } }}
                container
                spacing={2}
                alignItems="stretch"
            >
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard variant="outlined" title="Полученные документы">
                        {renderDocsGroup(groupedReceived, "received")}
                    </InfoCard>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CompanyCard title="Компания" variant="elevation" company={company} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <InfoCard variant="outlined" title="Выданные документы">
                        {renderDocsGroup(groupedMade, "made")}
                    </InfoCard>
                </Grid2>
            </Grid2>
        </Box>
    );
};

