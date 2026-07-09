import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Forçar Next.js a não cachear este endpoint (deve ser dinâmico)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM registrations");
    const count = parseInt(result.rows[0].total || "0", 10);
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao obter contador de inscrições:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
