import config from '../config';

type JSONValue<T> =
  | string
  | number
  | boolean
  | null
  | JSONValue<T>[]
  | JSONMap<T>;
type JSONMap<T> = { [key in keyof T]: T[key] };

export interface Result<T extends JSONValue<T>> {
  data: T | null;
  error: unknown | null;
}

class HttpClient {
  baseUrl = config.apiUrl;
  cache: { [key: string]: any } = {};

  constructor(config?: { baseUrl: string }) {
    if (config) {
      this.baseUrl = config.baseUrl;
    }
  }

  async get<T extends JSONValue<T>>(url: string): Promise<Result<T>>;
  async get<T extends JSONValue<T>>(url: string): Promise<Result<T[]>>;

  async get<T extends JSONValue<T>>(url: string): Promise<Result<T | T[]>> {
    let error: unknown | null = null;
    let data: T | T[] | null = null;

    function is(arg: any): arg is T {
      return true;
    }

    try {
      let response;
      if (this.cache[url]) {
        response = this.cache[url];
      } else {
        response = await (await fetch(url)).json();
        this.cache[url] = response;
      }
      if (Array.isArray(response)) {
        data = response.filter(is);
      } else {
        data = is(response) ? response : null;
      }
    } catch (err) {
      error = err;
    }
    return { data: data, error };
  }
}

export { HttpClient };
