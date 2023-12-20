# Problem: Real-time Data Streaming Processor

## Background

Imagine you are working on a system that processes real-time data streams from various sources, such as sensors or user activities. The system needs to be able to handle high throughput and perform calculations or transformations on the data as it arrives.

## Task

**Stream Simulation**: Write a function named simulateDataStream. This function should simulate a data stream by periodically generating data (e.g., random numbers, strings, or objects) and invoking a callback function with the generated data.

**Data Processing Function**: Create a function named processStreamData that takes data from the stream and performs some processing on it. This could be a simple calculation, a transformation, or even an aggregation over time.

**Data Aggregation**: Implement a feature within processStreamData to aggregate data over a specified time window (e.g., summing numbers over the last 10 seconds).

**Error Handling and Monitoring**: Ensure that your stream processing can handle potential errors in the data stream gracefully. Additionally, implement a basic monitoring feature that logs the rate of data processing (e.g., items processed per second).

**Types/Interfaces**: Define appropriate TypeScript types or interfaces for the stream data, and ensure your implementation is type-safe.

**Asynchronous Control**: Since this deals with real-time data streams, ensure that your implementation effectively handles asynchronous data without blocking.

## Requirements

- Use an explicitly typed for the implementation.
- Simulate a real-time data stream in a way that is representative of a real-world scenario.
- Ensure your code is well-organized and follows best practices for readability and maintainability.

### Bonus

- Implement back-pressure management to handle scenarios where data arrives faster than it can be processed.
- Write unit tests for your functions, especially focusing on the data processing and aggregation logic.
