import fetcher from '../utils/fetch';

const API = 'https://fakestoreapi.com';

export const getProducts = () => {
	return fetcher.get(`${API}/products`);
};
