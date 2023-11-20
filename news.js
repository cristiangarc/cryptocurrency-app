const urlNews = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
const maxNumOfArticles = 3;
let randomInt50 = Math.floor(Math.random() * 50);

const displayArticles = (dataArr, numOfArticles = 0) => {
    for (let i = 0; i < numOfArticles; i++) {
        const newInd = (randomInt50 + i) % 50
        randomInt50++;
        const newsObj = dataArr[newInd];
        const newArticle = document.createElement("article");
        newArticle.setAttribute("class", "news-article");
        const newsSection =document.querySelector("section.news");
    
        newArticle.innerHTML = `
        <a href="${newsObj.guid}">${newsObj.title}</a>
        <img src="${newsObj.imageurl}" alt="${newsObj.title}"/>
        `
        newsSection.append(newArticle);
    }
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const numOfArticles = event.target["article-quantity"].value;
    fetch(urlNews, {
        headers: {
            "authorization": {API_KEY2}
        }
    })
    .then((response) => response.json())
    .then((data) => {
        displayArticles(data.Data, numOfArticles);
    })
    .catch((error) => console.log(error));
})
