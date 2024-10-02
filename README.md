
This repository contains practice exercises and examples for learning and mastering Docker, including multi-container setups using Docker Compose, container scaling, logs, and more.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Running the Project](#running-the-project)
  - [Running Two Containers](#running-two-containers)
  - [Stopping the Containers](#stopping-the-containers)
  - [Viewing Container Logs](#viewing-container-logs)
  - [Rebuilding Containers with Volumes](#rebuilding-containers-with-volumes)

## Introduction

This repository is designed to help you get hands-on experience with Docker. It includes various examples and exercises that demonstrate different Docker features and techniques. You will learn how to run multiple containers, scale containers, view logs, and more.

## Getting Started

To get started with this repository, you will need to have Docker and Docker Compose installed on your machine. Follow the instructions on the [official Docker website](https://docs.docker.com/get-docker/) to install Docker and the [official Docker Compose website](https://docs.docker.com/compose/install/) to install Docker Compose.

## Usage

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ashish-Shuk1a/docker-practise.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd docker-practise
    ```
3. **Follow the instructions in each sub-directory** to run the Docker examples and exercises.

## Running the Project

This project uses Docker Compose to manage multiple containers for the application. Below are detailed instructions to run, stop, and manage the containers.

### Running Two Containers

To run two instances of the `node-app` service and bring up the entire application stack, run the following command:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
```

#### Command Breakdown:
- `docker-compose`: The command-line tool to manage multi-container Docker applications.
- `-f docker-compose.yml -f docker-compose.dev.yml`: Specifies multiple Docker Compose files. The `docker-compose.yml` is the base configuration, while the `docker-compose.dev.yml` contains development-specific settings, such as extra configurations for scaling or development-only services.
- `up`: Brings up the application, creating and starting the services defined in the Compose files.
- `-d`: Runs the services in the background (detached mode).
- `--scale node-app=2`: Creates two instances of the `node-app` service, allowing you to simulate a scaled environment with multiple running containers for the same service.

### Stopping the Containers

To stop and remove the running containers and associated resources (such as networks and volumes), use the following command:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

#### Command Breakdown:
- `down`: Stops and removes all containers, networks, and volumes created by the `up` command.

### Viewing Container Logs

To view the logs of a specific container in real-time, use the following command:

```bash
docker logs docker-practise-node-app-1 -f
```

#### Command Breakdown:
- `docker logs`: Retrieves logs from a specific container.
- `docker-practise-node-app-1`: The name or ID of the container whose logs you want to view. The container name can be found using `docker ps`.
- `-f`: Continuously streams the logs (similar to `tail -f` for log files).

This command is useful for debugging and monitoring the output of the application as it runs inside the container.

### Rebuilding Containers with Volumes

If you need to recreate the containers from scratch and force the creation of new volumes, use the following command:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
```

#### Command Breakdown:
- `up`: Brings up the application and starts the containers.
- `-d`: Runs in detached mode (in the background).
- `--build`: Forces the rebuilding of images before starting the containers. This is useful if you've made changes to the Dockerfile or dependencies.
- `-V`: Removes and recreates volumes attached to the services. This is particularly useful when you want to ensure that the volumes are reinitialized, for example, to remove old data or reconfigure storage.

By using this command, you ensure that the containers start fresh with updated images and volumes.

---
