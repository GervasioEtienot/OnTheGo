import {
	ON_DELETE_ITEM_FROM_CART,
	ON_QUANTITY_CHANGE,
	ON_ADD_ITEM_TO_CART,
	ON_SEARCH_PRODUCT
} from "../actions/types";
import update from 'react-addons-update';

const INIT_STATE = {
	cart: [
		// {
		// 	id: '',
		// 	codigo: '',
		// 	descripcion: '',
		// 	precio_producto: null,
		// 	cantidad_deposito_item: null,
		// 	productQuantity: null,
		// 	totalPrice: null
		// }
	],
	newCartItem: {
		id: '',
		codigo: '',
		descripcion: '',
		precio_producto: null,
		cantidad_deposito_item: null,
		productQuantity: null,
		totalPrice: null
	},
	wordToSearch: 'Buscando...',
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case ON_SEARCH_PRODUCT:
			console.log(action.payload);
			
			return { ...state,  wordToSearch: action.payload  };

		case ON_DELETE_ITEM_FROM_CART:
			let index = state.cart.indexOf(action.payload)
			return update(state, {
				cart: {
					$splice: [[index, 1]]
				}
			});

		case ON_QUANTITY_CHANGE:
			let cartItemIndex = state.cart.indexOf(action.payload.cartItem);
			return update(state, {
				cart: {
					[cartItemIndex]: {
						productQuantity: { $set: action.payload.quantity },
						totalPrice: { $set: Math.round(action.payload.cartItem.precio_producto * action.payload.quantity*1000)/1000 }
					}
				}
			});

		case ON_ADD_ITEM_TO_CART:
			let newCartItem = {
				id:action.payload.hitItem.id,
				codigo: action.payload.hitItem.codigo,
				// image: action.payload.image,
				descripcion: action.payload.hitItem.descripcion,
				// brand: action.payload.brand,
				precio_producto: action.payload.hitItem.precio_producto,
				cantidad_deposito_item: action.payload.hitItem.cantidad_deposito_item,
				productQuantity: action.payload.cantidad,
				totalPrice: Math.round(parseFloat(action.payload.hitItem.precio_producto) * parseFloat(action.payload.cantidad)*1000)/1000
			};
			console.log(newCartItem.precio_producto);
			
			return update(state, {
				cart: {
					$push: [newCartItem]
				}
			})

		default:
			return { ...state };

	}
}
