import { render } from '@react-email/render';
import { PurchaseReceipt } from '@/emails/PurchaseReceipt';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';

async function generate() {
  const html = await render(
    <PurchaseReceipt 
      customerName="John Doe" 
      orderReference="ORD_987654" 
      amount="180.00" 
      quantity={1} 
    />
  );
  
  const outputPath = path.join(process.cwd(), 'public', 'email-preview.html');
  fs.writeFileSync(outputPath, html);
  console.log('Email HTML generated successfully at public/email-preview.html');
}

generate();
