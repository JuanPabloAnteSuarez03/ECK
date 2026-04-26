import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import "slick-carousel/slick/slick.css";

const TRIPADVISOR_REVIEW_BASE = "https://www.tripadvisor.ca/ShowUserReviews-g858490-d4742927-";
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/East+Coast+Karting+Greater+Lakeburn";

const ECK_REVIEWS = [
  {
    name: "Michael Vincent",
    rating: 5,
    quote:
      "The best go kart place in New Brunswick, bar none. Karts are crazy fast, so you can have a proper race if you want. Staff are helpful and put safety first. Bathrooms are clean. No brainer — you will have a blast with the family.",
    source: "Google",
    url: GOOGLE_REVIEWS_URL,
  },
  {
    name: "Steve S.",
    rating: 5,
    quote:
      "East Coast Karting was awesome. These are the fastest go karts our family have ever been on. The karts are not only very fast but are all equal in performance. The staff is knowledgeable and courteous. We will be back for sure.",
    source: "Tripadvisor",
    url: `${TRIPADVISOR_REVIEW_BASE}r799993347-East_Coast_Karting-Dieppe_New_Brunswick.html`,
  },
  {
    name: "Michele Marks",
    rating: 5,
    quote:
      "These karts move 70km and have slower ones for the teens or beginners. Service was 10 stars. If I could give it more, I would! This was the 1st time for my kids, ages 16 and 13 and had a BLAST. Price is very reasonable, especially for the fantastic time my kids had.",
    source: "Google",
    url: GOOGLE_REVIEWS_URL,
  },
  {
    name: "William Street",
    rating: 5,
    quote:
      "The customer service is great, Gerry is amazing. As someone who had tried out other tracks I can say that Gerry's is one of the best, especially with the karts — they are fast and perfect for the track. If I were to suggest a go-kart track to anybody, it would be ECK hands down.",
    source: "Tripadvisor",
    url: `${TRIPADVISOR_REVIEW_BASE}r747996345-East_Coast_Karting-Dieppe_New_Brunswick.html`,
  },
  {
    name: "Mary Kantor",
    rating: 5,
    quote:
      "Had a great time on the track! We went for 20 minutes, broke it up with a break. Carts are fast and the track is fairly large so you can get some good speed. Lots of fun for a date on my husband's birthday. Will definitely return and bring friends!",
    source: "Google",
    url: GOOGLE_REVIEWS_URL,
  },
  {
    name: "GMAC",
    rating: 5,
    quote:
      "Our visit was planned as a mere distraction while returning from Nova Scotia to Ontario, but turned into a truly exceptional and fun experience. Gerry treated us like guests and made my children aged 8 and 11 comfortable and quickly familiar with the karts. High value for the money spent.",
    source: "Tripadvisor",
    url: `${TRIPADVISOR_REVIEW_BASE}r693882989-East_Coast_Karting-Dieppe_New_Brunswick.html`,
  },
  {
    name: "Julien R.",
    rating: 5,
    quote:
      "Had a good time here with friends. We raced for 20 minutes. Karts are in good shape and are fast enough to allow drivers to actually race each other. Grounds are well maintained and facilities are clean.",
    source: "Google",
    url: GOOGLE_REVIEWS_URL,
  },
  {
    name: "Paul C.",
    rating: 5,
    quote:
      "A well run track with a good road course and appropriate track safety rules. A lot of fun, even for 10-year-old future Formula One drivers. Kids loved it.",
    source: "Tripadvisor",
    url: `${TRIPADVISOR_REVIEW_BASE}r723068079-East_Coast_Karting-Dieppe_New_Brunswick.html`,
  },
];

const PrimaryBackgroundContainer = tw(ContainerBase)`-mx-8 px-8 bg-primary-500 text-white`;
const HeadingContainer = tw.div`text-center`;
const Subheading = tw(SubheadingBase)`text-white text-center mb-4`;
const Heading = tw(SectionHeading)`text-white`;
const Description = tw.p`mt-4 text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-3xl mx-auto text-white opacity-75`;

