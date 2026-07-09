import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decryptSession } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const decrypted = decryptSession(sessionToken);
    if (!decrypted || !decrypted.id) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    // Buscar dados atualizados do banco (excluindo a senha hash)
    const result = await pool.query(
      "SELECT id, name, email, ticket, institution, created_at FROM registrations WHERE id = $1",
      [decrypted.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erro na rota /api/auth/me:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
