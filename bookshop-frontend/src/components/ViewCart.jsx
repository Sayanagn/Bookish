import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewCart(){
    const state=useSelector((state)=>state);
    const dispatch=useDispatch()
    const history=useHistory()
  
    const deleteItem=(item)=>{
        let resp=window.confirm('Are you sure to delete this item ?')
        if(resp){        
        dispatch({type:'RemoveItem',payload:item})   
        let amount=state.cart.reduce((a,b)=> (a+(b.qty*b.price)),0)
        console.log("Amount ",amount)
        }
    }
    

    useEffect(()=>{
        let amount=state.cart.reduce((a,b)=> (a+(b.qty*b.price)),0)
        
        console.log("Amount => ",amount)
    },[state.cart])

    const handleSubmit=(e)=>{
        e.preventDefault()  
       
        let amount=state.cart.reduce((a,b)=> (a+(b.qty*b.price)),0)
         console.log("Amount ",amount)
       
        let data={
            'cart':state.cart,
            
           
            'customerid':sessionStorage.getItem('id')
        } 
        console.log(data) 
        axios.post("http://localhost:8081/api/orders",data)
        .then(resp=>{
            console.log(resp)
            dispatch({type:'Clear'});
            history.push('/myorders')
        })  
    }
    return (
        <div className="container-fluid text-white">
            
            {state.cart.length>0 ? 
            <div className="row">
                <div className="col-sm-7">
                <h4 className="p-2">Cart View</h4>
            <table className="table table-bordered table-light table-striped">
                <thead>
                    <tr>
                        <th>Book Id</th>
                        <th>Book </th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cart.map(item=>(
                        <tr key={item.bookid}>
                            <td>{item.bookid}</td>
                            <td>
                                <img className="mr-2 float-left" src={"http://localhost:8081/"+item.photo} width="100" />
                               
                            </td>
                            <td>&#8377; {item.price}</td>
                            <td>{item.qty}</td>
                            <td>&#8377; {item.qty * item.price}</td>
                            <td><button onClick={e=>deleteItem(item)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="4">Total Amount</th>
                        <th>&#8377; {state.cart.reduce((a,b)=> (a+(b.qty*b.price)),0)}</th>
                    </tr>
                </tfoot>
            </table>
            <button className="btn btn-success float-right">Place Order</button>
            </div>
            
            </div> : <h4>Cart is Empty</h4>}
        </div>
    )
}

export default ViewCart;