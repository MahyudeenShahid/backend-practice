const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat')

app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs')

main()
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const chats = [
    { from: "usman", to: "bilal", message: "hello kia hal ha", createdAt: new Date() },
    { from: "bilal", to: "usman", message: "mein theek hoon", createdAt: new Date() },
    { from: "faisal", to: "hamza", message: "kya kar rahe ho?", createdAt: new Date() },
    { from: "hamza", to: "faisal", message: "kuch nahi, tum sunao", createdAt: new Date() },
    { from: "sara", to: "ammar", message: "assignment ho gayi?", createdAt: new Date() },
    { from: "ammar", to: "sara", message: "haan ho gayi", createdAt: new Date() },
    { from: "jutt", to: "sana", message: "kya plan hai?", createdAt: new Date() },
    { from: "sana", to: "jutt", message: "kuch khas nahi", createdAt: new Date() },
    { from: "ahmed", to: "farhan", message: "movie dekhi?", createdAt: new Date() },
    { from: "farhan", to: "ahmed", message: "abhi nahi dekhi", createdAt: new Date() },
    { from: "ali", to: "hassan", message: "kab mil rahe ho?", createdAt: new Date() },
    { from: "hassan", to: "ali", message: "kal milte hain", createdAt: new Date() },
    { from: "sadia", to: "ahmed", message: "notes bhej do", createdAt: new Date() },
    { from: "ahmed", to: "sadia", message: "bhej diye hain", createdAt: new Date() },
    { from: "ammar", to: "sana", message: "kya khana hai?", createdAt: new Date() }
];

chat.insertMany(chats).then((res) => console.log("Chats inserted successfully", res))
.catch((err) => console.error("Error inserting chats", err));

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});