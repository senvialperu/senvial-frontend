'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/app/utils/send-email';
import { useState } from 'react';

export type FormData = {
    name: string;
    email: string;
    message: string;
    cel: number;
};

const Contact: FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        setPhoneNumber(inputValue);

        const regex = /^[0-9]+$/;


        if (!regex.test(inputValue)) {
            setError('Por favor, ingresa un número de teléfono válido.');
        } else {
            setError('');
        }
    };


    // handler for mail 
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);

        // Expresión regular para validar una dirección de correo electrónico
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(inputValue)) {
            setEmailError('Por favor, ingresa una dirección de correo electrónico válida.');
        } else {
            setEmailError('');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
                <label
                    htmlFor='name'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Nombre completo
                </label>
                <input
                    type='text'
                    placeholder='Nombre completo'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    {...register('name', { required: true })}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='email'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Correo
                </label>
                <input
                    type='email'
                    id='email'
                    placeholder='example@domain.com'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && (
                    <span className="text-red-600">{emailError}</span>
                )}
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='cel'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Número de teléfono
                </label>
                <input
                    type='text'
                    id='cel'
                    placeholder='+51 999 999 999'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                {error && (
                    <span className="text-red-600">{error}</span>
                )}
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='message'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Message
                </label>
                <textarea
                    rows={4}
                    placeholder='Escribe tu mensaje'
                    className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    {...register('message', { required: true })}
                ></textarea>
            </div>
            <div>
                <button className='hover:shadow-form rounded-md bg-secondary py-3 px-8 text-base font-semibold text-white outline-none'>
                    Enviar
                </button>
            </div>
        </form>
    );
};

export default Contact;
