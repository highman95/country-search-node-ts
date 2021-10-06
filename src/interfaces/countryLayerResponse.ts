interface CountryLayerError {
  code: number;
  type: string;
  info: string;
}

// enum ErrorCode {
//   404_not_found= "nn",
//   invalid_access_key="",
//   invalid_api_function="",
//   usage_limit_reached =
// }

export interface CountryLayerErrorResponse {
  success: boolean;
  error: CountryLayerError;
}

// tslint:disable-next-line: no-empty-interface
export interface CountryLayerSuccessResponse {}
