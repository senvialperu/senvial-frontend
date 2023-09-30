import Contact from '@/app/components/contact-form';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center bg-white space-y-8'>
            <h1>
                <span className='block text-4xl font-bold text-gray-900'>
                    Contacto
                </span>
            </h1>
            <div className="contact-wrapper space-y-8" style={{ width: '80%' }}>
                <Contact />
                <div className="mb-4" style={{ width: '100%', paddingTop: '56.25%', position: 'relative', marginBottom: '20px' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.869353710594!2d-77.06419712397957!3d-11.844417538168184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d6c55892ade3%3A0x1d27b72f702f71d3!2sAv.%20Vista%20Alegre%2C%20Carabayllo!5e0!3m2!1ses-419!2spe!4v1696003344760!5m2!1ses-419!2spe"
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        loading="lazy"
                    ></iframe>
                    <br />
                </div>
            </div>
        </main>
    );
}
