import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "./productvalidation";

function AddProduct(){
    const [product,setProduct]=useState({
        "bname":"",
        "cat":"",
        "price":"",
        "author":"",
        "qty":1
    })
    const [errors,setErrors]=useState({})
    const [selectedPhoto,setSelectedPhoto]=useState(null)
    const [file,setFile]=useState(null)
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedPhoto(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            const formData=new FormData()
            formData.append("pic",selectedPhoto)
            formData.append("bname",product.bname)
            formData.append("cat",product.cat)
            formData.append("price",product.price)
            formData.append("author",product.author)
            formData.append("qty",product.qty)
            console.log(product)
            axios.post("http://localhost:8081/api/books",formData)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                alert("Book saved successfully")               
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                alert("Error saving product")
            })            
        }
    },[errors, history, product, selectedPhoto, submitted])
    return (
        <div className="container">
                <div className="card shadow bg-white text-black mt-3">
                    <div className="card-body">
                    <div className="row">
                        <div class="col-sm-4 pt-4">
                            {selectedPhoto ? <img className="img-thumbnail" src={file} alt="Photo" /> : ""} 
                        </div>
                        <div className="col-sm-6">
                            <h4 className="text-center p-2">
                                Add Book Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Book Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="bname" value={product.bname} onChange={handleInput} className="form-control" />
                                    {errors.bname && <small className="text-danger float-right">{errors.bname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="cat" value={product.cat} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>
                                        <option>Science</option>     
                                        <option>Fiction</option>     
                                        <option>Romantic</option>     
                                        <option>Poetry</option>     
                                        <option>Technical</option>     
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
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Author</label>
                                <div className="col-sm-8">
                                <input type="text" name="author" value={product.author} onChange={handleInput} className="form-control" />
                                    {errors.author && <small className="text-danger float-right">{errors.author}</small>}
                                </div>                                
                            </div>

                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Photo</label>
                                <div className="col-sm-8">
                                    <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />                                    
                                </div>                                
                            </div>
                            
                            <button className="btn btn-primary float-right">Save Book</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
                </div>
    )
}

export default AddProduct;
