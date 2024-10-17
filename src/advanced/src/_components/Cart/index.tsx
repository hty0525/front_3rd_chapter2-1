import React from 'react';
import CartTotalPrice from './CartTotalPrice';
import type { Product } from '../../store/useCart';
import CartItem from './CartItem';

type Props = {
	cartItems: Product[];
};

export function Cart({ cartItems }: Props) {
	return (
		<div>
			<div id="cart-items">
				{cartItems.map((product) => (
					<CartItem key={product.id} {...product} />
				))}
			</div>
			<CartTotalPrice />
		</div>
	);
}
