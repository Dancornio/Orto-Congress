import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, ticket, institution, consent, password } = body;

    // Validação básica de campos obrigatórios
    if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim() || consent === undefined || !password) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Validação de tamanho de senha
    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve conter no mínimo 6 caracteres." },
        { status: 400 }
      );
    }

    // Validação de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Endereço de e-mail inválido." },
        { status: 400 }
      );
    }

    // Validação de consentimento
    if (!consent) {
      return NextResponse.json(
        { error: "Você precisa aceitar os termos para se inscrever." },
        { status: 400 }
      );
    }

    // Verificar se o e-mail já está registrado
    const cleanEmail = email.trim().toLowerCase();
    const checkEmail = await pool.query(
      "SELECT id FROM registrations WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (checkEmail.rows.length > 0) {
      return NextResponse.json(
        { error: "Este endereço de e-mail já está inscrito." },
        { status: 400 }
      );
    }

    // Geração do hash da senha
    const passwordHash = hashPassword(password);

    // Inserção no banco de dados PostgreSQL
    const query = `
      INSERT INTO registrations (name, email, phone, ticket, institution, consent, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, email, phone, ticket, institution, consent, created_at
    `;
    const values = [
      name.trim(),
      cleanEmail,
      phone.trim(),
      ticket || "Early Bird",
      institution ? institution.trim() : null,
      !!consent,
      passwordHash
    ];

    const result = await pool.query(query, values);
    const newRegistration = result.rows[0];

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!", data: newRegistration },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro ao registrar inscrição no banco de dados:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao salvar a inscrição. Por favor, tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
