declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
  // interface Session {}
  // interface Stuff {}
}

interface ImageMeta {
  src: string;
  height: number;
  width: number;
  format: string;
}

declare module "*&meta" {
  const image: ImageMeta[];
  export default image;
}
