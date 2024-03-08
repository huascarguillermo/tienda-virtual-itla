import { Input, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/fakeStoreApi';
import { Item, ItemSkeleton, SearchIcon } from '../components';
import styles from './Home.module.css';
import range from '../utils/range';

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
		<section className={styles.sectionContainer}>
			<header className='py-4'>
				<Input
					type='text'
					placeholder='Search for products'
					startContent={
						<SearchIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
					}
					className={styles.searchInput}
				/>
				<Select label='Category' className='max-w-xs'>
					{range(5).map(el => (
						<SelectItem key={el} value={el}>
							{`${el}`}
						</SelectItem>
					))}
				</Select>
				<Select label='Sort' className='max-w-xs'>
					{range(2).map(el => (
						<SelectItem key={el} value={el}>
							{`${el}`}
						</SelectItem>
					))}
				</Select>
			</header>
			<main className={styles.wrapper}>
				{isLaoding ? (
					<ItemSkeleton />
				) : (
					<>
						{products.map(product => (
							<Item key={product.id} item={product} />
						))}
					</>
				)}
			</main>
		</section>
	);
}

export default Home;
