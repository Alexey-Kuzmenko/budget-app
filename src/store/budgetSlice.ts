import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetItem } from "../models/budget.types";
import { UUID } from "uuid-generator-ts";
import { RootState } from ".";
import axios from "axios"
import apiConfig from "../api/config";

const { url } = apiConfig

interface BudgetState {
    isLoad: null | boolean
    error: null | boolean
    budgetList: BudgetItem[]
    totalBalance: number,
    dataHash: string | null
}

interface ApiResponse {
    [hash: string]: {
        email: string
        localId: string,
        budgetList: BudgetItem[]
    }
}

const initialState: BudgetState = {
    isLoad: null,
    error: null,
    budgetList: [],
    totalBalance: 0,
    dataHash: null
}

type FormData = Omit<BudgetItem, 'id'>

export const fetchBudget = createAsyncThunk<ApiResponse>(
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

export const addBudgetItems = createAsyncThunk<void, FormData, { state: RootState }>(
    'budget/addBudgetItems',
    async function ({ type, value, comment }, { dispatch, getState }) {

        const dataHash = getState().budget.dataHash

        const budgetItem: BudgetItem = {
            id: new UUID().toString(),
            type,
            value,
            comment
        }

        const response = await axios.post(`${url}/data/${dataHash}/budgetList.json`, budgetItem)
        const { name } = await response.data

        if (response.statusText !== 'OK') {
            return Promise.reject()
        }

        dispatch(addBudgetItem({ hash: name, ...budgetItem }))

    }
)

export const deleteBudgetItems = createAsyncThunk<void, { hash: string, id: string }, { state: RootState }>(
    'budget/deleteBudgetItems',
    async function (itemId, { getState, dispatch }) {
        const dataHash = getState().budget.dataHash
        const { hash, id } = itemId
        // ! testing
        if (hash && id) {
            await axios.delete(`${url}/data/${dataHash}/budgetList/${hash}.json`)
            dispatch(deleteBudgetItem(id))
        } else {
            throw new Error('Budget item hash and id is not defined');
        }

    }
)

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        addBudgetItem: (state, { payload: item }: PayloadAction<BudgetItem>) => {
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
        },
        resetState: () => {
            return { ...initialState }
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

                const userEmail = localStorage.getItem("email")
                const userId = localStorage.getItem("userId")

                const serializedData = Object.entries(payload).map(([hash, data]) => { return { hash, ...data } })
                const userData = serializedData.find((data) => userEmail === data.email && userId === data.localId)

                if (userData?.hash) {
                    state.dataHash = userData.hash
                } else {
                    console.error('Data hash is not defined');
                }

                if (!userData?.budgetList || !Object.values(userData?.budgetList).length) {
                    state.budgetList = []
                } else {
                    const serializedBudgetList = Object.entries(userData.budgetList).map(([hash, data]) => { return { hash, ...data } })
                    state.budgetList = serializedBudgetList
                }

            })
            .addMatcher(isError, (state) => {
                state.error = true
                state.isLoad = null
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const { addBudgetItem, deleteBudgetItem, calcTotalBalance, resetState } = budgetSlice.actions

export default budgetSlice.reducer