import { atom } from "recoil";

export const mobileNumbState = atom({
  key: "mobileNumbState",
  default: {
    isLoading: false,
    error: false,
    errorMsg: "",
    data: {},
  },
});
export const otpVerifyState = atom({
  key: "otpVerifyState",
  default: {
    isLoading: false,
    error: false,
    errorMsg: "",
    data: {},
  },
});

export const formState = atom({
  key: "formState",
  default: {
    isLoading: false,
    error: false,
    errorMsg: "",
    data: {},
  },
});

export const authToken = atom({
  key: "authToken",
  default: "",
});
