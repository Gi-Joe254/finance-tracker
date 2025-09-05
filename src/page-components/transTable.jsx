export default function TransTable({transactionTile, totalExpenses}) {
    
    return(
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
                    {transactionTile}
                </tbody>                       

                <tfoot style={{background: 'var(--bg3)'}}>
                    <tr>
                        <td><strong>Totals</strong></td>
                        <td></td>
                        <td>{totalExpenses}</td>
                        <td></td>
                    </tr>
                </tfoot>
                </table>
            
        </div>
    )
}