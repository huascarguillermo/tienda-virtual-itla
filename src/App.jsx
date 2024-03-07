import {
	useNavigate,
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import DefaultLayout from './layouts/default';

const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: [
			{ path: '/', element: <h1>Home</h1> },
			{ path: '/login', element: <h1>Login</h1> },
			{ path: '/register', element: <h1>Register</h1> },
			{ path: '/cart', element: <h1>Cart</h1> },
			{ path: '/checkout', element: <h1>Checkout</h1> }
		]
	}
]);

function App() {
	const navigate = useNavigate();

	return (
		<NextUIProvider navigate={navigate}>
			<RouterProvider router={router} />
		</NextUIProvider>
	);
}

export default App;
