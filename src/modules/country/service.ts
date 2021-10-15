import axios from "axios";
import Country from "../../interfaces/country";

class CountryService {
  async getCountriesByName(name: string): Promise<Country[]> {
    if (name === "" || name.trim() === "") {
      throw new Error("Country-name is required");
    }

    let response;
    try {
      response = await axios.get(
        `/v2/name/${name}?access_key=${process.env.COUNTRY_LAYER_API_KEY}`,
        {
          baseURL: process.env.COUNTRY_LAYER_BASE_URL,
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // console.error(`Axios-error: ${JSON.stringify(e, null, 2)}`);
        if (["ETIMEDOUT", "ENOTFOUND"].includes(e.code!)) {
          throw new Error("Temporarily unable to connect to service-provider");
        }
        // handleAxiosError(e);
      } else {
        // console.error(`Other-error: ${JSON.stringify(e, null, 2)}`);
        // handleUnexpectedError(e);
      }

      throw e;
    }

    // const { status, statusText } = response;
    return response.data as Country[];
  }
}

export default new CountryService();
