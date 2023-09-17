import * as React from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';

export default function FormDialog({
    open,
    handleClose,
    title,
    content
}) {
    return (
        <Grid container spacing={2}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
            </Dialog>
        </Grid>
    );
}