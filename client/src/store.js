import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';

const login = createAction('LOGIN');

const reducer = createReducer([], {
  [login]: (state, action) => {
    state.push({ userData: action.payload, id: Date.now() });
  },
});

const store = configureStore({ reducer });

export const actionCreators = {
  login,
};
export default store;
