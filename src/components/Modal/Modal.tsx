import CircleContext from "@/controller/CircleController";
import { useContext } from "react";
import { createPortal } from "react-dom";
import UpdateAbout from "./UpdateAbout";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import CreateFriendRequest from "./CreateFriendRequest";

function Modal() {
  const { state } = useContext(CircleContext);
  let ModalComponent = null;

  if (state.modalName === "UPDATE_ABOUT") {
    ModalComponent = UpdateAbout;
  } else if (state.modalName === "CHANGE_PASSWORD") {
    ModalComponent = ChangePassword;
  } else if (state.modalName === "DELETE_ACCOUNT") {
    ModalComponent = DeleteAccount;
  } else if (state.modalName === "ADD_FRIEND") {
    ModalComponent = CreateFriendRequest;
  }

  if (!ModalComponent) {
    return;
  }

  return createPortal(
    <div className="fixed z-50 top-0 left-0 w-full h-[100vh] bg-black/10 backdrop-blur-lg flex items-center justify-center ">
      <ModalComponent />
    </div>,
    document.body
  );
}

export default Modal;
