import React from "react";
import { Box } from '@mui/material';

export default function LinkCellRenderer({ data }) {
    return (
        <Box
            component="img"
            sx={{
                height: 50,
                width: 50,
            }}
            alt="Image not available."
            src={data.logo}
        />
    );
}
