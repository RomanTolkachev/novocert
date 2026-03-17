import { type FC, useRef, type RefObject } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { ASSETS_URL, formatDateDDMMYYYY, InfoCard, CustomTooltip, SkeletonImage } from "@/shared";
import { DownloadPDF } from "@/shared/ui/custom-table/ui/cells";
import type { IDocDetailDoc } from "@/widgets/doc-details/types";

type DocumentCardProps = {
    title?: string;
    variant?: "outlined" | "elevation";
    doc: IDocDetailDoc;
};

export const DocumentCard: FC<DocumentCardProps> = ({ title = "Документ", variant = "outlined", doc }) => {
    const dateText =
        doc.fb_bus_begin
            ? `${formatDateDDMMYYYY(doc.fb_bus_begin)}${doc.fb_bus_end && doc.fb_bus_end !== "2399-12-31" ? ` — ${formatDateDDMMYYYY(doc.fb_bus_end)}` : ""}`
            : undefined;

    const path = doc.fb_img_path || doc.fb_logo_path || "";
    const hasFile = Boolean(path);
    const isPdf = hasFile && path.toLowerCase().endsWith(".pdf");
    const downloadUrl = hasFile ? `${ASSETS_URL}/${path}` : undefined;
    const triggerRef = useRef<HTMLSpanElement | null>(null);

    return (
        <InfoCard
            variant={variant}
            title={doc.docum_type_name ? `${title} — ${doc.docum_type_name}` : title}
            statusLiter={doc.organ_status_liter as any}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="body1" fontWeight={600}>
                        {doc.fb_doc_reg_num ?? "—"}
                    </Typography>
                    {dateText && (
                        <Typography variant="body2" color="text.secondary">
                            {dateText}
                        </Typography>
                    )}
                </Box>

                {doc.fb_name && (
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Наименование
                        </Typography>
                        <Typography variant="body2">{doc.fb_name}</Typography>
                    </Box>
                )}

                {doc.fb_docum_text && (
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Текст
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {doc.fb_docum_text}
                        </Typography>
                    </Box>
                )}

                {hasFile && downloadUrl && (
                    <Box sx={{ mt: 1 }}>
                        {isPdf ? (
                            <DownloadPDF downloadUrl={downloadUrl} />
                        ) : (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: "center" }}>
                                <span ref={triggerRef}>
                                    <SkeletonImage src={downloadUrl} fit="contain" height={60} width={60} />
                                </span>
                                <CustomTooltip
                                    isImage
                                    distanceFromTrigger={-50}
                                    triggerRef={triggerRef as RefObject<HTMLElement>}
                                    content={
                                        <SkeletonImage src={downloadUrl} fit="contain" height={300} width={300} />
                                    }
                                />
                                <IconButton
                                    component="a"
                                    href={downloadUrl}
                                    download
                                    size="small"
                                    sx={{ ml: 0.5 }}
                                >
                                    <DownloadIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </InfoCard>
    );
};

