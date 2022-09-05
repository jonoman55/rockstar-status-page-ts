import { Chip, Theme } from "@mui/material";

import { styleStatus } from "../../helpers";

/**
 * Status Chip Props
 */
export interface StatusChipProps {
    /**
     * Status - UP, LIMITED, DOWN
     */
    status: string;
    /**
     * MUI Theme
     */
    theme: Theme;
};

/**
 * Status Chips
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status, theme }): JSX.Element => (
    <Chip
        label={`${status}`}
        sx={{ bgcolor: `${styleStatus(theme, status)}` }}
    />
);
