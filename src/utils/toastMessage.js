import { toast } from "react-toastify";

export const successMessage = (message = "Success") => {
  toast.success(message);
};

export const errorMessage = (error) => {
  if (error instanceof Error) {
    if (error.response.data.message) {
      console.error("----------- Server Error", error.response.data.message);
      toast.error(error.response.data.message);
    } else {
      console.error("----------- Api Error", error.message);
      toast.error(error.message);
    }
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("Có lỗi xảy ra!");
  }
};
