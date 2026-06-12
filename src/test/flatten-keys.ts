export function flattenKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return flattenKeys(value, path);
    }
    return [path];
  });
}

export function keyDiff(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): { onlyInLeft: string[]; onlyInRight: string[] } {
  const leftKeys = new Set(flattenKeys(left));
  const rightKeys = new Set(flattenKeys(right));

  return {
    onlyInLeft: [...leftKeys].filter((key) => !rightKeys.has(key)).sort(),
    onlyInRight: [...rightKeys].filter((key) => !leftKeys.has(key)).sort(),
  };
}
