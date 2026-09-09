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

interface ReviewRequestProps {
  customerName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const ReviewRequest = ({
  customerName = "Friend",
}: ReviewRequestProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>What did you think of (un)Fit?</Preview>
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
              I&apos;d love to hear your thoughts
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-6">
              Hi {customerName},
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              It&apos;s been a couple of weeks since you received your copy of <strong>(un)Fit</strong>. I hope you&apos;ve had a chance to dive into it!
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              As an independent author, word-of-mouth and honest feedback mean the world to me. If the book resonated with you or impacted you in any way, I would be incredibly grateful if you could take a quick minute to leave a review.
            </Text>

            <Section className="mb-8 mt-2">
              <a
                href={`${baseUrl}#reviews`}
                className="bg-[#F05522] text-white px-6 py-3 rounded-md font-bold text-sm inline-block"
              >
                Leave a Review
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

export default ReviewRequest;
