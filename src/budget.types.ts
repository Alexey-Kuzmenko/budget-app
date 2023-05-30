export type BudgetType = 'income' | 'outcome'

export interface BudgetItem {
    id: string
    type: BudgetType
    value: number
    comment: string
}