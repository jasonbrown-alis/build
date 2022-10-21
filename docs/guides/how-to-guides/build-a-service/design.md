---
title: Design
---

# Design the Books Service

The simple `BooksService` used as an example is the same as that specified in the [consumer experience docs](../getting-started/consumer-experience.md)
and used extensively throughout Google's [API Improvement Proposals(AIPs)](https://google.aip.dev/).

## Create protocol buffer

To create a new proto run `alis proto create {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` from your terminal
(e.g. `alis proto create xmpl.br.resources-books-v1`).

This will create a new `.proto` file, which you will then populate with the services, methods and messages you require.
This file will be located in the `alis.exchange` directory at "{orgID}/proto/{orgID}/{productID}/{resources|services}/{neuronName}/{neuronVersion}"

## Define methods and messages

The `.proto` file for the Books service consists of a service with methods, and the various messages as specified below:
```
// The Books service
service Books {
  // Get a specific book.
  rpc GetBook(GetBookRequest) returns (Book) {}
  // Create a book
  rpc CreateBook(CreateBookRequest) returns (Book) {}
}

// The definition of a book resource.
message Book {
  // The name of the book.
  // Format: books/{book}.
  string name = 1;

  // The display name of the book.
  string display_name = 2;

  // The authors of the book.
  repeated string authors = 3;

  // The publisher of the book
  string publisher = 4;
}

// Request message for the GetBook method
message GetBookRequest {
  // The name of the book to retrieve.
  // Format: books/{book}
  string name = 1;
}
```

The proto definition is the building block upon which our server implementation will depend. It is important to think carefully about your API definition
and adopt a resource-oriented, API-first design approach when building out your own service.

## Release protocol buffer

Once you are happy with your proto definition, run `alis proto release {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}`. This will
publish the protobuf package in various languages, for use by clients and by your server when it is in production, and will be used for code generation when commencing server implementation.

::: warning
The Alis OS generates boilerplate code to kick off your server implementation based off of the contents of your `.proto` files. By putting effort into deciding on a robust API definition up-front,
it helps the Alis Build platform to relieve you of redundant tasks.
:::
