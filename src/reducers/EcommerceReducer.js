import {
	ON_DELETE_ITEM_FROM_CART,
	ON_QUANTITY_CHANGE,
	ON_ADD_ITEM_TO_CART
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
		// {
		// 	objectID: '1',
		// 	image: require('../assets/img/product-1.png'),
		// 	name: 'Speaker',
		// 	description: 'Rechargeable Battery',
		// 	brand: 'JBL',
		// 	price: 50,
		// 	productQuantity: 1,
		// 	totalPrice: 50
		// },
		// {
		// 	objectID: '2',
		// 	image: require('../assets/img/product-2.png'),
		// 	name: 'Headphone',
		// 	description: 'Clear Sound',
		// 	brand: 'JBL',
		// 	price: 45,
		// 	productQuantity: 1,
		// 	totalPrice: 45
		// },
		// {
		// 	objectID: '3',
		// 	image: require('../assets/img/product-3.png'),
		// 	name: 'Bluetooth Speaker',
		// 	description: 'Rechargeable Battery',
		// 	brand: 'JBL',
		// 	price: 96,
		// 	productQuantity: 1,
		// 	totalPrice: 96
		// },
		// {
		// 	objectID: '4',
		// 	image: require('../assets/img/product-4.png'),
		// 	name: 'D.J. Speaker',
		// 	description: '3d Surround Sound',
		// 	brand: 'JBL',
		// 	price: 87,
		// 	productQuantity: 1,
		// 	totalPrice: 87
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
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {

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
				id:action.payload.id,
				codigo: action.payload.codigo,
				// image: action.payload.image,
				descripcion: action.payload.descripcion,
				// brand: action.payload.brand,
				precio_producto: action.payload.precio_producto,
				productQuantity: 1,
				totalPrice: action.payload.precio_producto
			};
			return update(state, {
				cart: {
					$push: [newCartItem]
				}
			})

		default:
			return { ...state };

	}
}
