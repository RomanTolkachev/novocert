import type { FC } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

type Props = {
    sectionLabel: string;
};

export const DetailedInfo: FC<Props> = ({ sectionLabel }) => {
    const { id } = useParams<"id">();
    return (
        <Typography variant="body1">
            Детальная страница: {sectionLabel}, id: {id ?? "—"}
        </Typography>
    );
};
