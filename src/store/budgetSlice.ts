import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetItem } from "../budget.types";
import { UUID } from "uuid-generator-ts";

interface BudgetState {
    budgetList: BudgetItem[]
    totalBalance: number
}

const initialState: BudgetState = {
    budgetList: [],
    totalBalance: 0
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
    }
})

export const { addBudgetItem, deleteBudgetItem, calcTotalBalance } = budgetSlice.actions

export default budgetSlice.reducer