'use client'
import { useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

export default function ScrollTopBar({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll();

    return (
        <>
            {children}
            <motion.div
                className="bg-black h-3 fixed bottom-0 left-0 right-0 origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </>
    );
}