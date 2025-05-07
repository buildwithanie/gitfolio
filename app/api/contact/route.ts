import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Initialize Nodemailer transporter with Gmail settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true" ? true : false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    // Log environment variables for debugging
    console.log("Environment variables check:", {
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || "587",
      secure: process.env.EMAIL_SECURE || "false",
      userDefined: Boolean(process.env.EMAIL_USER),
      passDefined: Boolean(process.env.EMAIL_PASSWORD),
    })

    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    console.log("Attempting to send email:", { name, email, message })

    // Send email without verifying transporter first
    const info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: "buildwithanie@gmail.com", // Your email address
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
---
Reply directly to this email to respond to ${name}.
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name} (${email})</p>
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-line;">${message}</p>
  <hr style="border: 1px solid #eee; margin: 20px 0;">
  <p style="color: #666; font-size: 14px;">You can reply directly to this email to respond to ${name}.</p>
</div>
      `,
    })

    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error: unknown) {
    let errorMessage = "Failed to send email"
    if (error instanceof Error) {
      console.error("Error sending email:", error.message)
      errorMessage = error.message
    } else {
      console.error("Error sending email:", error)
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
