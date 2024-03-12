import { useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Input } from '@nextui-org/react';
import { EyeClosed, EyeOpen, MailIcon, Lock } from '../components';
import { emailValidation } from '../utils/helpers';
import { Link, redirect } from 'react-router-dom';

function Register() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const handleVisible = () => setIsVisible(!isVisible);

	const handleSubmit = () => {
		const isValidEmail = emailValidation(email);
		const isValidPassword = password === passwordRepeat;

		if (isValidEmail && isValidPassword && fullName !== '') {
			setIsLoading(true);
			createUserWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					// console.log(userCredential);
					const user = userCredential.user;
					const userRef = doc(db, 'users', user.uid);
					setDoc(userRef, {
						fullName,
						email,
						cart: [],
						addresses: [],
						orders: []
					}).then(() => {
						alert("You've been registered successfully");

						setTimeout(() => {
							redirect('/login');
							resetInput();
						}, 2000);
					});
				})
				.catch(error => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});

			resetInput();
		} else {
			alert('Que toyo fue que hiciste');
			resetInput();
			setIsLoading(false);
		}
	};

	const resetInput = () => {
		setFullName('');
		setEmail('');
		setPassword('');
		setPasswordRepeat('');
	};

	return (
		<section>
			<h1>Register</h1>

			<Input
				type='text'
				label='Full Name'
				variant='bordered'
				placeholder='Your full name'
				labelPlacement='outside'
				value={fullName}
				onChange={e => setFullName(e.target.value)}
			/>

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
			<Input
				variant='bordered'
				placeholder='Repeat your password'
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
				value={passwordRepeat}
				onChange={e => setPasswordRepeat(e.target.value)}
			/>
			<Button onClick={handleSubmit} isDisabled={isLoading}>
				Login
			</Button>
			<Link to='/login'>Do you have an account? Log in</Link>
		</section>
	);
}

export default Register;
