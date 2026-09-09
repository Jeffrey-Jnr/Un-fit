import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
} from "@react-email/components";
import * as React from "react";

interface NewsletterWelcomeProps {
  subscriberName?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const NewsletterWelcome = ({
  subscriberName = "Friend",
}: NewsletterWelcomeProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>Welcome to the (un)Fit community!</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#F05522",
              dark: "#1A1A1A",
              offwhite: "#FAF7F3",
            },
            fontFamily: {
              sans: [
                '"Inter"',
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "sans-serif",
              ],
            },
          },
        },
      }}
    >
      <Body className="bg-[#FAF7F3] font-sans m-auto px-2">
        <Container className="bg-white mx-auto mt-[40px] mb-[40px] max-w-[600px] shadow-sm border border-gray-100">
          {/* Header Banner */}
          <Section className="bg-white w-full pt-10 px-10">
            <Img
              src={`${baseUrl}/Un-fit.png`}
              width="150"
              alt="(Un)Fit Logo"
              className="block ml-[-16px]"
            />
          </Section>

          {/* Main Content */}
          <Section className="px-10 pt-16 pb-10">
            <Heading className="text-[28px] font-bold text-[#F05522] m-0 mb-10">
              Welcome to the community!
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-6">
              Hi {subscriberName},
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              I&apos;m thrilled to have you here. This space is all about having honest conversations on brokenness, purpose, grace, and discovering how God uses imperfect people.
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              You&apos;ll occasionally receive emails from me sharing personal thoughts, updates, and more behind-the-scenes content that I don&apos;t share anywhere else.
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              If you signed up to get the free sample of the book, you can access it directly through the link below:
            </Text>
            
            <Section className="mb-8 mt-2">
              <a
                href={`${baseUrl}/sample`}
                className="bg-[#F05522] text-white px-6 py-3 rounded-md font-bold text-sm inline-block"
              >
                Read Free Sample
              </a>
            </Section>

            <Text className="text-black text-base leading-[24px] mt-6">
              With gratitude,
              <br />
              <strong className="text-black">Jeffrey Hughes Jr.</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default NewsletterWelcome;
