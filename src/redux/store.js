import { configureStore } from '@reduxjs/toolkit';
import { contactApi } from './contactApi';
import contactsSlice from './contactsSlice';

export const store = configureStore({
  reducer: {
    filter: contactsSlice,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
  ],
});
