import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { EyeClosed, EyeOpen, MailIcon, Lock } from '../components';

function Login() {
	const [isVisible, setIsVisible] = useState(false);
	const handleVisible = () => setIsVisible(!isVisible);

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
			/>
		</section>
	);
}

export default Login;
