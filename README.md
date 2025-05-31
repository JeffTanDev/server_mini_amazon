# Amazon Backend Services

A microservices-based backend system for the Amazon dashboard project, built with Node.js.

## Architecture

The system consists of multiple microservices:

- **Content Service**: Handles content management and delivery
- **User Service**: Manages user authentication and profile data
- **Product Service**: Handles product information and inventory
- **API Gateway**: Central entry point for all client requests

## Tech Stack

- Node.js
- Microservices Architecture
- Child Process Management
- File System Operations

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd server_mini_amazon
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

## Running the Services

### Start All Services

To start all services in the correct order:

```bash
node start.js
```

This will start the services in the following sequence:
1. Content Service
2. User Service
3. Product Service
4. API Gateway

### Individual Service Structure

Each service is located in its own directory:
```
server_mini_amazon/
├── ContentService/     # Content management service
├── UserService/        # User management service
├── ProductService/     # Product management service
├── api-gateway/        # API Gateway service
└── start.js           # Service orchestrator
```

## Service Details

### Content Service
- Handles content delivery
- Manages static and dynamic content
- Location: `ContentService/ContentService.js`

### User Service
- User authentication
- Profile management
- Location: `UserService/UserService.js`

### Product Service
- Product information management
- Inventory tracking
- Location: `ProductService/ProductService.js`

### API Gateway
- Request routing
- Service orchestration
- Location: `api-gateway/API_Gateway.js`

## Development

The services are started with the `--watch` flag, which enables automatic reloading when files change. This is useful during development.

## Error Handling

The system includes comprehensive error handling:
- Service startup failures are logged
- Process errors are caught and reported
- Failed service starts will terminate the entire system

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Contact

For questions or suggestions, please open an Issue or Pull Request. 