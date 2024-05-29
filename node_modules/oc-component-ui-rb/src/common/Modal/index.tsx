import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        oc-ui-fixed oc-ui-inset-0 oc-ui-flex oc-ui-justify-center oc-ui-items-center oc-ui-transition-colors
        ${open ? "oc-ui-visible oc-ui-bg-black/20" : "oc-ui-invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        oc-ui-bg-white oc-ui-rounded-xl oc-ui-shadow oc-ui-p-6 oc-ui-transition-all
          ${open ? "oc-ui-scale-100 oc-ui-opacity-100" : "oc-ui-scale-125 oc-ui-opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="oc-ui-absolute oc-ui-top-2 oc-ui-right-2 oc-ui-p-1 oc-ui-rounded-lg oc-ui-text-gray-400 oc-ui-bg-white hover:oc-ui-bg-gray-50 hover:oc-ui-text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
};

export default Modal;