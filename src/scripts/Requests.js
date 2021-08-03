import { getRequests } from "./dataAccess.js"


const convertRequestToListElement = (request) => {

}

export const Requests = () => {
    const requests = getRequests()

    let html = "<ul>"
    const requestsArray = requests.map(
        (request) => {
            return `<li value="${request.id}">${request.description}</li>`
            }
        )
    html += requestsArray.join("")
    html +=  "</ul>"
    

    return html
}
