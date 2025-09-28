// components/Message.tsx
import { FC } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type MessageProps = {
  message?: string | null;
  variant?: "error" | "success" | "info";
  className?: string;
  id?: string;
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: -6, height: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
  show: { opacity: 1, y: 0, height: "auto", transition: { type: "spring", damping: 25, stiffness: 500 } },
  exit: { opacity: 0, y: -6, height: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
};

const variantClass = {
  error: "text-red-600",
  success: "text-green-600",
  info: "text-slate-600",
};

const Message: FC<MessageProps> = ({ message, variant = "error", className = "", id }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={id ?? message}
        variants={messageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className={`overflow-hidden ${className}`}
      >
        <p className={`text-sm px-1 py-1 ${variantClass[variant]}`}>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Message;
