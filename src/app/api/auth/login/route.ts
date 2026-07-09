import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyPassword, encryptSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Consultar o participante no banco
    const result = await pool.query(
      "SELECT id, name, email, ticket, institution, password_hash FROM registrations WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    if (!user.password_hash) {
      return NextResponse.json(
        { error: "Esta inscrição foi realizada sem senha. Por favor, faça um novo cadastro." },
        { status: 401 }
      );
    }

    // Verificar se a senha confere
    const isPasswordValid = verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    // Gerar os dados da sessão
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    
    const sessionToken = encryptSession(sessionData);

    const response = NextResponse.json(
      { message: "Login realizado com sucesso!", user: sessionData },
      { status: 200 }
    );

    // Definir o cookie HTTP-only seguro contendo a sessão criptografada
    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/"
    });

    return response;
  } catch (error: any) {
    console.error("Erro na rota de login:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao realizar o login." },
      { status: 500 }
    );
  }
}
