const Customer=require('../models/customerModel')
const {validationResult}=require('express-validator')
const customerCltr={}

customerCltr.create=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body=req.body
        const cutomer=await Customer.create(body)
        res.status(200).json(cutomer)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}


customerCltr.list=async(req,res)=>{
    try{
        
        const customer=await Customer.find()
        res.status(200).json(customer)

    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}

customerCltr.update=async(req,res)=>{
    const id=req.params.id
        const body=req.body
    try{
        const cutomer= await  Customer.findByIdAndUpdate(id,body,{new:true})
        res.json(cutomer)

    }
    catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}

customerCltr.delete=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const cutomer= await  Customer.findByIdAndDelete(id,body,{new:true})
        res.json(cutomer)


    }catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}
customerCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const customer = await Customer.findById(id).populate('purchaseHistory.invoice')
        res.json(customer) 
    } catch(err) {

    }
}

module.exports=customerCltr