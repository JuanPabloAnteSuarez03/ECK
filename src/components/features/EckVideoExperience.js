import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";

const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed";
const DEFAULT_VIDEOS = [
  {
    id: "6wJ-F-zxMXw",
    title: "East Coast Karting — track layout",
    caption: "Track layout",
  },
  {
    id: "STnRTJ4jdzM",
    title: "East Coast Karting — racing in the rain",
    caption: "Racing in the rain",
  },
];

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const VideoColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const DecoratorBlob = styled(SvgDotPattern)(() => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

const VideoStack = tw.div`flex flex-col gap-6`;

const EmbedWrap = styled.div`
  ${tw`relative w-full rounded-xl overflow-hidden shadow-xl bg-black`}
  aspect-ratio: 16 / 9;
`;

const EmbedIframe = styled.iframe`
  ${tw`absolute inset-0 w-full h-full border-0`}
`;

const Caption = tw.p`text-xs sm:text-sm font-semibold text-primary-500 tracking-wide uppercase mt-2`;

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`,
]);

function embedSrc(videoId) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  return `${YOUTUBE_EMBED_BASE}/${videoId}?${params.toString()}`;
}

export default ({
  subheading = "Experience The Thrill",
  heading = "See The Action On Track",
  description = "",
  primaryButtonText = "Watch The Action",
  primaryButtonUrl = "https://www.youtube.com/watch?v=6wJ-F-zxMXw",
  buttonRounded = false,
  textOnLeft = false,
  sectionId = "video-experience",
  videos = null,
}) => {
  const videoList = videos || DEFAULT_VIDEOS;
  return (
    <Container id={sectionId}>
      <TwoColumn>
        <VideoColumn>
          <VideoStack>
            {videoList.map((v) => (
              <div key={v.id}>
                <EmbedWrap>
                  <EmbedIframe
                    title={v.title}
                    src={embedSrc(v.id)}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </EmbedWrap>
                <Caption>{v.caption}</Caption>
              </div>
            ))}
          </VideoStack>
          <DecoratorBlob />
        </VideoColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <PrimaryButton buttonRounded={buttonRounded} as="a" href={primaryButtonUrl} target="_blank" rel="noopener noreferrer">
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
}
