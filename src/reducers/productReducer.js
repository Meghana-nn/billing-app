
const initialState = {
    data: [],
    serverErrors:[]
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS' : {
            return {...state, data: action.payload}
        }
        case "ADD_PRODUCT":{
            return{...state,data:[...state.data,action.payload]}
        }
        case 'SET_ERRORS':{
            return {...state,serverErrors:action.payload}
        }
        case 'REMOVE_PRODUCT': {
            return {...state, data: state.data.filter(ele => ele._id !== action.payload._id )}
        }
        default: {
            return { ...state }
        }
    }
}

export default productReducer