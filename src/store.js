import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as api from './config';
import themeReducer from './features/theme-slice';
import controlsReducer from './features/controls-slice'
import countriesReducer from './features/countries-slice'
import detailsReducer from './features/details-slice'


const rootReducer = combineReducers({
  theme: themeReducer,
  controls: controlsReducer,
  countries: countriesReducer,
  details: detailsReducer,
})

const persistConfig = {
  key: rootReducer,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddlware) => getDefaultMiddlware({
    thunk: {
      extraArgument: {
        client: axios,
        api,
      },
    },
    serializableCheck: false
  }),
});

export const persistor = persistStore(store)
export default store;