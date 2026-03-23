import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";

import defaultCardImage from "../../images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../images/svg-decorator-blob-3.svg";

import FastIconImage from "../../images/fast-icon.svg";
import ShieldIconImage from "../../images/shield-icon.svg";
import CustomizeIconImage from "../../images/customize-icon.svg";
import StarIconImage from "../../images/star-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/4 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

const defaultCards = [
  {
    imageSrc: FastIconImage,
    title: "Kart Rentals",
    description:
      "Walk-in racing available daily. First come, first served. No reservation needed — just show up and race!",
  },
  {
    imageSrc: CustomizeIconImage,
    title: "Birthday Parties",
    description:
      "Make it a birthday to remember! Exclusive track time, racing, and a celebration your group will never forget.",
  },
  {
    imageSrc: ShieldIconImage,
    title: "Corporate Events",
    description:
      "Team building with a competitive edge. Custom race formats, exclusive sessions, and optional catering for your team.",
  },
  {
    imageSrc: StarIconImage,
    title: "Sodi World Series",
    description:
      "Join the international karting championship. Compete in official Sodi World Series events right here at ECK.",
  },
];

export default ({ cards = null, heading = null }) => {
  const cardList = cards || defaultCards;
  const headingNode =
    heading ||
    (
      <>
        Racing <span tw="text-primary-500">Options</span>
      </>
    );

  return (
    <Container id="racing">
      <ThreeColumnContainer>
        <Heading>{headingNode}</Heading>
        {cardList.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
