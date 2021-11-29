function cartReducer(state, action){
    switch(action.type){
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'INCREMENT':
            let newIncState = state;
            let Incindex = state.indexOf(action.payload[1]);
            newIncState[Incindex] = action.payload[0];
            return [...newIncState];
        case 'DECREMENT':
            let newDecState = state;
            let Decindex = state.indexOf(action.payload[1]);
            newDecState[Decindex] = action.payload[0];
            return [...newDecState]
        case 'DELETE':
            const filteredProds = state.filter((item)=>{
                return item.id!==action.payload;
            })
            return [...filteredProds]
        case 'ORDER':
            return [];
        default:
            return state;
    }
}

export default cartReducer;