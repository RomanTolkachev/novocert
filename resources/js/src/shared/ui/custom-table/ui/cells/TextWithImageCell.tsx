import { ASSETS_URL, SkeletonImage } from "@/shared";
import type { FC, ReactNode } from "react";
import { WrapWithTooltip } from "./WrapWithTooltip";
import { NoPhoto } from "@/shared/ui/svg";

type Props = {
    text: string | ReactNode
    img_path?: string
    img_component?: ReactNode
    id: string
}

export const TextWithImageCell: FC<Props> = ({ text, img_path, id, img_component }) => {
    const hasImage = Boolean(img_path || img_component);

    return (
        <div
            key={id}
            style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-between",
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
            {!hasImage && (
                <div style={{ height: 90, width: 90, flexShrink: 0 }}>
                    <NoPhoto />
                </div>
            )}
        </div>
    )
}
