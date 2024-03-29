const express = require("express");
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.static("static"));

app.use(bodyParser.json());

class QuestionData {
    constructor(image, question, answers, right) {
        this.id = uuid();
        this.image = image;
        this.question = question;
        this.answers = answers;
        if (right >= answers.length)
            throw "There are not enough answers";
        this.right = right;
    }
}

const questions = [
    new QuestionData('tiger', 'Какой тигр самый крупный?', ['Амурский', 'Малазийский', 'Индийский', 'Суматранский'], 1),
    new QuestionData('coala', 'Где живет коала?', ['В горной пещере', 'В бамбуковом лесу', 'В депрессии', 'В тропическом лесу'], 3),
    new QuestionData('zebra', 'Какого цвета хвост у зебры?', ['Белый', 'Черный', 'Серый', 'Коричневый'], 1)
].reduce((map, x) => {
    map.set(x.id, x);
    return map;
}, new Map())
console.log(questions.keys())

app.get("/questions", (req, res) => {
    res.json([...questions.values()].map(q => {
        const { right, ...qq } = q;
        return qq;
    }))
});

app.post("/answers", (req, res) => {
    const body = [...req.body.answers];
    console.log(body);
    let rightCount = 0;
    for (const answer of body) {
        if (questions.has(answer.id))
            rightCount += questions.get(answer.id) === answer.guess
        else
            res.sendStatus(404);
        res.json(rightCount);
    }
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
