import React, { createContext, useEffect, useState } from 'react'

export const tokenContext = createContext()

function TokenContext({ children }) {

    const [tokenStatus, setTokenStatus] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setTokenStatus(true)
        } else {
            setTokenStatus(false)
        }
    }, [tokenStatus])

    return (
        <tokenContext.Provider value={{ tokenStatus, setTokenStatus }}>
            {children}
        </tokenContext.Provider>
    )
}

export default TokenContext