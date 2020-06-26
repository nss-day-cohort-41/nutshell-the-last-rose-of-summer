

const messageDOM = {

    messageHTMLBuilder(userMessageArray)  {
        document.querySelector(".container__messages--saved").innerHTML = ''
        userMessageArray.forEach(message => {
            console.log(message)
            
        });
    }
}

export default messageDOM