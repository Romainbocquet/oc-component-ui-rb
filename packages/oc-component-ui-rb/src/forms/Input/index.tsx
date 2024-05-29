import { InputHTMLAttributes } from "react";

const Input = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input className="oc-ui-border-[1px] oc-ui-border-indigo-500 oc-ui-p-2 oc-ui-rounded-md" {...rest} />
  );
};

export default Input;