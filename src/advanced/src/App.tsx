import React from 'react';
import Layout from './_components/Layout';
import { Cart } from './_components/Cart';
import Prodcut from './_components/Prodcut';
import { ProductId, useCartStore } from './store/useCart';

export default function App() {
	const [cartState, cartDispatch] = useCartStore();

	const { products } = cartState;

	const addCartItem = (productId: ProductId) => {
		cartDispatch({ type: 'ADD_CART_ITEM', productId });
	};

	const removeCartItem = (productId: ProductId) => {
		cartDispatch({ type: 'REMOVE_CART_ITEM', productId });
	};

	const changeCartItemQuantity = (productId: ProductId, quantity: number) => {
		cartDispatch({ type: 'CHANGE_CART_ITEM_COUNT', payload: { productId, quantity } });
	};

	const cartItems = products.filter(({ currentCartItemQuantity }) => currentCartItemQuantity > 0);

	return (
		<Layout>
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
				<h1 className="text-2xl font-bold mb-4">장바구니</h1>
				<Cart cartItems={cartItems} removeCartItem={removeCartItem} changeCartItemQuantity={changeCartItemQuantity} />
				<Prodcut products={products} addCartItem={addCartItem} />
			</div>
		</Layout>
	);
}
