import fs from "node:fs/promises";




const API_BASE_URL = "https://api.sws.speechify.com";


const API_KEY = process.env.SPEECHIFY_API_KEY;



const VOICE_ID = process.env.SPEECHIFY_VOICE_ID;


async function getAudio(text) {
 const res = await fetch(`${API_BASE_URL}/v1/audio/speech`, {
   method: "POST",
   body: JSON.stringify({
     input: `<speak>${text}</speak>`,
     voice_id: VOICE_ID,
     audio_format: "mp3",
   }),
   headers: {
     Authorization: `Bearer ${API_KEY}`,
     "content-type": "application/json",
   },
 });


 if (!res.ok) {
   throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
 }
 const responseData = await res.json();


 const decodedAudioData = Buffer.from(responseData.audio_data, "base64");


 return decodedAudioData;
}


async function main() {
 const audio = await getAudio(
   "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth."
 );
 await fs.writeFile("./speech.mp3", audio);
}


main();
