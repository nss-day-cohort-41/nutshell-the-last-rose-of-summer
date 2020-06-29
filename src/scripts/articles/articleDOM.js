//HTML DOM building for News Articles 
//David Bruce
import listeners from './../eventListeners.js'


const renderArticles = (article) => {
    let friendClass = "";
    
    if ( article.userId !== parseInt(sessionStorage.activeUser) ) { 
        friendClass = "section__friend";
    } 
    const articleSection = document.querySelector(".container__main__middle--news").innerHTML += 
    `<section class="section__itemCard ${friendClass}">
    <p class="header__itemCard">Title:  ${article.title}<button id="button__article__delete--${article.id}">Delete</button></p>
    <p><strong>Synopsis:</strong>  ${article.synopsis}</p>
    <p><strong>URL:</strong>  <a href="${article.url}" target="_blank">${article.url}</a></p>
    <p><strong>Timestamp:</strong>  ${article.timestamp}</p>
</section>`
}

export default renderArticles;