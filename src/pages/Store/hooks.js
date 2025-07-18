import { API_ENDPOINTS } from "../../constant";
import { authToken, formState, mobileNumbState, otpVerifyState } from "./state";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useNetwork } from "../../network";
import { saveAuthToken } from "../../utils";

export const useAuth = () => {
  const { post } = useNetwork();
  const navigate = useNavigate();

  const setAuthToken = useSetRecoilState(authToken);
  const setOtpVerifyState = useSetRecoilState(otpVerifyState);
  const setMobileNumbState = useSetRecoilState(mobileNumbState);
  const setformState = useSetRecoilState(formState);

  const sendOtp = useCallback(
    (isMobile, phoneNumber, countrycode) => {
      setMobileNumbState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });
      post(API_ENDPOINTS.SEND_OTP, {
        countrycode: countrycode,
        phoneNumber: phoneNumber,
        isMobile: isMobile,
      })
        .then((res) => {
          if (res.success) {
            setMobileNumbState((prev) => {
              return {
                ...prev,
                data: {
                  ...prev.data,
                  countrycode: countrycode,
                  phoneNumber: phoneNumber,
                },
                isLoading: false,
              };
            });
            navigate("/delete/otp-verification");
          } else {
            setMobileNumbState((prev) => {
              return {
                ...prev,
                data: {
                  ...prev.data,
                },
                error: true,
                isLoading: false,
              };
            });
          }
        })
        .catch((err) => {
          setMobileNumbState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
              },
              error: true,
              isLoading: false,
            };
          });
        })
        .finally(() => {
          setMobileNumbState((prev) => {
            return {
              ...prev,
              isLoading: false,
            };
          });
        });
    },
    [post]
  );

  const verifyOtp = useCallback(
    (
      countrycode,
      isMobile,
      phoneNumber,
      Otp
    ) => {
      setOtpVerifyState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });
      console.log("payload ==>", {
        countrycode: countrycode,
        phoneNumber: phoneNumber,
        isMobile: isMobile,
        Otp: Otp,
      })
      post(API_ENDPOINTS.VERIFY_OTP, {
        CountryCode: countrycode,
        phoneNumber: phoneNumber,
        isMobile: isMobile,
        Otp: Otp,
      })
        .then((res) => {
          console.log("res ===err>>>", res)
          if (res.success) {
            setOtpVerifyState((prev) => {
              return {
                ...prev,
                data: {
                  ...res,
                },
                isLoading: false,
              };
            });
            setAuthToken(res.authToken)
            saveAuthToken(res.authToken);
            navigate("/delete/confirm-deletion");
          } else {
            setOtpVerifyState((prev) => {
              return {
                ...prev,
                data: {
                  ...res,
                },
                error: true,
                errorMsg: res.message,
                isLoading: false,
              };
            });
          }
        })
        .catch((err) => {
          setOtpVerifyState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
              },
              error: true,
              errorMsg: "Something went wrong !",
              isLoading: false,
            };
          });
        })
        .finally(() => {
          setOtpVerifyState((prev) => {
            return {
              ...prev,
              isLoading: false,
            };
          });
        });
    },
    [post]
  );

  const deleteUser = useCallback(
    (formData) => {
      setformState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });
      post(API_ENDPOINTS.DELETE_USER, formData)
        .then((res) => {
          console.log("Response 3 -> ", res);
          if (res.success) {
            setformState((prev) => {
              return {
                ...prev,
                data: {
                  ...res,
                },
                isLoading: false,
              };
            });
            // Simulate account deletion process
            setTimeout(() => {
              navigate("/delete/deletion-success");
            }, 2000);
          } else {
            setformState((prev) => {
              return {
                ...prev,
                data: {
                  ...res,
                },
                error: true,
                errorMsg: res.message,
                isLoading: false,
              };
            });
          }
        })
        .catch((err) => {
          setformState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
              },
              error: true,
              errorMsg: "Something went wrong !",
              isLoading: false,
            };
          });
        })
        .finally(() => {
          setformState((prev) => {
            return {
              ...prev,
              isLoading: false,
            };
          });
        });
    },
    [post]
  );

  return {
    sendOtp,
    verifyOtp,
    deleteUser,
  };
};
