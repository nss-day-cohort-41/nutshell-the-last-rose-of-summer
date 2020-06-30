// Author => Patrick Murphy
//This module has generic functions that can be shared between sections//

    //This will convert your "new Date()" time stamp to just show dd-mm-yyyy
const shared = {
    dateConverter(suppliedDate) {
        let date = suppliedDate.toString()
        date = date.slice(0,10)
        date = date.split("-")
        return date = `${date[1]}-${date[2]}-${date[0]}`
    },

//Discard changes made to the data field section
    clearDataField() {
        document.querySelector(".container__main__left--messages").innerHTML = ``
        document.querySelector(".select__box").value = 0
        }
}





export default shared