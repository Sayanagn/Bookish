import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProducts(){
    const [products,setProducts]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8081/api/books")
        .then(resp=>{
            console.log(resp.data)
            setProducts(resp.data.data)
            console.log(products)
        })
    },[products])

    const deleteProduct = (prodid)=>{
        let resp=window.confirm('Are you sure to delete this book ?');
        if(resp){
            axios.delete("http://localhost:8081/api/books/"+prodid)
            .then(resp=>{
                alert("Product deleted successfully")
                axios.get("http://localhost:8081/api/books")
                .then(resp=>{
                    console.log(resp.data)
                    setProducts(resp.data.data)
                    console.log(products)
                })
            })            
        }
    }
    
    return (
        <div className="container">
            <div className="card shadow">
                <div className="card-body">                    
            <h4 className="text-center">My Products</h4>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Book</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>                                
                    </tr>
                </thead>
                <tbody>
                {products.map(x=>(
                    <tr key={x.prodid}>
                        <td><img width="100" src={"http://localhost:8081/"+x.photo} className="img-thumnail" /></td>
                        <td>{x.cat}</td>
                        <td>{x.author}</td>
                        <td>{x.price}</td>
                        <td>{x.qty}</td>
                        <td>
                            <Link to={"/edit/"+x.bookid} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <button onClick={()=>deleteProduct(x.bookid)} className="btn btn-danger btn-sm">Delete</button>
                        </td>                                
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        </div>
            </div>
    )
}

export default MyProducts;