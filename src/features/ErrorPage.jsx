import { useRouteError, Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

function ErrorPage() {
	const error = useRouteError();
	console.log(error);

	return (
		<div className={styles.errorContainer}>
			<h1>Oops!</h1>
			<p className={styles.errorMessage}>
				Sorry, the following page {error.data} is still unavailable.
			</p>
			<p className={styles.errorCode}>
				<i>{error.statusText || error.message}</i>
			</p>
			<Link to={'./'}>Home Page</Link>
		</div>
	);
}

export default ErrorPage;
