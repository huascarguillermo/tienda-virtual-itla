import fetcher from '../utils/fetch';

const API = 'https://fakestoreapi.com';

export const getProducts = async () => {
	const products = await fetcher.get(`${API}/products`);
	console.log(products.data);
};
