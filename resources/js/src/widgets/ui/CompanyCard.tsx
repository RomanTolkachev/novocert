import type { FC } from "react";
import { Box, Typography } from "@mui/material";
import { ASSETS_URL, formatDateDDMMYYYY, InfoCard } from "@/shared";
import type { ICompany } from "@/entities/company";

type CompanyCardProps = {
    title: string;
    variant?: "outlined" | "elevation";
    company: ICompany | null | undefined;
};

export const CompanyCard: FC<CompanyCardProps> = ({ title, variant = "outlined", company }) => {
    const shortName = company?.company_short_name ?? company?.cli_jur__short_name ?? company?.name ?? null;
    const fullName = company?.company_full_name ?? company?.cli_jur__full_name ?? company?.name ?? null;

    const inn = company?.company_inn ?? company?.inn ?? null;
    const ogrn = company?.company_ogrn ?? company?.ogrn ?? null;
    const kpp = company?.cli_jur__kpp ?? null;

    const logoPath = company?.company_logo_path ?? company?.logo_path ?? null;

    const activityCode = [company?.okved_code, company?.okved_name].filter(Boolean).join(" ") || undefined;
    const headName = company?.ceo ?? undefined;

    const liquidationDate =
        company?.company_liquidation_date ??
        company?.cli_jur__liquidation_date ??
        company?.liquidation_date ??
        null;
    const isLiquidated = liquidationDate && liquidationDate !== "1900-01-01";
    const activeSince = company?.bus_begin ?? company?.cli_jur__bus_begin ?? null;
    const statusText = isLiquidated
        ? (liquidationDate ? `Ликвидирован с ${formatDateDDMMYYYY(liquidationDate)}` : "Ликвидирован")
        : (activeSince ? `Действует с ${formatDateDDMMYYYY(activeSince)}` : undefined);

    // status icon: используем литеральный статус cli_status_ (как в таблицах)
    const statusLiter = (company?.cli_status_ ?? undefined) as any;
    const statusTitle = company?.company_status ?? undefined;

    const rows: [string, string | undefined][] = [
        ["Полное наименование", fullName ?? undefined],
        ["ОГРН", ogrn ?? undefined],
        ["ИНН", inn ?? undefined],
        ["КПП", kpp ?? undefined],
        ["Статус", statusText],
        ["Код основного вида деятельности", activityCode],
        ["ФИО руководителя", headName ?? undefined],
    ];

    return (
        <InfoCard
            variant={variant}
            title={title}
            statusLiter={statusLiter}
            statusTitle={statusTitle}
            imageSrc={logoPath ? `${ASSETS_URL}/${logoPath}` : undefined}
        >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                {shortName ?? "—"}
            </Typography>

            {rows.map(([label, value]) => (
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
    );
};

