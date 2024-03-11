export const uniqueID = () => {
	const id = crypto.randomUUID();

	return id;
};

export const formatToCurrency = value => {
	const output = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(value);

	return output;
};

export function debounce(callback, interval) {
	let duration = 0
	let id
	return function () {
		if (duration <= 0) {
			duration = interval
			clearInterval(id)
			id = setInterval(() => { duration -= 100 }, 100)
			return callback()
		}
	}
}