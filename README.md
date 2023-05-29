## Running app (without Docker)

<b>Prerequisites:</b>
- You will need Redis installed on your local machine since we will use it as a data store: (https://redis.io/docs/getting-started/installation/)
    

1. Install deps: 
```
npm install
```

2. Run dev server:
```bash
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Running test(s)

To run the whole suite of tests run:
```
npm run test
```
To run a specific test file run:
```
npm test -- path/to/test-file.test.ts
```

## Running app using Docker Compose
In order to run this app using Docker, you need to have Docker and Docker Compose installed. Here's how to get the app running:

<b>Prerequisites:</b>
 - If you are using a Windows machine you will need to use tools such as Git Bash, Windows Subsystem for Linux or Cygwin, to run the shell script(s): (https://mspoweruser.com/different-ways-to-run-shell-script-files-on-windows/)
 - Linux/Mac OS users can run the scripts without doing the above.

1. Install Docker: (https://docs.docker.com/engine/install/)

2. Navigate to the root directory of the project in your terminal.

3. Run the `start-app.sh` script to build the Docker images and run the containers:
    ```
    bash start-app.sh
    ```

4. You should see a message indicating that the container is running and accessible at http://localhost:3000.

5. To stop the Docker network, use:
    ```
    ctrl + c 
    ```

6. To start the Docker network again (once it's been built and run initially), use this command:
    ```
    docker-compose up
    ```

### Running test(s) in Docker

1. If you want to run all the tests using a script you can do:
```
bash run-tests.sh
```

## How the UrlShortener Class works

The UrlShortener class is a utility class that provides functionality to shorten URLs. It generates unique codes for URLs and establishes a relationship between the code and the original URL.

### Creating an Instance
To create an instance of the <b>UrlShortener</b> class, you can simply instantiate it:

```
const urlShortener = new UrlShortener();
```

The UrlShortener class uses a singleton pattern, ensuring that only one instance of the class is created and shared throughout the application.

### Generating a code
The <b>generateCode()</b> method generates a random code that can be used to represent a shortened URL. It follows a specific format of eight alphanumeric characters, with each character randomly chosen to be uppercase or lowercase.

```
const code = urlShortener.generateCode();

```

### Shortening a URL
The <b>shortenUrl(url: string): Promise<string | null></b> method is used to shorten a given URL. It checks if the URL already has a corresponding code. If a code exists, it returns the existing code. If not, it generates a new unique code and establishes an <b>isomorphic</b> relationship between <b>code-url</b> and <b>url-code</b>. 

```
const url = "https://example.com";
const shortUrl = await urlShortener.shortenUrl(url);
```

### Retrieving the Original URL
The <b>getOriginalUrl(code: string): Promise<string | null></b> method is used to retrieve the original URL associated with a given code. It fetches the URL based on the provided code.

```
const code = "aBcDeFgH";
const originalUrl = await urlShortener.getOriginalUrl(code);
console.log(originalUrl) // "https://example.com
```

The UrlShortener class provides a convenient way to shorten and retrieve URLs. It abstracts the process of generating codes, establishing relationships between codes and URLs, and retrieving the original URLs. This allows developers to easily integrate URL shortening functionality into their applications.
