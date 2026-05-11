export function normalizePhone(raw: string) {
    return raw.replace(/[^0-9+]/g, "");
    }