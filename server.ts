import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers with increased limits for handling large base64 screenshot uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // =========================================================================
  // SERVER-SIDE CONTACT ROUTE (BYPASSES CORS & CLIENT-SIDE AD-BLOCKERS)
  // =========================================================================
  app.post("/api/contact", async (req: express.Request, res: express.Response) => {
    const { name, email, message } = req.body;

    // Filter relevant keys for environment diagnostics
    const envKeys = Object.keys(process.env).filter(key => 
      key.includes("EMAILJS") || 
      key.includes("FORMSPREE") || 
      key.includes("SMTP") || 
      key.includes("ZOHO") || 
      key.includes("MAIL")
    );

    console.log("\n=============================================");
    console.log("[SERVER AUDIT] Contact Form Submission Ingress");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Payload:", { name, email, message });
    console.log("Available related env keys:", envKeys);
    console.log("=============================================\n");

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing mandatory fields in submission (name, email, or message)."
      });
    }

    const targetEmail = "bajajsarthak97@gmail.com";
    let success = false;
    let isPendingActivation = false;
    let relayProviderUsed = "None";
    let detailMessage = "";

    // -- PATH 0: DIRECT SMTP ZOHO MAIL (Highly reliable, premium direct route) --
    // Supports SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT or custom ZOHO variables
    const smtpUser = process.env.SMTP_USER || process.env.ZOHO_USER || process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASS || process.env.ZOHO_PASS || process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.zoho.in"; // Defaults to Zoho India since domain is zohomail.in
    const smtpPortNum = parseInt(process.env.SMTP_PORT || "465", 10);

    if (smtpUser && smtpPass) {
      try {
        console.log(`[SERVER AUDIT] Attempting Path 0: SMTP Zoho Direct Mail transmission using host: ${smtpHost}:${smtpPortNum}...`);
        
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPortNum,
          secure: smtpPortNum === 465, // true for port 465, false for 587
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          timeout: 4000 // 4 seconds timeout
        } as any);

        // Send mail with HTML and plain text options
        const info = await transporter.sendMail({
          from: `"${name}" <${smtpUser}>`, // Zoho SMTP usually requires the auth user to be the sender
          to: targetEmail,
          replyTo: email,
          subject: `Portfolio Contact: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `<p><strong>Feedback received from portfolio!</strong></p>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                 <hr/>
                 <p><strong>Message:</strong></p>
                 <p style="white-space: pre-wrap;">${message}</p>`
        });

        console.log("[SERVER AUDIT] SMTP Zoho Direct Mail successful. MessageId:", info.messageId);
        success = true;
        relayProviderUsed = "Zoho SMTP";
      } catch (err: any) {
        console.warn("[SERVER AUDIT] Path 0 (Zoho SMTP) failed:", err.message || err);
        detailMessage = `SMTP failure: ${err.message || err}`;
      }
    }

    // -- PATH 1: EMAILJS REST API --
    // Supports keys both with and without VITE_ prefix as failover
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!success && emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        console.log(`[SERVER AUDIT] Attempting Path 1: EmailJS REST API dispatch...`);
        const emailjsUrl = "https://api.emailjs.com/api/v1.0/email/send";
        const emailJsPayload = {
          service_id: emailjsServiceId,
          template_id: emailjsTemplateId,
          user_id: emailjsPublicKey,
          template_params: {
            from_name: name,
            from_email: email,
            message: message,
            to_email: targetEmail,
            reply_to: email
          }
        };

        const response = await fetch(emailjsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(emailJsPayload),
          signal: (AbortSignal as any).timeout ? (AbortSignal as any).timeout(4000) : undefined
        });

        const rText = await response.text();
        console.log("[SERVER AUDIT] EmailJS REST API HTTP status:", response.status, rText);

        if (response.ok || response.status === 200) {
          success = true;
          relayProviderUsed = "EmailJS API";
        } else {
          console.warn("[SERVER AUDIT] EmailJS REST API failed:", rText);
          detailMessage += ` | EmailJS API failure (${response.status}): ${rText}`;
        }
      } catch (err: any) {
        console.warn("[SERVER AUDIT] Path 1 (EmailJS REST API) failed:", err.message || err);
        detailMessage += ` | EmailJS REST API exception: ${err.message || err}`;
      }
    }

    // -- PATH 2: FORMSPREE VIA FORM ID --
    // Supports keys both with and without VITE_ prefix as secure server fallback
    const formspreeFormId = process.env.FORMSPREE_FORM_ID || process.env.VITE_FORMSPREE_FORM_ID;
    if (!success && formspreeFormId) {
      try {
        const formspreeUrl = `https://formspree.io/f/${formspreeFormId}`;
        console.log(`[SERVER AUDIT] Attempting Path 2: Formspree endpoint via Form ID: ${formspreeUrl}...`);
        const response = await fetch(formspreeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio Message via Formspree Form ID - ${name}`
          }),
          signal: (AbortSignal as any).timeout ? (AbortSignal as any).timeout(4000) : undefined
        });

        const rText = await response.text();
        console.log("[SERVER AUDIT] Formspree Form ID API HTTP status:", response.status, rText);

        if (response.ok) {
          success = true;
          relayProviderUsed = "Formspree (Form ID)";
        } else {
          console.warn("[SERVER AUDIT] Formspree Form ID API failed:", rText);
          detailMessage += ` | Formspree ID failure (${response.status}): ${rText}`;
        }
      } catch (err: any) {
        console.warn("[SERVER AUDIT] Path 2 (Formspree Form ID) failed:", err.message || err);
        detailMessage += ` | Formspree Form ID exception: ${err.message || err}`;
      }
    }

    // -- PATH 3: FormSubmit.co via direct target address --
    if (!success) {
      try {
        const formSubmitUrl = `https://formsubmit.co/ajax/${targetEmail}`;
        console.log(`[SERVER AUDIT] Attempting Path 3: FormSubmit Direct submit to ${formSubmitUrl}...`);
        const response = await fetch(formSubmitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio Contact - ${name}`
          }),
          signal: (AbortSignal as any).timeout ? (AbortSignal as any).timeout(4000) : undefined
        });

        const rText = await response.text();
        console.log("[SERVER AUDIT] FormSubmit HTTP status:", response.status, rText);

        if (response.ok && !rText.includes("521") && !rText.toLowerCase().includes("cloudflare")) {
          isPendingActivation = rText.toLowerCase().includes("activation") || rText.toLowerCase().includes("not set up");
          success = true;
          relayProviderUsed = "FormSubmit";
        } else {
          const isActivationWarning = rText.toLowerCase().includes("not set up") || rText.toLowerCase().includes("verify") || rText.toLowerCase().includes("activate");
          if (isActivationWarning) {
            success = true;
            relayProviderUsed = "FormSubmit";
            isPendingActivation = true;
          } else {
            console.warn("[SERVER AUDIT] FormSubmit direct failed:", rText);
            detailMessage += ` | FormSubmit direct failure: ${rText.substring(0, 100)}`;
          }
        }
      } catch (err: any) {
        console.warn("[SERVER AUDIT] Path 3 (FormSubmit direct) failed:", err.message || err);
        detailMessage += ` | FormSubmit direct exception: ${err.message || err}`;
      }
    }

    // -- PATH 4: Formspree failover direct target address --
    if (!success) {
      try {
        const formspreeUrl = `https://formspree.io/${targetEmail}`;
        console.log(`[SERVER AUDIT] Attempting Path 4: Formspree direct submit to ${formspreeUrl}...`);
        const response = await fetch(formspreeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio Failover Contact - ${name}`
          }),
          signal: (AbortSignal as any).timeout ? (AbortSignal as any).timeout(4000) : undefined
        });

        const rText = await response.text();
        console.log("[SERVER AUDIT] Formspree Direct HTTP status:", response.status, rText);

        if (response.ok) {
          success = true;
          relayProviderUsed = "Formspree (Direct)";
          isPendingActivation = rText.toLowerCase().includes("activate") || rText.toLowerCase().includes("confirmation");
        } else {
          const isActivationWarning = rText.toLowerCase().includes("activate") || rText.toLowerCase().includes("confirm") || rText.toLowerCase().includes("unregistered");
          if (isActivationWarning) {
            success = true;
            relayProviderUsed = "Formspree (Direct)";
            isPendingActivation = true;
          } else {
            console.warn("[SERVER AUDIT] Formspree Direct failed:", rText);
            detailMessage += ` | Formspree Direct failure: ${rText.substring(0, 100)}`;
          }
        }
      } catch (err: any) {
        console.warn("[SERVER AUDIT] Path 4 (Formspree Direct) failed:", err.message || err);
        detailMessage += ` | Formspree Direct exception: ${err.message || err}`;
      }
    }

    // Return the successful or failed relay outcomes
    if (!success) {
      console.error("[SERVER AUDIT] ALL transmission attempts failed! Error details:", detailMessage);
      return res.status(500).json({
        success: false,
        message: "We encountered transmission blocks while attempting to dispatch your message. Please reach out directly on LinkedIn or try again.",
        detail: detailMessage
      });
    }

    console.log(`[SERVER AUDIT] Dispatch successful via key provider: ${relayProviderUsed}. Pending activation status: ${isPendingActivation}`);
    return res.status(200).json({
      success: true,
      message: `Message transmitted successfully via ${relayProviderUsed}!`,
      isPendingActivation,
      provider: relayProviderUsed
    });
  });

  // =========================================================================
  // VITE SERVICE MOUNT
  // =========================================================================
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Starting Vite Dev Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Serving assets in Production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Ready. Full-Stack active on http://localhost:${PORT}`);
  });
}

startServer();
