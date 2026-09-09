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
  Hr,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface AdminNewOrderProps {
  orderReference: string;
  customerName: string;
  customerEmail: string;
  quantity: number;
  amount: string;
}

export const AdminNewOrder = ({
  orderReference = "ORD_123456",
  customerName = "John Doe",
  customerEmail = "john@example.com",
  quantity = 1,
  amount = "180.00",
}: AdminNewOrderProps) => (
  <Html>
    <Head>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`}
      </style>
    </Head>
    <Preview>New order received: {orderReference}</Preview>
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
          
          <Section className="px-10 py-10">
            <Heading className="text-[24px] font-bold text-black m-0 mb-6">
              🎉 New Physical Order!
            </Heading>

            <Text className="text-black text-base leading-[24px] mb-8">
              Someone just purchased a physical copy of (un)Fit. You need to arrange fulfillment for this order.
            </Text>

            <Section className="my-8">
              <Hr className="border-gray-200 mb-8" />
              
              <Heading className="text-black text-[16px] font-bold m-0 mb-6 uppercase tracking-wider">
                Customer Details
              </Heading>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-gray-500 text-sm">Name</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-black font-medium text-sm">
                    {customerName}
                  </Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-gray-500 text-sm">Email</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-black font-medium text-sm">
                    <a href={`mailto:${customerEmail}`} className="text-[#F05522] no-underline">
                      {customerEmail}
                    </a>
                  </Text>
                </Column>
              </Row>
              
              <Hr className="border-gray-200 my-6" />

              <Heading className="text-black text-[16px] font-bold m-0 mb-6 uppercase tracking-wider mt-6">
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

            <Text className="text-gray-500 text-sm leading-[24px] mt-6">
              Log into your admin dashboard to mark this order as shipped and notify the customer.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default AdminNewOrder;