const SliderWrap = tw.div`mt-12 md:mt-16 relative lg:px-16`;

const ReviewsSlider = styled(Slider)`
  ${tw`w-full`}
  .slick-list {
    ${tw`overflow-hidden -mx-3`}
    padding: 1rem 0 3rem;
  }
  .slick-track {
    ${tw`flex! items-stretch`}
  }
  .slick-slide {
    ${tw`h-auto px-3`}
  }
  .slick-slide > div {
    ${tw`h-full`}
  }
  .slick-dots {
    ${tw`flex! items-center justify-center mt-2 p-0 list-none w-full`}
    position: absolute;
    bottom: -2.25rem;
    left: 0;
    li {
      ${tw`mx-1 inline-block`}
      width: auto;
      height: auto;
      button {
        ${tw`block w-3 h-3 p-0 rounded-full bg-white border-0 cursor-pointer`}
        text-indent: -9999px;
        opacity: 0.5;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      button:before {
        content: none;
      }
      button:hover {
        opacity: 0.8;
      }
      &.slick-active button {
        opacity: 1;
        transform: scale(1.25);
      }
    }
  }
`;

const Card = styled.a`
  ${tw`block h-full bg-white text-gray-900 rounded-2xl p-6 shadow-lg no-underline cursor-pointer
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1
        focus:outline-none focus:shadow-outline`}
`;

const CardInner = tw.div`flex flex-col h-full`;
const StarsRow = tw.div`flex items-center gap-1 text-yellow-500`;
const Quote = tw.blockquote`mt-4 text-sm sm:text-base text-gray-800 leading-relaxed flex-1`;
const Footer = tw.div`mt-6 pt-4 border-t border-gray-200 flex items-center justify-between`;
const AuthorName = tw.span`text-base font-bold text-gray-900`;
const SourceBadge = tw.span`text-xs font-semibold uppercase tracking-wider text-primary-700`;

const ControlButton = styled.button`
  ${tw`absolute top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center
        w-12 h-12 rounded-full bg-white text-primary-700 shadow-lg
        hover:bg-primary-700 hover:text-white transition-colors duration-300
        focus:outline-none`}
  svg {
    ${tw`w-6 h-6`}
  }
`;

function StarIcon({ filled = true }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      tw="w-5 h-5"
      aria-hidden="true"
    >
      <path
        strokeWidth="1.5"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.957z"
      />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <StarsRow aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= rating} />
      ))}
    </StarsRow>
  );
}

const SLIDER_SETTINGS = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

export default function EckBeaverReviewsSection({
  subheading,
  heading,
  description,
  reviews = ECK_REVIEWS,
}) {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <PrimaryBackgroundContainer>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
        </HeadingContainer>

        <SliderWrap>
          <ControlButton
            type="button"
            onClick={() => sliderRef?.slickPrev()}
            aria-label="Previous review"
            css={tw`left-0`}
          >
            <ChevronLeftIcon />
          </ControlButton>

          <ReviewsSlider ref={setSliderRef} {...SLIDER_SETTINGS}>
            {reviews.map((r, i) => (
              <Card
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${r.name}'s review on ${r.source}`}
              >
                <CardInner>
                  <Stars rating={r.rating} />
                  <Quote>“{r.quote}”</Quote>
                  <Footer>
                    <AuthorName>{r.name}</AuthorName>
                    <SourceBadge>{r.source}</SourceBadge>
                  </Footer>
                </CardInner>
              </Card>
            ))}
          </ReviewsSlider>

          <ControlButton
            type="button"
            onClick={() => sliderRef?.slickNext()}
            aria-label="Next review"
            css={tw`right-0`}
          >
            <ChevronRightIcon />
          </ControlButton>
        </SliderWrap>
      </ContentWithPaddingXl>
    </PrimaryBackgroundContainer>
  );
}
