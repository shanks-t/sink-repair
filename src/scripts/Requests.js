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
    let completeRequest = {}
    for (const request of requests) {
        if (requestId === request.id) {
            completeRequest = request
        }
    }
    return changeObject(completeRequest)
}

export const changeObject = (obj) => {
    obj.isComplete = true
    return obj
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
            const putObj = updateRequest(putId)
            
            saveCompletion(putObj, putId)
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
