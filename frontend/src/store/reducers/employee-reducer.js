const employeeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_EMPLOYEES':
            return { ...state, loading: true };
        case 'EMPLOYEES_RECEIVED':
            return { ...state, employees: action.json, loading: false }
        case 'CREATE_EMPLOYEE':
            return { ...state, loading: true };
        case 'EMPLOYEE_CREATED':
            return { ...state, loading: false }
        case 'UPDATE_EMPLOYEE':
            return { ...state, loading: true };
        case 'EMPLOYEE_UPDATED':
            return { ...state, loading: false }
        case 'DELETE_EMPLOYEE':
            return { ...state, loading: true };
        case 'EMPLOYEE_DELETED':
            return { ...state, loading: false }
        default:
            return state;
    }
};

export default employeeReducer;