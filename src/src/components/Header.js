import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
    render() {
      return (
        <div>
          <header>
            <Navbar>
            <Navbar.Header>
              <LinkContainer to="/">
                  <Navbar.Brand>
                     Home
                  </Navbar.Brand>
              </LinkContainer>
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/clientes">
                  <NavItem>
                    Clientes
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/pets">
                  <NavItem>
                    Pets
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/agenda">
                  <NavItem>
                    Banho e Tosa
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/hotel">
                  <NavItem>
                    Hotelzinho
                  </NavItem>
                </LinkContainer>
            </Nav>
            </Navbar>
            </header>
        </div>
      );
    }
  }
  
  export default Header;