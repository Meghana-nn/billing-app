const Product=require('../models/productModel')
const {validationResult}=require('express-validator')
const productCltr={}

productCltr.create=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body=req.body
        const product=await Product.create(body)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}


productCltr.list=async(req,res)=>{
    try{
        
        const products=await Product.find()
        res.status(200).json(products)

    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}

productCltr.update=async(req,res)=>{
    const id=req.params.id
        const body=req.body
    try{
        const product= await  Product.findByIdAndUpdate(id,body,{new:true})
        res.json(product)

    }
    catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}

productCltr.delete=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const product= await  Product.findByIdAndDelete(id,body,{new:true})
        res.json(product)


    }catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}

module.exports=productCltr