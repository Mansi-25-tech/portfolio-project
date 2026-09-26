import React from 'react'
import Herosection from './Herosection'
import Project from './Projects'
import Contact from './Contact'
import About from './About'
import Services from './Services'

function Home() {

    return (
        <>

            {/* Hero Section */}
            <Herosection />


            {/* About Section */}
            <About />


            {/* Services Section */}
            <Services />


            {/* Projects Section */}
            <Project />


            {/* Contact CTA */}
            <Contact />

        </>
    )
}

export default Home