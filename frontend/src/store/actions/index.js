export const GET_CAFES = 'GET_CAFES';
export const getCafes = (location) => ({
    type: GET_CAFES,
    payload: {
        location
    }
});

export const CREATE_CAFE = 'CREATE_CAFE';
export const createCafe = (requestData) => ({
    type: CREATE_CAFE,
    payload: {
        requestData
    }
});

export const UPDATE_CAFE = 'UPDATE_CAFE';
export const updateCafe = (id, requestData) => ({
    type: UPDATE_CAFE,
    payload: {
        id,
        requestData
    }
});

export const DELETE_CAFE = 'DELETE_CAFE';
export const deleteCafe = (id) => ({
    type: DELETE_CAFE,
    payload: {
        id
    }
});

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const getEmployees = (cafe) => ({
    type: GET_EMPLOYEES,
    payload: {
        cafe
    }
});

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const createEmployee = (requestData) => ({
    type: CREATE_EMPLOYEE,
    payload: {
        requestData
    }
});

export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const updateEmployee = (id, requestData) => ({
    type: UPDATE_EMPLOYEE,
    payload: {
        id,
        requestData
    }
});

export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const deleteEmployee = (id) => ({
    type: DELETE_EMPLOYEE,
    payload: {
        id
    }
});