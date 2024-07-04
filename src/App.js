import axios from 'axios'
import { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom'
import { startGetProducts } from './actions/productAction';
import ProductContainer from './components/ProductContainer';
import CustomerContainer from './components/CustomerContainer';
import Dashboard from './components/Dashboard';
import customerReducer from './reducers/customerReducer';
import { CustomersContext } from './contexts/root-context';
import CustomerShow from './components/CustomerShow'
import InvoiceContainer from './components/InvoiceContainer';
import InvoiceForm from './components/InvoiceForm';

import {startGetInvoices} from './actions/invoiceAction'


function App() {
  const dispatch = useDispatch()
  const [customers,customerDispatch] = useReducer(customerReducer, { data: [], serverErrors: []})

  useEffect(() => {
    dispatch(startGetProducts());
    dispatch(startGetInvoices());

    (async () => {
      try { 
        const response = await axios.get('http://localhost:3006/api/customers')
        customerDispatch({ type: 'SET_CUSTOMERS', payload: response.data })
      } catch(err) {
        console.log(err) 
      }
    })()

  }, [dispatch])

  return (
    <CustomersContext.Provider value={{ customers, customerDispatch }}>
    <div className="App">
        <Link to="/dashboard">Dashboard</Link>|
        <Link to="/products">Products</Link>|
        <Link to="/customers">Customers</Link>
        <Link to="/invoices">Invoices</Link> | 
        <Link to='/invoices/new'>Add Invoice</Link>  

     
     <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/products" element={<ProductContainer />}/>
        <Route path="/customers" element={<CustomerContainer />} />
        <Route path="/customers/show/:id" element={<CustomerShow/>}/>
        <Route path="/invoices" element={<InvoiceContainer/>}/>
        <Route path="/invoices/new" element={<InvoiceForm/>}/>
     </Routes>
    </div>
    </CustomersContext.Provider>
  ); 
}

export default App;