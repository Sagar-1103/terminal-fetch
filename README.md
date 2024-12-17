# Terminal-Fetch

terminal-fetch is a simple command-line tool that allows you to test REST APIs directly from your terminal. You can send `GET` and `POST` requests, view responses, save requests for later use, and more.

## Installation

To use the terminal-fetch globally, you need to install it via npm. You can do this by running the following command:

```bash
npm install -g terminal-fetch
```

## Usage

### Send a GET request

```bash
terminal-fetch get <url> [options]
```

* **url** : The URL to which you want to send the GET request.
* **options** : Optional headers you want to add to the request. You can specify multiple headers using `-H` or `--header`.

**GET Request Example** :

```bash
terminal-fetch get https://api.example.com/posts -H "Authorization: Bearer <token>"
```

### Send a POST request

```bash
terminal-fetch post <url> --body "<json-body>" [options]
```

* **url** : The URL for the POST request.
* **--body** : JSON body data you want to send in the POST request.
* **options** : Optional headers for the request.

**POST Request Example** :

```bash
terminal-fetch post https://api.example.com/posts --body '{"title": "New Post", "content": "This is a new post."}' -H "Content-Type: application/json"
```

### Save a Request

You can save requests for future use with the `save` command:

```bash
terminal-fetch save <name> <url> [options]
```

* **name** : The name to identify the saved request.
* **url** : The URL of the request.
* **options** : Additional options like headers, method, and body (optional).

**Save a Request Example** :

```bash
terminal-fetch save myPostRequest https://api.example.com/posts --method POST --body '{"title": "New Post", "content": "This is a new post."}' -H "Content-Type: application/json"
```

### Run a Saved Request

To re-run a saved request, use the `run` command:

```bash
terminal-fetch run <name>
```

* **name** : The name of the saved request you want to run.

**Run a Saved Request Example** :

```bash
terminal-fetch run myPostRequest
```
