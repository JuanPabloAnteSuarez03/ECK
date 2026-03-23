import React from "react";
import tw from "twin.macro";
import GoogleReviewsWidget from "google-reviews-widget";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";

const Inner = tw.div`w-full`;

const Subheading = tw(SubheadingBase)`text-center`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-3xl sm:text-4xl lg:text-5xl text-center leading-tight`;
const Description = tw.div`mt-6 text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-3xl mx-auto`;

const WidgetWrap = tw.div`mt-10 md:mt-12 w-full`;

export default function EckBeaverReviewsSection({
  instanceId = "2v92fl0CjmPPaAx2rWEN",
  subheading,
  heading,
  description,
}) {
  return (
    <Container>
      <ContentWithPaddingXl>
        <Inner>
          <Subheading>{subheading}</Subheading>
          <Heading>{heading}</Heading>
          <Description>{description}</Description>
          <WidgetWrap>
            <GoogleReviewsWidget instanceId={instanceId} />
          </WidgetWrap>
        </Inner>
      </ContentWithPaddingXl>
    </Container>
  );
}
