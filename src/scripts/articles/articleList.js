// List Build Functions
// David Bruce

import API from './../data.js';
import renderArticles from './articleDOM.js';
import listeners from './../eventListeners.js';

const articleSection = document.querySelector(".container__main__middle--news");
let articleArray = [];

const articleList = {

    //Get users, friends, and articles and build array
    getAllArticles () {
        articleSection.innerHTML="";
        API.getAllUsersAndArticles()
        .then((response => {
            articleList.buildArticleArray(response)
        }))
    },
    //Build article array
    buildArticleArray(allUserArticles) {
        articleArray = []
    //Find friends and set object key value
        allUserArticles.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friend.following == sessionStorage.activeUser) {
                    friendOfUser = true
                }
    // Builds article array with users and friends
            })
            user.articles.forEach(article => {
                article.userName = user.userName
                article.friendOfUser = friendOfUser
                if ( article.friendOfUser = true || article.userId === sessionStorage.activeUser) {
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
            if (article.userId == sessionStorage.activeUser) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.remove("section__friend")
            }
            // Add following friends articles and adjust class for italics and cornsilk background
            else if (article.friendOfUser === true ) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.toggle("section__friend")
            }                
            listeners.enableArticleDeleteButton();
        })
        
    }
}

export default articleList;
