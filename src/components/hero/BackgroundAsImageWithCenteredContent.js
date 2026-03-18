import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-0 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url("https://images.unsplash.com/photo-1545579833-0e15a2b3a4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const Description = tw.p`text-gray-300 text-center text-sm sm:text-base lg:text-lg font-medium mt-4 max-w-2xl`;

const Actions = tw.div`flex flex-col sm:flex-row mt-10 sm:mt-16`;
const PrimaryAction = tw.a`rounded-full px-8 py-3 text-sm sm:text-base sm:px-10 sm:py-4 bg-primary-500 text-gray-100 font-bold shadow-lg transition duration-300 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;
const SecondaryAction = tw.a`rounded-full px-8 py-3 mt-4 sm:mt-0 sm:ml-4 text-sm sm:text-base sm:px-10 sm:py-4 bg-transparent text-gray-100 font-bold border-2 border-gray-300 transition duration-300 hocus:border-primary-500 hocus:text-primary-500 focus:outline-none focus:shadow-outline`;

export default () => {
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="#walkIn">Home</NavLink>
      <NavLink href="#karts">Our Karts</NavLink>
      <NavLink href="#racing">Racing Options</NavLink>
      <NavLink href="#pricing">Prices</NavLink>
      <NavLink href="#faq">FAQ</NavLink>
      <NavLink href="#contact">Contact</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="#minigp">
        Book Mini Grand Prix
      </PrimaryLink>
    </NavLinks>
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <Heading>
            Feel The Speed.
            <br />
            <span tw="text-primary-500">Own The Track.</span>
          </Heading>
          <Description>
            The fastest outdoor go-kart track in New Brunswick. Professional Sodi karts, real competition, unforgettable racing experiences.
          </Description>
          <Actions>
            <PrimaryAction href="#pricing">View Prices</PrimaryAction>
            <SecondaryAction href="#karts">See Our Karts</SecondaryAction>
          </Actions>
        </Content>
      </HeroContainer>
    </Container>
  );
};
