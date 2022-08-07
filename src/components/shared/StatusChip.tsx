import { Chip, Theme } from "@mui/material";

import { styleStatus } from "../../helpers";

interface Props {
    status: string;
    theme: Theme;
};

export const StatusChip: React.FC<Props> = ({ status, theme }) => (
    <Chip
        label={`${status}`}
        sx={{ bgcolor: `${styleStatus(theme, status)}` }}
    />
);
