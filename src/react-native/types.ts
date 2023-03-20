import { CssColor, Declaration } from "lightningcss";

export type RNDeclaration =
  | Declaration
  | {
      property: "textShadowOffset";
      value: { width?: string | number; height?: string | number };
    }
  | {
      property: "textShadowColor";
      value: CssColor;
    }
  | {
      property: "textShadowRadius";
      value: string | number | undefined;
    };
