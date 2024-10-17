import { useReducer } from 'react';

export type ProductId = 'p1' | 'p2' | 'p3' | 'p4' | 'p5';

export type Product = {
	id: ProductId;
	name: string;
	price: number;
	count: number;
};

const initProducts: Product[] = [
	{ id: 'p1', name: '상품1', price: 10000, count: 50 },
	{ id: 'p2', name: '상품2', price: 20000, count: 30 },
	{ id: 'p3', name: '상품3', price: 30000, count: 20 },
	{ id: 'p4', name: '상품4', price: 15000, count: 0 },
	{ id: 'p5', name: '상품5', price: 25000, count: 10 },
];

export type State = {
	products: Product[];
	cartItems: Product[];
	totalPrice: number;
	discountRate: number;
	lastSelectedProductId: ProductId | null;
};

export type Action =
	| { type: 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM'; productId: ProductId }
	| {
			type: 'CHANGE_CART_ITEM_COUNT';
			payload: { productId: ProductId; count: number };
	  }
	| { type: 'UPDATE_TOTAL_PRICE'; payload: { discountRate: number } };

function reducer(state: State, action: Action): State {
	const { cartItems, products } = state;

	switch (action.type) {
		case 'ADD_CART_ITEM':
			const { productId } = action;
			const isEixst = cartItems.find(({ id }) => id === productId);

			return {
				...state,
				products: products.map((product) =>
					product.id === productId ? { ...product, count: product.count - 1 } : product,
				),
				cartItems: isEixst
					? cartItems.map((item) => (item.id === productId ? { ...item, count: item.count + 1 } : item))
					: [...cartItems, { ...products.find(({ id }) => id === productId)!, count: 1 }],
				lastSelectedProductId: productId,
			};
		case 'REMOVE_CART_ITEM':
			return { ...state };

		case 'CHANGE_CART_ITEM_COUNT':
			return { ...state };

		default:
			return state;
	}
}

export function useCartStore() {
	const [state, dispatch] = useReducer(reducer, {
		products: initProducts,
		cartItems: [],
		totalPrice: 0,
		discountRate: 0,
		lastSelectedProductId: null,
	});

	return [state, dispatch] as const;
}
