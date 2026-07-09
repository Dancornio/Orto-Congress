import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório para busca." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Buscar participante no banco de dados
    const userResult = await pool.query(
      "SELECT id, name, email, ticket FROM registrations WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Participante não encontrado para este e-mail." },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Buscar os minicursos inscritos deste participante
    const minicursosResult = await pool.query(
      "SELECT minicurso_id FROM minicurso_registrations WHERE registration_id = $1",
      [user.id]
    );

    // Mapear IDs para os nomes corretos dos minicursos
    const minicursosMap: Record<number, string> = {
      1: "Introdução aos Implantes",
      2: "Materiais Biocompatíveis"
    };

    const minicursosInscritos = minicursosResult.rows
      .map((row) => minicursosMap[row.minicurso_id as number])
      .filter((name): name is string => name !== undefined);

    return NextResponse.json(
      {
        name: user.name,
        email: user.email,
        ticket: user.ticket,
        minicursos: minicursosInscritos
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Erro na busca de certificados:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao consultar certificados." },
      { status: 500 }
    );
  }
}
