import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const USER_ID = 'login/USER_ID';
const NICKNAME = 'login/NICKNAME';
const EMAIL = 'login/EMAIL';
const USERTYPE = 'login/USERTYPE';

export const user_id = createAction(USER_ID, value => value);
export const nickname = createAction(NICKNAME, value => value);
export const email = createAction(EMAIL, value => value);
export const usertype = createAction(USERTYPE, value => value);

const initialState = Map({
    userid: "",
    nickname: "",
    email: "",
    usertype: ""
});

export default handleActions({
    [USER_ID]: (state, action) => state.set('userid', action.payload),
    [NICKNAME]: (state, action) => state.set('nickname', action.payload),
    [EMAIL]: (state, action) => state.set('email', action.payload),
    [USERTYPE]: (state, action) => state.set('usertype', action.payload),
}, initialState)
