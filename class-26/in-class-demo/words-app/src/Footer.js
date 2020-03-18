import React from 'react'
import './Footer.css'

class Footer extends React.Component {
  render () {
    return (
      <footer>
        <p>
          © {new Date().getFullYear()} Code Fellows (jk lol)
        </p>
      </footer>
    )
  }
}

export default Footer
