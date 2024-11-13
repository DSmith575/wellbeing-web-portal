/**
 * @name Button
 * @description Button component
 * @param {Function} onClick - Function to be called when button is clicked
 * @param {String} children - Button text
 * @param {String} styles - Tailwind CSS classes
 * @param {String} type - Button type
 * @returns {JSX.Element}
 */

import { Button as ShadButton } from "@/components/ui/button";

const Button = ({ onClick, children, styles, type = "button" }) => {
  return (
    <ShadButton onClick={onClick} type={type} className={styles}>
      {children}
    </ShadButton>
  );
};

export default Button;
