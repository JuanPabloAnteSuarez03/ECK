import React, { useId } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useI18n } from "context/LanguageContext.js";

const FlagButton = styled.button`
  ${tw`
    flex-shrink-0 rounded-md overflow-hidden
    border-2 border-white border-opacity-25
    shadow-md transition duration-300
    hocus:bg-white hocus:bg-opacity-10
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `}
  /* Slightly larger canvas so the Union Jack antialiases better when scaled down */
  width: 2.875rem;
  height: 2rem;
  padding: 0;
  line-height: 0;
  svg {
    display: block;
    width: 100%;
    height: 100%;
    shape-rendering: geometricPrecision;
  }
`;

function FranceFlag() {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true">
      <rect width="1" height="2" fill="#002395" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#ED2939" />
    </svg>
  );
}

/**
 * High-resolution 2:1 viewBox (600×300) so diagonal strokes rasterize with less stair-stepping
 * when scaled to ~46×32 CSS px. Same geometry as 60×30, scaled ×10.
 */
function UkFlag() {
  const clipId = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 600 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0h600v300H0z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path fill="#012169" d="M0 0h600v300H0z" />
        <path
          stroke="#fff"
          strokeWidth="60"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          d="M0 0l600 300M600 0L0 300"
        />
        <path
          stroke="#C8102E"
          strokeWidth="40"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          d="M0 0l600 300M600 0L0 300"
        />
        <path stroke="#fff" strokeWidth="100" strokeLinecap="butt" d="M300 0v300M0 150h600" />
        <path stroke="#C8102E" strokeWidth="60" strokeLinecap="butt" d="M300 0v300M0 150h600" />
      </g>
    </svg>
  );
}

/**
 * English (default): show France flag — click switches to French.
 * French: show UK flag — click switches to English.
 */
export default function LanguageFlagToggle() {
  const { locale, toggleLocale, t } = useI18n();
  const showFrance = locale === "en";
  const aria = showFrance ? t("lang.toFrench.aria") : t("lang.toEnglish.aria");

  return (
    <FlagButton type="button" onClick={toggleLocale} aria-label={aria} title={aria}>
      {showFrance ? <FranceFlag /> : <UkFlag />}
    </FlagButton>
  );
}
