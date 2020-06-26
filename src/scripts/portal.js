
// inserts active portal screen
const includeHTML = (container, htmlPage, htmlsource) => {
    if (htmlsource === "file") {
        container.setAttribute("w3-include-html",htmlPage)
        const file = htmlPage
        if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {container.innerHTML = this.responseText;}
            if (this.status == 404) {container.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            container.removeAttribute("w3-include-html");
            includeHTML();
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
        }
    } else {
        container.innerHTML = htmlPage
    }

  }

  export default includeHTML;