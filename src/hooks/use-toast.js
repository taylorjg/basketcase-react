import { useContext } from "react";

import { ToastContext } from "./toast-provider";

export const useToast = () => useContext(ToastContext);
