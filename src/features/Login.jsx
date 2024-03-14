import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { EyeClosed, EyeOpen, MailIcon, Lock } from '../components';
import { emailValidation } from '../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	const handleVisible = () => setIsVisible(!isVisible);

	const handleSubmit = () => {
		const isValidEmail = emailValidation(email);

		if (isValidEmail && password !== '') {
			signInWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					resetInputs();
					navigate('/');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const resetInputs = () => {
		setEmail('');
		setPassword('');
		setIsVisible(false);
	};

	return (
		<section className='flex w-full flex-wrap md:flex-nowrap gap-4'>
			<h1>Login</h1>
			<Input
				type='email'
				label='Email'
				variant='bordered'
				placeholder='you@example.com'
				labelPlacement='outside'
				startContent={
					<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
				}
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<Input
				label='Password'
				variant='bordered'
				placeholder='Enter your password'
				labelPlacement='outside'
				startContent={
					<Lock className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
				}
				endContent={
					<button
						className='focus:outline-none'
						type='button'
						onClick={handleVisible}
					>
						{isVisible ? (
							<EyeClosed className='text-2xl text-default-400 pointer-events-none' />
						) : (
							<EyeOpen className='text-2xl text-default-400 pointer-events-none' />
						)}
					</button>
				}
				type={isVisible ? 'text' : 'password'}
				className='max-w-xs'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button onClick={handleSubmit}>Login</Button>
			<Link to='/register'>Don&apos;t have an account? Register</Link>
		</section>
	);
}

export default Login;
