import React from 'react';
import Layout from './_components/Layout';
import { Cart } from './_components/Cart';
import { Title } from './_components/common';
import Prodcut from './_components/Prodcut';

export default function App() {
	return (
		<Layout>
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
				<Title>장바구니</Title>
				<Cart />
				<Prodcut />
			</div>
		</Layout>
	);
}
