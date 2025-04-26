import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const Button = ({
  children,
  color,
  ...props
}: {
  children: ReactNode;
  color?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...props}
      className={`pixel-border p-2 m-2 disabled:bg-gray-100 disabled:hover:scale-100 hover:scale-101 transition-all cursor-pointer ${
        color ?? "bg-emerald-600"
      } ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
