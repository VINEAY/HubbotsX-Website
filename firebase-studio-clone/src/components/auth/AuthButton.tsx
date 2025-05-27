import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function AuthButton({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className = "",
  ...props
}: AuthButtonProps) {
  const baseStyles = "flex justify-center items-center py-2.5 px-4 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    text: "text-primary hover:bg-primary/10"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
