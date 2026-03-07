import { createHttp } from "./httpRequest";

export const httpChat = createHttp(process.env.NEXT_PUBLIC_CHATURL!+"/api/v1");
export const httpActuator = createHttp(process.env.NEXT_PUBLIC_CHATURL!);
export const httpSecurity = createHttp(process.env.NEXT_PRIVATE_SECURITYURL!);