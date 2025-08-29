import { useEffect, useRef, useState } from "react"
import "./transactions.css"
import { nanoid } from "nanoid"
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom"
import Nav from "../dash-components/nav"

export default function Transactions() {

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [transAmount, setTransAmount] = useState('')
    const [date, setDate] = useState('')

    const navigate = useNavigate()

//to store data from firestore >..
    const [transactionTile, setTransactionTile] = useState([])

    const categoryRef = useRef(null)

    const [addTransShown, setAddTransShown] = useState(false)

    function showAddTransactions(e) {
        setAddTransShown(prev => !prev);
        e.target.style.display = 'none' 
    }

    async function saveTransaction(e) {
        e.preventDefault()
        if (  category !== '' && description !== '' && transAmount !== '' && date != '' ){
            try{
                await addDoc(collection(db, 'transactions'),{
                    cat: category,
                    des: description,
                    amt: transAmount,
                    dat: Timestamp.fromDate(new Date(date))
                })
                console.log('saved')
                setCategory('')
                setDescription('')
                setTransAmount('')
                setDate('') 
            } catch (err) {
                console.log('error, not saved');
                
            }
        }
        else{
        categoryRef.current.focus()
        }
    } 

    async function handleDelete() {
        try{
            const documents = await getDocs(collection(db, 'transactions'))
            const delPromise = documents.docs.map(item => (
                deleteDoc(doc(db, 'transactions', item.id))
                
            ))
            await Promise.all(delPromise)
            console.log('deleted')
        } catch (err) {
            console.log('error. Not deleted')
        }
    }

    useEffect(()=> {
        const unsub = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            const transList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTransactionTile(transList)
        })
        return () => unsub()
    },[])

    return(
        <><div className="transactions-page">
            <h1 className="transactions-header">Transactions</h1>
            <div className="transactions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    
                    
                    <tbody>
                        {transactionTile.map((item) => (
                            <tr key={item.id}>
                                <td>{item.cat}</td>
                                <td>{item.des}</td>
                                <td>{item.amt}</td>
                                <td>
                                    {item.dat?.seconds 
                                    ? new Date(item.dat.seconds * 1000).toLocaleDateString()
                                    : ""}
                                </td>
                            </tr>
                         ))}
                    </tbody>                       

                </table>
                {transactionTile.length < 1 && <p
                    style={{color:'var(--text1)'}}
                >No transactions here</p>}
                
            </div>
            <button 
                className="new-trans-btn"
                onClick={showAddTransactions}
                style={{
                    display:'block',
                }}
                >
                    New Transaction
            </button>
            {transactionTile.length >= 1 && <button 
                onClick={handleDelete}
                className="del-trans-btn"
            >Delete All
            </button>}
            <div 
                className="add-transactions" 
                style={{display:addTransShown ? 'block':'none'}}
            >
                <form onSubmit={saveTransaction}>
                    <select 
                        ref={categoryRef}
                        name="transaction-category" 
                        id="category"
                        value={category}
                        onChange={(e) => {setCategory(e.target.value)}}
                    >
                        <option default>Choose Category</option>
                        <option value="food">Food</option>
                        <option value="housing">Housing</option>
                        <option value="clothing">Clothing</option>
                        <option value="utility">Utility</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="vehicle">Vehicle</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value)
                        }}
                    />
                    <input 
                        type="number" 
                        value={transAmount}
                        placeholder="Amount"
                        onChange={(e)=>{
                            setTransAmount(e.target.value)
                        }}
                    />
                    <input 
                        type="date"
                        value={date}
                        placeholder="Date"
                        onChange={(e)=>{
                            setDate(e.target.value)
                        }}
                    />
                    <button>Save Transaction</button>
                </form>
            </div>
            
        </div>
        <footer className="footer-nav">
            <Nav 
                goToHome={()=>{navigate("/dashboard")}}
                goToTransactions={()=>{navigate("/transactions")}}
                goToStats={()=>{navigate('/stats')}}
                goToBudget={()=>{navigate('/budget')}}
            />
        </footer></>
    )
}