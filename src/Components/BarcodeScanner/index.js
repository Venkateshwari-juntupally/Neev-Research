// BarcodeScanner.js

import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import './index.css'

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState('');

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['ean_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      setScannedCode(code);
      // Send scannedCode to your backend for further processing
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <div id="scanner-container"></div>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
};

export default BarcodeScanner;
