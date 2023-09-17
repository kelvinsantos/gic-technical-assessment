import React, { useRef, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Table = ({
    columnDefs,
    rowData,
    loadingCellRenderer
}) => {

    const gridRef = useRef();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    useEffect(() => {
        if (gridRef && gridRef.current && rowData) {
            gridRef?.current?.api?.sizeColumnsToFit();
        }
    }, [rowData]);

    return (
        <div style={{ height: '100%' }}>
            <div className="ag-theme-alpine" style={{ height: 500 }}>
                <div style={{
                    height: '100%',
                    width: '100%',
                }}>
                    <AgGridReact
                        ref={gridRef} // Ref for accessing Grid's API

                        rowData={rowData} // Row Data for Rows

                        columnDefs={columnDefs} // Column Defs for Columns
                        defaultColDef={defaultColDef} // Default Column Properties

                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                        rowSelection='multiple' // Options - allows click selection of rows

                        loadingCellRenderer={loadingCellRenderer}
                    />
                </div>

            </div>
        </div>
    );
};

export default Table;