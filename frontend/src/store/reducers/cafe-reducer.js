const cafeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CAFES':
            return { ...state, loading: true };
        case 'CAFES_RECEIVED':
            return { ...state, cafes: action.json, loading: false }
        case 'CREATE_CAFE':
            return { ...state, loading: true };
        case 'CAFE_CREATED':
            return { ...state, loading: false }
        case 'UPDATE_CAFE':
            return { ...state, loading: true };
        case 'CAFE_UPDATED':
            return { ...state, loading: false }
        case 'DELETE_CAFE':
            return { ...state, loading: true };
        case 'CAFE_DELETED':
            return { ...state, loading: false }
        default:
            return state;
    }
};

export default cafeReducer;