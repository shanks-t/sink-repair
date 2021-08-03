import { getRequests, deleteRequest, getPlumbers } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const completePlumberRequest = {
                requestId: requestId,
                plumberId: plumberId,
                date: date,
            }
            saveCompletion(completePlumberRequest)
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
