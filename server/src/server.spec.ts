import Axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { Server } from "./server";

const port = 8081;

const httpClient: AxiosInstance = Axios.create({
  baseURL: "http://localhost:" + port,
});

beforeAll(() => Server.listen(port));

afterAll(() => Server.close());

test("It returns error when image could not be found", async () => {
  try {
    await httpClient.get("/");
    fail();
  } catch (error) {
    const axiosError = error as AxiosError;
    const response: AxiosResponse<{ message: string }> = axiosError.response!;

    expect(response.status).toStrictEqual(400);
    expect(response.headers["content-type"]).toStrictEqual("application/json");
    expect(response.data.message).not.toStrictEqual("");
  }
});

test("It returns image when `extension` query parameter is informed ", async () => {
  const response: AxiosResponse = await httpClient.get("/", {
    params: {
      extension: "png",
    },
  });

  expect(response.status).toStrictEqual(200);
  expect(response.headers["content-type"]).toStrictEqual("image/png");
  expect(response.data).not.toBeNull();
});
