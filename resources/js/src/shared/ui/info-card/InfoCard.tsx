import type { FC, ReactNode, RefObject } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { CustomTooltip, SkeletonImage } from "@/shared";
import { StatusIcon } from "@/shared/ui/custom-table/ui/cells/StatusIcon";

type InfoCardVariant = "outlined" | "elevation";

type TStatusLiter = "N" | "A" | "L" | "PL" | "B" | "T" | "P" | "S" | "D" | undefined | null;

type InfoCardProps = {
    variant?: InfoCardVariant;
    title: ReactNode;
    statusLiter?: TStatusLiter;
    statusTitle?: string;
    imageSrc?: string;
    children: ReactNode;
};

export const InfoCard: FC<InfoCardProps> = ({ variant = "outlined", title, statusLiter, statusTitle, imageSrc, children }) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);

    return (
        <Paper
            variant={variant === "outlined" ? "outlined" : "elevation"}
            sx={{
                p: 2,
                height: "100%",
                overflowY: "auto",
                borderColor: "divider",
            }}
        >
            <Box
                sx={{
                    mb: 1.5,
                    display: "grid",
                    gridTemplateColumns: statusLiter ? "1fr auto" : "1fr",
                    columnGap: 1,
                    alignItems: "start",
                }}
            >
                <Typography variant="h5" color="text.secondary" sx={{ minWidth: 0 }}>
                    {title}
                </Typography>
                {statusLiter && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            pt: 0.25,
                        }}
                    >
                        <StatusIcon status_liter={statusLiter} title={statusTitle} />
                    </Box>
                )}
            </Box>

            {imageSrc && (
                <Box sx={{ mb: 1.5 }}>
                    <div style={{width: "fit-content"}} ref={triggerRef}>
                        <SkeletonImage src={imageSrc} alt="" height={100} width={100} fit="contain" />
                    </div>
                    <CustomTooltip
                        isImage
                        distanceFromTrigger={0}
                        triggerRef={triggerRef as RefObject<HTMLElement>}
                        content={
                            <SkeletonImage src={imageSrc} alt="" height={300} width={300} fit="contain" />
                        }
                    />
                </Box>
            )}

            {children}
        </Paper>
    );
};

