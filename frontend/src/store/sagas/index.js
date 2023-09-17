import { all, put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_CAFES,
    CREATE_CAFE,
    UPDATE_CAFE,
    DELETE_CAFE,
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from '../actions';

function* fetchCafes({ payload: { location } }) {
    let filter = '';
    if (location && location !== 'Filter location') {
        filter = `?location=${location}`
    }
    const json = yield fetch(`http://localhost:3000/cafes${filter}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
    })
        .then(response => response.json());

    yield put({ type: "CAFES_RECEIVED", json: json.cafes || [{ error: json.message }] });
}

function* createCafe({ payload: { requestData } }) {
    const json = yield fetch(`http://localhost:3000/cafes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json());

    yield put({ type: "CAFE_CREATED", json: json || [{ error: json.message }] });
    yield call(fetchCafes, { payload: { location: '' } })
}

function* updateCafe({ payload: { id, requestData } }) {
    const json = yield fetch(`http://localhost:3000/cafes/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json());

    yield put({ type: "CAFE_UPDATED", json: json || [{ error: json.message }] });
    yield call(fetchCafes, { payload: { location: '' } })
}

function* deleteCafe({ payload: { id } }) {
    const json = yield fetch(`http://localhost:3000/cafes/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        }
    })
        .then(response => response.json());

    yield put({ type: "CAFE_DELETED", json: json || [{ error: json.message }] });
    yield call(fetchCafes, { payload: { location: '' } })
}

function* fetchEmployees({ payload: { cafe } }) {
    let filter = '';
    if (cafe) {
        filter = `?cafe=${cafe}`
    }
    const json = yield fetch(`http://localhost:3000/employees${filter}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
    })
        .then(response => response.json());

    yield put({ type: "EMPLOYEES_RECEIVED", json: json.employees || [{ error: json.message }] });
}

function* createEmployee({ payload: { requestData } }) {
    const json = yield fetch(`http://localhost:3000/employees`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json());

    yield put({ type: "EMPLOYEE_CREATED", json: json || [{ error: json.message }] });
    yield call(fetchEmployees, { payload: { cafe: '' } })
}

function* updateEmployee({ payload: { id, requestData } }) {
    const json = yield fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json());

    yield put({ type: "EMPLOYEE_UPDATED", json: json || [{ error: json.message }] });
    yield call(fetchEmployees, { payload: { cafe: '' } })
}

function* deleteEmployee({ payload: { id } }) {
    const json = yield fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "development"
        }
    })
        .then(response => response.json());

    yield put({ type: "EMPLOYEE_DELETED", json: json || [{ error: json.message }] });
    yield call(fetchEmployees, { payload: { cafe: '' } })
}

function* actionWatcher() {
    yield takeLatest(GET_CAFES, fetchCafes)
    yield takeLatest(CREATE_CAFE, createCafe)
    yield takeLatest(UPDATE_CAFE, updateCafe)
    yield takeLatest(DELETE_CAFE, deleteCafe)
    yield takeLatest(GET_EMPLOYEES, fetchEmployees)
    yield takeLatest(CREATE_EMPLOYEE, createEmployee)
    yield takeLatest(UPDATE_EMPLOYEE, updateEmployee)
    yield takeLatest(DELETE_EMPLOYEE, deleteEmployee)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}