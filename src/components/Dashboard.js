
import { useSelector } from 'react-redux' 
import {CustomersContext} from '../contexts/root-context'
import { useContext } from 'react'
export default function Dashboard() {
    const {customers}=useContext(CustomersContext)
    const products = useSelector((state) => { 
        return state.products
    })
        const invoices=useSelector((state)=>{
            return state.invoices
        })
    
    return (
        <div>
            <h2>Dashboard</h2>
            <h2>Total Products - { products.data.length } </h2>
            <h2>total Customers-{customers.data.length}</h2>
            <h2>Total Invoices - { invoices.data.length } </h2>

        </div>
    )
}