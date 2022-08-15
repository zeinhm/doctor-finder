import classNames from "classnames";
import Spinner from "./Spinner";

interface ButtonProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size = "lg",
  variant = "primary",
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={classNames("btn", `btn-${variant}`, `btn-${size}`, className)}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
