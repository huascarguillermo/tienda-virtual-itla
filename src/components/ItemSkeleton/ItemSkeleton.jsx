import { Card, Skeleton } from '@nextui-org/react';
import styles from '../Item/Item.module.css';
import range from '../../utils/range';

function ItemSkeleton() {
	return (
		<>
			{range(20).map(el => (
				<Card key={el} radius='lg' className={styles.card}>
					<Skeleton className='rounded-lg'>
						<div
							style={{
								height: '420px',
								backgroundColor: '#f0f0f0'
							}}
						></div>
					</Skeleton>
				</Card>
			))}
		</>
	);
}

export default ItemSkeleton;
