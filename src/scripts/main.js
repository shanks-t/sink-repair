import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./dataAccess.js"
//import { sendRequest } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
    
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render() 
    }
)

