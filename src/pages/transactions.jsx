import { useRef, useState } from "react"
import "./transactions.css"
import { nanoid } from "nanoid"

export default function Transactions() {

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [transAmount, setTransAmount] = useState('')
    const [date, setDate] = useState('')

    const [tranctionTile, setTransactionTile] = useState([])

    const categoryRef = useRef(null)

    function saveTransaction(e) {
        e.preventDefault();
        if (  category !== '' && description !== '' && transAmount !== '' && date != '' ){
            setCategory(category)
            setTransactionTile(prev =>[
                ...prev,{
                id: nanoid(),
                cat: category,
                des: description,
                amt: transAmount,
                dat: date
                }
            ]);
            setCategory('')
            setDescription('')
            setDate('')
            setTransAmount('')
        }
      else{
        categoryRef.current.focus()
      }
        
    }
    
    return(
        <div className="transactions-page">
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
                    
                    {tranctionTile.map((item) => (
                    <tbody key={item.id}>
                        <tr>
                            <td>{item.cat}</td>
                            <td>{item.des}</td>
                            <td>{item.amt}</td>
                            <td>{item.dat}</td>
                        </tr>
                    </tbody>                        
                    ))}

                </table>
            </div>
            <div className="add-transactions">
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
    )
}