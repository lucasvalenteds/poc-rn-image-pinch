import * as Http from "http";
import * as FS from "fs";
import * as Path from "path";
import * as Url from "url";
import * as QueryString from "querystring";

export const Server = Http.createServer((request, response) => {
  const url = Url.parse(request.url as string, true);
  const { extension } = (url.query as unknown) as QueryString.ParsedUrlQuery;

  const imagePath = Path.resolve("images", "image." + extension);

  FS.readFile(imagePath, { flag: "r" }, (error, image: Buffer) => {
    if (error) {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: "Could not read image from path " + imagePath,
        })
      );
    } else {
      response.setHeader("Content-Type", "image/" + extension);
      response.statusCode = 200;
      response.end(image);
    }
  });
});
