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
