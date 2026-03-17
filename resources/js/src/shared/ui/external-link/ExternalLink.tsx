import type { FC, ReactNode } from "react";
import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";

type ExternalLinkProps = MuiLinkProps & {
    href: string;
    children: ReactNode;
};

export const ExternalLink: FC<ExternalLinkProps> = ({ href, children, ...props }) => {
    return (
        <MuiLink
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {children}
        </MuiLink>
    );
}

