import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetItem } from "../budget.types";
import { UUID } from "uuid-generator-ts";

interface BudgetState {
    budgetList: BudgetItem[]
}

const initialState: BudgetState = {
    budgetList: []
}

type FormData = Omit<BudgetItem, 'id'>

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
        }
    }
})

export const { addBudgetItem, deleteBudgetItem } = budgetSlice.actions

export default budgetSlice.reducer