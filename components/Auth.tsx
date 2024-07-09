"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string[]>(new Array(6).fill(''));
  const passwordInputsRef = useRef<HTMLInputElement[]>(Array(6).fill(null));
  const [showPasswordInputs, setShowPasswordInputs] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (index: number, value: string) => {
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    if (value.length > 0 && index < 5) {
      passwordInputsRef.current[index + 1].focus();
    }
  };

  const handlePrevious = () => {
    setShowPasswordInputs(false);
  };

  const handleLogin = () => {
    const enteredPassword = password.join('');
    if (enteredPassword === '') {
      setErrorMessage('Please enter your password.');
      return;
    }
    // Add your login logic here
  };

  const handleNext = () => {
    setShowPasswordInputs(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col items-start w-full">
      {showPasswordInputs ? (
        <>
          <div className="flex items-center justify-between w-full mb-4">
            <h1 className='text-lg'>Password</h1>
            <button onClick={togglePasswordVisibility}>
              {passwordVisible ? 
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z"></path></svg>
              : 
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M 3.71875 2.28125 L 2.28125 3.71875 L 8.46875 9.875 L 21.4375 22.84375 L 28.28125 29.71875 L 29.71875 28.28125 L 23.375 21.9375 C 27.472656 19.851563 30.527344 16.910156 30.71875 16.71875 L 31.375 16.0625 L 30.75 15.34375 C 30.492188 15.042969 24.394531 8 16 8 C 14.007813 8 12.152344 8.417969 10.46875 9.03125 Z M 16 10 C 18.164063 10 20.160156 10.554688 21.9375 11.34375 C 22.613281 12.445313 23 13.699219 23 15 C 23 16.816406 22.300781 18.46875 21.15625 19.71875 L 18.3125 16.875 C 18.726563 16.363281 19 15.710938 19 15 C 19 13.347656 17.652344 12 16 12 C 15.289063 12 14.636719 12.273438 14.125 12.6875 L 12.0625 10.625 C 13.300781 10.253906 14.609375 10 16 10 Z M 6.625 10.875 C 3.386719 12.863281 1.394531 15.171875 1.25 15.34375 L 0.625 16.0625 L 1.28125 16.71875 C 1.566406 17.003906 8.097656 23.382813 15.0625 23.9375 L 15.125 23.9375 C 15.414063 23.960938 15.710938 24 16 24 C 16.289063 24 16.585938 23.960938 16.875 23.9375 L 16.9375 23.9375 C 17.734375 23.875 18.535156 23.730469 19.3125 23.53125 L 17.59375 21.8125 C 17.34375 21.871094 17.074219 21.910156 16.8125 21.9375 L 16.6875 21.96875 C 16.21875 22.007813 15.777344 22.007813 15.3125 21.96875 L 15.21875 21.9375 C 11.679688 21.539063 9 18.566406 9 15 C 9 14.464844 9.066406 13.949219 9.1875 13.4375 Z M 7.28125 12.84375 C 7.105469 13.546875 7 14.261719 7 15 C 7 16.613281 7.4375 18.121094 8.1875 19.4375 C 6.066406 18.175781 4.320313 16.75 3.40625 15.9375 C 4.152344 15.195313 5.507813 13.988281 7.28125 12.84375 Z M 24.71875 12.84375 C 26.492188 13.988281 27.816406 15.226563 28.5625 15.96875 C 27.648438 16.78125 25.933594 18.175781 23.8125 19.4375 C 24.5625 18.121094 25 16.613281 25 15 C 25 14.265625 24.890625 13.546875 24.71875 12.84375 Z M 16 14 C 16.550781 14 17 14.449219 17 15 C 17 15.164063 16.945313 15.300781 16.875 15.4375 L 15.5625 14.125 C 15.699219 14.054688 15.835938 14 16 14 Z"></path></svg>
              }
            </button>
          </div>
          <div className="flex justify-between w-full">
            {password.map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) passwordInputsRef.current[index] = el;
                }}
                type={passwordVisible ? "text" : "password"}
                value={password[index]}
                maxLength={1}
                onChange={(e) => handlePasswordChange(index, e.target.value)}
                className="w-10 h-10 mx-1 text-center border outline-none border-gray-300 rounded-md"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='mb-4 text-lg'>
            Phone number
          </h1>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            minLength={9}
            maxLength={10}
            onChange={handlePhoneChange}
            className="p-2 my-2 w-full border border-gray-300 outline-none rounded-md"
          />
        </>
      )}
      {!showPasswordInputs && phoneNumber.length >= 9 && phoneNumber.length <= 10 && (
        <button
          onClick={handleNext}
          className="p-2 mt-4 bg-main w-full text-white rounded-md"
        >
          Next
        </button>
      )}
      {showPasswordInputs && (
        <div className="flex items-center justify-between w-full mt-4">
          <button
            onClick={handlePrevious}
            className="p-2 w-full mr-2 bg-blue-400 text-white rounded-md"
          >
            Previous
          </button>
          <Link
            onClick={handleLogin}
            href="/admin"
            className="p-2 w-full ml-2 text-center bg-main text-white rounded-md"
          >
            Login
          </Link>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Auth;