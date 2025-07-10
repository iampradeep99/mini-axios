declare module 'mini-axios' {
  interface Response<T = any> {
    status: number;
    headers: Record<string, string | string[]>;
    data: T;
  }

  interface Options {
    headers?: Record<string, string>;
    data?: any;
  }

  export function get<T = any>(url: string, options?: Options): Promise<Response<T>>;
  export function post<T = any>(url: string, options?: Options): Promise<Response<T>>;
  export function put<T = any>(url: string, options?: Options): Promise<Response<T>>;
  export function del<T = any>(url: string, options?: Options): Promise<Response<T>>;
}
