import {
	useNavigate,
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import DefaultLayout from './layouts/default';
import { Cart, Checkout, Home, Login, Register } from './features/index.js';

const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/cart', element: <Cart /> },
			{ path: '/checkout', element: <Checkout /> }
		]
	}
]);

function App() {
	// const navigate = useNavigate();

	return (
		// <NextUIProvider navigate={navigate}>
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	);
}

export default App;
