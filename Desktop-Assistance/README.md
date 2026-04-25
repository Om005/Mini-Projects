# Jarvis Voice Assistant

This project is a voice assistant named Jarvis that uses speech recognition, web automation, and AI responses to interact with the user. Jarvis can open websites, play music, respond to queries using the Google Gemini AI, and provide the current date and time.

## Features

- **Speech Recognition**: Recognizes and processes voice commands.
- **Web Automation**: Opens specified websites based on voice commands.
- **Music Playback**: Plays music from a specified directory.
- **AI Responses**: Uses Google Gemini AI for generating responses to user queries.
- **Date and Time**: Provides the current date and time on request.
- **Casual talk**: Make a casual talk with it

## Prerequisites

- Python 3.7+
- `pip` for installing packages
- Google Gemini API key

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/jarvis-voice-assistant.git
    cd jarvis-voice-assistant
    ```

2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

3. Write your gemini api key here:
    ```bash
    os.environ["GEMINI_API_KEY"] = "YOUR_GEMINI_API_KEY"
    ```

## Usage

Run the script:
```bash
python jarvis.py
