import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decryptSession } from "@/lib/auth";
import pool from "@/lib/db";

// GET: Obter minicursos inscritos pelo usuário autenticado
export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Você precisa estar logado." },
        { status: 401 }
      );
    }

    const decrypted = decryptSession(sessionToken);
    if (!decrypted || !decrypted.id) {
      return NextResponse.json(
        { error: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "SELECT minicurso_id FROM minicurso_registrations WHERE registration_id = $1",
      [decrypted.id]
    );

    const minicursoIds = result.rows.map((row) => row.minicurso_id);

    return NextResponse.json({ minicursos: minicursoIds }, { status: 200 });
  } catch (error) {
    console.error("Erro ao carregar minicursos inscritos:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

// POST: Inscrever o usuário autenticado em um minicurso
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Você precisa estar logado para se inscrever nos minicursos." },
        { status: 401 }
      );
    }

    const decrypted = decryptSession(sessionToken);
    if (!decrypted || !decrypted.id) {
      return NextResponse.json(
        { error: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { minicursoId } = body;

    if (minicursoId === undefined || typeof minicursoId !== "number") {
      return NextResponse.json(
        { error: "ID do minicurso inválido." },
        { status: 400 }
      );
    }

    // Validar se o ID do minicurso é válido (somente 1 e 2 são aceitos)
    if (minicursoId !== 1 && minicursoId !== 2) {
      return NextResponse.json(
        { error: "Este minicurso não existe." },
        { status: 404 }
      );
    }

    // Inserir a inscrição em minicurso (ON CONFLICT DO NOTHING evita duplicados)
    await pool.query(
      `INSERT INTO minicurso_registrations (registration_id, minicurso_id)
       VALUES ($1, $2)
       ON CONFLICT (registration_id, minicurso_id) DO NOTHING`,
      [decrypted.id, minicursoId]
    );

    return NextResponse.json(
      { message: "Inscrição no minicurso realizada com sucesso!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao inscrever em minicurso:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao realizar a inscrição." },
      { status: 500 }
    );
  }
}
