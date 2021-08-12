import { getRequests, deleteRequest, getPlumbers, saveCompletion, applicationState } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


export const updateRequest = (requestId) => {
    const requests = applicationState.requests
    debugger
    let completeRequest = {}
    for (const request of requests) {
        if (requestId === request.id) {
            completeRequest = request
        }
    }
    return completeRequest
}

const putObject = () => {
    let completeRequest = updateRequest(putId)
    for (const key of Object.entries(completeRequest)) {
        key.isComplete = true
    }
    return completeRequest
}
  


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            let [requestId, plumberId] = event.target.value.split("--")
            //const id = requestId
            //const requestId = updateRequest(requestId)
            const putId = parseInt(requestId)
            //const isComplete = true
            const completeRequest = updateRequest(putId)
            const putObject = putObject(completeRequest)
            //saveCompletion(completeRequest, putId)
        }
        
    } 
)


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    let html = "<ul>"
    const requestsArray = requests.map(
        (request) => {
            return `
                <li>
                    ${request.description}
                    <button class="request__delete"
                            id="request--${request.id}">
                        Delete
                    </button>
                    <select class="plumbers" id="plumbers">
                        <option value="">Choose</option>
                        ${
                            plumbers.map(
                                plumber => {
                                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                }
                            ).join("")
                        }
                    </select>
                </li>`   
            }
        )
    html += requestsArray.join("")
    html +=  "</ul>"
    

    return html
}
