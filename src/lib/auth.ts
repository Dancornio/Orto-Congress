import crypto from "crypto";

// Chave secreta para criptografia simétrica da sessão
const SESSION_SECRET = process.env.SESSION_SECRET || "super-secret-key-for-session-encryption-2026-ortopedia";

/**
 * Gera um hash seguro para uma senha usando PBKDF2.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifica se a senha corresponde ao hash armazenado no banco.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === originalHash;
  } catch (error) {
    console.error("Erro ao verificar senha:", error);
    return false;
  }
}

/**
 * Criptografa dados do usuário em um token de sessão usando AES-256-GCM.
 */
export function encryptSession(data: any): string {
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Descriptografa e valida um token de sessão AES-256-GCM.
 */
export function decryptSession(token: string): any | null {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return null;
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex!, "hex");
    const authTag = Buffer.from(authTagHex!, "hex");
    const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
    
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex!, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return JSON.parse(decrypted);
  } catch (error) {
    return null;
  }
}
