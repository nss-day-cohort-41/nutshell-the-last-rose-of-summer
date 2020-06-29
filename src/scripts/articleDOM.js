//HTML DOM building for News Articles 
//David Bruce
const articleDOMConverter = (article) => {
    const articleSection = document.querySelector(".container__main__middle--news").innerHTML += 
    `<section class="section__itemCard">
    <p class="header__itemCard">Title:  ${article.title}<button class="buttonNews--news.id">Delete</button></p>
    <p><strong>Synopsis:</strong>  ${article.synopsis}</p>
    <p><strong>URL:</strong>  ${article.url}</p>
    <p><strong>Timestamp:</strong>  ${article.timestamp}</p>
</section>`
}

export default articleDOMConverter;