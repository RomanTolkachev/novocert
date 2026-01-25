import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import type { FC } from "react";
import { PdfIcon } from "@/shared/ui/svg";

interface DownloadPDFProps {
    downloadUrl: string;
}

export const DownloadPDF: FC<DownloadPDFProps> = ({ downloadUrl }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <div style={{ width: 60, height: 60 }}>
                <PdfIcon />
            </div>
            <IconButton
                component="a"
                href={downloadUrl}
                download
                size="small"
                sx={{ ml: 0.5 }}
            >
                <DownloadIcon fontSize="small" />
            </IconButton>
        </div>
    );
};
