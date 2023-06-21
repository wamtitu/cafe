import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <div className='navbar'>
      <div className="blog__logo">
        <span>Cafe</span>
      </div>
      <div className='blog'>
        <Link to='/'>Home</Link>
        <Link to='/menu'>Menu</Link>
        {/* <Link to='/order'>Order</Link> */}
        <Link to='/booking'>Reservation</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </div>
      <div className="blog__sign">          
           <Link to='/login'><button className="btn-login">Login</button></Link>
           
        </div>
    </div>
  )
}

export default Header