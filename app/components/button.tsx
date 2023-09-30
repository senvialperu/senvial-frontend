'use client';

import { motion } from "framer-motion";

const Button = ({ children, className }) => {
    return (
        <motion.button
            className={className}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            {children}
        </motion.button>
    );
};

export default Button;