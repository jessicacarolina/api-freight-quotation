declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    PORT: number
    DB_USER: string
    DB_HOST: string
    DB_NAME: string
    DB_PASSWORD: string
    DB_PORT: number
    CNPJ: string
    TOKEN: string
    PLATFORM_CODE: string
  }
}