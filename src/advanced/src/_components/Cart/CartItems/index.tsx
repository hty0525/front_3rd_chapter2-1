import React from 'react';

export default function CartItems() {
	return (
		<div id="cart-items">
			<div id="p1" className="flex justify-between items-center mb-2">
				<span>상품1 - 10000원 x 10</span>
				<div>
					<button
						className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
						data-product-id="p1"
						data-change="-1"
					>
						-
					</button>
					<button
						className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
						data-product-id="p1"
						data-change="1"
					>
						+
					</button>
					<button className="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="p1">
						삭제
					</button>
				</div>
			</div>
		</div>
	);
}
