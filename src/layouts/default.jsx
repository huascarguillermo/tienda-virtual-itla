import { useState, useEffect } from 'react';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	Avatar,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	DropdownTrigger,
	Badge
} from '@nextui-org/react';
import { Outlet, Link } from 'react-router-dom';
import {
	auth,
	onAuthStateChanged,
	signOut,
	db,
	doc,
	getDoc
} from '../services/firebase';

import styles from './default.module.css';

const DefaultLayout = () => {
	const [userLogged, setUserLogged] = useState(null);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const listener = onAuthStateChanged(auth, user => {
			if (user) {
				setUserLogged(user);
			} else {
				setUserLogged(null);
			}

			return () => {
				listener();
			};
		});
	}, []);

	useEffect(() => {
		if (userLogged) {
			const getUserData = async () => {
				const userRef = doc(db, 'users', userLogged.uid);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					setUserData(userSnap.data());
				} else {
					setUserData(null);
				}
			};

			getUserData();
		}
	}, [userLogged]);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				alert('You have been signed out');
				setUserLogged(null);
				setUserData(null);
			})
			.catch(err => {
				console.log(err);
			});
	};

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
				<NavbarContent as='div' justify='end' className={styles.navContent}>
					<Badge content='3' color='primary'>
						<Link to='/checkout' className={styles.cartIcon}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='feather feather-shopping-cart'
							>
								<circle cx='9' cy='21' r='1'></circle>
								<circle cx='20' cy='21' r='1'></circle>
								<path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
							</svg>
						</Link>
					</Badge>
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								color='primary'
								name={userData?.fullName || ''}
								size='sm'
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label='Profile Actions' variant='flat'>
							{userData && (
								<DropdownItem key='profile' className='h-14 gap-2'>
									<p className='font-semibold'>Signed in as</p>
									<p className='font-semibold'>{userData?.email}</p>
								</DropdownItem>
							)}

							{userLogged ? (
								<DropdownItem
									key='logout'
									color='danger'
									onClick={handleSignOut}
								>
									Sign out
								</DropdownItem>
							) : (
								<DropdownItem key='login' color='primary'>
									<Link to='/login' className='text-default-900'>
										Login
									</Link>
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			</Navbar>

			<main className={styles.mainContainer}>
				<Outlet />
			</main>
		</>
	);
};

export default DefaultLayout;
