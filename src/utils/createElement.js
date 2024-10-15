export function createElement(props) {
	const { tagName, props } = props;

	const element = document.createElement(tagName);
	if (!!props) {
		Object.keys(props).forEach((key) => {
			if (key.startsWith('on')) {
				const eventName = key.toLowerCase().substring(2);
				element.addEventListener(eventName, props[key]);
			} else if (key === 'className') {
				element.setAttribute('class', props[key]);
			} else if (key === 'style') {
				Object.assign(element.style, props[key]);
			} else {
				element.setAttribute(key, props[key]);
			}
		});
	}

	return element;
}
