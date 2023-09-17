import { combineReducers } from 'redux';
import cafeReducer from './cafe-reducer';
import employeeReducer from './employee-reducer';

const rootReducer = combineReducers({
    cafes: cafeReducer,
    employees: employeeReducer
});

export default rootReducer;