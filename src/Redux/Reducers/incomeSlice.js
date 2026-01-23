import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5000";

export const addIncome = createAsyncThunk(
    'income/addIncome',
    async ({ incomeData }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${baseURL}/app/user/income/addIncome`,
                incomeData,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Income Add Failed"
            )
        }
    }
)

export const getIncome = createAsyncThunk(
    'income/getIncome',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${baseURL}/app/user/income/getIncome`,
                { withCredentials: true }
            )
            return response.data.myIncome
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Get Income Failed"
            )
        }
    }
)

export const updateIncome = createAsyncThunk(
    'income/updateIncome',
    async ({ id, incomeData }, thunkAPI) => {
        try {
            const response = await axios.put(
                `${baseURL}/app/user/income/updateIncome/${id}`,
                incomeData,
                { withCredentials: true }
            )
            return response.data.incomeData
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Income Update Failed"
            )
        }
    }
)

export const deleteIncome = createAsyncThunk(
    'income/deleteIncome',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${baseURL}/app/user/income/deleteIncome/${id}`,
                { withCredentials: true }
            )
            return { id, message: response.data.message }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Income Delete Failed"
            )
        }
        
    }
)

const incomeSlice = createSlice({
    name: "income",
    initialState: {
        loading: false,
        incomes: [],
        error: null,
        message: null
    },
    reducers: {
        clearIncomeMessage(state) {
            state.error = null,
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            // addIncome
            .addCase(addIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.incomes.push(action.payload.incomeData)
                state.error = null;
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = null
            })

            // get Income
            .addCase(getIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.incomes = action.payload
                state.error = null;
            })
            .addCase(getIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateIncome
            .addCase(updateIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.incomes.findIndex(
                    (e) => e._id === action.payload._id
                )

                if (index !== -1) {
                    state.incomes[index] = action.payload
                }
                state.message = "Income updated successfully";
            })
            .addCase(updateIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteIncome
            .addCase(deleteIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;

                state.incomes = state.incomes.filter(
                    (e) => e._id !== action.payload.id
                )
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearIncomeMessage } = incomeSlice.actions
export default incomeSlice.reducer