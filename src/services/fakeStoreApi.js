import fetcher from '../utils/fetch';

const API = 'https://fakestoreapi.com';

export const getProducts = (category, sort) => {
	let url = `${API}/products`;

	if (category) {
		url += `/category/${category}`;
	}

	if (sort) {
		url += `?sort=${sort}`;
	}

	return fetcher.get(url);
};