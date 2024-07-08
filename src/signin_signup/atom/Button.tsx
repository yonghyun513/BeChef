import React from "react";

type ButtonProps = {
  onClick: (e: React.FormEvent) => Promise<void>;
  text: string;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {text}
    </button>
  );
};

export default Button;
