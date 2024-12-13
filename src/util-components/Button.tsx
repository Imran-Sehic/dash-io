import { ReactNode } from "react";

interface ButtonInterface {
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonInterface> = ({
  children,
  onClick,
  icon,
  className,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
