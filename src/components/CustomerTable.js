import {Link} from 'react-router-dom'
export default function CustomerTable(props){
    const {customers}=props
    return (
        <>
            <h2>Customers Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>name </th>
                        <th>email </th>  
                        <th>mobile </th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.data.map((ele)=>{
                        return(
                           <tr key={ele._id}>
                            <td> <Link to={`/customers/show/${ele._id}`}>{ ele.name }</Link></td>
                            <td>{ele.contact.email}</td>
                            <td>{ele.contact.mobile}</td>
                            <td>
                                <button>view details</button>
                            </td>
                            </tr>
                        )
                    })}
                   
                </tbody>
            </table>
        </>
    )
}