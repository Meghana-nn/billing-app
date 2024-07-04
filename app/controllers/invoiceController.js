const Invoice=require('../models/invoiceModel')
const Product=require('../models/productModel')
const Customer=require('../models/customerModel')
const {validationResult}=require('express-validator')
const { customer } = require('../validators/invoiceValidation')
const invoicesCltr={}


invoicesCltr.create=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
       
        const body=req.body
        const invoiceObj={...body}
        //const products=await Promise.all(invoiceObj.lineItems.map((ele)=>{return Product.findById(ele.product)})
        const productIds=invoiceObj.lineItems.map(ele=>ele.product)
         //const produts=(await Product.find().where('_id')).in(productIds)//

         const products = await Product.find({ '_id': { $in: productIds } });



        for(let i=0;i<productIds.length;i++){
            invoiceObj.lineItems[i].price=products[i].price
        }
        invoiceObj.grossTotal=invoiceObj.lineItems.reduce((acc,cv)=>{
            return acc+cv.price*cv.quantity
        },0)
        const deductions=invoiceObj.grossTotal*invoiceObj.discount/100
        const addition=invoiceObj.grossTotal*invoiceObj.taxes/100

        invoiceObj.netTotal=invoiceObj.grossTotal-deductions+addition
        invoiceObj.outstandingBalance=invoiceObj.netTotal
        const invoice =await Invoice.create(invoiceObj)

        const customer=await Customer.findById(invoice.customer)
        customer.outstandingBalance+=invoice.netTotal
        customer.purchaseHistory.push({invoice:invoice._id})
        await customer.save()
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
        
    }
}


invoicesCltr.list=async(req,res)=>{
    try{
        
        const invoices=await Invoice.find().populate('customer',['_id','name']).populate('lineItems.product',['_id','name'])
        res.status(200).json(invoices)

    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}

invoicesCltr.update=async(req,res)=>{
    const id=req.params.id
        const body=req.body
    try{
        const invoice= await  Invoice.findByIdAndUpdate(id,body,{new:true})
        res.json(invoice)

    }
    catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}

invoicesCltr.delete=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const invoice= await  Invoice.findByIdAndDelete(id,body,{new:true})
        res.json(customer)


    }catch(err){
        res.status(500).json({error:'somethng went wrong'})
    }
}

module.exports=invoicesCltr