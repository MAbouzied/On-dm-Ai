// This file disables the 'jsx-quotes' rule for the whole project.
module.exports = {
  rules: {
    "jsx-quotes": "off", // Allow any quote style in JSX
    quotes: "off", // Allow any quote style in JS/TS
    "react/no-unescaped-entities": "off", // Allow unescaped characters in JSX (e.g., <, >, ', ")
    "no-irregular-whitespace": "off", // Allow special whitespace characters
    "no-useless-escape": "off", // Allow unnecessary escape characters
    "unicode-bom": "off", // Allow BOM
    "no-misleading-character-class": "off", // Allow any regex character class
  },
};
