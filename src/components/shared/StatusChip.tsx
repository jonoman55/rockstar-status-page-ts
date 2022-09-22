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
};

/**
 * Status Chip
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status }): JSX.Element => (
    <Chip
        label={`${status}`}
        sx={(theme: Theme) => ({ bgcolor: `${styleStatus(theme, status)}` })}
    />
);
