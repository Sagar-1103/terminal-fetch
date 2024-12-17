#!/usr/bin/env node
import { program } from "commander";
import { getRequest, postRequest, saveRequest, runRequest } from "../src/commands.js";

program
  .version("1.0.0")
  .description("CLI API Testing Tool - Test your REST APIs from the terminal");

// GET request command
program
  .command("get <url>")
  .description("Send a GET request")
  .option("-H, --header <headers...>", "Add request headers")
  .action((url, options) => {
    getRequest(url, options.header);
  });

// POST request command
program
  .command("post <url>")
  .description("Send a POST request with JSON body")
  .option("-b, --body <body>", "Request body in JSON format")
  .option("-H, --header <headers...>", "Add request headers")
  .action((url, options) => {
    postRequest(url, options.body, options.header);
  });

// Save a request
program
  .command("save <name> <url>")
  .description("Save a request for reuse")
  .option("-m, --method <method>", "HTTP Method (GET/POST)", "GET")
  .option("-b, --body <body>", "Request body in JSON format")
  .option("-H, --header <headers...>", "Add request headers")
  .action((name, url, options) => {
    saveRequest(name, url, options);
  });

// Run a saved request
program
  .command("run <name>")
  .description("Run a saved API request")
  .action((name) => {
    runRequest(name);
  });

program.parse(process.argv);
