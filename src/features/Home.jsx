import { Input, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/fakeStoreApi';
import { Item, ItemSkeleton, SearchIcon } from '../components';
import { CATEGORIES, SORT } from '../utils/constants';
import { useDebounce } from 'use-debounce';
import styles from './Home.module.css';

function Home() {
	const [products, setProducts] = useState([]);
	const [isLaoding, setIsLoading] = useState(false);
	const [searchProduct, setSearchProduct] = useState('');
	const [categorySelected, setCategorySelected] = useState('');
	const [sortSelected, setSortSelected] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [value] = useDebounce(searchProduct, 500);

	console.log({ cart });

	useEffect(() => {
		setIsLoading(true);

		getProducts(categorySelected, sortSelected)
			.then(res => {
				const data = res.data;

				setProducts(data);
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
	}, [categorySelected, sortSelected]);

	const filterProducts = data => {
		let filtered = data;

		if (value) {
			filtered = filtered.filter(product =>
				product.title.toLowerCase().includes(value.toLowerCase())
			);
		}

		setFilteredProducts(filtered);
	};

	useEffect(() => {
		filterProducts(products);
	}, [value, products]);

	const handleAddToCart = (item, quantity) => {
		const itemInCart = cart.find(product => product.id === item.id);

		if (itemInCart) {
			const newCart = cart.map(product => {
				if (product.id === item.id) {
					return { ...product, quantity: product.quantity + quantity };
				}

				return product;
			});

			setCart(newCart);
			return;
		}

		const newItem = { ...item, quantity };
		const newCart = [...cart, newItem];

		setCart(newCart);
	};

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
					value={searchProduct}
					onChange={e => setSearchProduct(e.target.value)}
				/>
				<Select
					label='Category'
					className='max-w-xs'
					value={categorySelected}
					onChange={e => setCategorySelected(e.target.value)}
				>
					{CATEGORIES.map(cat => (
						<SelectItem key={cat.value} value={cat.value}>
							{cat.label}
						</SelectItem>
					))}
				</Select>
				<Select
					label='Sort'
					className='max-w-xs'
					value={sortSelected}
					onChange={e => setSortSelected(e.target.value)}
				>
					{SORT.map(sort => (
						<SelectItem key={sort.value} value={sort.value}>
							{sort.label}
						</SelectItem>
					))}
				</Select>
			</header>
			<main className={styles.wrapper}>
				{isLaoding ? (
					<ItemSkeleton />
				) : (
					<>
						{filteredProducts.map(product => (
							<Item
								key={product.id}
								item={product}
								handleAddToCart={handleAddToCart}
							/>
						))}
					</>
				)}
			</main>
		</section>
	);
}

export default Home;
