import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export const alt =
  "Dr. Andrés Rivera — Longevidad & Rejuvenecimiento Facial · Palmas Campestre IPS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const coin = readFileSync(join(process.cwd(), "public/healthcoin-coin.png"));
  const coinSrc = `data:image/png;base64,${coin.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0b0907",
          backgroundImage:
            "radial-gradient(900px circle at 78% 28%, rgba(240,144,42,0.28), rgba(240,144,42,0) 60%)",
          padding: "84px",
          position: "relative",
        }}
      >
        {/* Línea de acento superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, #a9762f, #e0a64e, #f0902a)",
          }}
        />

        {/* Moneda */}
        <img
          src={coinSrc}
          width={150}
          height={150}
          style={{ position: "absolute", top: 74, right: 84 }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e0a64e",
            marginBottom: 24,
          }}
        >
          Cirujano Plástico · Longevidad Celular
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#f4efe7",
            lineHeight: 1.05,
          }}
        >
          Dr. Andrés Rivera
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#f5cd86",
            marginTop: 18,
          }}
        >
          Ingeniería quirúrgica y rejuvenecimiento facial avanzado
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 56,
          }}
        >
          <div
            style={{ width: 56, height: 3, backgroundColor: "#e0a64e" }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#b9b1a4",
              marginLeft: 20,
            }}
          >
            Palmas Campestre IPS · Medellín · Healthcoin
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
