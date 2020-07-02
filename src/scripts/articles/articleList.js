// List Build Functions
// David Bruce

import API from './../data.js';
import renderArticles from './articleDOM.js';
import listeners from './../eventListeners.js';

const articleSection = document.querySelector(".container__main__middle--news");
let articleArray = [];
let activeUserId = "";

const articleList = {

    //Get users, friends, and articles and build array
    getAllArticles () {
        articleSection.innerHTML="";
        activeUserId = parseInt(sessionStorage.getItem("activeUser"));
        API.getAllUsersAndArticles()
        .then((response => {
            let articles = response;
            //Gets user friend data and stores it for use//
            API.getFriendData(activeUserId)
            .then((friendResponse) => {
                articleList.buildArticleArray(articles, friendResponse)
            }) 
        }))
    },
    //Build article array
    buildArticleArray(allUserArticles, friends) {
        articleArray = []
        activeUserId = parseInt(sessionStorage.getItem("activeUser"))

        //Find friends and set object key value
        allUserArticles.forEach(user => {
            let friendOfUser = false
            friends.forEach(friend => {
                if (friend.userId === user.id) {
                    friendOfUser = true
                }
    // Builds article array with users and friends
            })
            user.articles.forEach(article => {
                article.userName = user.userName
                article.friendOfUser = friendOfUser

                if ( article.friendOfUser === true || article.userId === activeUserId) {
                    articleArray.push(article)
                }
                
            })

        });
    // Sorts for newest article to go to top of list
        articleArray.sort((a, b) => {
                if (a.timestamp > b.timestamp) return -1;
                if (a.timestamp < b.timestamp) return 1;
                return 0;
        })
    // Add to DOM
        articleList.articleDOMConverter(articleArray)
    }, 

    articleDOMConverter(articleArray)  {
        articleSection.innerHTML = ""  
        articleArray.forEach(article => {

            // Add active user article and adjust class for no italics
            if (article.userId === activeUserId) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.remove("section__friend")
            }
            // Add activeUserId friends articles and adjust class for italics and cornsilk background
            else if (article.friendOfUser === true ) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.toggle("section__friend")
                document.querySelector(`#button__article__delete--${article.id}`).classList.toggle("hidden")
            }                
            listeners.enableArticleDeleteButton();
        })
        
    }
}

export default articleList;
