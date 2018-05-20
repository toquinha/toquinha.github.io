import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends React.Component {
    render() {
      return (
        <div>
          <header>
            <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>Home</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem>
                <Link to='/clientes'>Customer</Link>
                </NavItem>
                <NavItem>
                <Link to='/pets'>Pet</Link>
                </NavItem>
            </Nav>
            </Navbar>
            </header>
        </div>
      );
    }
  }
  
  export default Header;