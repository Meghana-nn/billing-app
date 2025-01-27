const initialState={
    data:[]
}

const invoiceReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_INVOICES':{
                return {...state,data:action.payload}
        }
        case 'ADD_INVOICE' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        default:{
            return {...state}
        }
    }

}
export default invoiceReducer