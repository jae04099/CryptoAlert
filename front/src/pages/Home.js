import React from 'react'
import RegForm from '../components/Home/RegForm'
import Desc from '../components/Home/Desc'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-evenly bg-gray-100 lg:flex-row min-h-screen">
            <Desc />
            <RegForm />
        </div>
    )
}

export default Home
