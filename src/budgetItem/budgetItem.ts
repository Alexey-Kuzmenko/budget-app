type BudgetType = 'income' | 'outcome'

class BudgetItem {
    public id: number
    public type: BudgetType
    public value: number
    public comment: string

    constructor(id: number, type: BudgetType, value: number, comment: string) {
        this.id = id
        this.type = type
        this.value = value
        this.comment = comment
    }
}

export type BudgetItemType = InstanceType<typeof BudgetItem>

export default BudgetItem