# Use the latest official Golang image as the base
FROM golang:latest

# Install OpenCV dependencies
RUN apt-get update && apt-get install -y libopencv-dev pkg-config && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the Go project into the container
COPY . .

# Install Go dependencies
RUN go mod tidy

# Build the Go application
RUN go build -o main .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the Go backend
CMD ["./main"]