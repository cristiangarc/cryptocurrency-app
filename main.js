let walletCount = 3;

const createArticle = () => {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = `Wallet ${++walletCount}`;
    article.append(h2);

    return article;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const article = createArticle();
    const walletsSection = document.querySelector("section.wallets");
    walletsSection.append(article);
})
