import React from 'react';
import Layout from './_components/Layout';
import { Cart } from './_components/Cart';
import Prodcut from './_components/Prodcut';
import { ProductId, useCartStore } from './store/useCart';

export default function App() {
	const [cartState, cartDispatch] = useCartStore();

	const { cartItems, products } = cartState;

	const addCartItem = (productId: ProductId) => {
		cartDispatch({ type: 'ADD_CART_ITEM', productId });
	};

	return (
		<Layout>
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
				<h1 className="text-2xl font-bold mb-4">장바구니</h1>
				<Cart cartItems={cartItems} />
				<Prodcut products={products} addCartItem={addCartItem} />
			</div>
		</Layout>
	);
}
