import { ASSETS_URL, CustomTooltip, highlight, makeList, SkeletonImage, useParamsCustom } from "@/shared";
import { flexRender, type Cell, type Row } from "@tanstack/react-table";
import { useRef, type ReactNode, type RefObject } from "react";
import { ImageSmall, StatusIcon, TextWithImageCell, DownloadPDF } from "./cells";
import { IconButton, Link, Typography, type TableProps } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import type { ISystem } from "@/entities/system";
import type { TColumns } from "@/entities";
import { NoPhoto } from "../../svg";

type ColumnsQuery = Partial<Record<TColumns, string | string[]>> & {
    page?: string;
    perPage?: string;
};

interface CustomCellProps<T extends Record<string, any>> {
    cellData: Cell<T, unknown>;
    tableSize?: TableProps["size"];
}

type TStatusLiter = "N" | "A" | "L" | "PL" | "B" | "T" | "P" | "S" | "D" | undefined | null;

export const CustomCell = <T extends Record<string, any>>({
    cellData, tableSize
}: CustomCellProps<T>): ReactNode => {
    const { getContext } = cellData;
    const context = getContext();
    const value = context.getValue() as string;
    const columnId = context.column.id as keyof T;
    const [_, getQuery] = useParamsCustom<ColumnsQuery>();
    const query = getQuery();

    const triggerRef = useRef<HTMLTableCellElement | null>(null)

    switch (columnId as TColumns) {

        case "name": {
            const { id, original: { logo_path } } = context.row;
            return (
                <TextWithImageCell id={id} text={value} img_path={logo_path} />
            );
        }

        case "fb_name": {
            const { id, original: { organ_status_liter } } = context.row;
            return (
                <TextWithImageCell id={id} text={highlight(value, query.fb_name)} img_component={<StatusIcon status_liter={organ_status_liter} />} />
            );
        }

        case "cert__name": {
            const { id, original: { cert__status } } = context.row;
            let pattern = query.cert__name
            return (
                <TextWithImageCell id={id} text={highlight(value, pattern)} img_component={<StatusIcon status_liter={cert__status} />} />
            );
        }

        // cert sysems
        case "organ__name": {
            const { id, original: { organ__status } } = context.row;
            let pattern = query.organ__name;
            return (
                <TextWithImageCell id={id} text={highlight(value, pattern)} img_component={<StatusIcon status_liter={organ__status} />} />
            );
        }

        // organs
        case "organ_name": {
            const { id, original: { legal_logo_path } } = context.row;
            return (
                <TextWithImageCell id={id} text={value} img_path={legal_logo_path} />
            );
        }

        case "logo_path":
            if (value) {
                return <ImageSmall path={`${ASSETS_URL}/${context.row.original.logo_path}`} />
            }
            return '-';

        // case 'avatar':
        //     if (value) {
        //         return <ImageSmall rounded path={`${ASSETS_URL}/${context.row.original.avatar}`} />
        //     }
        //     return <TableCell align="center" key={id}>-</TableCell>;

        // case 'cert_system_name':
        //     if (value) {
        //         const { id, original: { docum_web_reference } } = context.row;
        //         return (
        //             <TextWithImageCell id={id} text={value} img_path={docum_web_reference} />
        //         );
        //     }

        //     return <TableCell align="center" key={id}>-</TableCell>;

        // case "type__cert_system_name": {
        //     const { id, original: { type__img_path } } = context.row;

        //     return (
        //         <TextWithImageCell id={id} text={value} img_path={type__img_path} />
        //     );
        // }

        // ячейка в 2 таблицах, системы и органы, поэтому через ??
        case 'system_name':
            if (value) {
                const { id, original: { docum_web_reference, img_path, system_img_path } } = context.row;
                const system_name = query.system_name;
                return (
                    <TextWithImageCell
                        img_path={img_path ?? system_img_path}
                        id={id}
                        text={
                            <Link target="_blank" rel="noreferrer" href={docum_web_reference} color="inherit">
                                {highlight(value, system_name)}
                            </Link>
                        } />
                );
            }

            return '-';

        // case 'organ_number'

        case 'owner__short_name':
            if (value) {
                const { id, original: { owner__logo_path } } = context.row as unknown as Row<ISystem>;
                const owner__short_name = query.owner__short_name;
                return (
                    <TextWithImageCell
                        img_path={owner__logo_path}
                        id={id}
                        text={highlight(value, owner__short_name)} />
                );
            }

            return '-';

        case 'legal_inn':
        case 'owner__inn':
            if (value) {
                const { original: { owner__ogrn, legal_ogrn } } = context.row;
                const { owner__inn, owner__ogrn: ogrn } = query;
                return (
                    <>
                        <Typography variant="inherit">{highlight(value, owner__inn)} /<br /></Typography>
                        <Typography variant="inherit">{highlight(owner__ogrn ?? legal_ogrn, ogrn)}</Typography>
                    </>
                );
            }

            return '-';

        case 'company_inn':
            if (value) {
                const { original: { company_ogrn } } = context.row;
                return (
                    <>
                        <Typography variant="inherit">{highlight(value, query.company_inn)} /<br /></Typography>
                        <Typography variant="inherit">{highlight(company_ogrn, query.company_ogrn)}</Typography>
                    </>
                );
            }

            return '-';

        case 'okved_code':
            if (value) {
                const { original: { okved_name } } = context.row;
                return (
                    <Typography variant="inherit">
                        {highlight(value + "." + okved_name, query.okved_code)}
                    </Typography>
                );
            }

            return '-';

        case 'organ_number':
        case 'system_cert_number':
            if (value) {
                const { system_cert_number } = query;
                const { id, original: { status__gid, organ_status_ } } = context.row;
                return (
                    <TextWithImageCell
                        img_component={<StatusIcon status_liter={status__gid ?? organ_status_ as TStatusLiter} />}
                        id={id}
                        text={highlight(value, system_cert_number)} />
                );
            }

            return '-';

        case "fb_img_path": {
            const { original: { fb_logo_path } } = context.row;
            const path = (value as string) || fb_logo_path;

            if (!path) {
                return <div style={{ height: "45px", width: "45px", margin: "0 auto" }}><NoPhoto /></div>;
            }

            const isPdf = path.toLowerCase().endsWith(".pdf");
            const downloadUrl = `${ASSETS_URL}/${path}`;

            if (isPdf) {
                return <DownloadPDF downloadUrl={downloadUrl} />;
            }

            const previewUrl = downloadUrl;

            return (
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    <span ref={triggerRef}>
                        <SkeletonImage src={previewUrl} fit="contain" height={60} width={60} />
                    </span>
                    <CustomTooltip
                        isImage
                        distanceFromTrigger={-50}
                        triggerRef={triggerRef as RefObject<HTMLElement>}
                        content={
                            <SkeletonImage src={previewUrl} fit="contain" height={300} width={300} />
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
                </div>
            );
        }


        case "company_short_name":
            if (value) {
                const { id, original: { company_logo_path } } = context.row;
                return (
                    <TextWithImageCell id={id} text={highlight(value, query.company_logo_path)} img_path={company_logo_path} />
                );
            }
            return '-';

        case "from_short_name":
            if (value) {
                const { id, original: { from_logo_path } } = context.row;
                return (
                    <TextWithImageCell id={id} text={highlight(value, query.from_short_name)} img_path={from_logo_path} />
                );
            }
            return '-';

        case "to_short_name":
            if (value) {
                const { id, original: { to_logo_path } } = context.row;
                return (
                    <TextWithImageCell id={id} text={highlight(value, query.to_short_name)} img_path={to_logo_path} />
                );
            }
            return '-';

        case 'cert__name':
            if (value) {
                const { id, original: { cert__status } } = context.row;
                return (
                    <TextWithImageCell id={id} text={value} img_path={cert__status} />
                );
            }

            return '-';

        case 'legal_short_name':
        case 'applicant__short_name':
            let pattern = query.applicant__short_name ?? query.legal_short_name
            if (value) {
                const { id, original: { applicant__logo, legal_logo_path } } = context.row;
                return (
                    <TextWithImageCell id={id} text={highlight(value, pattern)} img_path={applicant__logo ?? legal_logo_path} />
                );
            }

            return '-';

        case "accreditation":
            if (value) {
                const accreditation = query.accreditation;
                return (
                    <>
                        <span ref={triggerRef}>
                            {makeList(value, {
                                delimiter: ";",
                                maxLiItems: tableSize === "small" ? 2 : 3,
                                maxLines: tableSize === "small" ? 2 : 3,
                                showBullets: true,
                                showMoreText: "howMany",
                                highlightPattern: accreditation,
                            })}
                        </span>
                        <CustomTooltip
                            distanceFromTrigger={-15}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={makeList(value, { showBullets: true, delimiter: ";", highlightPattern: accreditation })} />
                    </>
                );
            }
            return '-';

        case "organ_accreditation_scope":
            if (value) {
                return (
                    <>
                        <span ref={triggerRef}>
                            {makeList(value, {
                                delimiter: ";",
                                maxLiItems: 3,
                                maxLines: 3,
                                showBullets: true,
                                showMoreText: "howMany",
                            })}
                        </span>
                        <CustomTooltip
                            distanceFromTrigger={-15}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={makeList(value, { showBullets: true, delimiter: ";" })} />
                    </>
                );
            }

            return '-';

        case "img_path":
            if (value) {
                return (
                    <>
                        <span ref={triggerRef}>
                            <SkeletonImage src={`${ASSETS_URL}/${value}`} fit="contain" height={60} width={60} />
                        </span>
                        <CustomTooltip
                            isImage
                            distanceFromTrigger={-50}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={<SkeletonImage src={`${ASSETS_URL}/${value}`} fit="contain" height={300} width={300} />} />
                    </>
                );
            }

            return '-';

        case "organ_status_": {
            const statusTitle = context.row.original.status__name;
            return (
                <StatusIcon title={statusTitle} status_liter={value as any} />
            )
        }

        case "system__name": {
            const { id, original: { system__img } } = context.row;
            let pattern = query.system__name;
            return (
                <TextWithImageCell id={id} text={highlight(value, pattern)} img_path={system__img} />
            );
        }

        case "cli_jur__short_name": {
            const { id, original: { cli_table__logo_path } } = context.row;

            return (
                <TextWithImageCell id={id} text={value} img_path={cli_table__logo_path} />
            );
        }

        default:
            return flexRender(cellData.column.columnDef.cell, context)
    }
};