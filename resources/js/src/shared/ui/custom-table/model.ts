export interface IAction {
    label: string;
    onClick: () => void;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
    disabled?: boolean;
}