import axios from "axios";
import Country from "../../interfaces/country";

class CountryService {
  async getCountriesByName(name: string): Promise<Country[]> {
    if (name === "" || name.trim() === "") {
      throw new Error("Country-name is required");
    }

    // console.log(
    //   `${process.env.COUNTRY_LAYER_BASE_URL}/v2/name/${name}?access_key=${process.env.COUNTRY_LAYER_API_KEY}`
    // );
    const response = await axios.get(
      `/v2/name/${name}?access_key=${process.env.COUNTRY_LAYER_API_KEY}`,
      {
        baseURL: process.env.COUNTRY_LAYER_BASE_URL,
      }
    );
    // const { status, statusText } = response;
    return response.data as Country[];
  }
}

export default new CountryService();
