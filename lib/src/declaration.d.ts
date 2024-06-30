declare module "*.module.css";
declare module "*.module.scss";
declare module "*.glsl" {
  const value: string;
  export default value;
}
declare module "*.glsl?raw" {
  const value: string;
  export default value;
}
