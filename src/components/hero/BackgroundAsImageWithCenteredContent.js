import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnchorLink from "react-anchor-link-smooth-scroll";

import Header, { NavLinks, NavToggle, DesktopNavLinks } from "../headers/light.js";
import logoSrc from "images/logo-color.png";
import { useI18n } from "context/LanguageContext.js";
import LanguageFlagToggle from "components/misc/LanguageFlagToggle.js";

/** ECK photographer set — action + brand + product (public/eck-photos) */
const HERO_SLIDE_IDS = ["8772", "8780", "8774", "8735", "8695"];

const ROTATE_MS = 7000;

const NavAnchor = tw(AnchorLink)`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;
const RightNavLinks = tw(NavLinks)`flex justify-end items-center`;
const LogoAnchor = styled(AnchorLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`}
  img {
    ${tw`w-48 mr-0`}
  }
`;

const StyledHeader = styled(Header)`
  ${tw`pt-5 sm:pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavAnchor}, ${LogoAnchor} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const HeroRoot = styled.div`
  ${tw`relative -mx-8 -mt-8 h-screen min-h-144 overflow-hidden`}
`;

const SlideLayer = styled.div`
  ${tw`absolute inset-0`}
  transition: opacity 1.2s ease-in-out;
  ${(p) => css`
    opacity: ${p.$active ? 1 : 0};
    z-index: ${p.$active ? 1 : 0};
  `}
`;

const SlidePicture = styled.picture`
  ${tw`block w-full h-full`}
`;

const SlideImg = styled.img`
  ${tw`w-full h-full object-cover object-center`}
`;

const OpacityOverlay = tw.div`z-[2] absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-[3] relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const Description = tw.p`text-gray-300 text-center text-sm sm:text-base lg:text-lg font-medium mt-4 max-w-2xl`;

const Actions = tw.div`flex flex-col sm:flex-row mt-10 sm:mt-16`;
const PrimaryAction = tw(AnchorLink)`rounded-full px-8 py-3 text-sm sm:text-base sm:px-10 sm:py-4 bg-primary-500 text-gray-100 font-bold shadow-lg transition duration-300 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;
const SecondaryAction = tw(AnchorLink)`rounded-full px-8 py-3 mt-4 sm:mt-0 sm:ml-4 text-sm sm:text-base sm:px-10 sm:py-4 bg-transparent text-gray-100 font-bold border-2 border-gray-300 transition duration-300 hocus:border-primary-500 hocus:text-primary-500 focus:outline-none focus:shadow-outline`;

const DotNav = styled.div`
  ${tw`z-[3] absolute left-0 right-0 flex justify-center gap-2`}
  bottom: 2rem;
`;
const Dot = styled.button`
  ${tw`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900`}
  ${(p) =>
    p.$active
      ? tw`w-8 bg-primary-500`
      : css`
          ${tw`w-2 bg-gray-400 hover:bg-gray-300`}
          opacity: 0.65;
          &:hover {
            opacity: 1;
          }
        `}
`;

export default () => {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionOk || HERO_SLIDE_IDS.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDE_IDS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [motionOk]);

  const navLinks = [
    <NavLinks key={1}>
      <NavAnchor href="#home">{t("nav.home")}</NavAnchor>
      <NavAnchor href="#karts">{t("nav.karts")}</NavAnchor>
      <NavAnchor href="#racing">{t("nav.racing")}</NavAnchor>
      <NavAnchor href="#pricing">{t("nav.prices")}</NavAnchor>
      <NavAnchor href="#faq">{t("nav.faq")}</NavAnchor>
      <NavAnchor href="#contact">{t("nav.contact")}</NavAnchor>
    </NavLinks>,
    <RightNavLinks key={2}>
      <LanguageFlagToggle />
    </RightNavLinks>,
  ];

  const logoLink = (
    <LogoAnchor href="#home">
      <img src={logoSrc} alt="ECK logo" />
    </LogoAnchor>
  );

  return (
    <HeroRoot id="home">
      {HERO_SLIDE_IDS.map((id, i) => (
        <SlideLayer key={id} $active={i === index} aria-hidden={i !== index}>
          <SlidePicture>
            <source srcSet={`/eck-photos/IMG_${id}.webp`} type="image/webp" />
            <SlideImg
              src={`/eck-photos/IMG_${id}.jpg`}
              alt=""
              decoding={i === 0 ? "sync" : "async"}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </SlidePicture>
        </SlideLayer>
      ))}

      <OpacityOverlay />

      <HeroContainer>
        <StyledHeader logoLink={logoLink} links={navLinks} />
        <Content>
          <Heading>
            {t("hero.title1")}
            <br />
            <span tw="text-primary-500">{t("hero.title2")}</span>
          </Heading>
          <Description>{t("hero.description")}</Description>
          <Actions>
            <PrimaryAction href="#pricing">{t("hero.viewPrices")}</PrimaryAction>
            <SecondaryAction href="#karts">{t("hero.seeKarts")}</SecondaryAction>
          </Actions>
        </Content>
      </HeroContainer>

      {HERO_SLIDE_IDS.length > 1 && (
        <DotNav role="tablist" aria-label={t("hero.photosAria")}>
          {HERO_SLIDE_IDS.map((id, i) => (
            <Dot
              key={id}
              type="button"
              $active={i === index}
              aria-label={t(`hero.slide.${id}`)}
              aria-selected={i === index}
              role="tab"
              onClick={() => setIndex(i)}
            />
          ))}
        </DotNav>
      )}
    </HeroRoot>
  );
};
