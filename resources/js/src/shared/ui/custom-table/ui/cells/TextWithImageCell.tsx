import { ASSETS_URL, SkeletonImage } from "@/shared";
import type { FC, ReactNode } from "react";
import { WrapWithTooltip } from "./WrapWithTooltip";

type Props = {
    text: string | ReactNode
    img_path?: string
    img_component?: ReactNode
    id: string
}

export const TextWithImageCell: FC<Props> = ({ text, img_path, id, img_component }) => {
    return (
        <div
            key={id}
            style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: img_component ? "space-between" : "center",
                gap: '16px'
            }}
        >
            <span style={{ fontWeight: 300 }}>{text ?? "-"}</span>
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
    )
}
