import { CustomersContext } from "../contexts/root-context";
import { useContext } from "react";

export default function InvoiceTable(props) {
    const { customers } = useContext(CustomersContext);
    const {invoices}=props
    
    console.log(invoices)

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Line Items</th>
                        <th>Net Total</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ele.customer.name}</td>
                                <td><button >{ele.lineItems.length} show</button></td>
                                <td>{ele.netTotal}</td>
                                <td>{ele.outstandingBalance}</td>
                                <td>
                                    <button>More</button>
                                    <button>Pay</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
