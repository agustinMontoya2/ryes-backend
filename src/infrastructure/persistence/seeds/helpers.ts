import { Logger } from "@nestjs/common";

export function formatSeederLog(
  seederClassName: string,
  phase: string,
  detail: string,
): string {
  return `[seeder][${seederClassName}][${phase}] ${detail}`;
}

export function seederLogger(seederClassName: string): Logger {
  return new Logger(seederClassName);
}
