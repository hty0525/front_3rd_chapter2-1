// cart 상태를 관리하는 useCartStore 훅

import { useReducer } from 'react';

export type ProductId = 'p1' | 'p2' | 'p3' | 'p4' | 'p5';

export type Product = {
	id: ProductId;
	name: string;
	price: number;
	quantity: number;
	currentCartItemQuantity: number;
};

const initProducts: Product[] = [
	{ id: 'p1', name: '상품1', price: 10000, quantity: 50, currentCartItemQuantity: 0 },
	{ id: 'p2', name: '상품2', price: 20000, quantity: 30, currentCartItemQuantity: 0 },
	{ id: 'p3', name: '상품3', price: 30000, quantity: 20, currentCartItemQuantity: 0 },
	{ id: 'p4', name: '상품4', price: 15000, quantity: 0, currentCartItemQuantity: 0 },
	{ id: 'p5', name: '상품5', price: 25000, quantity: 10, currentCartItemQuantity: 0 },
];

export type State = {
	products: Product[];
	lastSelectedProductId: ProductId | null;
};

export type Action =
	| { type: 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM'; productId: ProductId }
	| {
			type: 'CHANGE_CART_ITEM_QUANTITY';
			payload: { productId: ProductId; quantity: number };
	  }
	| { type: 'UPDATE_TOTAL_PRICE'; payload: { discountRate: number } };

function reducer(state: State, action: Action): State {
	const { products } = state;

	switch (action.type) {
		case 'ADD_CART_ITEM': {
			const { productId } = action;

			return {
				...state,
				products: products.map((product) => {
					if (product.id === productId) {
						const { currentCartItemQuantity } = product;

						return {
							...product,
							currentCartItemQuantity: currentCartItemQuantity + 1,
						};
					}
					return product;
				}),
			};
		}
		case 'REMOVE_CART_ITEM': {
			const { productId } = action;

			return {
				...state,
				products: products.map((product) => {
					if (product.id === productId) {
						return {
							...product,
							currentCartItemQuantity: 0,
						};
					}
					return product;
				}),
			};
		}

		case 'CHANGE_CART_ITEM_QUANTITY':
			const { productId, quantity } = action.payload;

			return {
				...state,
				products: products.map((product) => {
					if (product.id === productId) {
						const { currentCartItemQuantity } = product;

						return {
							...product,
							currentCartItemQuantity: currentCartItemQuantity + quantity,
						};
					}
					return product;
				}),
				lastSelectedProductId: productId,
			};

		default:
			return state;
	}
}

export function useCartStore() {
	const [state, dispatch] = useReducer(reducer, {
		products: initProducts,
		lastSelectedProductId: null,
	});

	return [state, dispatch] as const;
}
