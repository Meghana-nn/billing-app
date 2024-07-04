import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import productReducer from '../reducers/productReducer'
import invoiceReducer from '../reducers/invoiceReducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        products: productReducer,
        invoices:invoiceReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore