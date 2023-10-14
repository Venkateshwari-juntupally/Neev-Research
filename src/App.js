// App.js

import React, { useState } from 'react';
import CandidateForm from './Components/CandidateForm/index.js';
import CandidateList from './Components/CandidateList/index.js';
import BarcodeScanner from './Components/BarcodeScanner/index.js';

function App() {
  const [scannedCode, setScannedCode] = useState('');

  return (
    <div className="App">
      <h1>Barcode Scanning and Candidate Data Storage</h1>

      <div className="container">
        <div className="left-panel">
          <CandidateForm />
          <CandidateList />
        </div>

        <div className="right-panel">
          <h2>Barcode Scanner</h2>
          <BarcodeScanner onBarcodeScanned={setScannedCode} />
          {scannedCode && <p>Scanned Code: {scannedCode}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;

