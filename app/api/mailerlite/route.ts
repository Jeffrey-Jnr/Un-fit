import { NextResponse } from "next/server";
import { Resend } from "resend";
import NewsletterWelcome from "@/emails/NewsletterWelcome";
import WaitlistWelcome from "@/emails/WaitlistWelcome";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, name, type } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    // Support either single name or first/last
    const fullName = firstName ? `${firstName} ${lastName || ''}`.trim() : (name || "");
    const displayName = firstName || name || "Friend";

    const apiKey = process.env.MAILERLITE_API_KEY;
    
    if (apiKey) {
      // Connect to MailerLite API
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name: fullName,
          },
        }),
      });

      if (!response.ok) {
        console.error("MailerLite error:", await response.json());
      }
    } else {
      console.warn("MAILERLITE_API_KEY is not set. Skipping MailerLite.");
    }

    // Send the appropriate Resend email based on signup type
    if (process.env.RESEND_API_KEY) {
      if (type === "waitlist") {
        await resend.emails.send({
          from: "Jeffrey Hughes <info@unfitbook.com>",
          to: [email],
          subject: "You're on the list — (un)Fit is coming soon!",
          react: WaitlistWelcome({ subscriberName: displayName }),
        });
      } else {
        await resend.emails.send({
          from: "Jeffrey Hughes <info@unfitbook.com>",
          to: [email],
          subject: "Welcome to the community!",
          react: NewsletterWelcome({ subscriberName: displayName }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
