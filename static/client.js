fetch('/questions')
    .then(res => res.json())
    .then(res => {
        const cards = document.querySelector('#questions');
        for (const question of res) {
            const card = document.createElement('div');
            card.className = 'card flex-shrink-0 mx-3 mb-3';
            card.dataset.questionId = question.id;
            const img = document.createElement('img');
            img.src = `${question.image}.jpg`;
            img.style.width = '25rem';
            img.className = 'rounded-top';
            const body = document.createElement('div');
            body.className = 'card-body';
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.innerText = question.question;
            body.append(title);
            for (const [i, answer] of question.answers.entries()) {
                console.log('123');
                const check = document.createElement('div');
                check.className = 'form-check';
                const label = document.createElement('label');
                label.className = 'form-check-label';
                const input = document.createElement('input');
                input.type = 'radio';
                input.className = 'form-check-input';
                input.name = question.id;
                input.value = i;
                const text = document.createTextNode(answer);
                label.append(input, text);
                check.append(label);
                body.append(check);
            }
            card.append(img, body);
            cards.append(card);
        }
    });