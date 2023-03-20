declare module "expect" {
  export * from "expect/build/index";
  import { Matchers as OriginalMatchers } from "expect/build/index";

  export declare interface Matchers<R extends void | Promise<void>, T = unknown>
    extends OriginalMatchers<R, T> {
    toRNStyle: (expected?: Record<string, unknown>) => R;
  }
}
