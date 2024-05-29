import { AnchorHTMLAttributes } from "react";

const Link = ({children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a className="oc-ui-text-red-500 hover:oc-ui-cursor-pointer" href="" {...rest}>{children}</a>
  );
};

export default Link;