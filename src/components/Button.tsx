import React from 'react';

interface ButtonProp {
  buttonText: string;
  className: string;
  handleClick: () => void
}

const Button = ({ buttonText, className, handleClick }: ButtonProp) => {
  return (
    <>
      <button type="submit"
        onClick={handleClick}
        className={`w-full text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center ${className}`}
      >{buttonText}
      </button >
    </>
  )
}

export default Button