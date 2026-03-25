import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";

const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const PlansContainer = tw.div`flex justify-center flex-col lg:flex-row items-center lg:items-stretch relative gap-8`;
const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }

  ${props =>
    props.featured &&
    css`
      background: linear-gradient(135deg, #6d0809 0%, #d41012 45%, #be0e10 100%);
      ${tw`text-gray-100`}
      .planHighlight {
        ${tw`hidden`}
      }
      .duration {
        ${tw`text-gray-200!`}
      }
      ${PlanFeatures} {
        ${tw`border-white border-opacity-25`}
      }
      .mainFeature {
        ${tw`text-white!`}
        background-color: transparent !important;
      }
      .plan-header .name,
      .plan-header .price {
        ${tw`text-white!`}
      }
      .feature:not(.mainFeature) {
        ${tw`text-gray-200!`}
      }
      ${BuyNowButton} {
        ${tw`bg-white text-primary-600 hocus:bg-gray-100 hocus:text-primary-900`}
      }
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl mb-4`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
    &:empty {
      display: none;
    }
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
    &:empty {
      display: none;
    }
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-3xl font-bold tracking-tight mb-6 py-4 px-4 rounded-lg`}
    color: #d41012;
    background-color: rgba(212, 16, 18, 0.08);
  }
`;

const PlanAction = tw.div`px-4 sm:px-8 xl:px-16 py-8`;
const BuyNowButton = styled.a`
  ${tw`block text-center rounded-full uppercase tracking-wider py-4 w-full text-sm font-bold no-underline transition-all duration-200 hover:shadow-xl transform hover:translate-x-px hover:-translate-y-px`}
  background-color: #d41012;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #b80d0f;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(212, 16, 18, 0.5);
    outline: none;
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2 text-primary-100`}
  path {
    fill: #fee2e2;
  }
`;

const WaiverDisclaimer = styled.div`
  ${tw`w-full text-center mt-12 px-4`}
  p {
    ${tw`text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto`}
  }
  a {
    ${tw`text-primary-600 font-semibold underline hover:text-primary-700 transition-colors duration-200`}
  }
`;


export default ({
  subheading = "Pricing",
  heading = "Flexible Plans.",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  plans = null,
  primaryButtonText = "Buy Now"
}) => {
  const defaultPlans = [
    {
      name: "Personal",
      price: "$17.99",
      duration: "Monthly",
      mainFeature: "Suited for Personal Blogs",
      features: ["30 Templates", "7 Landing Pages", "12 Internal Pages", "Basic Assistance"],
    },
    {
      name: "Business",
      price: "$37.99",
      duration: "Monthly",
      mainFeature: "Suited for Production Websites",
      features: ["60 Templates", "8 Landing Pages", "22 Internal Pages", "Priority Assistance"],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "$57.99",
      duration: "Monthly",
      mainFeature: "Suited for Big Companies",
      features: ["90 Templates", "9 Landing Pages", "37 Internal Pages", "Personal Assistance"],
    },
  ];

  if (!plans) plans = defaultPlans;

  /* Franjas y botones: solo rojo ECK (primary) + negro en gradientes */
  const highlightGradientsCss = [
    css`
      background: linear-gradient(115deg, #830a0b 0%, #d41012 55%, #ef5153 100%);
    `,
    css`
      background: linear-gradient(115deg, #9f0c0e 0%, #d41012 50%, #be0e10 100%);
    `,
    css`
      background: linear-gradient(115deg, #6d0809 0%, #d41012 45%, #ef5153 100%);
    `,
  ];

  return (
    <Container id="pricing">
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            <Plan key={index} featured={plan.featured}>
              {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
              <PlanHeader className="plan-header">
                <span className="name">{plan.name}</span>
                {plan.price && <span className="price">{plan.price}</span>}
                {plan.duration && <span className="duration">{plan.duration}</span>}
              </PlanHeader>
              <PlanFeatures>
                <span className="feature mainFeature">{plan.mainFeature}</span>
                {plan.features.map((feature, index) => (
                  <span key={index} className="feature">
                    {feature}
                  </span>
                ))}
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton href="#contact">{primaryButtonText}</BuyNowButton>
              </PlanAction>
            </Plan>
          ))}
          <DecoratorBlob/>
        </PlansContainer>
        <WaiverDisclaimer>
          <p>
            If you are participating in a Mini Grand Prix, you MUST fill out our{" "}
            <a href="https://cakcmp.speedwaiver.com/wdvli" target="_blank" rel="noopener noreferrer">
              online waiver
            </a>
            {" "}form. You will be asked to show confirmation that you completed the form.
          </p>
        </WaiverDisclaimer>
      </ContentWithPaddingXl>
    </Container>
  );
};
