import { ASSETS_URL, CustomTooltip, highlight, makeList, SkeletonImage, useParamsCustom } from "@/shared";
import TableCell from "@mui/material/TableCell";
import { flexRender, type Cell, type Row } from "@tanstack/react-table";
import { useRef, type ReactNode, type RefObject } from "react";
import { ImageSmall, StatusIcon, TextWithImageCell } from "./cells";
import { Link, Typography } from "@mui/material";
import type { ISystem } from "@/entities/system";
import type { TColumns } from "@/entities";

type ColumnsQuery = Partial<Record<TColumns, string | string[]>> & {
    page?: string;
    perPage?: string;
};

interface CustomCellProps<T extends Record<string, any>> {
    cellData: Cell<T, unknown>;
}

type TStatusLiter = "N" | "A" | "L" | "PL" | "B" | "T" | "P" | "S" | "D" | undefined | null;

/**
 * должна возвращать TableCell. К сожалению не нашел как тайпскриптом проверить
 * возвращаемый тип именно TableCell, поэтому следим глазами
 * @param cellData Cell<T, unknown>
 * @returns TableCell
 */
export const CustomCell = <T extends Record<string, any>>({
    cellData
}: CustomCellProps<T>): ReactNode => {
    const { getContext, id } = cellData;
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

        case "cert__name": {
            const { id, original: { cert__status } } = context.row;
            return (
                <TextWithImageCell id={id} text={value} img_component={<StatusIcon status_liter={cert__status} />} />
            );
        }

        case "organ__name": {
            const { id, original: { organ__status } } = context.row;
            return (
                <TextWithImageCell id={id} text={value} img_component={<StatusIcon status_liter={organ__status} />} />
            );
        }

        case "logo_path":
            if (value) {
                return <ImageSmall path={`${ASSETS_URL}/${context.row.original.logo_path}`} />
            }
            return <TableCell align="center" key={id}>-</TableCell>;

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

        case 'system_name':
            if (value) {
                const { id, original: { docum_web_reference, img_path } } = context.row as unknown as Row<ISystem>;
                const system_name = query.system_name;
                return (
                    <TextWithImageCell
                        img_path={img_path}
                        id={id}
                        text={
                            <Link target="_blank" rel="noreferrer" href={docum_web_reference} color="inherit">
                                {highlight(value, system_name)}
                            </Link>
                        } />
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

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

            return <TableCell align="center" key={id}>-</TableCell>;

        case 'owner__inn':
            if (value) {
                const { original: { owner__ogrn } } = context.row as unknown as Row<ISystem>;
                const { owner__inn, owner__ogrn: ogrn } = query;
                return (
                    <TableCell>
                        <Typography>{highlight(value, owner__inn)} /<br /></Typography>
                        <Typography>{highlight(owner__ogrn, ogrn)}</Typography>
                    </TableCell>
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

        case 'system_cert_number':
            if (value) {
                const { system_cert_number } = query;
                const { id, original: { status__gid } } = context.row as unknown as Row<ISystem>;
                return (
                    <TextWithImageCell
                        img_component={<StatusIcon status_liter={status__gid as TStatusLiter} />}
                        id={id}
                        text={highlight(value, system_cert_number)} />
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;



        case 'cert__name':
            if (value) {
                const { id, original: { cert__status } } = context.row;
                return (
                    <TextWithImageCell id={id} text={value} img_path={cert__status} />
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

        case 'applicant__short_name':
            if (value) {
                const { id, original: { applicant__logo } } = context.row;
                return (
                    <TextWithImageCell id={id} text={value} img_path={applicant__logo} />
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

        case "accreditation":
            if (value) {
                const accreditation = query.accreditation;
                return (
                    <TableCell ref={triggerRef} align="center" key={id}>
                        {makeList(value, {
                            delimiter: ";",
                            maxLiItems: 3,
                            maxLines: 3,
                            showBullets: true,
                            showMoreText: "howMany",
                            highlightPattern: accreditation,
                        }
                        )}
                        <CustomTooltip
                            distanceFromTrigger={-15}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={makeList(value, { showBullets: true, delimiter: ";", highlightPattern: accreditation })} />
                    </TableCell>
                );
            }
            return <TableCell align="center" key={id}>-</TableCell>;

        case "organ_accreditation_scope":
            if (value) {
                return (
                    <TableCell ref={triggerRef} align="center" key={id}>
                        {makeList(value, {
                            delimiter: ";",
                            maxLiItems: 3,
                            maxLines: 3,
                            showBullets: true,
                            showMoreText: "howMany"
                        }
                        )}
                        <CustomTooltip
                            distanceFromTrigger={-15}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={makeList(value, { showBullets: true, delimiter: ";" })} />
                    </TableCell>
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

        case "img_path":
            if (value) {
                return (
                    <TableCell ref={triggerRef} align="center" key={id}>
                        <SkeletonImage src={`${ASSETS_URL}/${value}`} fit="contain" height={60} width={60} />
                        <CustomTooltip
                            isImage
                            distanceFromTrigger={-50}
                            triggerRef={triggerRef as RefObject<HTMLElement>}
                            content={<SkeletonImage src={`${ASSETS_URL}/${value}`} fit="contain" height={300} width={300} />} />
                    </TableCell>
                );
            }

            return <TableCell align="center" key={id}>-</TableCell>;

        case "organ_status_": {
            const statusTitle = context.row.original.status__name;
            return (
                <TableCell align="center" key={id}>
                    <StatusIcon title={statusTitle} status_liter={value as any} />
                </TableCell>
            )
        }

        case "system__name": {
            const { id, original: { system__img } } = context.row;
            return (
                <TextWithImageCell id={id} text={value} img_path={system__img} />
            );
        }

        case "type__cert_system_name": {
            const { id, original: { type__img_path } } = context.row;

            return (
                <TextWithImageCell id={id} text={value} img_path={type__img_path} />
            );
        }

        case "cli_jur__short_name": {
            const { id, original: { cli_table__logo_path } } = context.row;

            return (
                <TextWithImageCell id={id} text={value} img_path={cli_table__logo_path} />
            );
        }

        default:
            return (
                <TableCell align="center" key={id}>
                    {flexRender(cellData.column.columnDef.cell, context)}
                </TableCell>
            )
    }
};