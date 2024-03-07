import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	Avatar,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	DropdownTrigger
} from '@nextui-org/react';
import { Outlet, Link } from 'react-router-dom';

import styles from './default.module.css';

const DefaultLayout = () => {
	return (
		<>
			<Navbar shouldHideOnScroll maxWidth='xl'>
				<NavbarBrand>
					<Link to='/' className={`${styles.link} rounded-full p-2`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
							<line x1='3' y1='6' x2='21' y2='6'></line>
							<path d='M16 10a4 4 0 0 1-8 0'></path>
						</svg>
					</Link>
				</NavbarBrand>
				<NavbarContent as='div' justify='end'>
					{/* <Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								color='primary'
								name='JR'
								size='sm'
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label='Profile Actions' variant='flat'>
							<DropdownItem key='profile' className='h-14 gap-2'>
								<p className='font-semibold'>Signed in as</p>
								<p className='font-semibold'>zoey@example.com</p>
							</DropdownItem>
							<DropdownItem key='logout' color='danger'>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown> */}
					<p>JC</p>
				</NavbarContent>
			</Navbar>

			<main className={styles.mainContainer}>
				<Outlet />
			</main>
		</>
	);
};

export default DefaultLayout;
