import { sendRequest } from "./requester.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REQUESTS_FILE = path.join(__dirname, "../requests.json");

export function getRequest(url, headers) {
  sendRequest("GET", url, null, headers);
}

export function postRequest(url, body, headers) {
  sendRequest("POST", url, body, headers);
}

export function saveRequest(name, url, options) {
  const newRequest = {
    name,
    url,
    method: options.method.toUpperCase(),
    body: options.body || null,
    headers: options.header || [],
  };

  let requests = [];
  if (fs.existsSync(REQUESTS_FILE)) {
    requests = JSON.parse(fs.readFileSync(REQUESTS_FILE, "utf-8"));
  }

  requests.push(newRequest);
  fs.writeFileSync(REQUESTS_FILE, JSON.stringify(requests, null, 2));

  console.log(chalk.green(`\nSaved request as "${name}"`));
}

export function runRequest(name) {
  if (!fs.existsSync(REQUESTS_FILE)) {
    console.log(chalk.red("\nNo saved requests found."));
    return;
  }

  const requests = JSON.parse(fs.readFileSync(REQUESTS_FILE, "utf-8"));
  const request = requests.find((req) => req.name === name);

  if (!request) {
    console.log(chalk.red(`\nRequest "${name}" not found.`));
    return;
  }

  sendRequest(request.method, request.url, request.body, request.headers);
}
