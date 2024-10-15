import { appendChild, createElement } from '../utils';

const DISCOUNT_RATES = {
	p1: 0.1,
	p2: 0.15,
	p3: 0.2,
};
const ALL_DISCOUNT_COUNT = 30;
const ALL_DISCOUNT_RATE = 0.25;
const TUESDAY_DISCOUNT = 0.1;

const prodList = [
	{ id: 'p1', name: '상품1', val: 10000, q: 50, remain: 0 },
	{ id: 'p2', name: '상품2', val: 20000, q: 30, remain: 0 },
	{ id: 'p3', name: '상품3', val: 30000, q: 20, remain: 0 },
	{ id: 'p4', name: '상품4', val: 15000, q: 0, remain: 0 },
	{ id: 'p5', name: '상품5', val: 25000, q: 10, remain: 0 },
];

const sel = createElement('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
const addBtn = createElement('button', {
	id: 'add-to-cart',
	className: 'bg-blue-500 text-white px-4 py-2 rounded',
	textContent: '추가',
});
const cartDisp = createElement('div', { id: 'cart-items' });
const sum = createElement('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
const stockInfo = createElement('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

let lastSel;
let bonusPts = 0;
let totalAmt = 0;
let itemCnt = 0;

function main() {
	const root = document.getElementById('app');
	const cont = createElement('div', { className: 'bg-gray-100 p-8' });
	const wrap = createElement('div', {
		className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
	});
	const hTxt = createElement('h1', { className: 'text-2xl font-bold mb-4', textContent: '장바구니' });

	updateSelOpts();

	appendChild({ parent: wrap, children: [hTxt, cartDisp, sum, sel, addBtn, stockInfo] });
	appendChild({ parent: cont, children: wrap });
	appendChild({ parent: root, children: cont });

	calcCart();

	// setTimeout(function () {
	// 	setInterval(function () {
	// 		const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
	// 		if (Math.random() < 0.3 && luckyItem.q > 0) {
	// 			luckyItem.val = Math.round(luckyItem.val * 0.8);
	// 			alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
	// 			updateSelOpts();
	// 		}
	// 	}, 30000);
	// }, Math.random() * 10000);
	// setTimeout(function () {
	// 	setInterval(function () {
	// 		if (lastSel) {
	// 			const suggest = prodList.find(function (item) {
	// 				return item.id !== lastSel && item.q > 0;
	// 			});
	// 			if (suggest) {
	// 				alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
	// 				suggest.val = Math.round(suggest.val * 0.95);
	// 				updateSelOpts();
	// 			}
	// 		}
	// 	}, 60000);
	// }, Math.random() * 20000);
}
function updateSelOpts() {
	sel.innerHTML = '';
	prodList.forEach(function (item) {
		const opt = createElement('option', { value: item.id, textContent: `${item.name} - ${item.val}원` });
		appendChild({ parent: sel, children: opt });
	});
}

function calcCart() {
	const totalCartItems = prodList.reduce((acc, { remain }) => acc + remain, 0);
	const cartTotalPrice = prodList.reduce((acc, { val, remain }) => acc + val * remain, 0);

	let discountedCartTotalPrice = prodList.reduce((acc, { id, val, remain }) => {
		let discRate = 0;
		if (totalCartItems >= ALL_DISCOUNT_COUNT) discRate = ALL_DISCOUNT_RATE;
		else if (remain >= 10) discRate = DISCOUNT_RATES[id] || 0;
		return acc + val * remain * (1 - discRate);
	}, 0);

	if (new Date().getDay() === 2) {
		discountedCartTotalPrice = discountedCartTotalPrice * (1 - TUESDAY_DISCOUNT);
	}

	sum.textContent = `총액: ${Math.round(discountedCartTotalPrice)}원`;

	if (cartTotalPrice !== discountedCartTotalPrice) {
		const totalDiscountRate = ((cartTotalPrice - discountedCartTotalPrice) / cartTotalPrice) * 100;
		const span = createElement('span', {
			className: 'text-green-500 ml-2',
			textContent: `(${totalDiscountRate}% 할인 적용)`,
		});
		appendChild({ parent: sum, children: span });
	}

	updateStockInfo();
	renderBonusPts();
}
const renderBonusPts = () => {
	bonusPts += Math.floor(totalAmt / 1000);
	let ptsTag = document.getElementById('loyalty-points');
	if (!ptsTag) {
		ptsTag = createElement('span', { id: 'loyalty-points', className: 'text-blue-500 ml-2' });

		appendChild({ parent: sum, children: ptsTag });
	}
	ptsTag.textContent = `(포인트: ${bonusPts})`;
};

function updateStockInfo() {
	let infoMsg = '';
	prodList.forEach(function (item) {
		if (item.q < 5) {
			infoMsg += `${item.name}: ${item.q > 0 ? `재고 부족 (${item.q}개 남음)` : '품절'} \n`;
		}
	});
	stockInfo.textContent = infoMsg;
}

main();

addBtn.addEventListener('click', function () {
	const selItem = sel.value;
	const itemToAdd = prodList.find(function (p) {
		return p.id === selItem;
	});

	if (itemToAdd && itemToAdd.q > 0) {
		const item = document.getElementById(itemToAdd.id);
		if (item) {
			const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
			if (itemToAdd.q > 0) {
				const currentCartItem = prodList.find((item) => item.id === itemToAdd.id);
				item.querySelector('span').textContent = `${itemToAdd.name} - ${itemToAdd.val}원 x ${newQty}`;
				currentCartItem.q++;
				itemToAdd.q--;
				console.log(prodList);
			} else {
				alert('재고가 부족합니다.');
			}
		} else {
			const newItem = document.createElement('div');
			newItem.id = itemToAdd.id;
			newItem.className = 'flex justify-between items-center mb-2';
			newItem.innerHTML =
				'<span>' +
				itemToAdd.name +
				' - ' +
				itemToAdd.val +
				'원 x 1</span><div>' +
				'<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
				itemToAdd.id +
				'" data-change="-1">-</button>' +
				'<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
				itemToAdd.id +
				'" data-change="1">+</button>' +
				'<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
				itemToAdd.id +
				'">삭제</button></div>';
			prodList.push({ ...itemToAdd, q: 1 });
			cartDisp.appendChild(newItem);
			itemToAdd.q--;
		}
		calcCart();
		lastSel = selItem;
	}
});
cartDisp.addEventListener('click', function (event) {
	const tgt = event.target;
	if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
		const prodId = tgt.dataset.productId;
		const itemElem = document.getElementById(prodId);
		const prod = prodList.find(function (p) {
			return p.id === prodId;
		});
		const selectedCartItem = prodList.find((item) => item.id === prodId);

		if (tgt.classList.contains('quantity-change')) {
			const qtyChange = parseInt(tgt.dataset.change);
			const newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
			console.log(newQty);
			if (newQty > 0 && newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
				itemElem.querySelector('span').textContent = `${
					itemElem.querySelector('span').textContent.split('x ')[0]
				} x ${newQty}`;
				prod.q -= qtyChange;
			} else if (newQty <= 0) {
				itemElem.remove();
				prod.q -= qtyChange;
			} else {
				alert('재고가 부족합니다.');
			}
		} else if (tgt.classList.contains('remove-item')) {
			const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
			prod.q += remQty;
			itemElem.remove();
		}
		calcCart();
	}
});
