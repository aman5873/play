"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

import AppModal from "@components/AppModal";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, registerUser, verifyOtpApi } from "@/lib/auth_ops";
import { maskEmail } from "./ForgotPasswordModal";

import InputComp from "../Form/InputComp";
import OtpInputComp from "../OtpInput";
import ResendOtp from "../Form/ResendOtp";
import TagSelect from "../common/TagSelect";
import Loading from "../common/Loading";

const initError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  tags: "",
};

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  open,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(initError);

  const formValidate = () => {
    const newError = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      tags: "",
    };

    // name required
    if (!name.trim()) newError.name = tAuth("validation.nameRequired");
    if (!tags.length) newError.tags = tAuth("validation.tagRequired");

    // email required & basic pattern check
    if (!email.trim()) {
      newError.email = tAuth("emailRequired");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newError.email = tAuth("validation.emailInvalid");
    }

    // password validations
    if (!password.trim()) {
      newError.password = tAuth("validation.passwordRequired");
    } else {
      const checks = [
        { regex: /[A-Z]/, msg: tAuth("validation.uppercaseLetter") },
        { regex: /[a-z]/, msg: tAuth("validation.lowercaseLetter") },
        { regex: /[0-9]/, msg: tAuth("validation.number") },
        {
          regex: /[!@#$%^&*(),.?":{}|<>]/,
          msg: tAuth("validation.specialChar"),
        },
        { regex: /.{8,}/, msg: tAuth("validation.minChars") },
      ];
      const failed = checks.filter((c) => !c.regex.test(password));
      if (failed.length)
        newError.password = failed.map((f) => f.msg).join(", ");
    }

    // confirm password
    if (password !== confirmPassword) {
      newError.confirmPassword = tAuth("validation.passwordMismatch");
    }

    setError(newError);

    // return true if no errors
    return !Object.values(newError).some((val) => val);
  };

  const clearCloseForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    onClose();
    setShowVerifyOtp(false);
    setError(initError);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | null,
    customMessage?: string
  ) => {
    e?.preventDefault();
    if (!formValidate()) return; // stop submission if validation fails

    const tagsIds = tags?.map((obj) => obj?.id);

    try {
      setLoading(true);
      const { success, message } = await registerUser({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        tags: tagsIds,
      });

      if (success) {
        handleApiMessage(customMessage ?? message, showAlert, "success"); //  show success
        setShowVerifyOtp(true);
      } else {
        handleApiMessage(message, showAlert, "error"); // show error
      }
    } catch (err) {
      console.error("Register failed", err);
      handleApiMessage(tAuth("registerFailed"), showAlert, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { success, message } = await verifyOtpApi(email, otp);

      if (success) {
        handleApiMessage(message, showAlert, "success");
        clearCloseForm();
        onSwitchToLogin();
      } else {
        handleApiMessage(message, showAlert, "error"); // show error
      }
    } catch (err) {
      console.error("OTP verification failed", err);
      showAlert(tAuth("otpFailed"), "error");
    }
  };

  return (
    <>
      <Loading loading={loading} />

      <AppModal
        showCloseIcon={false}
        closeOnBackdropClick={false}
        open={open}
        onClose={clearCloseForm}
        title={tAuth("register")}
        headerIcon={showVerifyOtp ? <Mail /> : null}
        description={
          showVerifyOtp
            ? tAuth("otpSentDetail", { email: maskEmail(email) })
            : ""
        }
        titleClass="font-rajdhani"
      >
        {!showVerifyOtp ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
              <InputComp
                variant="secondary"
                label={tAuth("username")}
                placeholder={tAuth("namePlaceholder")}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError({ ...error, name: "" });
                }}
                isRequired={true}
                isError={Boolean(error.name)}
                errorMessage={error.name}
              />

              <InputComp
                variant="secondary"
                label={tAuth("email")}
                placeholder={tAuth("emailPlaceholder")}
                type="email"
                isRequired={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError({ ...error, email: "" });
                }}
                isError={Boolean(error.email)}
                errorMessage={error.email}
              />

              <InputComp
                variant="secondary"
                label={tAuth("password")}
                placeholder={tAuth("passwordPlaceholder")}
                type="password"
                isRequired={true}
                showPasswordToggle
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError({ ...error, password: "" });
                }}
                isError={Boolean(error.password)}
                errorMessage={error.password}
              />

              <InputComp
                variant="secondary"
                label={tAuth("confirmPassword")}
                placeholder={tAuth("passwordPlaceholder")}
                type="password"
                isRequired={true}
                showPasswordToggle
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError({ ...error, confirmPassword: "" });
                }}
                isError={Boolean(error.confirmPassword)}
                errorMessage={error.confirmPassword}
              />

              <TagSelect
                tags={tags}
                setTags={(list) => {
                  setTags(list);
                  setError({ ...error, tags: "" });
                }}
                isError={Boolean(error.tags)}
                errorMessage={error.tags}
              />

              <button
                type="submit"
                className="cursor-pointer px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
              >
                {tAuth("register")}
              </button>
            </form>

            <div className="text-center">{tAuth("or")}</div>

            <div className="mt-2 text-center">
              <span className="text-[var(--textTwo)] font-md">
                {tAuth("haveAccount")}{" "}
                <span
                  className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
                  onClick={() => {
                    clearCloseForm();
                    onSwitchToLogin();
                  }}
                >
                  {tAuth("login")}
                </span>
              </span>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-3">
            <OtpInputComp length={6} value={otp} onChange={setOtp} />
            <button
              disabled={otp?.length !== 6}
              type="submit"
              className={`cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px]  font-bold font-rajdhani transition duration-200 ${
                otp?.length !== 6
                  ? "bg-[var(--bgThree)] text-[var(--textTwo)]"
                  : "bg-[var(--primary)] text-[var(--secondary)]"
              }`}
            >
              {tAuth("verifyOtp")}
            </button>
            <ResendOtp
              duration={50}
              onResend={() => {
                // Manually call handleSubmit without event
                handleSubmit(null, `${tAuth("resendOtpMessage")}`);
              }}
            />
          </form>
        )}
      </AppModal>
    </>
  );
}
