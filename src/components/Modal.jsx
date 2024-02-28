import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

const PlaceModal = function PlaceModal({ children, onClose, isOpenModal }) {
  const dialog = useRef();

  useEffect(() => {
    if (isOpenModal) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpenModal]);

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      {isOpenModal ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
};

export default PlaceModal;
