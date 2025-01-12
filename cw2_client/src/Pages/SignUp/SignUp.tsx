import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner, Html5QrcodeResult } from 'html5-qrcode';
import './SignUp.css';

import { addUser } from '../../Utils/Requests';

interface Inputs {
  email: string;
  password: string;
  fullName: string;
  dob: Date | null;
  bioID: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    email: '',
    password: '',
    fullName: '',
    dob: null,
    bioID: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [scanResult, setScanResult] = useState<string>('');
  const [isQRCodeActive, setIsQRCodeActive] = useState<boolean>(false);
  const readerRef = useRef<HTMLDivElement | null>(null);
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Initialize QR Code scanner
  useEffect(() => {
    function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
      // Handle the scanned code
      setScanResult(decodedText);
      setInputs((prev) => ({
        ...prev,
        bioID: decodedText, // Set the bioID from the QR code result
      }));
      html5QrcodeScannerRef.current?.clear(); // Use the scanner instance from useRef
    }

    function onScanFailure(error: any) {
      console.warn(`Code scan error = ${error}`);
    }

    if (isQRCodeActive && readerRef.current) {
      html5QrcodeScannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      html5QrcodeScannerRef.current.render(onScanSuccess, onScanFailure);
    }

    // Cleanup on unmount or when toggling QR code scanner
    return () => {
      html5QrcodeScannerRef.current?.clear(); // Clear the scanner if it exists
    };
  }, [isQRCodeActive]); // Re-run when the scanner is toggled

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === 'date' ? new Date(value) : value,
    }));
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    if (inputs.password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (inputs.dob != null) {
      const res = await addUser(inputs);
      setPasswordError('');
      console.log(res.data)
      res.status === 200 ? navigate('/login') : navigate('/register');
    }
  };

  // Validate password match
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);

    if (inputs.password !== value) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const toggleQRCode = () => {
    setIsQRCodeActive(!isQRCodeActive);
    if (isQRCodeActive) {
      setInputs((prev) => ({ ...prev, bioID: '' })); // Clear bioID when switching back to manual entry
    }
  };

  return (
    <div className="SignUp">
      <div className="wrapper">
        <h2>Registration</h2>
        <form onSubmit={registerUser}>
          <div className="label">
            Full name:
          </div>
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={inputs.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            Email:
          </div>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="johndoe@gmail.com"
              value={inputs.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            Password:
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Must be between 6 and 20 characters"
              value={inputs.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label">
            Confirm Password:
          </div>
          <div className={`input-box${passwordError ? '-error' : ''}`}>
            <input
              type="password"
              placeholder="Passwords must match"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className="label">
            Date of birth:
          </div>
          <div className="input-box">
            <input
              type="date"
              name="dob"
              placeholder="Date of birth"
              onChange={handleChange}
              required
            />
          </div>

          {/* Bio ID input */}
          <div className="label">
            Bio ID:
          </div>
          <div className="input-box">
            <input
              type="text"
              id="bioID"
              name="bioID"
              placeholder={isQRCodeActive ? 'Scanning QR code...' : 'A0BC1DE2FG'}
              value={inputs.bioID || scanResult}
              onChange={handleChange}
              disabled={isQRCodeActive} // Disable input when scanning
              required
            />
            <span
              className={`icon ${isQRCodeActive ? 'active' : ''}`}
              onClick={toggleQRCode}
              title={isQRCodeActive ? 'Switch to Manual Entry' : 'Use QR Code for Bio ID'}
            >
              <img src='/icons8-camera-50.png' height={20} alt="QR code icon"/> <p>Scan QR</p>
          </span>
          </div>
          {/* <span
              className={`icon ${isQRCodeActive ? 'active' : ''}`}
              onClick={toggleQRCode}
              title={isQRCodeActive ? 'Switch to Manual Entry' : 'Use QR Code for Bio ID'}
            >
              <img src='/icons8-camera-50.png' height={20} alt="QR code icon"/> Scan a QR code.
          </span> */}

          {/* QR Code Scanner */}
          {isQRCodeActive && (
            <div id="reader" ref={readerRef} className="reader"></div>
          )}

          <div className="input-box button">
            <input type="Submit" value="Register Now" />
          </div>
          <div className="text">
            <h3>
              Already have an account? <a href="/login">Login now</a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
