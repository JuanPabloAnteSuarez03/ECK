import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useI18n } from "context/LanguageContext.js";

// --- COMPONENTS ---
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import KartSpecs from "components/features/TwoColSingleFeatureWithStats.js";
import RacingOptions from "components/features/DashedBorderSixFeatures.js";
import Pricing from "components/pricing/ThreePlans.js";
import MiniGrandPrix from "components/features/TwoColWithSteps.js";
import EckVideoExperience from "components/features/EckVideoExperience.js";
import EckBeaverReviewsSection from "components/testimonials/EckBeaverReviewsSection.js";
import FAQ from "components/faqs/SingleCol.js";
import ContactUs from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import FinalCTA from "components/cta/GetStarted.js";
import Footer from "components/footers/FiveColumnDark.js";

import FastIconImage from "images/fast-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import StarIconImage from "images/star-icon.svg";
import walkInHelmetIllustration from "images/email-illustration2.svg";
import ctaKartIllustration from "images/email-illustration3.svg";
import contactKartIllustration from "images/email-illustration4.svg";

const HighlightedText = tw.span`text-primary-500`;
const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;

export default function ServiceLandingPage() {
  const { t } = useI18n();

  const kartHeading = (
    <>
      {t("karts.headingBefore")}
      <span tw="text-primary-500">{t("karts.headingAccent")}</span>
    </>
  );

  const kartStats = [
    { key: t("karts.stat.topSpeed"), value: "70 km/h" },
    { key: t("karts.stat.model"), value: "Sodi RT8" },
    { key: t("karts.stat.engine"), value: "390cc" },
    { key: t("karts.stat.timing"), value: "AMB/MyLaps" },
  ];

  const racingHeading = (
    <>
      {t("racing.headingBefore")}
      <span tw="text-primary-500">{t("racing.headingAccent")}</span>
    </>
  );

  const racingCards = [
    {
      imageSrc: FastIconImage,
      title: t("racing.card1.title"),
      description: t("racing.card1.description"),
    },
    {
      imageSrc: CustomizeIconImage,
      title: t("racing.card2.title"),
      description: t("racing.card2.description"),
    },
    {
      imageSrc: ShieldIconImage,
      title: t("racing.card3.title"),
      description: t("racing.card3.description"),
    },
    {
      imageSrc: StarIconImage,
      title: t("racing.card4.title"),
      description: t("racing.card4.description"),
    },
  ];

  const pricingPlans = [
    {
      name: t("pricing.sprint.name"),
      price: "",
      duration: "",
      mainFeature: "Choose your race time:",
      features: [
        "10 Minutes - $27.00 + tax",
        "20 Minutes - $45.00 + tax",
        "30 Minutes - $60.00 + tax",
        t("pricing.sprint.f3"),
        t("pricing.sprint.f4"),
      ],
    },
    {
      name: t("pricing.gp.name"),
      price: "",
      duration: "",
      mainFeature: "$62.00 + tax",
      features: [
        t("pricing.gp.main"),
        t("pricing.gp.f1"),
        t("pricing.gp.f2"),
        t("pricing.gp.f3"),
        t("pricing.gp.f4"),
      ],
      featured: true,
    },
  ];

  const miniGpHeading = (
    <>
      {t("minigp.headingBefore")}
      <HighlightedText>{t("minigp.headingAccent")}</HighlightedText>
    </>
  );

  const videoHeading = (
    <>
      {t("video.headingBefore")}
      <HighlightedText>{t("video.headingAccent")}</HighlightedText>
      {t("video.headingAfter")}
    </>
  );

  const videoItems = [
    {
      id: "6wJ-F-zxMXw",
      title: `ECK — ${t("video.caption1")}`,
      caption: t("video.caption1"),
    },
    {
      id: "STnRTJ4jdzM",
      title: `ECK — ${t("video.caption2")}`,
      caption: t("video.caption2"),
    },
  ];

  const reviewsHeading = (
    <>
      {t("reviews.headingBefore")}
      <HighlightedText>{t("reviews.headingAccent")}</HighlightedText>
    </>
  );

  const faqHeading = (
    <>
      {t("faq.headingBefore")}
      <HighlightedText>{t("faq.headingAccent")}</HighlightedText>
    </>
  );

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];

  const contactHeading = (
    <>
      {t("contact.headingBefore")}
      <HighlightedText>{t("contact.headingAccent")}</HighlightedText>
    </>
  );

  const footerLabels = {
    address: t("footer.address"),
    quickLinks: t("footer.quickLinks"),
    racing: t("footer.racing"),
    legal: t("footer.legal"),
    contact: t("footer.contact"),
    home: t("footer.home"),
    ourKarts: t("footer.ourKarts"),
    prices: t("footer.prices"),
    faq: t("footer.faq"),
    kartRentals: t("footer.kartRentals"),
    minigp: t("footer.minigp"),
    birthdays: t("footer.birthdays"),
    corporate: t("footer.corporate"),
    privacy: t("footer.privacy"),
    terms: t("footer.terms"),
    waiver: t("footer.waiver"),
    directions: t("footer.directions"),
    copyright: t("footer.copyright"),
    tagline: t("footer.tagline"),
  };

  const pricingHeading = (
    <>
      {t("pricing.headingBefore")}
      <HighlightedText>{t("pricing.headingAccent")}</HighlightedText>
    </>
  );

  return (
    <AnimationRevealPage>
      <Hero />

      <FeatureStats
        subheading=""
        heading={t("walkIn.heading")}
        description={t("walkIn.description")}
        stats={[
          { key: t("walkIn.hours"), value: "3–9 PM" },
          { key: t("walkIn.status"), value: t("walkIn.open") },
          { key: t("walkIn.age"), value: "8+" },
        ]}
        accentIllustrationSrc={walkInHelmetIllustration}
        accentIllustrationAlt={t("illus.walkIn")}
      />

      <KartSpecs
        textOnLeft={false}
        heading={kartHeading}
        description={t("karts.description")}
        statistics={kartStats}
      />

      <RacingOptions cards={racingCards} heading={racingHeading} />

      <Pricing
        subheading={<Subheading>{t("pricing.subheading")}</Subheading>}
        heading={pricingHeading}
        description={t("pricing.description")}
        plans={pricingPlans}
        primaryButtonText={t("pricing.book")}
      />

      <MiniGrandPrix
        sectionId="minigp"
        iconsOnly
        subheading={<Subheading>{t("minigp.subheading")}</Subheading>}
        heading={miniGpHeading}
        textOnLeft={true}
        steps={[
          {
            heading: t("minigp.step1.title"),
            description: t("minigp.step1.description"),
          },
          {
            heading: t("minigp.step2.title"),
            description: t("minigp.step2.description"),
          },
        ]}
      />

      <EckVideoExperience
        subheading={<Subheading>{t("video.subheading")}</Subheading>}
        heading={videoHeading}
        description={t("video.description")}
        buttonRounded={false}
        primaryButtonText={t("video.button")}
        primaryButtonUrl="https://www.youtube.com/watch?v=6wJ-F-zxMXw"
        textOnLeft={false}
        videos={videoItems}
      />

      <EckBeaverReviewsSection
        instanceId="2v92fl0CjmPPaAx2rWEN"
        subheading={<Subheading>{t("reviews.subheading")}</Subheading>}
        heading={reviewsHeading}
        description={t("reviews.description")}
      />

      <FAQ
        subheading={<Subheading>{t("faq.subheading")}</Subheading>}
        heading={faqHeading}
        description={t("faq.description")}
        faqs={faqItems}
      />

      <ContactUs
        subheading={<Subheading>{t("contact.subheading")}</Subheading>}
        heading={contactHeading}
        description={t("contact.description")}
        submitButtonText={t("contact.submit")}
        emailPlaceholder={t("contact.emailPh")}
        namePlaceholder={t("contact.namePh")}
        subjectPlaceholder={t("contact.subjectPh")}
        messagePlaceholder={t("contact.messagePh")}
        illustrationSrc={contactKartIllustration}
        illustrationAlt={t("illus.contact")}
      />

      <FinalCTA
        text={t("cta.text")}
        primaryLinkText={t("cta.primary")}
        primaryLinkUrl="#pricing"
        secondaryLinkText={t("cta.secondary")}
        secondaryLinkUrl="#contact"
        decorativeIllustrationSrc={ctaKartIllustration}
        decorativeIllustrationAlt={t("illus.cta")}
      />

      <Footer footerLabels={footerLabels} />
    </AnimationRevealPage>
  );
}
