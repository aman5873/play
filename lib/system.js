import Hashids from "hashids";

const hashids = new Hashids("playhub-2025-salt", 4); // shortened

export function encodeUUID(uuid) {
  if (!uuid) return "";

  const parts = uuid.replace(/-/g, "").match(/.{1,8}/g);
  const numbers = parts.map((p) => parseInt(p, 16));

  return hashids.encode(numbers);
}

export function decodeUUID(id) {
  if (!id) return null;

  // 1. If it's already a valid UUID → return as-is
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (uuidRegex.test(id)) {
    return id; // Do NOT try to decode normal UUIDs
  }

  // 2. Try decoding the hashid safely
  try {
    const numbers = hashids.decode(id);

    if (!Array.isArray(numbers) || numbers.length === 0) {
      return null; // Invalid hash
    }

    const hex = numbers.map((n) => n.toString(16).padStart(8, "0")).join("");

    if (hex.length !== 32) return null;

    return hex.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  } catch (err) {
    return null; // NEVER throw → silent return
  }
}
