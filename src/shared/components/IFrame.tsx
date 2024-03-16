import React, { IframeHTMLAttributes } from "react";

interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  id: string;
  type: string;
  width: string;
  height: string;
  src: string;
  frameBorder: string;
  allow: string;
  allowFullScreen: boolean;
}

const Iframe: React.FC<IframeProps> = ({ ...props }) => {
  return <iframe {...props} />;
};

export default Iframe;
