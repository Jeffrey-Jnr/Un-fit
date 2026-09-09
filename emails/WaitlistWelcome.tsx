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

interface WaitlistWelcomeProps {
  subscriberName?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const WaitlistWelcome = ({
  subscriberName = "Friend",
}: WaitlistWelcomeProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>You&apos;re on the list — (un)Fit is coming soon!</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#F05522",
              dark: "#1A1A1A",
              offwhite: "#ffffff",
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
      <Body className="bg-[#ffffff] font-sans m-auto px-2">
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
              You&apos;re on the list!
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-6">
              Hi {subscriberName},
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              Thank you for your interest in <strong>(un)Fit</strong>! I&apos;m working hard to get everything ready, and you&apos;ll be one of the very first to know the moment it&apos;s available.
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              This book is an honest conversation about brokenness, purpose, grace, and a God who has never been afraid to use imperfect people. I truly believe it&apos;s going to speak to you.
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              I&apos;ll be in touch soon. Stay tuned!
            </Text>

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

export default WaitlistWelcome;
