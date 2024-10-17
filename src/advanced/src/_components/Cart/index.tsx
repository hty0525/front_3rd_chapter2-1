import React from 'react';
import CartItems from './CartItems';
import CartTotalPrice from './CartTotalPrice';

export function Cart() {
	return (
		<div>
			<CartItems />
			<CartTotalPrice />
		</div>
	);
}
