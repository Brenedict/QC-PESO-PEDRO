import React from "react";

// Colors na available
type Variant = "blue" | "red" | "green" | "navy" | "white";

// Sizes na available
type Size = "small" | "normal" | "large";

// properties na pedeng ilagay sa button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;           // kung anong kulay 
  size?: Size;                 // kung anong size
  leftIcon?: React.ReactNode;  // Kung gusto mo ng icon sa kaliwa ng text
  rightIcon?: React.ReactNode; // Kung gusto mo ng icon sa kanan ng text
  children: React.ReactNode;   // Ito yung mismong text ng button 
}

// Tailwind CSS per kulay 
const variantStyles: Record<Variant, string> = {
  blue: "bg-[#004B87] text-white border-none hover:bg-[#003865]", 
  red: "bg-[#EF4444] text-white border-none hover:bg-[#dc2626]", 
  green: "bg-[#10B981] text-white border-none hover:bg-[#059669]", 
  navy: "bg-[#1E293B] text-white border-none hover:bg-[#0f172a]", 
  white: "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]", 
};

// Tailwind CSS per size
const sizeStyles: Record<Size, string> = {
  small: "px-3 py-1.5 min-w-[100px] text-sm rounded-lg",
  normal: "px-6 py-2.5 min-w-[160px] text-base rounded-xl",
  large: "px-8 py-3 min-w-[200px] text-lg rounded-2xl",
};


// standard na look ng LAHAT ng buttons natin (flexbox, font-weight, animations)
const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200";

// mismong logic ng Button component
const Button = ({
  variant = "blue", // 'blue' na ang gagamitin niya as default kapag walang nilagay na variant
  size = "normal",  // 'normal' ang gagamitin niya as default kapag walang nilagay na size
  leftIcon,
  rightIcon,
  children,
  className = "", // Sinasalo nito kung gusto mo magdagdag ng extra Tailwind class later 
  ...props        // Sinasalo nito lahat ng normal button attributes gaya ng onClick, disabled, type, etc.
}: ButtonProps) => {
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props} 
    >
      {}
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      
      {}
      {children}
      
      {}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;