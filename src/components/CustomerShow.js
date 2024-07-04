import { useParams ,useNavigate} from "react-router-dom";
import { CustomersContext } from "../contexts/root-context";
import { useContext,useState } from "react";
import axios from 'axios'
import CustomerForm from "./CustomerForm";
import {Modal,Button,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

export default function CustomerShow(){
    const [editId,setEditId]=useState('')
    const [modal,setModal]=useState('')
    const {customers,customerDispatch}=useContext(CustomersContext)
    const {id}=useParams()
    const navigate=useNavigate()
    const customer=customers.data.find(ele=> ele._id===id)


    const toggle=()=>{
        setModal(!modal)
    }

    const handleRemove=async()=>{
        const userConfirm=window.confirm("are you sure")
        if(userConfirm){
            try{
                const response= await axios.delete(`http://localhost:3006/api/customers/${id}`)
                customerDispatch({ type: 'REMOVE_CUSTOMER', payload: response.data })
                navigate('/customers')
            }
            catch(err){
    
            }
        }
        
    }

    const handleEdit=()=>{
        setEditId(id)
        toggle()
    }
    return (
        <div>
            <div>
            <h2>{customer?.name}-{customer?.contact?.email}</h2>
            <button onClick={handleRemove}>remove</button>
            <button onClick={handleEdit}>Edit</button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
                <ModalBody>
                    <CustomerForm editId={editId} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>

            </div>
            
    )
}
