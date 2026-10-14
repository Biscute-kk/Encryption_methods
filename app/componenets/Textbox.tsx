import React, { InputHTMLAttributes, forwardRef } from 'react';

// Extend standard HTML input attributes to accept all default properties
interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Use forwardRef to allow parent components to access the input DOM node
const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    // Generate a fallback ID if none is provided for accessibility
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          ref={ref}
          className={`
            px-3 py-2 
            border rounded-md 
            shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:text-gray-500
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />

        {error && (
          <span className="text-xs text-red-600">
            {error}
          </span>
        )}
      </div>
    );
  }
);

// Set display name for easier debugging in React DevTools
Textbox.displayName = 'Textbox';

export default Textbox;