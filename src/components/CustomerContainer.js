import { CustomersContext } from "../contexts/root-context"
import{useContext} from 'react'
import CustomerTable from "./CustomerTable"
import CustomerForm from "./CustomerForm"
export default function CustomerContainer(){

    const {customers}=useContext(CustomersContext)
    return (
        <div className="row">
            <h2>Customer Container</h2>
            <div className="col-md-8">
                <CustomerTable customers={customers}/>
            </div>
            <div className="col-md-4">
                <CustomerForm/>
            </div>
        </div>
    )
}