import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const authorImg = document.createElement('img');
  const authorSpan = document.createElement('span');
  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');
  headlineDiv.textContent = article.headline;
  authorImg.src = article.authorPhoto;
  authorSpan.textContent = `By ${article.authorName}`;
  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  imgDiv.appendChild(authorImg);
  authorDiv.appendChild(authorSpan);
  cardDiv.addEventListener('click', () => {
    console.log(article.headline);
  })
  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5000/api/articles`)
    .then(resp => {
      const selectedItem = document.querySelector(selector);
      // console.log(resp.data.articles.javascript[0]); // returns an object with the article info
      const values = Object.values(resp.data.articles);
      // console.log(Object.values(resp.data.articles));
      for (let i = 0; i < values.length; i++) {
        const articleArray = values[i];
        // console.log(articleArray); // logs an array of article objects each loop
        // console.log(articleArray[0]); // logs the first article in each array of articles
        for (let j = 0; j < articleArray.length; j++) {
          const newArticle = Card(articleArray[j]);
          // console.log(articleArray[j]);
          // console.log(newArticle);
          // console.log(Card(articleArray[0]));
          // console.log(resp.data.articles[keys[i]][articleArray[j]]); // was using this for testing
          selectedItem.appendChild(newArticle);
        }
      }
    })
    .catch(err => {
      console.log(`The cardAppender error is: ${err}`);
    })
}

export { Card, cardAppender }
