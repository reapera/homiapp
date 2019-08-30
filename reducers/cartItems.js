const cartItems = (state = { items: [], total: 0 }, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let addedItem = action.payload.product
                //check if the action id exists in the items
            let existed_item = state.items.find(item => action.payload.product.id === item.id)
            if (existed_item) {
                existed_item.quantity += action.payload.qty;
                let selected = existed_item.selected;
                existed_item.selected = true;

                let newTotal = state.total
                if (selected) {
                    newTotal = state.total + existed_item.price * action.payload.qty
                } else {
                    newTotal = state.total + existed_item.price * existed_item.quantity
                }
                return {
                    ...state,
                    total: newTotal
                }
            } else {
                addedItem.quantity = action.payload.qty;
                addedItem.selected = true;
                //calculating the total
                let newTotal = state.total + addedItem.price * addedItem.quantity
                return {
                    ...state,
                    items: [...state.items, addedItem],
                    total: newTotal
                }

            }
        case 'REMOVE_FROM_CART':
            let itemToRemove = state.items.find(item => action.payload.product.id === item.id)
            let new_items = state.items.filter(item => action.payload.product.id !== item.id)

            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
            return {
                ...state,
                items: new_items,
                total: newTotal
            }
        case 'CHECK_FROM_CART':
            let checkedexisted_item = state.items.find(item => action.payload.product.id === item.id)
            let checkednewTotal = state.total
            if (checkedexisted_item.selected) {
                checkedexisted_item.selected = false;
                checkednewTotal = state.total - (checkedexisted_item.price * checkedexisted_item.quantity)
            } else {
                checkedexisted_item.selected = true;
                checkednewTotal = state.total + (checkedexisted_item.price * checkedexisted_item.quantity)
            }
            return {
                ...state,
                total: checkednewTotal
            }
        case 'INCREASE_FROM_CART':
            let increaseexisted_item = state.items.find(item => action.payload.product.id === item.id)
            increaseexisted_item.quantity = increaseexisted_item.quantity + 1
            let increasenewTotal = state.total
            if (increaseexisted_item.selected) {
                increasenewTotal += (increaseexisted_item.price * 1)
            } else {
                increaseexisted_item.selected = true;
                increasenewTotal = state.total + (increaseexisted_item.price * increaseexisted_item.quantity)
            }
            return {
                ...state,
                total: increasenewTotal
            }
        case 'REDUCE_FROM_CART':
            let reduceexisted_item = state.items.find(item => action.payload.product.id === item.id)
            reduceexisted_item.quantity = reduceexisted_item.quantity - 1
            let reducenewTotal = state.total
            if (reduceexisted_item.selected) {
                reducenewTotal -= (reduceexisted_item.price * 1)
            } else {
                reduceexisted_item.selected = true;
                reducenewTotal = state.total + (reduceexisted_item.price * reduceexisted_item.quantity)
            }
            return {
                ...state,
                total: reducenewTotal
            }
    }

    return state
}

export default cartItems