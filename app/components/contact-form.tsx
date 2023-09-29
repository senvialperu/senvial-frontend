'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/app/utils/send-email';

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
                    placeholder='example@domain.com'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    {...register('email', { pattern: /[A-Za-z]{3}/, required: true })}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='cel'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Número de teléfono
                </label>
                <input
                    type='cel'
                    placeholder='+51 999 999 999'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-secondary focus:shadow-md'
                    {...register('cel', { required: true })}
                />
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
