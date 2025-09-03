export default function TransTable({transactionTile}) {
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

                </table>
            
        </div>
    )
}