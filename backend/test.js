import 'dotenv/config';
const API_KEY = process.env.GOOGLE_API_KEY;

async function check() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    console.log("Available models for your key:");
    data.models?.forEach(m => console.log(m.name));
}
check();