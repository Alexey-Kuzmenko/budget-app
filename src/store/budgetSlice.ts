import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetItem } from "../budget.types";
import { UUID } from "uuid-generator-ts";
import axios from "axios"
import apiConfig from "../api/config";

const { url } = apiConfig

interface BudgetState {
    isLoad: null | boolean
    error: null | boolean
    budgetList: BudgetItem[]
    totalBalance: number
}

const initialState: BudgetState = {
    isLoad: null,
    error: null,
    budgetList: [],
    totalBalance: 0,
}

type FormData = Omit<BudgetItem, 'id'>

export const fetchBudget = createAsyncThunk<BudgetItem[]>(
    'budget/fetchBudget',
    async function () {
        try {
            const response = await axios.get(`${url}/data.json`)
            const data = response.data

            return data

        } catch (error) {

        }
    }
)

// export const addBudgetItem = createAsyncThunk(
//     'budget/addBudgetItem',
//     async function () {

//     }
// )

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        addBudgetItem: (state, { payload: { type, comment, value } }: PayloadAction<FormData>) => {

            const budgetItem = {
                id: new UUID().toString(),
                type,
                value,
                comment
            }

            state.budgetList.push(budgetItem)
        },
        deleteBudgetItem: (state, { payload }: PayloadAction<string>) => {
            state.budgetList = state.budgetList.filter((budgetItem) => budgetItem.id !== payload)
        },
        calcTotalBalance: (state) => {
            let total: number = 0

            state.budgetList.forEach(({ type, value }: BudgetItem) => {
                if (type === 'income') {
                    total = total + value
                } else {
                    total = total - value
                }
            })

            state.totalBalance = total
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudget.pending, (state) => {
                state.isLoad = false
                state.error = null
            })
            .addCase(fetchBudget.fulfilled, (state, { payload }) => {
                state.isLoad = true
                // ! debug
                console.log(payload);
            })
    },
})

export const { addBudgetItem, deleteBudgetItem, calcTotalBalance } = budgetSlice.actions

export default budgetSlice.reducer