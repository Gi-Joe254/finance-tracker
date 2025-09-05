import { useEffect, useRef, useState } from "react"
import "./transactions.css"
import { nanoid } from "nanoid"
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import NavMobile from "../dash-components/nav-mobile"
import TransTable from "../page-components/transTable"
import { User } from "lucide-react/dist/cjs/lucide-react"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Transactions() {

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [transAmount, setTransAmount] = useState('')
    const [date, setDate] = useState('')
    const [total, setTotal] = useState(0)
    const [user] = useAuthState(auth)


    const navigate = useNavigate()

//to store data from firestore >..
    const [transactionTile, setTransactionTile] = useState([])

    const categoryRef = useRef(null)

    const [addTransShown, setAddTransShown] = useState(false)
    
    const userColl = collection(db, 'users', user.uid, 'transactions')
                
    function showAddTransactions(e) {
        setAddTransShown(prev => !prev);
        e.target.style.display = 'none' 
    }

    async function saveTransaction(e) {
        e.preventDefault()
        if (  category !== '' && description !== '' && transAmount !== '' && date != '' ){
            try{
                await addDoc(userColl,{
                    userId: user.uid,
                    cat: category,
                    des: description,
                    amt: Number(transAmount),
                    dat: Timestamp.fromDate(new Date(date))
                })
                console.log('saved')
                setCategory('')
                setDescription('')
                setTransAmount('')
                setDate('') 
            } catch (err) {
                console.log(err);
                
            }
        }
        else{
        categoryRef.current.focus()
        }
    } 

    async function handleDelete() {
        try{
            const documents = await getDocs(userColl)
            const delPromise = documents.docs.map(item => (
                deleteDoc(doc(db, 'users', user.uid, 'transactions', item.id))
                
            ))
            await Promise.all(delPromise)
            console.log('deleted')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        const unsub = onSnapshot(userColl, (snapshot) => {
            const transList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTransactionTile(transList)
            
            setTotal(transList.reduce((sum, item) => sum + Number(item.amt), 0))
        })

        return () => unsub()
        
    },[])

    return(
       <> <div className="transactions-page">
            <h1 className="transactions-header">Transactions</h1>
            <TransTable 
                transactionTile = {
                    transactionTile.map((item) => (
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
                         ))
                }
                totalExpenses={total}
            />
            {transactionTile.length === 0 && <p>No transactions here</p>}
                
            <button 
                className="new-trans-btn"
                onClick={showAddTransactions}
                style={{
                    display:'block',
                }}
                >
                    New Transaction
            </button>
            <button 
                onClick={handleDelete}
                className="del-trans-btn"
            >Delete All
            </button>
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
            <NavMobile 
                goToHome={()=>{navigate("/dashboard")}}
                goToTransactions={()=>{navigate("/transactions")}}
                goToStats={()=>{navigate('/stats')}}
                goToBudget={()=>{navigate('/budget')}}
            />
        </footer>
        </>
    )
}