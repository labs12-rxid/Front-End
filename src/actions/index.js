import axios from 'axios';

const endpoint = process.env.REACT_APP_BACKEND;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`${endpoint}/api/auth/login`, creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userID', res.data.id);
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`${endpoint}/api/auth/register`, creds)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userID', res.data.id);
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUser = id => dispatch => {
  dispatch({ type: FETCH_USER_REQUEST });
  axios
    .get(`${endpoint}/api/users/${id}`)
    .then(res => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const FETCH_MEDS_REQUEST = 'FETCH_MEDS_REQUEST';
export const FETCH_MEDS_SUCCESS = 'FETCH_MEDS_SUCCESS';
export const FETCH_MEDS_FAILURE = 'FETCH_MEDS_FAILURE';

export const fetchMeds = user_id => dispatch => {
  dispatch({ type: FETCH_MEDS_REQUEST });
  axios
    .get(`${endpoint}/api/users/${user_id}/meds`)
    .then(res => {
      dispatch({ type: FETCH_MEDS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_MEDS_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};

export const FETCH_DIARY_REQUEST = 'FETCH_DIARY_REQUEST';
export const FETCH_DIARY_SUCCESS = 'FETCH_DIARY_SUCCESS';
export const FETCH_DIARY_FAILURE = 'FETCH_DIARY_FAILURE';

export const fetchDiary = user_id => dispatch => {
  dispatch({ type: FETCH_DIARY_REQUEST });
  axios
    .get(`${endpoint}/api/users/${user_id}/diaries`)
    .then(res => {
      dispatch({ type: FETCH_DIARY_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_DIARY_FAILURE,
        payload: `${err.message}. ${err.response.data.message}`
      });
    });
};
