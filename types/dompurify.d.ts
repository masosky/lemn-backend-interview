declare module "isomorphic-dompurify" {
  interface DOMPurifyI {
    sanitize(dirty: string | Node): string;
    sanitize(dirty: string | Node, cfg: Config): string | TrustedHTML;
  }

  interface Config {
    ALLOWED_TAGS?: string[];
    ALLOWED_ATTR?: string[];
    FORBID_TAGS?: string[];
    FORBID_ATTR?: string[];
    KEEP_CONTENT?: boolean;
    [key: string]: any;
  }

  const DOMPurify: DOMPurifyI;
  export default DOMPurify;
}
