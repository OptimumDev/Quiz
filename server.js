const express = require("express");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.static("static"));

class QuestionData {
    constructor(image, question, answers, right) {
        this.image = image;
        this.question = question;
        this.answers = answers;
        if (right >= answers.length)
            throw "There are not enough answers"
        this.right = right;
    }
}

const questions = [
    new QuestionData('tiger', 'Какой тигр самый крупный?', ['Амурский', 'Малазийский', 'Индийский', 'Суматранский'], 1),
    new QuestionData('coala', 'Где живет коала?', ['В горной пещере', 'В бамбуковом лесу', 'В депрессии', 'В тропическом лесу'], 3)
]





app.get("/questions", (req, res) => {
    res.send(questions)
});



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
