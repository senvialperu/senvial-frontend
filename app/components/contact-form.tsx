'use client'
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/app/utils/send-email';
import { useState } from 'react';

export type FormData = {
    name: string;
    email: string;
    message: string;
    cel: string;
};

const Contact: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }

    const validateEmail = (email: string) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email) || "Ingresa un correo electrónico válido";
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        // Expresión regular para validar un número de teléfono
        const phoneRegex = /^\+?[0-9]{1,3}[ -]?[0-9]{3,3}[ -]?[0-9]{3,4}$/;
        return phoneRegex.test(phoneNumber) || "Ingresa un número de teléfono válido (ejemplo: +51 999 999 999)";
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
                    {...register('email', {
                        required: "El correo es obligatorio",
                        validate: validateEmail // Llamamos a la función de validación personalizada
                    })}
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
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
                    {...register('cel', {
                        required: "El número de teléfono es obligatorio",
                        validate: validatePhoneNumber // Llamamos a la función de validación personalizada
                    })}
                />
                {errors.cel && <p className='text-red-500'>{errors.cel.message}</p>}
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
