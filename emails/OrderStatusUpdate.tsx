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
  Hr,
} from "@react-email/components";
import * as React from "react";

interface OrderStatusUpdateProps {
  customerName: string;
  orderReference: string;
  status: "Shipped" | "Delivered";
  trackingInfo?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const OrderStatusUpdate = ({
  customerName = "Valued Reader",
  orderReference = "ORD_123456",
  status = "Shipped",
  trackingInfo = "Delivery expected in 1-3 business days.",
}: OrderStatusUpdateProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>Your order has been {status.toLowerCase()}</Preview>
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
              Order Update: {status}
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-6">
              Hi {customerName},
            </Text>

            <Text className="text-black text-base leading-[24px] mb-6">
              Good news! The status of your <strong>(un)Fit</strong> order (Ref: {orderReference}) has been updated to <strong>{status}</strong>.
            </Text>

            {trackingInfo && status !== "Delivered" && (
              <Section className="my-8">
                <Hr className="border-gray-200 mb-6" />
                <Text className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">
                  Delivery Details
                </Text>
                <Text className="text-black text-base leading-[24px] m-0">
                  {trackingInfo}
                </Text>
                <Hr className="border-gray-200 mt-6 mb-8" />
              </Section>
            )}

            {status === "Delivered" && (
              <Text className="text-black text-base leading-[24px] mt-6 mb-6">
                I hope you enjoy reading the book! If you love it, I&apos;d be so grateful if you shared your thoughts with others later.
              </Text>
            )}

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

export default OrderStatusUpdate;
