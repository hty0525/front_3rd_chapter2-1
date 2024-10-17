import React from 'react';
import type { Product, ProductId } from '../../store/useCart';

type Props = {
	products: Product[];
	addCartItem: (productId: ProductId) => void;
};

export default function Prodcut({ products, addCartItem }: Props) {
	const selectRef = React.useRef<HTMLSelectElement>(null);

	const onClickAddButton = () => {
		if (!selectRef.current) return;

		const productId = selectRef.current.value as ProductId;

		addCartItem(productId);
	};

	return (
		<div>
			<select ref={selectRef} id="product-select" className="border rounded p-2 mr-2">
				{products.map(({ count, price, id, name }) => (
					<option key={id} value={id} disabled={count === 0}>
						{name} - {price.toLocaleString()}원
					</option>
				))}
			</select>
			<button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClickAddButton}>
				추가
			</button>
			<div id="stock-status" className="text-sm text-gray-500 mt-2">
				상품4: 품절
			</div>
		</div>
	);
}
