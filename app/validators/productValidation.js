const productValidationSchema={
    name:{
        notEmpty:{
            errorMessage:'name is required'
        }
        
    },
    price:{
        notEmpty:{
            errorMessage:'price should be a number'
        }
    },
    stockLevel:{
        notEmpty:{
            errorMessage:'stock level should be a number'
        }
    },
    reorderLevel:{
        notEmpty:{
            errorMessage:'reorderLevel should be a number'
        }
    }
}
module.exports=productValidationSchema