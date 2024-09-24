import { Button as ShadButton } from '@/components/ui/button';

const Button = ({ onClick, children, styles, type = 'button' }) => {
  return (
    <ShadButton onClick={onClick} type={type} className={styles}>
      {children}
    </ShadButton>
  );
};

export default Button;
