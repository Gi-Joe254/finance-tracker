import { useEffect, useRef, useState } from "react"
import "./budget.css"
import { nanoid } from "nanoid"

export default function Budget() {
    const [budgetAmount, setBudgetAmount] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenses, setExpenses] = useState([])
    const [spent, setSpent] = useState(0)
    const remaining = budgetAmount - spent
    
    const [itemPressed, setItemPressed] = useState(null)

    const budgetInputRef = useRef(null)
    const nameInputRef = useRef(null)
    
    useEffect(()=>{
        budgetInputRef.current.focus()
    },[])

    function addExpense(e) {
        e.preventDefault();
        if (budgetAmount != '') {
            setExpenses(prev => 
                [...prev, {id: nanoid(), name: expenseName, amount:expenseAmount}]);
            setSpent(prev => (prev + Number(expenseAmount)))
            setExpenseName('');
            setExpenseAmount('')
            nameInputRef.current.focus()
        }
        else{
            budgetInputRef.current.focus()
        }
    }
    function editItem(id) {
        const item = expenses.find(item => item.id === id);
        setExpenseName(item.name);
        setExpenseAmount(item.amount);
        deleteItem(id)
    }
    function deleteItem(id){
        const item = expenses.find(item => item.id === id)
        setExpenses(prev => prev.filter(item => item.id !== id));
        setSpent(prev => prev- item.amount)
    }

    const [progressBarWidth, setProgressBarWidth] = useState(0)

    useEffect(()=>{
        setProgressBarWidth(
            (prev => 
            prev < 100 ?
            (spent / budgetAmount)*100 : 0
        )
    ) 
        
    },[spent])

    function saveBudget() {
        setBudgetAmount('')
        setExpenses('')
        setSpent(0)
        budgetInputRef.current.focus()
    }

    return (
        <div className="budget">
            <h1 className="dash-header">Budget</h1>

            {/* Budget Setup */}
            <div className="budget-setup">
                <label>Set Budget:</label>
                <input 
                    ref={budgetInputRef}
                    type="number" 
                    placeholder="Enter budget amount"
                    value={budgetAmount}
                    onChange={(e)=>{setBudgetAmount(e.target.value)}}
                />
            </div>

            {/* Spending Info */}
            <div className="budget-info">
                <p><strong>Budget:</strong> {budgetAmount} </p>
                <p><strong>Spent:</strong> ${spent} </p>
                <p><strong>Remaining:</strong> ${remaining} </p>
                <p><strong>Status:</strong> 
                    {budgetAmount === '' ?
                    '':
                    remaining >= 0 ?
                        'Within budget ✅':
                        'Over budget 🔴'
                    }
                </p>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{
                        height: '5px',
                        width: `${progressBarWidth}%`,
                        background: progressBarWidth > 80 ? 'yellow':'green'
                    }}
                ></div>
            </div>

            {/* Add Expense */}
            <div className="add-expense">
                <form onSubmit={addExpense}>
                    <input 
                        ref={nameInputRef}
                        required
                        type="text" 
                        placeholder="Expense name" 
                        value={expenseName}
                        onChange={(e) => (setExpenseName(e.target.value))}  
                    />
                    <input 
                        required
                        type="number" 
                        placeholder="Amount" 
                        value={expenseAmount}  
                        onChange={(e) => (setExpenseAmount(e.target.value))}   
                    />
                    <button type="submit">Add Expense</button>
                </form>
                
            </div>
            {expenses.length != 0 && 
                <div className="user-expenses">
                <h3>Expenses</h3>
                <ul>
                    {expenses.map((item)=>
                        (<li 
                            style={{
                                height:'100px'
                            }}
                            key={item.id}
                            onClick={()=>{
                                
                                setItemPressed(prev=> (item.id === prev ? null : item.id))}}
                        >
                            {item.name} - {item.amount}
                            <div 
                                className="expense-options"
                                style={{display: itemPressed === item.id? 'block':'none'}}
                                
                            >
                                <button onClick={() => editItem(item.id)}>Edit</button>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                            </div>
                        </li>))}
                    
                </ul>
                {remaining === 0 && <button onClick={saveBudget}>Save Budget</button>}
            </div>
            
            }
            
        </div>
    )
}


