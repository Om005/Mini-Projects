import os
import random
import speech_recognition as sr
import win32com.client
import webbrowser
import time
import google.generativeai as genai
import datetime

os.environ["GEMINI_API_KEY"] = "YOUR_GEMINI_API_KEY"
def ai(prompt):
    # Access the API key from the environment variable
    text = f"Response for the Prompt: {prompt} \n***********************************\n\n"
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise KeyError("API key not found in environment variables")

    genai.configure(api_key=api_key)


    # Create the model
    # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
    ]

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash-latest",
        # model_name="gemini-1.5-pro-latest",
        safety_settings=safety_settings,
        generation_config=generation_config,
    )

    chat_session = model.start_chat(
        history=[]
    )

    response = chat_session.send_message(prompt)

    print(response.text)
    text += response.text
    if not os.path.exists("Gemini"):
        os.mkdir("Gemini")
    # return response.text
    with open(f"Gemini/{''.join(prompt.split('intelligence')[1:])}.txt", "w") as f:
        f.write(text)

def chat(prompt):
    # Access the API key from the environment variable
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise KeyError("API key not found in environment variables")

    genai.configure(api_key=api_key)

    # Create the model
    # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
    ]

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash-latest",
        safety_settings=safety_settings,
        generation_config=generation_config,
    )

    chat_session = model.start_chat(
        history=[]
    )

    response = chat_session.send_message(f"Give casual answer as Jarvis(do not use emojis)\n\n Om: {prompt}\n Jarvis:")

    # print(response.text)
    return response.text


speaker = win32com.client.Dispatch("SAPI.SpVoice")

def jprint(text):
    print(f"Jarvis: {text}")
def uprint(text):
    print(f"You: {text}")

def say(text):
    speaker.Speak(text)
    jprint(text)

def TakeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        # r.pause_threshold = 1
        jprint("Listening...")
        audio = r.listen(source)
    try:
        jprint("Recongnizing...")
        query = r.recognize_google(audio, language = "e-in")
        uprint(query)
        return query
    except Exception as e:
        novoice = ["Sorry, I didn't catch that. Please speak clearly.", "I'm having trouble understanding. Could you repeat that more clearly?", "Error during taking command, sorry for inconvenience", "Error: Unable to recognize speech. Please try again.", "I didn't get that. Can you please speak louder?", "It seems there was an issue with the audio. Please check your microphone and try again.", "Sorry, I couldn't understand what you said. Please speak again", "Error: Speech recognition failed. Please check your microphone and try again.", "I didn't catch that. Could you try repeating what you said?", "Error: Unable to process audio. Please ensure your microphone is connected properly.", "I'm sorry, but I couldn't understand your command. Please try again."]
        no_msg = random.randint(0, len(novoice)-1)
        say(novoice[no_msg])
        return TakeCommand()

def play_random_song(music_files):
    num = random.randint(0, len(music_files)-1)
    os.startfile(f"C:/Users/chavd/Music/{music_files[num]}")
    time.sleep(3)

def play_song_by_key(music_files, mname):
    for m in music_files:
        if mname.lower() in m.lower():
            os.startfile(f"C:/Users/chavd/Music/{m}")
            time.sleep(3)
            return 1
            break
    else:
        say("Song not found sir.")
        return 0


if __name__ == "__main__":
    # say("hello")
    i = 0
    while True:
        # jq = ["What would you like to do next?", "How can I assist you further?", "What's the next step for you?", "What's your next command?", "How can I help you proceed?", "What's the next task?"]
        # if(i>0):
        #     jqnum = random.randint(0, len(jq)-1)
        #     say(jq[jqnum])
        query = TakeCommand()
        # query = input("Enter:")
        i = i+1

        # Website section
        all_sites = {
            "youtube": "https://www.youtube.com",
            "whatsapp": "https://web.whatsapp.com",
            "gith": "https://github.com",
            "chess.com": "https://www.chess.com/home",
            "lichess": "https://lichess.org",
            "stackoverflow": "https://stackoverflow.com",
            "chatgpt": "https://chatgpt.com",
            "copilot": "https://copilot.microsoft.com",
            "ecampus daiict": "https://ecampus.daiict.ac.in/",
            "ecampus": "https://ecampus.daiict.ac.in/",
            "translate": "https://translate.google.co.in/",
            "accounts": "https://myaccount.google.com/?utm_source=OGB&utm_medium=app",
            "map": "https://www.google.com/maps?authuser=0",
            "contacts": "https://contacts.google.com/",
            "google drive": "https://drive.google.com/drive/u/0/home",
            "javatpoint": "https://www.javatpoint.com/",
            "leetcode": "https://leetcode.com/",
            "codeforces": "https://codeforces.com/",
            "google": "https://www.google.com"
            # You can add more sites
        }

        for key in all_sites:
            if (key in query.lower()):
                webbrowser.open(all_sites[key])
                say(f"Opening {key.title()} sir...")

        #Music section
        no_music_lst = ["Could you give me another song name?", "Do you have another song in mind?", "Can you suggest another song?", "Would you like to hear another song?", "Is there another song you'd like to listen to?""Could you name another song?", "Do you have a different song in mind?", "Can you recommend another song?", "Would you like to choose a different song?", "Is there another song you'd prefer?"]
        if ("music" in query.lower()) or ("song" in query.lower()):
            music_files = os.listdir("C:/Users/chavd/Music")
            if("music" in query.lower()):
                say("Which music sir?")
            else:
                say("Which song sir?")
            mname = TakeCommand()
            if ("random" in mname.lower()) or ("any" in mname.lower()):
                play_random_song(music_files)
            else:
                tempmname = mname
                while play_song_by_key(music_files, tempmname) == 0:
                    say(random.choice(no_music_lst))
                    tempmname = TakeCommand()
                    if ("random" in tempmname.lower()) or ("any" in tempmname.lower()):
                        play_random_song(music_files)
                        break
            while True:
                say("Is this ok sir?")
                ok_check = TakeCommand()
                if("ok" in ok_check.lower()) or ("correct" in ok_check.lower()) or ("right" in ok_check.lower()):
                    break
                if ("random" in ok_check.lower()) or ("any" in ok_check.lower()):
                    play_random_song(music_files)
                else:
                    while play_song_by_key(music_files, ok_check)==0:
                        say(random.choice(no_music_lst))
                        ok_check = TakeCommand()
                        if ("random" in ok_check.lower()) or ("any" in ok_check.lower()):
                            play_random_song(music_files)
                            break

        # Date and time section
        if "time" in query.lower() and "date" in query.lower():
            say("Current date and time is {}".format(datetime.datetime.now()))
        elif "time" in query.lower():
            say("Current time is {}".format(datetime.datetime.now().time()))
        elif "date" in query.lower():
            say("Today's date is {}".format(datetime.datetime.now().date()))

        # Applications section

        #openAi
        if "using artificial intelligence" in query.lower():
            ai(prompt=query)
        else:
            say(chat(query))

