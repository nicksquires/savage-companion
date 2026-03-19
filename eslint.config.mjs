import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Prevents passing async functions to places that expect sync callbacks.
      // Example bug:
      //   array.forEach(async item => await save(item))  // ❌ promises ignored
      // Correct approaches:
      //   for (const item of array) await save(item)
      //   await Promise.all(array.map(item => save(item)))

      // "@typescript-eslint/no-misused-promises": "error",

      // Prevents calling async functions without awaiting them.
      // Example bug:
      //   prisma.power.create({ data })   // ❌ promise ignored
      // Correct:
      //   await prisma.power.create({ data })
      // If intentionally ignoring:
      //   void someAsyncTask()

      // "@typescript-eslint/no-floating-promises": "error",

      // Forces `import type` when importing types so they are erased from JS output.
      // Helps reduce bundle size and prevents accidental runtime imports.
      // Example:
      //   import type { Power } from "@prisma/client"
      // instead of:
      //   import { Power } from "@prisma/client"

      // "@typescript-eslint/consistent-type-imports": [
      //   "warn",
      //   { prefer: "type-imports" }
      // ],

      // Requires explicit boolean checks instead of relying on truthy/falsy values.
      // Helps prevent Prisma typing issues like `string | undefined`.
      // Example bug:
      //   if (ownerId) { ... }   // ❌ ambiguous
      // Correct:
      //   if (ownerId !== undefined) { ... }

      // "@typescript-eslint/strict-boolean-expressions": [
      //   "warn",
      //   {
      //     allowString: false,
      //     allowNumber: false,
      //     allowNullableObject: false
      //   }
      // ],

      // Ensures every possible enum/union case is handled in a switch statement.
      // Extremely useful with Prisma enums like Rank.
      // Example:
      //
      //   type Rank = "Novice" | "Seasoned" | "Veteran";
      //
      //   function getBonus(rank: Rank) {
      //     switch(rank) {
      //       case "Novice": return 1;
      //       case "Seasoned": return 2;
      //       case "Veteran": return 3;
      //       // If a new Rank like "Heroic" is added later,
      //       // ESLint will error until it is handled here.
      //     }
      //   }

      // "@typescript-eslint/switch-exhaustiveness-check": "error",


      // Prevents subtle async error-handling issues in API handlers.
      // Ensures proper stack traces and error propagation.
      //
      // Example bug:   return prisma.power.create(...)
      // Better:        return await prisma.power.create(...)
      // 
      // @typescript-eslint/return-await
    },
  },
];

export default eslintConfig;
