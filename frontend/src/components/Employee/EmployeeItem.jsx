import * as React from 'react';
import { Button, Grid, Link, DialogContentText } from '@mui/material';

import EmployeeForm from './EmployeeForm';
import FormDialog from '../FormDialog';

export default function EmployeeItem({
    data,
    loading,
    handleUpdateFn,
    handleDeleteFn,
    cafes
}) {
    const [action, setAction] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const updateDialogContent = (
        <EmployeeForm
            data={data}
            loading={loading}
            handleCreateFn={() => {}}
            handleUpdateFn={handleUpdateFn}
            handleClose={handleClose}
            cafes={cafes}
        />
    );

    const deleteDialogContent = (
        <>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this?
            </DialogContentText>
            <Grid container justifyContent="flex-end" marginTop={2}>
                <Button onClick={() => setOpen(false)} disabled={loading}>
                    No
                </Button>
                &nbsp;
                <Button
                    onClick={() => handleDeleteFn(data.id)}
                    disabled={loading}
                >
                    Yes
                </Button>
            </Grid>
        </>
    );

    return (
        <div>
            <label
                onClick={() => {
                    setAction('edit');
                    setOpen(true);
                }}
            >
                <Link style={{ cursor: 'pointer' }}>Edit</Link>
            </label>{' '}
            |{' '}
            <Link
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setAction('delete');
                    setOpen(true);
                }}
            >
                Delete
            </Link>
            <FormDialog
                open={open}
                handleClose={handleClose}
                title={action === 'edit' ? 'Edit Employee' : 'Delete Employee'}
                content={
                    action === 'edit'
                        ? updateDialogContent
                        : deleteDialogContent
                }
            />
        </div>
    );
}
