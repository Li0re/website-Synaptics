import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  referral: string;
  favoriteMedia?: string;
}

const budgetLabels: Record<string, string> = {
  "less-than-10k": "Less than €10k",
  "10k-30k": "€10k - €30k",
  "30k-60k": "€30k - €60k",
  "60k-100k": "€60k - €100k",
  "100k-plus": "€100k+",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.projectType || !formData.description || !formData.budget || !formData.timeline || !formData.referral) {
      throw new Error("Missing required fields");
    }

    const budgetDisplay = budgetLabels[formData.budget] || formData.budget;

    // Create structured email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Project Inquiry</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #10b981; padding: 24px; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 4px; }
            .value { font-size: 16px; color: #111; }
            .description { background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; }
            .divider { border-top: 1px solid #e5e7eb; margin: 24px 0; }
            .footer { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 New Project Inquiry</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${formData.company}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="field">
              <div class="label">Project Type</div>
              <div class="value">${formData.projectType}</div>
            </div>
            
            <div class="field">
              <div class="label">Project Description</div>
              <div class="description">${formData.description}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="field">
              <div class="label">Budget Expectation</div>
              <div class="value">${budgetDisplay}</div>
            </div>
            
            <div class="field">
              <div class="label">Timeline Expectation</div>
              <div class="value">${formData.timeline}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="field">
              <div class="label">How They Found Us</div>
              <div class="value">${formData.referral}</div>
            </div>
            
            ${formData.favoriteMedia ? `
            <div class="field">
              <div class="label">Favorite Movie or Album</div>
              <div class="value">${formData.favoriteMedia}</div>
            </div>
            ` : ''}
            
            <div class="footer">
              This inquiry was submitted through the Synaptics website contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Synaptics Contact Form <onboarding@resend.dev>",
      to: ["hello@synaptics.fr"],
      subject: `New Project Inquiry from ${formData.name} - ${formData.company}`,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
