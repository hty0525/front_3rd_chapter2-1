import { appendChild, createElement } from '../utils';

const DISCOUNT_RATES = {
	p1: 0.1,
	p2: 0.15,
	p3: 0.2,
};
const ALL_DISCOUNT_COUNT = 30;
const ALL_DISCOUNT_RATE = 0.25;
const TUESDAY_DISCOUNT = 0.1;
const REWARD_POINT_RATE = 0.001;

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
	innerHTML: '추가',
	onClick: onClickAddBtn,
});

const cartDisp = createElement('div', { id: 'cart-items', onClick: onClickCartContainer });

const sum = createElement('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });

const stockInfo = createElement('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

let lastSel;
let totalAmt = 0;

function main() {
	const root = document.getElementById('app');
	const cont = createElement('div', { className: 'bg-gray-100 p-8' });
	const wrap = createElement('div', {
		className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
	});
	const hTxt = createElement('h1', { className: 'text-2xl font-bold mb-4', innerHTML: '장바구니' });

	updateSelOpts();

	appendChild({ parent: wrap, children: [hTxt, cartDisp, sum, sel, addBtn, stockInfo] });
	appendChild({ parent: cont, children: wrap });
	appendChild({ parent: root, children: cont });

	calcCart();

	setTimeout(function () {
		setInterval(function () {
			const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
			if (Math.random() < 0.3 && luckyItem.q > 0) {
				luckyItem.val = Math.round(luckyItem.val * 0.8);
				alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
				updateSelOpts();
			}
		}, 30000);
	}, Math.random() * 10000);
	setTimeout(function () {
		setInterval(function () {
			if (lastSel) {
				const suggest = prodList.find(function (item) {
					return item.id !== lastSel && item.q > 0;
				});
				if (suggest) {
					alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
					suggest.val = Math.round(suggest.val * 0.95);
					updateSelOpts();
				}
			}
		}, 60000);
	}, Math.random() * 20000);
}
function updateSelOpts() {
	sel.innerHTML = '';
	prodList.forEach(({ id, name, val, q }) => {
		const opt = createElement('option', { value: id, innerHTML: `${name} - ${val}원`, disabled: q === 0 });
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

	sum.innerHTML = `총액: ${Math.round(discountedCartTotalPrice)}원`;
	totalAmt = discountedCartTotalPrice;
	if (cartTotalPrice !== discountedCartTotalPrice) {
		const totalDiscountRate = (((cartTotalPrice - discountedCartTotalPrice) / cartTotalPrice) * 100).toFixed(1);
		const span = createElement('span', {
			className: 'text-green-500 ml-2',
			innerHTML: `(${totalDiscountRate}% 할인 적용)`,
		});
		appendChild({ parent: sum, children: span });
	}

	updateStockInfo();
	renderBonusPts();
}

function renderBonusPts() {
	const bonusPts = Math.floor(totalAmt * REWARD_POINT_RATE);
	let ptsTag = document.getElementById('loyalty-points');
	if (!ptsTag) {
		ptsTag = createElement('span', { id: 'loyalty-points', className: 'text-blue-500 ml-2' });
		appendChild({ parent: sum, children: ptsTag });
	}
	ptsTag.innerHTML = `(포인트: ${bonusPts})`;
}

function updateStockInfo() {
	let infoMsg = '';
	prodList.forEach(({ remain, q, name }) => {
		const remainCount = q - remain;

		if (remainCount < 5) {
			infoMsg += `${name}: ${remainCount > 0 ? `재고 부족 (${remainCount}개 남음)` : '품절'} \n`;
		}
	});
	stockInfo.innerHTML = infoMsg;
}

main();

function onClickAddBtn() {
	const selectedCartItemId = sel.value;

	handleCartItem(selectedCartItemId, 1);
	updateCartItemEl(selectedCartItemId);
}

function handleCartItem(targetId, count) {
	const targetItem = prodList.find((item) => item.id === targetId);

	const { q, remain } = targetItem;
	if (remain === q || q < 0) {
		return alert('재고가 부족합니다.');
	}
	if (count === 0) {
		targetItem.remain = count;
	} else {
		targetItem.remain += count;
	}
	updateCartItemEl(targetId);
	calcCart();
	lastSel = targetItem;
}

function onClickCartContainer(event) {
	const target = event.target;
	if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
		const productId = target.dataset.productId;

		const qtyChange = target.dataset.change ?? 0;

		handleCartItem(productId, Number(qtyChange));
	}
}

function updateCartItemEl(selectedId) {
	const targetItemEl = document.getElementById(selectedId);
	const { val, remain, name } = prodList.find((item) => item.id === selectedId);

	if (remain === 0) {
		if (targetItemEl) {
			targetItemEl.remove();
		}
		return;
	}
	if (targetItemEl) {
		targetItemEl.querySelector('span');
		targetItemEl.querySelector('span').innerHTML = `${name} - ${val}원 x ${remain}`;
	} else {
		const newItem = createElement('div', {
			id: selectedId,
			className: 'flex justify-between items-center mb-2',
		});

		const newItemSpan = createElement('span', { innerHTML: `${name} - ${val}원 x 1` });

		const newItemBtnBox = createElement('div');
		const newItemBtnClassName = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
		const newItemPlusBtn = createElement('button', {
			className: newItemBtnClassName,
			innerHTML: '+',
			'data-product-id': selectedId,
			'data-change': 1,
		});
		const newItemMinusBtn = createElement('button', {
			className: newItemBtnClassName,
			innerHTML: '-',
			'data-product-id': selectedId,
			'data-change': -1,
		});
		const newItemDeleteBtn = createElement('button', {
			className: 'remove-item bg-red-500 text-white px-2 py-1 rounded',
			innerHTML: '삭제',
			'data-product-id': selectedId,
		});

		appendChild({ parent: newItemBtnBox, children: [newItemMinusBtn, newItemPlusBtn, newItemDeleteBtn] });

		appendChild({ parent: newItem, children: [newItemSpan, newItemBtnBox] });

		appendChild({ parent: cartDisp, children: newItem });
	}
}
