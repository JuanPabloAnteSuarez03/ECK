import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";

/** Real ECK fleet photo — Sodi-style kart with branding; matches Sodi RT8 copy */
const DEFAULT_IMG_WEBP = "/eck-photos/IMG_8695.webp";
const DEFAULT_IMG_JPG = "/eck-photos/IMG_8695.jpg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

/* Rounded rect must clip the image on all sides — absolute fill + overflow hidden */
const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  ${tw`shadow-2xl bg-gray-100`}
  border-radius: 0.75rem;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  min-height: 17.5rem;
  @media (min-width: 768px) {
    min-height: 22rem;
  }
`;

const StyledPicture = styled.picture`
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const KartPhoto = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% 55%;
  /* Match wrapper so Safari paints rounded corners cleanly */
  border-radius: 0.75rem;
`;

const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
const Value = tw.div`font-bold text-primary-500`
const Key = tw.div`font-medium text-gray-700`

const defaultHeading = (
  <>
    Our <span tw="text-primary-500">Karts</span>
  </>
);

export default ({
  textOnLeft = false,
  imageWebp = DEFAULT_IMG_WEBP,
  imageJpg = DEFAULT_IMG_JPG,
  imageAlt = "Sodi RT8 style racing kart at East Coast Karting",
  heading = defaultHeading,
  description = "We run the Sodi World Series karts — the same karts used in international karting championships around the world. Professional-grade, fast, and built for real competition. Equipped with precision lap timing so you can track every run.",
  statistics = null,
}) => {
  const stats =
    statistics ||
    [
      { key: "Top Speed", value: "70 km/h" },
      { key: "Kart Model", value: "Sodi RT8" },
      { key: "Engine", value: "390cc" },
      { key: "Timing System", value: "AMB/MyLaps" },
    ];

  return (
    <Container id="karts">
      <TwoColumn>
        <ImageColumn>
          <ImageWrap>
            <StyledPicture>
              <source srcSet={imageWebp} type="image/webp" />
              <KartPhoto src={imageJpg} alt={imageAlt} loading="lazy" decoding="async" width={800} height={600} />
            </StyledPicture>
          </ImageWrap>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Statistics>
              {stats.map((statistic, index) => (
              <Statistic key={index}>
                <Value>{statistic.value}</Value>
                <Key>{statistic.key}</Key>
              </Statistic>
              ))}
            </Statistics>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
