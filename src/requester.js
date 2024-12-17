import axios from "axios";
import chalk from "chalk";

export async function sendRequest(method, url, body, headers) {
  try {
    console.log(chalk.yellow(`\nSending ${method} request to ${url}...\n`));

    const config = {
      method,
      url,
      headers: parseHeaders(headers),
      data: body ? JSON.parse(body) : null,
    };

    const response = await axios(config);

    console.log(chalk.green("Response:"));
    console.log(JSON.stringify(response.data, null, 2));
    console.log(chalk.blue(`\nStatus: ${response.status} (${response.statusText})`));
  } catch (error) {
    console.log(chalk.red("\nError:"));
    if (error.response) {
      console.log(chalk.red(`Status: ${error.response.status}`));
      console.log(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

function parseHeaders(headerArray) {
  const headers = {};
  if (headerArray) {
    headerArray.forEach((header) => {
      const [key, value] = header.split(":");
      headers[key.trim()] = value.trim();
    });
  }
  return headers;
}
