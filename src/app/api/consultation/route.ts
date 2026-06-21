import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, bottleneck } = body;

    // Validate required fields
    if (!name || !company || !email || !phone || !bottleneck) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.NOTIFICATION_EMAIL || "tumisangmakoba@gmail.com";

    console.log(`[Consultation Submission Received]:`, {
      name,
      company,
      email,
      phone,
      bottleneck,
    });

    if (apiKey) {
      // 1. Add Contact to Brevo Contacts list (optional list ID can be defined)
      const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : undefined;
      
      const createContactResponse = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name.split(" ")[0] || "",
            LASTNAME: name.split(" ").slice(1).join(" ") || "",
            COMPANY: company,
            SMS: phone,
          },
          ...(listId ? { listIds: [listId] } : {}),
          updateEnabled: true,
        }),
      });

      if (!createContactResponse.ok) {
        console.error("Failed to register contact in Brevo:", await createContactResponse.text());
      }

      // 2. Send SMTP Notification to Owner
      const sendEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: { name: "Fez Digital Form", email: "no-reply@fez.digital" },
          to: [{ email: recipientEmail, name: "Tumisang" }],
          subject: `New Lead: ${name} (${company})`,
          htmlContent: `
            <h3>New Consultation Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Current Bottleneck:</strong></p>
            <blockquote style="background: #f3f4f6; padding: 10px; border-left: 4px solid #7c3aed;">
              ${bottleneck.replace(/\n/g, "<br>")}
            </blockquote>
          `,
        }),
      });

      if (!sendEmailResponse.ok) {
        console.error("Failed to send SMTP email via Brevo:", await sendEmailResponse.text());
      }
    } else {
      console.log("Brevo API Key not set. Gracefully fell back to mock local success state.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
