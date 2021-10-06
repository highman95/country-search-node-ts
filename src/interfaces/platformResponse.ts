export default interface PlatformResponse<T> {
  status: boolean;
  message: string;
  data?: T[] | object;
}
