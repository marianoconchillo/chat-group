import { motion } from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const AnimateComponent = ({ children }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
};
