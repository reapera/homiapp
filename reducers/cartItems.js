const cartItems = (state = { items: [], total: 0 }, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let addedItem = action.payload.product
                //check if the action id exists in the items
            let existed_item = state.items.find(item => action.payload.product.id === item.id)
            if (existed_item) {
                console.log(action.payload);
                console.log(existed_item.quantity);
                existed_item.quantity += action.payload.qty
                console.log(existed_item.quantity);
                console.log(state.items);
                return {
                    ...state,
                    total: state.total + existed_item.price
                }
            } else {
                addedItem.quantity = action.payload.qty;
                //calculating the total
                let newTotal = state.total + addedItem.price
                console.log(addedItem);
                return {
                    ...state,
                    items: [...state.items, addedItem],
                    total: newTotal
                }

            }
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.id !== action.payload.id)
    }

    return state
}

export default cartItems