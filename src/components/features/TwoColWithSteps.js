import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import TeamIllustrationSrc from "images/team-illustration-2.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";

import QualifyingIconSrc from "images/mini-gp-qualifying.svg";
import FinalIconSrc from "images/mini-gp-final.svg";

/** Icons aligned with each step (same order as `steps`). */
const STEP_ICON_SRC = [QualifyingIconSrc, FinalIconSrc];

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative lg:max-w-xl`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const TabRow = tw.div`flex flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-5`;
const TabButton = styled.button(({ $active }) => [
  tw`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors rounded-t-md border-b-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2`,
  $active
    ? tw`text-primary-600 border-primary-500 bg-primary-100`
    : tw`text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100`,
]);

const StepPhotoStack = styled.div`
  ${tw`flex flex-col gap-3 sm:gap-4 w-full`}
`;

const StepPhotoBlock = styled.div`
  ${tw`w-full flex flex-col items-center`}
`;

const StepPhotoFrame = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  ${tw`shadow-xl bg-gray-100`}
  aspect-ratio: 16 / 10;
  min-height: 7.5rem;
`;

const StepPicture = styled.picture`
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const StepPhotoImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

/** Subtítulos bajo fotos e iconos: centrados respecto al bloque visual */
const StepCaption = tw.p`mt-2 text-xs sm:text-sm font-semibold text-primary-500 text-center w-full tracking-wide uppercase`;

const StepIconStack = styled.div`
  ${tw`flex flex-col gap-4 sm:gap-5 w-full`}
`;

const StepIconBlock = styled.div`
  ${tw`w-full flex flex-col items-center`}
`;

const IconCircle = styled.div`
  ${tw`w-full flex justify-center items-center rounded-full border-2 border-dashed border-primary-500 bg-white py-8 px-6 shadow-md`}
  min-height: 7.5rem;
`;

const StepIconImg = styled.img`
  ${tw`w-10 h-10 sm:w-12 sm:h-12`}
  object-fit: contain;
`;

const DecoratorBlob = styled(SvgDotPattern)(() => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Steps = tw.ul`mt-12`;
const Step = tw.li`mt-8 flex flex-col md:flex-row items-center md:items-start`;
const StepNumber = tw.div`font-semibold text-4xl leading-none text-gray-400`;
const StepIconInline = styled.img`
  ${tw`w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0`}
  object-fit: contain;
`;
const StepText = tw.div`mt-3 md:mt-0 md:ml-6`;
const StepHeading = tw.h6`leading-none text-xl font-semibold`;
const StepDescription = tw.p`mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium`;
const StepDescriptionWithIcon = tw(StepDescription)`mt-0`;

/** iconsOnly: cuadrícula por paso; fila 2 alinea bloque de texto con icono grande a la derecha. */
const IconsOnlySection = tw.div`max-w-screen-xl mx-auto py-20 md:py-24 px-4 sm:px-6 lg:px-8`;
const IconsOnlySteps = tw.ul`mt-12 list-none p-0`;
const StepIconsOnlyRow = tw.li`mt-10 first:mt-8`;
const StepPairedGrid = styled.div`
  ${tw`grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 md:gap-y-2`}
