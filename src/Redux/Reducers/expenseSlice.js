import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "https://expense-income-tracker-server.vercel.app"

export const addExpense = createAsyncThunk(
    'expense/addExpense',
    async ({ expenseData }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${baseURL}/app/user/expense/addExpense`,
                expenseData,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Expense Add Failed"
            )
        }
    }
)

export const getExpense = createAsyncThunk(
    'expense/getExpense',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${baseURL}/app/user/expense/getExpense`,
                { withCredentials: true }
            )
            return response.data.myExpense
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Get Expense Failed"
            )
        }
    }
)

export const updateExpense = createAsyncThunk(
    'expense/updateExpense',
    async ({ id, expenseData }, thunkAPI) => {
        try {
            const response = await axios.put(
                `${baseURL}/app/user/expense/updateExpense/${id}`,
                expenseData,
                { withCredentials: true }
            )
            return response.data.expenseData
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Expense Update Failed"
            )
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'expense/deleteExpense',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${baseURL}/app/user/expense/deleteExpense/${id}`,
                { withCredentials: true }
            )
            return { id, message: response.data.message }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Expense Delete Failed"
            )
        }
    }
)

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        loading: false,
        expenses: [],
        error: null,
        message: null
    },
    reducers: {
        clearExpenseMessage(state) {
            state.error = null,
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            // addExpense
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;

                state.expenses.push(action.payload.expenseData)

                state.expenses.sort(
                    (a, b) => new Date(a.expenseDate) - new Date(b.expenseDate)
                )
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = null
            })

            // get Expense
            .addCase(getExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.expenses = action.payload

                state.expenses.sort(
                    (a, b) => new Date(a.expenseDate) - new Date(b.expenseDate)
                )
            })
            .addCase(getExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateExpense
            .addCase(updateExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.expenses.findIndex(
                    (e) => e._id === action.payload._id
                )

                if (index !== -1) {
                    state.expenses[index] = action.payload
                }

                state.expenses.sort(
                    (a, b) => new Date(a.expenseDate) - new Date(b.expenseDate)
                )

                state.message = "Expense updated successfully";
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteExpense
            .addCase(deleteExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;

                state.expenses = state.expenses.filter(
                    (e) => e._id !== action.payload.id
                )
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearExpenseMessage } = expenseSlice.actions
export default expenseSlice.reducer