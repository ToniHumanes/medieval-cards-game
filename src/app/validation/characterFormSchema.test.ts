import { describe, expect, it } from "vitest";
import {
  characterFormSchema,
  REQUIRED_FIELD_MESSAGE,
} from "./characterFormSchema";

describe("characterFormSchema", () => {
  it("rejects empty values", () => {
    const result = characterFormSchema.safeParse({
      inputValue: "",
      selectValue: "0",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toEqual([
        REQUIRED_FIELD_MESSAGE,
        REQUIRED_FIELD_MESSAGE,
      ]);
    }
  });

  it("accepts a name and valid warrior type", () => {
    const result = characterFormSchema.safeParse({
      inputValue: "Arthur",
      selectValue: "1",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        inputValue: "Arthur",
        selectValue: "1",
      });
    }
  });
});