`;
const StepHeadingInPairedGrid = tw(StepHeading)`md:col-start-1 md:row-start-1`;
const StepLeftBodyPair = tw.div`flex flex-row gap-4 md:col-start-1 md:row-start-2 md:items-start`;
const StepRightBigIcon = tw.div`flex justify-center items-start md:col-start-2 md:row-start-2`;

/**
 * @param {{ base: string, alt?: string, caption?: string }[]} [props.stepPhotos]
 * @param {boolean} [props.visualModeTabs] — si true, muestra pestañas Fotos / Iconos (requiere stepPhotos)
 * @param {boolean} [props.iconsOnly] — solo columna de iconos (sin fotos ni pestañas); debe coincidir el número de pasos con los iconos.
 */
export default ({
  subheading = "Our Expertise",
  heading = (
    <>
      Designed & Developed by <span tw="text-primary-500">Professionals.</span>
    </>
  ),
  imageSrc = TeamIllustrationSrc,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageDecoratorBlob = false,
  textOnLeft = true,
  steps = null,
  decoratorBlobCss = null,
  stepPhotos = null,
  sectionId = null,
  visualModeTabs = false,
  iconsOnly = false,
}) => {
  const [visualMode, setVisualMode] = useState("photos");

  const defaultSteps = [
    {
      heading: "Register",
      description: "Create an account with us using Google or Facebook."
    },
    {
      heading: "Download",
      description: "Browse and Download the template that you like from the marketplace."
    },
    {
      heading: "Run",
      description: "Follow the instructions to setup and customize the template to your needs."
    }
  ];

  if (!steps) steps = defaultSteps;

  const showPhotoColumn = Array.isArray(stepPhotos) && stepPhotos.length > 0 && !iconsOnly;
  const showTabs =
    showPhotoColumn && visualModeTabs && stepPhotos.length === STEP_ICON_SRC.length;
  const iconSrcForStep = (index) => STEP_ICON_SRC[Math.min(index, STEP_ICON_SRC.length - 1)];

  const renderVisualColumn = () => {
    if (!showPhotoColumn) {
      return (
        <>
          <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} alt="" />
          {imageDecoratorBlob && <DecoratorBlob css={decoratorBlobCss} />}
        </>
      );
    }

    const iconMode = showTabs && visualMode === "icons";

    return (
      <>
        {showTabs && (
          <TabRow role="tablist" aria-label="Mini Grand Prix visual style">
            <TabButton
              type="button"
              role="tab"
              aria-selected={visualMode === "photos"}
              id="minigp-tab-photos"
              $active={visualMode === "photos"}
              onClick={() => setVisualMode("photos")}
            >
              Photos
            </TabButton>
            <TabButton
              type="button"
              role="tab"
              aria-selected={visualMode === "icons"}
              id="minigp-tab-icons"
              $active={visualMode === "icons"}
              onClick={() => setVisualMode("icons")}
            >
              Icons
            </TabButton>
          </TabRow>
        )}

        {iconMode ? (
          <StepIconStack>
            {stepPhotos.map((photo, index) => (
              <StepIconBlock key={photo.base || index}>
                <IconCircle>
                  <StepIconImg src={STEP_ICON_SRC[index]} alt="" aria-hidden />
                </IconCircle>
                {photo.caption && <StepCaption>{photo.caption}</StepCaption>}
              </StepIconBlock>
            ))}
          </StepIconStack>
        ) : (
          <StepPhotoStack>
            {stepPhotos.map((photo, index) => (
              <StepPhotoBlock key={photo.base || index}>
                <StepPhotoFrame>
                  <StepPicture>
                    <source srcSet={`/eck-photos/${photo.base}.webp`} type="image/webp" />
                    <StepPhotoImg
                      src={`/eck-photos/${photo.base}.jpg`}
                      alt={photo.alt || ""}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </StepPicture>
                </StepPhotoFrame>
                {photo.caption && <StepCaption>{photo.caption}</StepCaption>}
              </StepPhotoBlock>
            ))}
          </StepPhotoStack>
        )}
      </>
    );
  };

  if (iconsOnly) {
    return (
      <Container id={sectionId || undefined}>
        <IconsOnlySection>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <IconsOnlySteps>
              {steps.map((step, index) => (
                <StepIconsOnlyRow key={index}>
                  <StepPairedGrid>
                    <StepHeadingInPairedGrid>{step.heading}</StepHeadingInPairedGrid>
                    <StepLeftBodyPair>
                      <StepIconInline src={iconSrcForStep(index)} alt="" aria-hidden />
                      <StepDescriptionWithIcon>{step.description}</StepDescriptionWithIcon>
                    </StepLeftBodyPair>
                    <StepRightBigIcon>
                      <IconCircle>
                        <StepIconImg src={iconSrcForStep(index)} alt="" aria-hidden />
                      </IconCircle>
                    </StepRightBigIcon>
                  </StepPairedGrid>
                </StepIconsOnlyRow>
              ))}
            </IconsOnlySteps>
          </TextContent>
        </IconsOnlySection>
      </Container>
    );
  }

  return (
    <Container id={sectionId || undefined}>
      <TwoColumn>
        <ImageColumn>
          {renderVisualColumn()}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Steps>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepNumber>{(index + 1).toString().padStart(2, "0")}</StepNumber>
                  <StepText>
                    <StepHeading>{step.heading}</StepHeading>
                    <StepDescription>{step.description}</StepDescription>
                  </StepText>
                </Step>
              ))}
            </Steps>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
