import { ButtonHTMLAttributes } from "react";

const Button = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="oc-ui-bg-indigo-500 oc-ui-text-white oc-ui-rounded-md oc-ui-p-2"
      type="button"
      { ...rest }
      >{ children }
    </button>
  );
};

export default Button;