import type { FC } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArchiveIcon from "@mui/icons-material/Archive";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { WrapWithTooltip } from "./WrapWithTooltip";

/**
 * Статусы из БД:
 * N  - нет
 * A  - Действует
 * D  - Архивный
 * S  - Приостановлен
 * T  - Прекращен
 * P  - Частично приостановлен
 * L  - Ликвидирована
 * B  - В процессе банкротства
 * PL - В процессе ликвидации
 */

type Props = {
    status_liter: "N" | "A" | "L" | "PL" | "B" | "T" | "P" | "S" | "D" | undefined | null;
    title?: string
};

export const StatusIcon: FC<Props> = ({ status_liter, title }) => {
    switch (status_liter) {
        case "A": // Действует
            return (
                <WrapWithTooltip tooltipContent={title ?? "Действует"}>
                    <CheckCircleIcon
                        fontSize="large"
                        sx={{ color: "success.main" }}
                    />
                </WrapWithTooltip>
            );
        case "S": // Приостановлен
        case "B": // В процессе банкротства
            return (
                <WrapWithTooltip tooltipContent={title ?? "Приостановлен / В процессе банкротства"}>
                    <PauseCircleIcon
                        fontSize="large"
                        sx={{ color: "warning.main" }}
                    />
                </WrapWithTooltip>
            );
        case "D": // Архивный
            return (
                <WrapWithTooltip tooltipContent={title ?? "Архивный"}>
                    <ArchiveIcon
                        fontSize="large"
                        sx={{ color: "grey.600" }}
                    />
                </WrapWithTooltip>
            );
        case "L": // Ликвидирована
            return (
                <WrapWithTooltip tooltipContent={title ?? "Ликвидирована"}>
                    <HighlightOffIcon
                        fontSize="large"
                        sx={{ color: "error.main" }}
                    />
                </WrapWithTooltip>
            );
        case "N": // Нет
        case "P": // Частично приостановлен
        case "PL": // В процессе ликвидации
        case "T": // Прекращен
        default:
            return (
                <WrapWithTooltip tooltipContent={title ?? "Недействует"}>
                    <CancelIcon
                        fontSize="large"
                        sx={{ color: "error.main" }}
                        titleAccess={title ?? "Недействует"}
                    />
                </WrapWithTooltip>

            );
    }
};
