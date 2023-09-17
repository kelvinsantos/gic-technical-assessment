import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getCafes
} from '../store/actions';
import Table from '../components/Table';
import EmployeeForm from '../components/Employee/EmployeeForm';
import EmployeeItem from '../components/Employee/EmployeeItem';
import FormDialog from '../components/FormDialog';

const Employee = ({
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getCafes,
    loading,
    employees,
    cafes
}) => {
    const [searchParams] = useSearchParams();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getEmployees(searchParams.get('cafe') || '');
        getCafes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createDialogContent = (
        <EmployeeForm
            loading={loading}
            handleCreateFn={createEmployee}
            handleClose={handleClose}
            cafes={cafes}
        />
    );

    const columnDefs = [
        { field: 'id', filter: true },
        { field: 'name', filter: true },
        { headerName: 'Email Address', field: 'email_address', filter: true },
        { headerName: 'Phone Number', field: 'phone_number', filter: true },
        {
            headerName: 'Days worked in the café',
            field: 'days_worked',
            filter: true
        },
        { headerName: 'Café name', field: 'cafe', filter: true },
        {
            headerName: 'Action',
            cellRenderer: EmployeeItem,
            cellRendererParams: {
                loading,
                handleUpdateFn: (id, req) => {
                    updateEmployee(id, req);
                },
                handleDeleteFn: (id) => {
                    deleteEmployee(id);
                },
                cafes
            }
        }
    ];

    return (
        <>
            <Grid
                container
                justifyContent="flex-end"
                marginTop={2}
                marginBottom={2}
            >
                <Button onClick={() => setOpen(true)} disabled={loading}>
                    Create Employee
                </Button>
            </Grid>
            <Table
                columnDefs={columnDefs}
                rowData={employees}
                loadingCellRenderer={loading}
            />
            <FormDialog
                open={open}
                handleClose={handleClose}
                title={'Create Employee'}
                content={createDialogContent}
            />
        </>
    );
};

Employee.propTypes = {
    getEmployees: PropTypes.func,
    createEmployee: PropTypes.func,
    updateEmployee: PropTypes.func,
    deleteEmployee: PropTypes.func,
    getCafes: PropTypes.func,
    loading: PropTypes.bool,
    employees: PropTypes.array,
    cafes: PropTypes.array
};

const mapStateToProps = (state) => ({
    loading: state.employees.loading,
    employees: state.employees.employees,
    cafes: state.cafes.cafes
});

const mapDispatchToProps = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getCafes
};

const EmployeeConnect = connect(mapStateToProps, mapDispatchToProps)(Employee);

export default EmployeeConnect;
