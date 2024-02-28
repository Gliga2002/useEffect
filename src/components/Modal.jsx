import { useImperativeHandle } from "react";
import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";

const PlaceModal = forwardRef(function PlaceModal({ children, onClose }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: function () {
        dialog.current.showModal();
      },
      close: function() {
        dialog.current.close();
      }
    };
  });
  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default PlaceModal;
