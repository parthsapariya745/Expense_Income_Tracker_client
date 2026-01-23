import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/userSlice"
import incomeSlice from "./Reducers/incomeSlice"
import expenseSlice from "./Reducers/expenseSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        income: incomeSlice,
        expense: expenseSlice,
    }
})