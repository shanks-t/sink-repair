export const applicationState = {
    "plumbers": [],
    "requests": [], 
}

const API = "http://localhost:8088"

//plumbers
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.plumbers = serviceRequests
            }
        )
}


//requests
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
        return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


//completions
export const saveCompletion = (completePlumberRequest, Id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completePlumberRequest)
    }
        return fetch(`${API}/requests/${Id}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}



//get arrays of objects from database
const sort = (x, y) => { 
    return (x.isComplete > y.isComplete) ? 0 : x? -1 : 1
}

export const getRequests = () => {
    const sorted = applicationState.requests.sort((a,b) => (a.isComplete > b.isComplete) ? -1 : 1)
    console.log("sorted:", sorted)
    return sorted.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}


