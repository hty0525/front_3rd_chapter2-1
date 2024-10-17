import React from 'react';

export default function Prodcut() {
	return (
		<>
			<select id="product-select" className="border rounded p-2 mr-2">
				<option value="p1">상품1 - 8000원</option>
				<option value="p2">상품2 - 16291원</option>
				<option value="p3">상품3 - 24000원</option>
				<option value="p4" disabled>
					상품4 - 15000원
				</option>
				<option value="p5">상품5 - 25000원</option>
			</select>
			<button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded">
				추가
			</button>
			<div id="stock-status" className="text-sm text-gray-500 mt-2">
				상품4: 품절
			</div>
		</>
	);
}
