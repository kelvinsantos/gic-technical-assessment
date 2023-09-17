import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Select, MenuItem } from '@mui/material';

import { getCafes, createCafe, updateCafe, deleteCafe } from '../store/actions';
import Table from '../components/Table';
import CafeForm from '../components/Cafe/CafeForm';
import CafeItem from '../components/Cafe/CafeItem';
import FormDialog from '../components/FormDialog';
import LinkCallRenderer from '../components/LinkCallRenderer';
import ImageCallRenderer from '../components/ImageCallRenderer';
import { Link } from 'react-router-dom';

const Cafe = ({
    getCafes,
    cafes,
    loading,
    createCafe,
    updateCafe,
    deleteCafe
}) => {
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useState('Filter location');

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCafes(location);
    }, [location]);

    const createDialogContent = (
        <CafeForm
            loading={loading}
            handleCreateFn={createCafe}
            handleClose={handleClose}
        />
    );

    const columnDefs = [
        { field: 'logo', cellRenderer: ImageCallRenderer },
        { field: 'name', filter: true },
        { field: 'description' },
        { field: 'employees', filter: true, cellRenderer: LinkCallRenderer },
        { field: 'location', filter: true },
        {
            headerName: 'Action',
            cellRenderer: CafeItem,
            cellRendererParams: {
                loading,
                handleUpdateFn: (id, req) => {
                    updateCafe(id, req);
                },
                handleDeleteFn: (id) => {
                    deleteCafe(id);
                }
            }
        }
    ];

    return (
        <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <MenuItem value="Filter location" selected={true}>
                    Filter location
                </MenuItem>
                {cafes?.map((cafe) => (
                    <MenuItem value={cafe.location}>{cafe.location}</MenuItem>
                ))}
            </Select>
            &nbsp;
            <Link onClick={() => setLocation('Filter location')}>
                Reset Filter
            </Link>
            <Grid
                container
                justifyContent="flex-end"
                marginTop={2}
                marginBottom={2}
            >
                <Button onClick={() => setOpen(true)} disabled={loading}>
                    Create Cafe
                </Button>
            </Grid>
            <Table
                columnDefs={columnDefs}
                rowData={cafes}
                loadingCellRenderer={loading}
            />
            <FormDialog
                open={open}
                handleClose={handleClose}
                title={'Create Cafe'}
                content={createDialogContent}
            />
        </>
    );
};

Cafe.propTypes = {
    getCafes: PropTypes.func,
    createCafe: PropTypes.func,
    updateCafe: PropTypes.func,
    deleteCafe: PropTypes.func,
    cafes: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    loading: state.cafes.loading,
    cafes: state.cafes.cafes
});

const mapDispatchToProps = {
    getCafes,
    createCafe,
    updateCafe,
    deleteCafe
};

const CafeConnect = connect(mapStateToProps, mapDispatchToProps)(Cafe);

export default CafeConnect;
