import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import type { FC } from "react";
import type { IAction } from "../../model";

interface ActionsToolbarProps {
    actions: IAction[];
    paddingLeft?: number;
    isDrawerOpen?: boolean;
}

export const ActionsToolbar: FC<ActionsToolbarProps> = ({
    actions,
}) => {
    return (
        <Box sx={{
            flexShrink: 0,
            transition: 'padding-left 0.3s ease-in-out',
            backgroundColor: 'background.paper',
            // borderTop: 1,
            borderColor: 'divider',
            minHeight: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
        }}>
            {actions.map((action, index) => (
                <Button
                    key={index}
                    variant={action.variant || "contained"}
                    color={action.color || "primary"}
                    onClick={action.onClick}
                    disabled={action.disabled}
                >
                    {action.label}
                </Button>
            ))}
        </Box>
    );
};