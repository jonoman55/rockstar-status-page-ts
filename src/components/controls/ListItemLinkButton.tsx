import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { ToolTip } from "./ToolTip"

import type { Placement } from "../../types"

const styles = {
    color: 'primary.contrastText',
};

interface ListItemButtonProps {
    icon?: React.ReactElement;
    primary: string;
    href: string;
    placement: Placement;
};

export const ListItemLinkButton: React.FC<ListItemButtonProps> = ({ primary, href, icon, placement }): JSX.Element => (
    <ListItem disablePadding>
        <ToolTip title={primary} placement={placement} sx={{ width: '100%' }} component={
            <ListItemButton href={href} target='_blank'>
                <ListItemIcon sx={styles}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={primary} sx={styles} />
            </ListItemButton>}
        />
    </ListItem>
);