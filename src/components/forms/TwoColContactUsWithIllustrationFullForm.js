import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import defaultContactIllustration from "images/email-illustration4.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-72 sm:h-80 md:h-auto md:min-h-[18rem] flex items-center justify-center`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const IllustrationImg = styled.img`
  ${tw`w-full max-w-xs md:max-w-sm h-auto object-contain select-none`}
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.08));
`;
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = styled(PrimaryButtonBase)`
  ${tw`inline-block mt-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
`

const StatusMessage = styled.div`
  ${tw`mt-4 p-3 rounded text-sm font-medium`}
  ${props => props.success ? tw`bg-green-100 text-green-700` : tw`bg-red-100 text-red-700`}
`

/** Misma URL en Vercel (serverless) o con `vercel dev`. Opcional: REACT_APP_EMAIL_API_URL si el API está en otro dominio. */
const SEND_EMAIL_URL =
  process.env.REACT_APP_EMAIL_API_URL && process.env.REACT_APP_EMAIL_API_URL.trim() !== ""
    ? `${process.env.REACT_APP_EMAIL_API_URL.replace(/\/$/, "")}/api/send-email`
    : "/api/send-email";

export default ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  emailPlaceholder = "Your Email Address",
  namePlaceholder = "Full Name",
  subjectPlaceholder = "Subject",
  messagePlaceholder = "Your Message Here",
  textOnLeft = true,
  illustrationSrc = defaultContactIllustration,
  illustrationAlt = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el estado anterior cuando el usuario empieza a escribir
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const raw = await response.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setStatus({
          type: "error",
          message:
            "Respuesta inválida del servidor. Prueba con `npm run dev:vercel` o despliega en Vercel. Con `npm start` solo no existe /api en local.",
        });
        return;
      }

      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorMessage = data.errors ? data.errors.join(", ") : data.message;
        setStatus({ type: "error", message: errorMessage || "No se pudo enviar el mensaje." });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        type: "error",
        message: "Error de red. Usa `npm run dev:vercel` (con .env en la raíz) para probar el formulario en local.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container id="contact">
      <TwoColumn>
        <ImageColumn>
          <IllustrationImg src={illustrationSrc} alt={illustrationAlt} loading="lazy" decoding="async" />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form onSubmit={handleSubmit}>
              <Input 
                type="email" 
                name="email" 
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <Input 
                type="text" 
                name="name" 
                placeholder={namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <Input 
                type="text" 
                name="subject" 
                placeholder={subjectPlaceholder}
                value={formData.subject}
                onChange={handleChange}
                required 
              />
              <Textarea 
                name="message" 
                placeholder={messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                required 
              />
              {status.message && (
                <StatusMessage success={status.type === "success"}>
                  {status.message}
                </StatusMessage>
              )}
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : submitButtonText}
              </SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
