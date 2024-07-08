import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "*.mjs",
        "build/**/*"
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
)), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            JSX: true,
        },

        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/no-non-null-assertion": 0,
        "arrow-parens": ["error", "always"],
        "no-undef": ["error"],
        "no-unused-vars": 0,

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "space-before-blocks": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "always"],

        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "space-infix-ops": ["error", {
            int32Hint: false,
        }],

        "jsx-quotes": ["error", "prefer-double"],

        "arrow-spacing": [2, {
            before: true,
            after: true,
        }],

        "max-len": ["error", {
            code: 120,
            tabWidth: 2,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
        }],

        semi: ["error", "always"],
        "no-dupe-keys": "error",

        quotes: ["warn", "single", {
            avoidEscape: true,
        }],

        "@typescript-eslint/no-unused-vars": 2,

        "@typescript-eslint/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/comma-dangle": ["error", "only-multiline"],
        "implicit-arrow-linebreak": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "security/detect-object-injection": 0,
        "no-case-declarations": 0,
        "no-ternary": 2,

        "@typescript-eslint/type-annotation-spacing": ["warn", {
            before: true,
            after: true,
        }],

        "key-spacing": ["error", {
            beforeColon: false,
            afterColon: true,
        }],
    },
}];