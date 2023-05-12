
type BudgetType = 'income' | 'outcome'

class BudgetItem {
    private id: number = Math.floor(Math.random())
    public type: BudgetType
    public value: number
    public comment: string

    constructor(type: BudgetType, value: number, comment: string) {
        this.type = type
        this.value = value
        this.comment = comment
    }
}


export default BudgetItem