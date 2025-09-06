import { useEffect, useRef, useState } from "react"
import "./budget.css"
import { nanoid } from "nanoid"
import Nav from "../dash-components/nav-mobile"
import { useNavigate } from "react-router-dom"
import NavMobile from "../dash-components/nav-mobile"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export default function Budget() {
    const [budgetAmount, setBudgetAmount] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenses, setExpenses] = useState([])
    const [spent, setSpent] = useState(0)
    const remaining = budgetAmount - spent

    const [budgetSaved, setBudgetSaved] = useState([])
    
    const [itemPressed, setItemPressed] = useState(null)

    const budgetInputRef = useRef(null)
    const nameInputRef = useRef(null)

    const navigate = useNavigate()

    const savedBudgetRef = useRef(null)

    const [savedBudgetShown, setSavedBudgetShown] = useState(false)
    
    function showHidePrev () {
        setSavedBudgetShown(prev => !prev)
        savedBudgetRef.current.scrollIntoView()
    }

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

    async function saveBudget() {
        try{
            await addDoc(collection(db,'budget'),{
                budget: Number(budgetAmount),
                spent: Number(spent),
                expenses: expenses
            })
            
            setExpenses([])
            setSpent(0)
            budgetInputRef.current.focus()

            console.log('budget saved')
        }catch(err) {
            alert('error, budget not saved')
        }
    }

    useEffect(()=> {
        const unsub = onSnapshot(collection(db, 'budget'), (snapshot) =>{
            const budgetList = snapshot.docs.map(item => ({
                id: item.id,
                ...item.data()
        }))
        setBudgetSaved(budgetList)
        })
        return() => unsub()
    },[])
    
    async function delBudget(id) {
        try{
            const budgetTile = doc(db, 'budget',id)
            await deleteDoc(budgetTile)
        }catch(err) {
            alert('error, not deleted')
        }
    }


    return (
        <><div className="budget">
            <h1 className="budget-header">Budget</h1>

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

            <div className="budget-info">
                <p><strong>Budget:</strong> ${budgetAmount} </p>
                <p><strong>Spent:</strong> ${spent} </p>
                <p><strong>Remaining:</strong> ${remaining} </p>
                <p><strong>Status: </strong> 
                    {budgetAmount === '' ?
                    '':
                    remaining >= 0 ?
                        'Within budget ✅':
                        'Over budget 🔴'
                    }
                </p>
            </div>

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
                            key={item.id}
                            onClick={()=>{
                                
                                setItemPressed(prev=> (item.id === prev ? null : item.id))}}
                        >
                            <span>{item.name}</span><span>{item.amount}</span>
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
        <button className="show-hide-budget-btn" onClick={showHidePrev}>{savedBudgetShown ? 'Hide': 'Show'} Previous Budgets</button>
        
        <div 
            ref={savedBudgetRef}
            className="saved-budget"
            style={{
                display: savedBudgetShown ? 'block' : 'none'
            }}
        >
            <header>Saved Budgets</header>
            {budgetSaved.length >= 1 ?
                budgetSaved.map((item) => (
                <div className="saved-budget-content" key={item.id}>
                    <div>
                        <h4>Budget Amount: {item.budget}</h4>
                        {item.expenses && (item.expenses.map(i => (
                            <ul key={i.id}> 
                                <li>{i.name} - {i.amount}</li> 
                            </ul>
                        ))
                        )}
                        <button onClick={() => delBudget(item.id)}>Delete</button>
                    </div>  
                </div>
            )): <p>Nothing to show</p>}
        </div>
        <footer className="footer-nav">
            <NavMobile 
                goToHome={()=>{navigate("/dashboard")}}
                goToTransactions={()=>{navigate("/transactions")}}
                goToStats={()=>{navigate('/stats')}}
                goToBudget={()=>{navigate('/budget')}}
            />
        </footer></>
    )
}


