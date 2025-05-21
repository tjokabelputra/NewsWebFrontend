import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

function LoadingSpinner({ message }){
    return(
        <div className="flex flex-col justify-center items-center">
            <FontAwesomeIcon
                icon={faSpinner}
                className="text-sheen text-6xl animate-spin mb-4"
            />
            <p className="text-3xl font-bold text-gray-700">{ message }</p>
        </div>
    )
}

export default LoadingSpinner