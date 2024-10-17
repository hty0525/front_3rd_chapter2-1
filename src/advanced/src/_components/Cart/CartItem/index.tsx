import React from 'react';
import { Product } from '../../../store/useCart';

type Props = Product;

export default function CartItem({ id, name, price, count }: Props) {
	return (
		<div id="p1" className="flex justify-between items-center mb-2">
			<span>
				{name} - {price.toLocaleString()}원 x {count}
			</span>
			<div>
				{['plus', 'minus', 'remove'].map((key) => {
					const className =
						key === 'remove' ? 'remove-item bg-red-500 text-white' : 'quantity-change bg-blue-500 text-white mr-1';

					const text = key === 'plus' ? '+' : key === 'minus' ? '-' : '삭제';

					const dataChange = key === 'plus' ? 1 : key === 'minus' ? -1 : 0;

					return (
						<button
							key={key}
							className={[className, 'px-2 py-1 rounded'].join(' ')}
							data-product-id={id}
							{...(dataChange === 0 ? {} : { 'data-change': dataChange })}
						>
							{text}
						</button>
					);
				})}
			</div>
		</div>
	);
}
