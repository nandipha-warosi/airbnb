// Import necessary functions from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import listingListReducer from './reducers/listingReducer';
import {modalReducer} from './reducers/modalReducer';
import {userLoginReducer} from './reducers/userReducer';
import {thunk} from 'redux-thunk';


// Get user info from local storage, if available
const userInfoFromLS = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state for the Redux store
const initialState = {
  userLogin: { userInfo: userInfoFromLS },
};

// Create the Redux store with DevTools extension support and thunk middleware
const Store = configureStore({
  reducer: {
    listingList: listingListReducer,
    modal: modalReducer,
    userLogin: userLoginReducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default Store; // Export the store
