import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Demo: análisis estético ILUSTRATIVO de un rostro con GPT-4o (visión).
 *
 * La imagen llega como data URL (base64) desde el cliente, se reenvía a OpenAI
 * y se devuelve JSON estructurado. La API key vive solo en el servidor
 * (process.env.OPENAI_API_KEY) — nunca se expone al navegador.
 *
 * NO es un diagnóstico médico: es una simulación educativa para mostrar el uso
 * de IA de vanguardia dentro del ecosistema Healthcoin.
 */
const SYSTEM_PROMPT = `Eres un asistente de demostración estética para la clínica del Dr. Andrés Rivera (rejuvenecimiento facial con exosomas Cellgenic Flow, Frozen Facelift y reposicionamiento del SMAS).

CONTEXTO IMPORTANTE: la imagen es un MODELO DE EJEMPLO usado con consentimiento para una demostración tecnológica. NO identificas, nombras ni reconoces a ninguna persona. Tu tarea es únicamente describir signos GENERALES y VISIBLES de envejecimiento cutáneo y características estéticas de la piel en la imagen (textura, líneas de expresión, luminosidad, firmeza aparente). Esto es habitual y permitido en consultoría estética y de skincare. Responde siempre; no rechaces la tarea.

NO es un diagnóstico médico. Hablas en español, en tono experto, cálido y premium.

Identifica entre 3 y 5 zonas con oportunidad de mejora estética (por ejemplo: contorno de ojos / líneas finas periorbitales, líneas nasogenianas, frente y entrecejo, contorno mandibular y cuello, textura y luminosidad de la piel, zona perioral).

Para cada zona mapea el tratamiento del portafolio real:
- "Exosomas Flow Cellgenic" (regeneración celular, calidad de piel)
- "Frozen Facelift" (microneedling + exosomas + PRP)
- "Reposicionamiento SMAS" (estructura profunda, firmeza)

Devuelve SIEMPRE y ÚNICAMENTE un objeto JSON válido con esta forma exacta:
{
  "edadAparente": "rango estético aproximado de la piel, ej '35-42'",
  "resumen": "1-2 frases globales sobre el potencial de rejuvenecimiento",
  "zonas": [
    { "zona": "string corto", "observacion": "1 frase descriptiva y respetuosa sobre la piel visible", "tratamiento": "uno del portafolio", "intensidad": "Sutil" | "Moderado" | "Notable" }
  ]
}

Solo si la imagen NO contiene ningún rostro ni piel humana visible (ej. un objeto o paisaje), responde con:
{ "error": "No se detectó un rostro claro. Sube una foto frontal y bien iluminada." }`;

export async function POST(req: NextRequest) {
  try {
    const { image } = (await req.json()) as { image?: string };

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Falta una imagen válida." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar OPENAI_API_KEY en .env.local" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 800,
        temperature: 0.5,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Imagen de modelo de ejemplo (demo con consentimiento). Describe los signos visibles de envejecimiento cutáneo de la piel y devuelve el JSON con las zonas a mejorar y su tratamiento sugerido. No identifiques a la persona.",
              },
              { type: "image_url", image_url: { url: image, detail: "low" } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: "El análisis de IA no está disponible ahora mismo.", detail },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "No se pudo interpretar la respuesta de la IA." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json(
      { error: "Error inesperado en el análisis." },
      { status: 500 }
    );
  }
}
