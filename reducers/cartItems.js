const cartItems = (state = { items: [], total: 0 }, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let addedItem = action.payload.product
                //check if the action id exists in the items
            let existed_item = state.items.find(item => action.payload.product.id === item.id)
            if (existed_item) {
                existed_item.quantity += action.payload.qty;
                existed_item.selected = true;
                return {
                    ...state,
                    total: state.total + existed_item.price * existed_item.quantity
                }
            } else {
                addedItem.quantity = action.payload.qty;
                addedItem.selected = true;
                //calculating the total
                let newTotal = state.total + addedItem.price * addedItem.quantity
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