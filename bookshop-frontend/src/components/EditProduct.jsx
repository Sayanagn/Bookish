import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";

function EditProduct(){
    console.log("Edit product page")
    const sellerid=sessionStorage.getItem("id")
    const {prodid}=useParams()
    const [product,setProduct]=useState({
        "bookid":prodid,
        "bname":"",
        "cat":"",
        "qty":"",
        "price":"",
        "author":""
    })
    
    
    const [errors,setErrors]=useState({})
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }
    
    useEffect(()=>{        
        console.log(errors)

        axios.get("http://localhost:8081/api/books/"+prodid)
        .then(resp=>{
            console.log(resp.data.data)
            setProduct(resp.data.data)
        })
        
        if(Object.keys(errors).length===0 && submitted){            
            console.log(product)
            axios.put("http://localhost:8081/api/books/"+prodid,product)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                alert("Product saved successfully")               
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                alert("Error saving product")
            })            
        }
    },[errors])
    return (
        <div className="container pt-3 card mt-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <img className="img-thumbnail mt-3" src={"http://localhost:8081/"+product.photo} />
                        </div>
                        <div className="col-sm-6 offset-1 p-4">
                            <h4 className="text-center p-2">
                                Edit Book (Book Id : {product.bookid})
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="bname" value={product.bname} onChange={handleInput} className="form-control" />
                                    {errors.bname && <small className="text-danger float-right">{errors.bname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="pcat" value={product.cat} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>     
                                        <option>Fiction</option>     
                                        <option>Romantic</option>     
                                        <option>Thriller</option>     
                                        <option>Biography</option> 
                                    </select>   
                                    {errors.cat && <small className="text-danger float-right">{errors.cat}</small>}                    
                                </div>                        
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                    {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Quantity</label>
                                <div className="col-sm-8">
                                    <input type="number" name="qty" value={product.qty} onChange={handleInput} className="form-control" />
                                    {errors.qty && <small className="text-danger float-right">{errors.qty}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Author</label>
                                <div className="col-sm-8">
                                    <input type="text" name="author" value={product.author} onChange={handleInput} className="form-control" />
                                    {errors.author && <small className="text-danger float-right">{errors.author}</small>}
                                </div>                                
                            </div>                           
                            
                            <button className="btn btn-primary float-right">Update Book</button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}

export default EditProduct;
