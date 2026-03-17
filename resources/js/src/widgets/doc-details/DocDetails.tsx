import type { FC } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { formatDateDDMMYYYY, Preloader, useDetailedData, type DetailScope } from "@/shared";
import { CompanyCard, DocumentCard } from "@/widgets/ui";
import type { IDocDetailPayload } from "./types";

type DocDetailsProps = {
    scope: DetailScope;
};

export const DocDetails: FC<DocDetailsProps> = ({ scope }) => {
    const { data, isFetching, error } = useDetailedData(scope, "doc");

    if (isFetching) return <Preloader />;

    if (error) {
        return (
            <Typography variant="body1" color="error">
                Ошибка загрузки
            </Typography>
        );
    }

    const payload = data?.data as IDocDetailPayload | undefined;
    if (!payload) {
        return (
            <Typography variant="body1" color="text.secondary">
                Нет данных
            </Typography>
        );
    }

    const { doc, from, to } = payload;

    const dateText =
        doc.fb_bus_begin
            ? `${formatDateDDMMYYYY(doc.fb_bus_begin)}${doc.fb_bus_end && doc.fb_bus_end !== "2399-12-31" ? ` — ${formatDateDDMMYYYY(doc.fb_bus_end)}` : ""}`
            : undefined;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ mb: 4, flex: "0 0 auto" }} align="center">
                Документ — {doc.fb_doc_reg_num ?? doc.fb_gid ?? "—"}
            </Typography>

            <Grid2
                sx={{ flex: 1, minHeight: 0, overflowY: "auto", "&>*": { height: "100%" } }}
                container
                spacing={2}
                alignItems="stretch"
            >
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CompanyCard title="От кого" variant="elevation" company={from} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DocumentCard title="Документ" variant="outlined" doc={doc} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <CompanyCard title="Кому" variant="elevation" company={to} />
                </Grid2>
            </Grid2>
        </Box>
    );
};

