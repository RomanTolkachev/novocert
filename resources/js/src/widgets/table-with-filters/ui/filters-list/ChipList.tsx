import type { FC } from "react";
import type { IFilterListItem } from "../../model";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

type Props = {
    list: IFilterListItem[]
    onDeleteFn: (item: IFilterListItem["headerLabel"]) => void
}

export const ChipList: FC<Props> = ({ list, onDeleteFn }) => {

    if (!list.length) {
        return null;
    }
    return (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", pr: 0.4 }}>
            {list.map((item) => (
                <Chip color="warning" key={item.headerLabel} label={item.headerLabelTranslate} onDelete={() => onDeleteFn(item.headerLabel)} />
            ))}
        </Box>
    )
}