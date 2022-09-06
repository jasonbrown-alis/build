---
title: Quick Start
next: /guides/consume/make-your-first-request
sidebarDepth: 0
---
# Quick Start

We aim to ensure that how software across **alis.exchange** operates, communicates and integrates is simple and consistent. Whether you are getting results from a model, updating a database or executing trades, all of these actions should feel familiar. This allows you to seamlessly adopt anything across **alis.exchange** without spending hours in obscure documentation and the toil of attempting to integrate it in your code.

What does that experience feel like? In this section, we want to provide you with a few basic concepts and then allow you to experience **alis.exchange** for yourself. Below is a teaser of what you can expect 😉.

![](./img/quick-start-autocomplete1.gif)

![](./img/quick-start-autocomplete2.gif)


## Definition-first approach

**alis.exchange** leverages a core set of open-source technologies, all certified by the [Cloud Native Computing Foundation](https://www.cncf.io/). An essential part of how we make **alis.exchange** work is the strict adoption of [Protocol Buffers](https://developers.google.com/protocol-buffers), also referred to as *Protobufs*.

From a technical perspective:
> Protocol buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured data. [Source](https://developers.google.com/protocol-buffers)

What is important from a practical perspective however is that:
> You **define how you want your data to be structured once**, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages. [Source](https://developers.google.com/protocol-buffers)

Two things to take note of:

1. Defining things is the first, essential part of building on **alis.exchange**. Everything that you will be working with (*resources*) and what you will be doing (*services*) is defined once in a `.proto` file. 
2. The definitions of these resources and services are then used to generate source code in the language of your choice to implement, or work with, the resources and services you defined.

Find out more about Protobufs, their usage and benefits on **alis.exchange** in the [supplementary material](/references/other-resources/other-resources.md).


## Experience the simplicity

### Books.proto

Let us consider a `Book` resource with _name_, _display name_, _authors_ and _publishers_ as fields. This is defined in a `books.proto` file as follows:

```
// The definition of a book resource.
message Book {

	// The name of the book.
	// Format: books/{book}.
	string name = 1 [(google.api.field_behavior) = OUTPUT_ONLY];

	// The display name of the book.
	string display_name = 2 [(google.api.field_behavior) = REQUIRED];

	// The authors of the book.
	repeated string authors = 3 [(google.api.field_behavior) = REQUIRED];

	// The publisher of the book
	string publisher = 4 [(google.api.field_behavior) = REQUIRED];
}
```

The builders of this product allows you to list all the books available, `ListBooks`, and to retrieve the details of a specific book, `GetBook`. These are also defined in the `books.proto` file as part of the `BooksService`:

```
// Book service for foo.br.
service BooksService {
	// List all available books.
	rpc ListBooks(ListBooksRequest) returns (ListBooksResponse) {
		option (google.api.http) = {
			get: "/resources/books/v1/books"
		};
	}
	// Get a specific book.
	rpc GetBook(GetBookRequest) returns (Book) {
		option (google.api.http) = {
			get: "/resources/store/v1/{name=books/*}"
		};
		option (google.api.method_signature) = "name";
	}
}
```

Now that we know what resource is available, `Book`, and what we are able to do with it, `ListBooks` and `GetBook`, we can get practical.

### Run the example

Experience the simplicity in accessing these methods in any of the supported languages in using one of our preconfigured cloud IDEs:


#### Make a request using Go

<a href="https://gitpod.io#snapshot/c1eafefa-0414-439e-a618-4089e1d50143" target="_blank">Preconfigured Go cloud IDE</a>

1. Open up the terminal (Mac: `⌘ + j`, Windows: `ctrl + j` ).

	>If the terminal is already open run `$ clear` to clear the terminal window.

2. Make sure you are in the `playground` directory.

	```bash
	cd workspace/playground
	```

3. Run the code by running the terminal command:

	```bash
	go run *.go
	```

#### Get a feel for the **alis.exchange** experience

Interested in trying something for yourself?

We suggest creating your own function and incorporating a request to the `BooksClient`. Some suggestions of things to try:

* Loop through all the books and print out the author.
* Get a book and wrangle the response to be printed out in a sentence structure.
* Use the response of `ListBooks` to make multiple `GetBook` requests.

```bash
yarn add -D vitepress
```



#### Make a request using R

<a href="https://gitpod.io#snapshot/c858a081-f9e0-4791-9330-606a568df6fd" target="_blank">Preconfigured R cloud IDE</a>

1. Open up the terminal (Mac: `⌘ + j`, Windows: `ctrl + j` ).

	>If the terminal is already open run `$ clear` to clear the terminal window.

2. Make sure you are in the `playground` directory.

```bash
cd workspace/playground
```

3. Run the code

```bash
Rscript booksConsume.r
```

#### Get a feel for the **alis.exchange** experience

Interested in trying something for yourself?

We suggest creating your own function and incorporating a request to the `BooksClient`. Some suggestions of things to try:

* Loop through all the books and print out the author.
* Get a book and wrangle the response to be printed out in a sentence structure.
* Use the response of `ListBooks` to make multiple `GetBook` requests.

If you are interested in recreating this example in your own development environment, we suggest that you check out the [Make your first request guide](/guides/consume/make-your-first-request.md).
## Next Steps

**Ready to join alis.exchange?** <a href="https://alis.exchange/signup" target="_blank">Get in touch</a>.