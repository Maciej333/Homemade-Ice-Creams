// to generate random reviews i used quotes API only for education purpose

let reviewText = document.querySelector("#review");
let reviewPersonName = document.querySelector("#person-name");
let reviewDots = document.querySelectorAll("#review-dots i");

const arrayOfReviews = [];
getNewReview();

for (let dot of reviewDots) {
    dot.addEventListener('click', changeReview);
}

function changeReview() {
    for (let dot of reviewDots) {
        dot.classList.replace("fas", "far");
    }
    this.classList.replace("far", "fas");
    fillReview(this.classList.item(0));
}

function getNewReview() {
    fetch("https://type.fit/api/quotes")
        .then(response => {
            let data = response.json();
            data
                .then(quotes => {
                    const numberOfQuotes = quotes.length;
                    for (let i = 1; i < 6; i++) {
                        const randomArrayIndex = Math.floor(Math.random() * numberOfQuotes);
                        arrayOfReviews.push(quotes[randomArrayIndex]);
                    }
                    fillReview(1);
                })
        })
        .catch(err => {
            console.error("fetch error ###", err);
        });
}

function fillReview(number) {
    if (Number.isInteger(+number)) {
        reviewText.textContent = arrayOfReviews[number - 1].text;
        let author = arrayOfReviews[number - 1].author || 'John Doe';
        reviewPersonName.textContent = author;
    }
}

// 2-nd API for fetching reviews if a upper API won't work

// function getNewReview() {
//     fetch("https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
//         .then(response => {
//             let data = response.json();
//             data
//                 .then(quote => {
//                     const arrayOfQuotes = quote.quotes;
//                     const numberOfQuotes = arrayOfQuotes.length;
//                     for (let i = 1; i < 6; i++) {
//                         const randomArrayIndex = Math.floor(Math.random() * numberOfQuotes);
//                         arrayOfReviews.push(arrayOfQuotes[randomArrayIndex]);
//                     }
//                     fillReview(1);
//                 })
//         })
//         .catch(err => {
//             console.error("fetch error ###", err);
//         });
// }

// function fillReview(number) {
//     if (Number.isInteger(+number)) {
//         reviewText.textContent = arrayOfReviews[number - 1].quote;
//         reviewPersonName.textContent = arrayOfReviews[number - 1].author;
//     }
// }