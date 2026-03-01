interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  onClick,
  variant,
  className = "",
  type = "button"
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}