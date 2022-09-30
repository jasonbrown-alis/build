---
title: Design
---

# Design the book service

For this example, we will use the simple "Books" service as specified in the [consumer experience docs](../getting-started/consumer-experience.md)
and used extensively throughout Google's [API Improvement Proposals(AIPs)](https://google.aip.dev/).

## Create protocol buffer

To create a new proto run `alis proto create {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` from your terminal
(e.g. `alis proto create xmpl.br.resources-books-v1`).

:::tip
Throughout this example, we will use the "Example Organisation" (with id `xmpl`), the "Books repository"
product (with id `br`) and neuron `resources-books-v1`. The domain for this organisation is "example.services" -
please be sure to adapt the example commands to your organisation and product.
:::

This will create a new `.proto` file, which you will then populate with the services, methods and messages you require.
This file will be located in the `alis.exchange` directory at `alis.exchange/{orgID}/proto/{orgID}/{productID}/{resources|services}/{neuronName}/{neuronVersion}`

## Define methods and messages

The `.proto` file for the Books service consists of a service and methods, and the various messages as specified below:
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