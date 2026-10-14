import React,{ButtonHTMLAttributes} from "react";

interface ConvertButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading ? : boolean;
    from?:string;
    // to?:string;
}

export const ConvertButton: React.FC<ConvertButtonProps> = ({
  isLoading = false,
  from,
//   to,
  className = '',
  children,
  disabled,
  ...props
}) => {
  
  const buttonText = children 
    ? children 
    : from 
      ? `Convert ${from} to dec` 
      : 'Convert';

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`
        relative flex items-center justify-center gap-2 px-5 py-2.5 
        font-semibold text-sm text-white rounded-md transition-all duration-200
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600
        shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      
      {isLoading && (
        <svg 
          className="animate-spin h-4 w-4 text-white" 
          xmlns="http://w3.org" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Button Content */}
      <span>{isLoading ? 'Converting...' : buttonText}</span>
    </button>
  );
};

export default ConvertButton;
