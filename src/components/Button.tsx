import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  "data-testid"?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  "data-testid": testId,
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
