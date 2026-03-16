import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/loginReducer.js'

export const store = configureStore({
  reducer: {login: loginReducer},
})