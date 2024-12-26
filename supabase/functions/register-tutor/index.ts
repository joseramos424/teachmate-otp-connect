import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting tutor registration process");
    const { email } = await req.json();
    const password = Math.random().toString(36).slice(-8);

    console.log("Creating Supabase client");
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.log("Attempting to sign up user");
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'tutor',
        },
      },
    });

    if (signUpError) {
      console.error("Error signing up user:", signUpError);
      throw signUpError;
    }

    console.log("User signed up successfully, sending email");
    // Enviar correo con la contraseña
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "Tu cuenta de tutor ha sido creada",
        html: `
          <h1>Bienvenido al sistema de tutoría</h1>
          <p>Tu cuenta ha sido creada exitosamente.</p>
          <p>Tu contraseña temporal es: <strong>${password}</strong></p>
          <p>Por favor, cambia tu contraseña después de iniciar sesión por primera vez.</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Error sending email. Status:", res.status);
      const errorText = await res.text();
      console.error("Error details:", errorText);
      throw new Error("Error al enviar el correo: " + errorText);
    }

    const emailData = await res.json();
    console.log("Email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ message: "Tutor registrado exitosamente" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in register-tutor function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});