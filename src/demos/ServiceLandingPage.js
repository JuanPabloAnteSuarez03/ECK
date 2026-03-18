import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// --- COMPONENTS ---
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import KartSpecs from "components/features/TwoColSingleFeatureWithStats.js";
import RacingOptions from "components/features/DashedBorderSixFeatures.js";
import Pricing from "components/pricing/ThreePlans.js";
import MiniGrandPrix from "components/features/TwoColWithSteps.js";
import VideoSection from "components/features/TwoColWithButton.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.js";
import ContactUs from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import FinalCTA from "components/cta/GetStarted.js";
import Footer from "components/footers/FiveColumnDark.js";

const HighlightedText = tw.span`text-primary-500`;
const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;

export default () => {
  return (
    <AnimationRevealPage>

      {/* ============================================ */}
      {/* 1 + 3. HEADER + HERO SECTION                */}
      {/* Full-screen background image with nav        */}
      {/* ============================================ */}
      <Hero />

      {/* ============================================ */}
      {/* 2. WALK-IN STATUS BAR                        */}
      {/* Red banner with quick racing info            */}
      {/* ============================================ */}
      <FeatureStats
        subheading=""
        heading="Walk-In Racing Today"
        description="First come, first served. No reservation required. Just show up and race!"
        stats={[
          { key: "Today's Hours", value: "3–9 PM" },
          { key: "Status", value: "OPEN" },
          { key: "Min. Age", value: "8+" },
        ]}
      />

      {/* ============================================ */}
      {/* 4. OUR KARTS — Sodi World Series             */}
      {/* Image + specifications with stats            */}
      {/* ============================================ */}
      <KartSpecs
        textOnLeft={false}
      />

      {/* ============================================ */}
      {/* 5. RACING OPTIONS                            */}
      {/* Cards for each experience available          */}
      {/* ============================================ */}
      <RacingOptions />

      {/* ============================================ */}
      {/* 6. PRICING                                   */}
      {/* 3 race duration cards                        */}
      {/* ============================================ */}
      <Pricing
        subheading={<Subheading>Pricing</Subheading>}
        heading={<>Simple & Transparent <HighlightedText>Race Pricing</HighlightedText></>}
        description="Choose your race duration. All prices include kart rental, helmet, and full safety briefing."
        plans={[
          {
            name: "Sprint",
            price: "$25",
            duration: "10 Minutes",
            mainFeature: "Quick Adrenaline Rush",
            features: ["Kart & Helmet Included", "Safety Briefing", "Lap Timing", "Walk-In Available"],
          },
          {
            name: "Grand Prix",
            price: "$40",
            duration: "20 Minutes",
            mainFeature: "Most Popular Choice",
            features: ["Kart & Helmet Included", "Safety Briefing", "Lap Timing", "Printable Results"],
            featured: true,
          },
          {
            name: "Endurance",
            price: "$55",
            duration: "30 Minutes",
            mainFeature: "Ultimate Racing Experience",
            features: ["Kart & Helmet Included", "Safety Briefing", "Lap Timing", "Printable Results"],
          },
        ]}
        primaryButtonText="Book Now"
      />

      {/* ============================================ */}
      {/* 7. MINI GRAND PRIX — Reservation Section     */}
      {/* Steps: Practice → Qualifying → Final Race    */}
      {/* ============================================ */}
      <MiniGrandPrix
        subheading={<Subheading>Mini Grand Prix</Subheading>}
        heading={<>The Ultimate <HighlightedText>Racing Event</HighlightedText></>}
        textOnLeft={true}
        steps={[
          {
            heading: "Practice Session",
            description: "Get familiar with the track and find your racing line. Learn the corners and build your confidence before the timed sessions.",
          },
          {
            heading: "Qualifying",
            description: "Set your fastest lap to determine your starting position on the grid. Every millisecond counts!",
          },
          {
            heading: "The Final Race",
            description: "Lights out and away we go! Compete head-to-head for the podium. Trophies awarded to the top 3 finishers.",
          },
        ]}
      />

      {/* ============================================ */}
      {/* 8. VIDEO EXPERIENCE                          */}
      {/* Showcase the racing action                   */}
      {/* ============================================ */}
      <VideoSection
        subheading={<Subheading>Experience The Thrill</Subheading>}
        heading={<>See The <HighlightedText>Action</HighlightedText> On Track</>}
        description="Watch our drivers push the limits on the fastest outdoor go-kart track in New Brunswick. Feel the speed, hear the engines, and see why ECK is the ultimate karting destination."
        buttonRounded={false}
        primaryButtonText="Watch The Action"
        textOnLeft={false}
      />

      {/* ============================================ */}
      {/* 9. TESTIMONIALS                              */}
      {/* Customer reviews with star ratings           */}
      {/* ============================================ */}
      <Testimonial
        subheading={<Subheading>Testimonials</Subheading>}
        heading={<>Our Racers <HighlightedText>Love Us</HighlightedText></>}
        description="See what our customers have to say about their ECK racing experience."
        testimonials={[
          {
            stars: 5,
            profileImageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
            heading: "Best Karting Experience Ever!",
            quote: "The karts are fast, the track is amazing, and the staff is super friendly. We had an incredible time racing with the whole family. The Sodi karts feel like real race cars. Can't wait to come back!",
            customerName: "Sarah Johnson",
            customerTitle: "Google Review ★★★★★",
          },
          {
            stars: 5,
            profileImageSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
            heading: "Perfect for Corporate Events",
            quote: "We booked ECK for our company team-building event and it was a huge hit. Everyone had a blast competing against each other. The Mini Grand Prix format made it feel like a real championship. Highly recommended!",
            customerName: "Mike Roberts",
            customerTitle: "Google Review ★★★★★",
          },
        ]}
      />

      {/* ============================================ */}
      {/* 10. FAQ                                      */}
      {/* Common questions about racing at ECK         */}
      {/* ============================================ */}
      <FAQ
        subheading={<Subheading>FAQ</Subheading>}
        heading={<>Have <HighlightedText>Questions?</HighlightedText></>}
        description="Everything you need to know before your visit to ECK."
        faqs={[
          {
            question: "What is the minimum age to race?",
            answer: "Drivers must be at least 8 years old and meet the minimum height requirement to safely operate the karts. Junior karts are available for younger drivers.",
          },
          {
            question: "Do I need a reservation?",
            answer: "Regular kart races are walk-in and first-come, first-served. No reservation required! Reservations are only needed for the Mini Grand Prix package and group/corporate events.",
          },
          {
            question: "What should I wear?",
            answer: "Closed-toe shoes are mandatory. We recommend comfortable clothing that you don't mind getting a little dusty. Long hair must be tied back. Helmets are provided.",
          },
          {
            question: "Is it safe?",
            answer: "Absolutely! All drivers receive a safety briefing before racing. Our karts are equipped with seat belts, bumpers, and roll bars. Track marshals monitor the circuit at all times.",
          },
          {
            question: "How long does a race last?",
            answer: "We offer 10-minute, 20-minute, and 30-minute race sessions. The Mini Grand Prix event (with practice, qualifying, and final race) lasts approximately 1.5 hours.",
          },
          {
            question: "Can I host a birthday party or corporate event?",
            answer: "Yes! We offer special packages for birthday parties and corporate events. These include exclusive track time, race formats, and optional catering. Contact us to plan your event.",
          },
        ]}
      />

      {/* ============================================ */}
      {/* 11. LOCATION & CONTACT                       */}
      {/* Contact form + address info                  */}
      {/* ============================================ */}
      <ContactUs
        subheading={<Subheading>Contact Us</Subheading>}
        heading={<>Feel free to <HighlightedText>get in touch</HighlightedText></>}
        description="Have a question or want to book a group event? Send us a message and we'll get back to you as soon as possible."
        submitButtonText="Send Message"
      />

      {/* ============================================ */}
      {/* 12. FINAL CTA                                */}
      {/* Big red call-to-action banner                */}
      {/* ============================================ */}
      <FinalCTA
        text="Ready to race? Come experience the fastest outdoor go-kart track in New Brunswick."
        primaryLinkText="View Prices"
        primaryLinkUrl="#pricing"
        secondaryLinkText="Contact Us"
        secondaryLinkUrl="#contact"
      />

      {/* ============================================ */}
      {/* 13. FOOTER                                   */}
      {/* Dark footer with ECK branding                */}
      {/* ============================================ */}
      <Footer />
    </AnimationRevealPage>
  );
};
