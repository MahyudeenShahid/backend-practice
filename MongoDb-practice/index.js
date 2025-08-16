const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

main()
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


 
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/chats', async (req, res) => {
    try {
        const chats = await chat.find();
        res.render('index', { chats });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/chats/new', (req, res) => {
    res.render('new');
});

app.post('/chats', async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const createdAt = new Date();
        if (!from || !to || !message) {
            return res.status(400).send('All fields are required');
        }
        const newChat = new chat({ from, to, message, createdAt });
        await newChat.save();
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/chats/:id/edit', async (req, res) => {
    try {
      const {id} = req.params;
        const chats = await chat.findById(id);
        if (!chats) {
            return res.status(404).send('Chat not found');
        }
        res.render('edit', { chat: chats });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/chats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to, message } = req.body;
        const updatedAt = new Date();

        const updatedChat = await chat.findByIdAndUpdate(id, { from, to, message, updatedAt }, { new: true });
        if (!updatedChat) {
            return res.status(404).send('Chat not found');
        }
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/chats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChat = await chat.findByIdAndDelete(id);
        if (!deletedChat) {
            return res.status(404).send('Chat not found');
        }
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});
