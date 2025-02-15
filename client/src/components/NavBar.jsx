import React, { useState } from 'react';
import { Link, NavLink as Nav_Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../utils/Images/zomato.svg';
import {CloseRounded, FavoriteBorder, MenuRounded, SearchRounded, ShoppingCartOutlined} from '@mui/icons-material';

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  position: sticky;
  top: 0;
  color: white;
  z-index: 1000;
  margin: 10px;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: 50px;
`;

const Logo = styled.img`
  width: 135px;
  height: 135px;

  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Nav_Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.10s ease-in-out;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active{
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;

  @media screen and (max-width: 768px) {
    gap: 13px;
  }
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  width: auto;
  text-wrap: nowrap;
  padding: 10px 25px;
  color: white;
  font-size: 15px;
  outline: none;
  border: none;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    padding: 8px 18px;
    font-size: 13px;
  }
`;
const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  color: ${({ theme }) => theme.text_primary };

  @media screen and (max-width: 768px) {
    display: block;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 5px 15px;
  list-style: none;
  background: ${({ theme }) => theme.white };
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  transition: transform 0.4s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <MobileIcon onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <CloseRounded style={{ color: "inherit", fontSize: "25px" }} />
        ) : (
          <MenuRounded style={{ color: "inherit", fontSize: "25px" }} />
        )}
      </MobileIcon>

      {isOpen && (
        <MobileMenu isOpen = {isOpen}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/dishes">Dishes</NavLink></li>
          <li><NavLink to="/orders">Orders</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </MobileMenu>
      )}

      <NavContainer>
        <NavLogo to="/">
          <Logo src={LogoImg} alt="Zomato Logo" />
        </NavLogo>
        <NavItems>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/dishes">Dishes</NavLink></li>
          <li><NavLink to="/orders">Orders</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </NavItems>
      </NavContainer>

      <ButtonContainer>
          <NavLink to="/search">
            <SearchRounded/>
          </NavLink>
          <NavLink to="/favorite">
            <FavoriteBorder/>
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCartOutlined/>
          </NavLink>
          <Button to="">Sign In</Button>
      </ButtonContainer>
    </Nav>
  );
};

export default NavBar;