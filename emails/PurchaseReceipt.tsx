import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
  Img,
} from "@react-email/components";
import * as React from "react";

interface PurchaseReceiptProps {
  customerName: string;
  orderReference: string;
  amount: string;
  quantity: number;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const PurchaseReceipt = ({
  customerName = "Valued Reader",
  orderReference = "ORD_123456",
  amount = "180.00",
  quantity = 1,
}: PurchaseReceiptProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>Your receipt for (un)Fit</Preview>
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
                "Roboto",
                '"Helvetica Neue"',
                "Ubuntu",
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
            <Heading className="text-[28px] font-bold text-[#F05522] m-0 mb-10 text-center">
              Thank you for your purchase!
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-4">
              Hi {customerName},
            </Text>

            <Text className="text-black text-base leading-[24px] mb-10">
              We&apos;re thrilled to confirm your order for (un)Fit.
              <br />
              Your payment was successfully processed, and we&apos;re
              <br />
              getting everything ready for you.
            </Text>

            {/* Receipt Details Box */}
            <Section className="my-8">
              <Hr className="border-gray-200 mb-8" />
              
              <Heading className="text-black text-[18px] font-bold m-0 mb-6">
                Order Summary
              </Heading>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-gray-500 text-sm">Reference</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-black font-medium text-sm">
                    {orderReference}
                  </Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-gray-500 text-sm">Quantity</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-black font-medium text-sm">
                    {quantity}
                  </Text>
                </Column>
              </Row>

              <Hr className="border-gray-200 my-6" />

              <Row>
                <Column>
                  <Text className="m-0 text-black font-bold text-base uppercase tracking-wider">Total</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-[#F05522] font-bold text-[20px]">
                    GHS {amount}
                  </Text>
                </Column>
              </Row>

              <Hr className="border-gray-200 mt-6 mb-8" />
            </Section>
            
            <Text className="text-black text-base leading-[24px] mb-6">
              <strong>What&apos;s next?</strong>
              <br />
              Our team will be in touch shortly regarding delivery or pickup.
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

export default PurchaseReceipt;
