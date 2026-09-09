import { render } from '@react-email/render';
import { NewsletterWelcome } from './emails/NewsletterWelcome';
import { WaitlistWelcome } from './emails/WaitlistWelcome';
import { OrderStatusUpdate } from './emails/OrderStatusUpdate';
import { ReviewRequest } from './emails/ReviewRequest';
import { AdminNewOrder } from './emails/AdminNewOrder';
import { PurchaseReceipt } from './emails/PurchaseReceipt';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';

async function generate() {
  const publicDir = path.join(process.cwd(), 'public');
  
  const templates = [
    {
      name: 'NewsletterWelcome',
      component: <NewsletterWelcome />
    },
    {
      name: 'WaitlistWelcome',
      component: <WaitlistWelcome subscriberName="Jane" />
    },
    {
      name: 'OrderStatusUpdate-Shipped',
      component: <OrderStatusUpdate customerName="John Doe" orderReference="ORD_987654" status="Shipped" trackingInfo="Delivery expected in 1-3 business days." />
    },
    {
      name: 'OrderStatusUpdate-Delivered',
      component: <OrderStatusUpdate customerName="John Doe" orderReference="ORD_987654" status="Delivered" trackingInfo="" />
    },
    {
      name: 'ReviewRequest',
      component: <ReviewRequest customerName="John Doe" />
    },
    {
      name: 'AdminNewOrder',
      component: <AdminNewOrder orderReference="ORD_987654" customerName="John Doe" customerEmail="john@example.com" quantity={1} amount="180.00" />
    },
    {
      name: 'PurchaseReceipt',
      component: <PurchaseReceipt customerName="John Doe" orderReference="ORD_987654" amount="180.00" quantity={1} />
    }
  ];

  for (const template of templates) {
    const html = await render(template.component);
    const outputPath = path.join(publicDir, `preview-${template.name}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`Generated ${template.name} at public/preview-${template.name}.html`);
  }
}

generate();
