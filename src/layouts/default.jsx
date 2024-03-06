import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
	return (
		<>
			<header>
				<h1>Hey</h1>
			</header>

			<Outlet />
		</>
	);
};

export default DefaultLayout;
