import { ASSETS_URL, SkeletonImage } from "@/shared";
import TableCell from "@mui/material/TableCell";
import type { FC, ReactNode } from "react";
import { WrapWithTooltip } from "./WrapWithTooltip";

type Props = {
    text: string
    img_path?: string
    img_component?: ReactNode
    id: string
}

export const TextWithImageCell: FC<Props> = ({ text, img_path, id, img_component }) => {
    return (
        <TableCell align="center" key={id}>
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: '16px'
                }}
            >
                <span>{text ?? "-"}</span>
                {img_path && (
                    <WrapWithTooltip isImage tooltipContent={
                        <SkeletonImage
                            src={`${ASSETS_URL}/${img_path}`}
                            fit="contain"
                            height={300}
                            width={300}
                        />
                    }>
                        <SkeletonImage
                            src={`${ASSETS_URL}/${img_path}`}
                            fit="contain"
                            height={90}
                            width={90}
                        />
                    </WrapWithTooltip>

                )}
                {img_component && img_component}
            </div>
        </TableCell>
    )
}