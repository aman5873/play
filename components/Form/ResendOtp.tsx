"use client";

import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

interface ResendOtpProps {
  duration?: number; // default 30 sec
  onResend: () => void;
}

export default function ResendOtp({ duration = 30, onResend }: ResendOtpProps) {
  const [timer, setTimer] = useState(duration);
  const { t: tAuth } = useTranslation("auth");

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    onResend();
    setTimer(duration); // reset timer
  };

  return (
    <div className="mt-3 text-sm text-center">
      {timer > 0 ? (
        <span className="text-[var(--textTwo)]">
          <Trans
            i18nKey="resendOtpTextOne"
            ns="auth"
            values={{ time: timer }}
            components={{
              strong: <span className="font-semibold text-[var(--primary)]" />,
              wrapper: <span className="text-[var(--textTwo)]" />,
            }}
          />
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-[var(--primary)] font-semibold hover:underline"
        >
          {tAuth("resend")}
        </button>
      )}
    </div>
  );
}
