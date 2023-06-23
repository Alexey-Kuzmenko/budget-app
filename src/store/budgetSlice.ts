import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        const response = await axios.get(`${url}/data.json`)
        const data = response.data

        if (response.statusText !== 'OK') {
            return Promise.reject()
        }

        return data
    }
)

export const addBudgetItems = createAsyncThunk<void, FormData>(
    'budget/addBudgetItems',
    async function ({ type, value, comment }, { dispatch }) {

        const budgetItem: BudgetItem = {
            id: new UUID().toString(),
            type,
            value,
            comment
        }

        const response = await axios.post(`${url}/data.json`, budgetItem)
        // ? potential solution
        const { name: hash } = await response.data

        if (response.statusText !== 'OK') {
            return Promise.reject()
        }

        dispatch(addBudgetItem({ item: budgetItem, hash }))

    }
)

export const deleteBudgetItems = createAsyncThunk<void, { hash: string, itemId: string }>(
    'budget/deleteBudgetItems',
    async function ({ hash, itemId }) {
        await axios.delete(`${url}/data/${hash}/${itemId}.json`)
    }
)

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        addBudgetItem: (state, { payload: { item, hash } }: PayloadAction<{ item: BudgetItem, hash: string }>) => {
            item.hash = hash
            // ! debug
            console.log(item);

            state.budgetList.push(item)
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
                Object.values(payload).forEach((item: BudgetItem) => {
                    state.budgetList.push(item)
                })
            })
            .addMatcher(isError, (state) => {
                state.error = true
                state.isLoad = null
            })
    },
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const { addBudgetItem, deleteBudgetItem, calcTotalBalance } = budgetSlice.actions

export default budgetSlice.reducer