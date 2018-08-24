import { combineReducers } from 'redux';
import ContractReducer from './reducer_contract';

const rootReducer = combineReducers({
    contracts: ContractReducer
});

export default rootReducer;