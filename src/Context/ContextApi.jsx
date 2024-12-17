import React, { useState } from 'react'
import { createContext } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextApi({ children }) {

    const [addResponse, setAddResponse] = useState("")
    const [editResponse, setEditResponse] = useState("")

    return (
        <>
            <addProjectResponseContext.Provider value={{ addResponse, setAddResponse }}>
                <editProjectResponseContext.Provider value={{ editResponse, setEditResponse }}>
                    {children}
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextApi