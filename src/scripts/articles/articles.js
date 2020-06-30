// Articles JS
// David Bruce
import API from './../data.js'
import listeners from './../eventListeners.js'
import shared from './../miscSharedFunctions.js'
import articleList from './articleList.js'


// Article Form
const articleFormHTML = (articleOperation) => {
    let articleDiscard = "New Article"
    if (articleOperation === "edit") { 
        articleDiscard = "Edits" 
    
    }
    const formHTML=
    `
        <section class="section__itemCard">
            <input type="hidden" id="field__articleId" value=""/>
            <input type="hidden" id="field__article__userId" value="${sessionStorage.activeUser}"/>
            <p class="header__itemCard"></p>
            <fieldset class="fieldset__article__title">
                <label for="article__title">News Article</label>
                <input type="text" class="field__text" id="field__article__title" name="article__title"></input>  
            </fieldset>
            <fieldset class="fieldset__article__synopsis">
                <label for="article__synopsis">Synopsis</label>
                <input type="text" class="field__text" id="field__article__synopsis" name="article__synopsis"></input>  
            </fieldset>
            <fieldset class="fieldset__article__url">
                <label for="article__url">URL</label>
                <input type="text" class="field__text" id="field__article__url" name="article__url"></input>  
            </fieldset>
            <div id="save_discard">
                <input type="button" value="Save Article" id="button__save__article"></input>
                <input type="button" value="Discard ${articleDiscard}" id="button__discard__article"></input>
            </div>
        </section>`;
        return formHTML;
}


// Article Functions for Adding, Deleting, Creating Object
const articleFunctions = {

    addArticleEntry () {
        const articleObject = articleFunctions.saveArticle("save")
        API.addArticleEntry(articleObject)
            .then((response) => {
                shared.clearDataField();
                articleList.getAllArticles();
            })
    },
    
    articleDelete (articleId) {
      API.deleteArticle(articleId) 
         .then((articleList.getAllArticles()))
    },

    addNewArticleForm () {
        document.querySelector(".container__main__left--messages").innerHTML = articleFormHTML("save")
    listeners.enableArticleDiscardButton()
    listeners.enableArticleSave()

    },

    // Save form fields to new article object
    saveArticle (articleOperation) {
        const articleId = "";
        if (articleOperation === "edit") { 
            articleId = document.getElementById("field__article__articleId").value;
        }
        const articleUserId = parseInt(sessionStorage.getItem("activeUser")); 
        const articleTitle = document.getElementById("field__article__title").value;
        const articleSynopsis = document.getElementById("field__article__synopsis").value;
        const articleUrl = document.getElementById("field__article__url").value;
        const articleTimestamp = new Date();

        const articleObject = articleFunctions.createArticleObject( articleUserId,articleTitle, articleSynopsis, articleUrl, articleTimestamp );
        return articleObject;
    }, 

    // Create new article object and return it
    createArticleObject ( articleUserId, articleTitle, articleSynopsis, articleUrl, articleTimestamp ) {
        return {
            userId: articleUserId,
            title: articleTitle,
            synopsis: articleSynopsis,
            url: articleUrl,
            timestamp: articleTimestamp
        }
    }
}

export default articleFunctions;