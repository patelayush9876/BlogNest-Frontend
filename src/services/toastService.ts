import { toast, type ToastOptions } from "react-toastify";
import toastMessages from "../constants/toastMessages.json";
import type { ToastMessages } from "../interfaces/toastMessages";


const typedToastMessages = toastMessages as ToastMessages;

export type ToastType = "success" | "warn" | "error";

export function showToast(
  messageKeyOrText: string,
  type: ToastType = "error",
  options: ToastOptions = {}
) {
  let title = "";
  let message = messageKeyOrText;

  if (typedToastMessages[messageKeyOrText]) {
    const msgObj = typedToastMessages[messageKeyOrText];
    title = msgObj.title;
    message = msgObj.message;
  }

  const formattedMessage = title ? `${title}: ${message}` : message;

  switch (type) {
    case "success":
      toast.success(formattedMessage, options);
      break;
    case "warn":
      toast.warning(formattedMessage, options);
      break;
    case "error":
    default:
      toast.error(formattedMessage, options);
      break;
  }
}
