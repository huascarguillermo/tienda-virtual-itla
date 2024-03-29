import { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import { formatToCurrency } from '../../utils/helpers';
import CartIcon from '../CartIcon';
import styles from './Item.module.css';

function Item({ item, handleAddToCart }) {
	const [quantity, setQuantity] = useState(1);

	const { title, image, price } = item;
	const priceFormat = formatToCurrency(price);

	const addQuantity = () => {
		const newQuantity = quantity + 1;

		setQuantity(newQuantity);
	};

	const subtractQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
		}
	};

	const addToCart = () => {
		handleAddToCart(item, quantity);

		setQuantity(1);
	};

	return (
		<Card shadow='sm' className={styles.card}>
			<CardBody className='overflow-visible p-0'>
				<Image
					shadow='sm'
					radius='lg'
					width='100%'
					alt={title}
					className='w-full'
					src={image}
					style={{
						display: 'block',
						aspectRatio: '2 / 2',
						objectFit: 'contain'
					}}
				/>
			</CardBody>
			<CardFooter className={`${styles.cardFooter} text-small`}>
				<div>
					<b>{title}</b>
					{/* <p>{description}</p> */}
				</div>
				<p className='text-default-500'>{priceFormat}</p>
				<div className={styles.actionsWrapper}>
					<Button
						size='sm'
						isIconOnly
						color='primary'
						onClick={subtractQuantity}
						isDisabled={quantity === 1}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='feather feather-minus'
						>
							<line x1='5' y1='12' x2='19' y2='12'></line>
						</svg>
					</Button>
					<span className={styles.quantity}>{quantity}</span>
					<Button size='sm' isIconOnly color='primary' onClick={addQuantity}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='feather feather-plus'
						>
							<line x1='12' y1='5' x2='12' y2='19'></line>
							<line x1='5' y1='12' x2='19' y2='12'></line>
						</svg>
					</Button>
				</div>
				<Button color='primary' endContent={<CartIcon />} onClick={addToCart}>
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
}

export default Item;
