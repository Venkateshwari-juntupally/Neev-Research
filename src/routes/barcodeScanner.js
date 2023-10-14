const express = require('express');
const router = express.Router();
const Quagga = require('quagga'); // Import the Quagga barcode scanning library

// Initialize Quagga
Quagga.init({
  inputStream: {
    name: 'Live',
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
});

// Start barcode scanning
Quagga.start();

// Route for handling detected barcode
router.post('/scan', (req, res) => {
  // Define a callback function to handle scanned barcodes
  Quagga.onDetected((result) => {
    const code = result.codeResult.code;
    // Send the scanned barcode code to the client or process it as needed
    res.json({ code });
  });
});

module.exports = router;
