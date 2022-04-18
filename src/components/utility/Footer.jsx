import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className="footer">
      <div className="f_footer">
      <ul>
        <li className='logo'>Movie Fun </li>
        <li><Link to={'/'}> Home </Link></li>
        <li><Link to={'/movie'}> Movie </Link></li>
        <li><Link to={'/tv'}> T.v Show </Link></li>
      </ul>
      </div>
      <div className="l_footer">
          <ul>
            <li> <i className="fa fa-copyright" aria-hidden="true"> <span>  Copyright {2022}</span></i> </li>
            <li> <i className="fa fa-download" aria-hidden="true"></i> Download </li>
          </ul>
      </div>
    </div>
    </>
  )
}

export default Footer