import { useSelector } from "react-redux"
import InvoiceTable from "./InvoiceTable"

//import { useContext } from "react"
export default function  InvoiceContainer(){
    const invoices=useSelector((state)=>{
        return state.invoices
    })
    return (
        <>
 <h2>Listing Invoices - { invoices.data.length }</h2>
            <InvoiceTable invoices={invoices.data} />
        </>
    )
}