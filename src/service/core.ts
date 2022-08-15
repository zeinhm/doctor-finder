import { FetchProps } from "@/utils/interfaces";

const BASE_URL = "https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc";

class CoreService {
  fetch = async (
    path = "/",
    method = "GET",
    { body, params, headers, ...opts }: FetchProps = {}
  ) => {
    try {
      const resp = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          Accept: "application/json",
          ...headers,
        },
        body,
        ...opts,
      });

      let jsonBody = await resp?.json();

      if (!resp?.ok) {
        return await Promise.reject(jsonBody);
      }

      return await Promise.resolve({ ...jsonBody });
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  fetchDoctors = async () => this.fetch("/", "GET");
}

export const client = new CoreService();
