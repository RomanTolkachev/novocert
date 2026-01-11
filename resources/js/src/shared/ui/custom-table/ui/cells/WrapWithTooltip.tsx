import { CustomTooltip, makeClamp } from "@/shared";
import { forwardRef, type ReactNode, useRef, useImperativeHandle } from "react";

type Props = {
    children: ReactNode;
    tooltipContent: ReactNode;
    distanceFromTrigger?: number;
    windowEdgeMargin?: number;
    isImage?: boolean
};

export const WrapWithTooltip = forwardRef<HTMLDivElement, Props>(
    ({ children, tooltipContent, distanceFromTrigger = -15, windowEdgeMargin = 15, isImage = false }, ref) => {
        const internalRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

        return (
            <div ref={internalRef} style={{ display: "inline-block", ...makeClamp(3) }}>
                {children}
                <CustomTooltip
                    isImage={isImage}
                    triggerRef={internalRef as React.RefObject<HTMLElement>}
                    delay={500}
                    hideDelay={350}
                    distanceFromTrigger={distanceFromTrigger}
                    windowEdgeMargin={windowEdgeMargin}
                    content={tooltipContent}
                />
            </div>
        );
    }
);

WrapWithTooltip.displayName = "WrapWithTooltip";
