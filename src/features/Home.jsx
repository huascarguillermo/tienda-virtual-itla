import { useEffect, useState } from 'react';
import { getProducts } from '../services/fakeStoreApi';

function Home() {
	const [products, setProducts] = useState([]);
	const [isLaoding, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		getProducts()
			.then(res => {
				const data = res.data;
				setProducts(data);

				console.log(data);
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				} else if (err.request) {
					console.log(err.request);
				} else {
					console.log('Something went wrong!', err.message);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return (
		<section>
			<h2>Products:</h2>

			{isLaoding ? (
				<p>Loading...</p>
			) : (
				<ul>
					{products.map((product, index) => (
						<li key={product.id}>
							<h2>{`${index + 1}-${product.title}`}</h2>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default Home;
