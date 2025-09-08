"use client";

import { useEffect, useState } from "react";

interface ResendOtpProps {
  duration?: number; // default 30 sec
  onResend: () => void;
}

export default function ResendOtp({ duration = 30, onResend }: ResendOtpProps) {
  const [timer, setTimer] = useState(duration);

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
          Didn’t receive the code?{" "}
          <span className="font-semibold">Resend in {timer}s</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-[var(--primary)] font-semibold hover:underline"
        >
          Didn’t receive the code? Resend
        </button>
      )}
    </div>
  );
}
