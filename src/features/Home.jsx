import { getProducts } from '../services/fakeStoreApi';

function Home() {
	getProducts();
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default Home;
