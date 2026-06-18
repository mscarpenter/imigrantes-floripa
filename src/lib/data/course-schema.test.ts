import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { courseDraftFileSchema } from "./course-schema";
import { courseSchema } from "./course-schema";
import { courses } from "./courses";

describe("course schemas", () => {
  it("parses the PLAc example draft", () => {
    const raw = JSON.parse(
      readFileSync(
        join(
          process.cwd(),
          "bot/drafts/courses/plac-ufsc-portugues-imigrantes.example.json",
        ),
        "utf8",
      ),
    );
    const parsed = courseDraftFileSchema.safeParse(raw);
    expect(parsed.success, JSON.stringify(parsed, null, 2)).toBe(true);
    if (parsed.success) {
      expect(parsed.data.course.status).toBe("pending_review");
    }
  });

  it("courses.json entries match courseSchema", () => {
    for (const course of courses) {
      const parsed = courseSchema.safeParse(course);
      expect(parsed.success, `course ${course.id}`).toBe(true);
    }
  });
});
