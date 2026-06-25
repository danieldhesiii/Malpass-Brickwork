declare module "splitting" {
  interface SplittingOptions {
    target?: string | Element | NodeListOf<Element> | Element[];
    by?: string;
    key?: string | null;
    matching?: string;
    image?: boolean | string;
    whitespace?: boolean;
  }
  interface SplittingResult {
    el: Element;
    words?: HTMLElement[];
    chars?: HTMLElement[];
    lines?: HTMLElement[][];
    [key: string]: unknown;
  }
  function Splitting(options?: SplittingOptions): SplittingResult[];
  export default Splitting;
}
