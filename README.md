# GoSnap

## Overview

GoSnap is a free online tool that allows you to apply filters to your images with just a few clicks. It provides an intuitive interface for users to enhance and stylize their photos quickly and easily. Whether you're looking to adjust the colors, add artistic effects, or simply touch up your pictures, GoSnap has you covered.

## Features

-   Apply various filters to your images
-   Simple and user-friendly interface
-   Instant preview of changes
-   Supports multiple image formats
-   Free to use, no account required

## How To Use?

1. Upload your image.
2. Choose from a variety of filters.
3. review the changes in real-time.
4. Download the edited image.

## Project Structure

```
go
├── gosnap_backend
│   ├── controllers
│   ├── middlwares
│   ├── routes
│   ├── server.js
│   └── Dockerfile
└── gosnap_frontend
    ├── src
    ├── public
    └── Dockerfile
```

## Technologies Used

-   **Backend:** Node.js, Express.js, Sharp.js
-   **Frontend:** React, Tailwind CSS
-   **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

-   Ensure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.

### Running the Application

1. Clone the repository:

    ```bash
    git clone https://github.com/SakshhamTheCoder/GoSnap.git
    cd GoSnap
    ```

2. Navigate to the root of the project and run:

    ```bash
    docker-compose up --build
    ```

3. Access the application:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:5000](http://localhost:5000)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

-   Thanks to the open-source community for providing great tools and resources.
