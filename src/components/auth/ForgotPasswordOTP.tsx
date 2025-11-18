import React, { useState, useEffect } from 'react';

interface ForgotPasswordOTPProps {
  onNext?: () => void;
  onBack?: () => void;
}

const ForgotPasswordOTP: React.FC<ForgotPasswordOTPProps> = ({ onNext, onBack }) => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Verify OTP</h1>
        <p className="text-gray-600 text-center mb-8">Enter the OTP sent to your email/phone</p>
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="p-4 border border-gray-300 rounded-xl text-base text-center tracking-widest"
            maxLength={6}
          />
          <button type="submit" onClick={onNext} className="bg-blue-500 text-white p-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors">
            Next
          </button>
        </form>
        
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-600">
            {canResend ? (
              <button onClick={handleResend} className="text-blue-500">Resend OTP</button>
            ) : (
              `Resend OTP in ${timer}s`
            )}
          </p>
          <button onClick={onBack} className="text-blue-500">Back</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;