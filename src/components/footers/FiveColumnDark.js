import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import LogoImage from "images/logo-color.png";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-900 text-gray-100 -mx-8 -mb-8 px-8`;
const Content = tw.div`max-w-screen-xl mx-auto pt-16 pb-8`
const FiveColumns = tw.div`flex flex-wrap justify-between`;

const Column = tw.div`w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm sm:text-base text-center md:text-left`;
const CompanyColumn = tw.div`text-center md:text-left mb-16 lg:mb-0 w-full lg:w-1/5`;

const ColumnHeading = tw.h5`font-bold uppercase`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-100 pb-1 transition duration-300`;

const LogoContainer = tw.div`flex items-center justify-center lg:justify-start`;
const LogoImg = tw.img`w-40`;

const CompanyAddress = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-4 leading-loose text-center lg:text-left`;

const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 text-sm font-normal flex flex-col sm:flex-row justify-between items-center`
const CopyrightNotice = tw.div``
const CompanyInfo = tw.div``

const Divider = tw.div`my-8 border-b-2 border-gray-800`;

const defaultFooterLabels = {
  address: "New Brunswick, Canada",
  quickLinks: "Quick Links",
  racing: "Racing",
  legal: "Legal",
  contact: "Contact",
  home: "Home",
  ourKarts: "Our Karts",
  prices: "Prices",
  faq: "FAQ",
  kartRentals: "Kart Rentals",
  minigp: "Mini Grand Prix",
  birthdays: "Birthday Parties",
  corporate: "Corporate Events",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  waiver: "Waiver",
  directions: "Get Directions",
  copyright: "© 2025 ECK Racing. All Rights Reserved.",
  tagline: "The fastest outdoor go-kart track in New Brunswick.",
};

export default ({ footerLabels = null }) => {
  const L = { ...defaultFooterLabels, ...footerLabels };
  return (
    <Container>
      <Content>
        <FiveColumns>
          <CompanyColumn>
            <LogoContainer>
              <LogoImg src={LogoImage} alt="ECK logo" />
            </LogoContainer>
            <CompanyAddress>
              {L.address}
            </CompanyAddress>
            <SocialLinksContainer>
              <SocialLink href="https://www.facebook.com/profile.php?id=100063772474040">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@geraldcaseley6794">
                <YoutubeIcon />
              </SocialLink>
            </SocialLinksContainer>
          </CompanyColumn>
          <Column>
            <ColumnHeading>{L.quickLinks}</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#home">{L.home}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#karts">{L.ourKarts}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#pricing">{L.prices}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#faq">{L.faq}</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>{L.racing}</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#racing">{L.kartRentals}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#minigp">{L.minigp}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#racing">{L.birthdays}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#racing">{L.corporate}</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>{L.legal}</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">{L.privacy}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">{L.terms}</Link>
              </LinkListItem>
              <LinkListItem>
                <Link 
                href="https://cakcmp.speedwaiver.com/wdvli" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                {L.waiver}
                </Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>{L.contact}</ColumnHeading>
            <LinkList>
              <LinkListItem>
                +1 (506) 555-0123
              </LinkListItem>
              <LinkListItem>
                <Link href="mailto:eastcoastkarting@gmail.com">eastcoastkarting@gmail.com</Link>
              </LinkListItem>
              <LinkListItem>
                <Link
                  href="https://maps.app.goo.gl/gscoNXRwUZsrn97H7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                {L.directions}
                  </Link>
              </LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
        <Divider/>
        <CopyrightAndCompanyInfoRow>
          <CopyrightNotice>{L.copyright}</CopyrightNotice>
          <CompanyInfo>{L.tagline}</CompanyInfo>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};
