# Prank Hack Website

This is a prank website designed to simulate a hacking scenario, making it appear as if the user's system is being compromised. It features a series of fake status messages, sounds, and an alarming malware download link.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [Customization](#customization)
- [Disclaimer](#disclaimer)

## Installation

1. Clone the repository or download the ZIP file.
2. Ensure all files (`index.html`, `script.js`, `style.css`, `Malware.txt`, and `voice.mp3`) are in the same directory.

## Usage

1. Open `index.html` in a web browser.
2. The script will automatically start running, displaying fake hacking messages.
3. At step 5, a fake malware download link will be triggered, and a sound will play.

## Files

- `index.html`: The main HTML file for the website.
- `script.js`: Contains the JavaScript logic for displaying messages and triggering events.
- `style.css`: Styles for the website to give it a "hacker" look.
- `Malware.txt`: A harmless text file intended to simulate malware.
- `voice.mp3`: Sound file played during the prank.

## Customization

You can customize the prank by editing the messages in `script.js` or changing the styles in `style.css`. 

### Change Messages

Edit the `proce` object in `script.js` to change the text of each step:

```javascript
let proce = {
    0: "Initializing Your system to be processed...",
    1: "Reading Your System Files...",
    2: "Password Files Detected...",
    // Add more messages as needed
}
