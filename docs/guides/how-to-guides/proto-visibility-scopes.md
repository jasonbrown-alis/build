# Specifying proto visibility scopes

When releasing new versions of protocol buffers, multiple processes are kicked off in the background that generate client libraries, documentation, gateways and more.

::: warning
By default, everything specified in the protocol buffer is regarded _PUBLIC_, i.e. accessible to anyone. Any information
in the protocol buffer that should not be publicly exposed (in documentation, client libraries, etc.), should be explicitly restricted.
:::

This guide will provide an overview of how the visibility restrictions can be applied in the protocol buffers.

## Overview

Many cases exist where organisations may want to keep certain APIs, resources or even individual fields internal only. This is
achieved by using _visibility option tags_ - which are defined in Google’s [visibility.proto](https://github.com/googleapis/googleapis/blob/master/google/api/visibility.proto),
part of the standard `google.api` package. These tags are parsed on releasing new versions of a proto to exclude the restricted
information from that which is public.

In summary, these visibility tags allow one to RESTRICT visibility to certain aspects of the protos. These are available for:
`Services`; `Methods`; `Messages`; `Fields`; `Enums`; and `EnumValues`.

And follow a top-down restriction enforcement. This means that any child parts inherit the restriction of the parent. Ie If a restriction is provided to:
- A `service` then all of the `methods` part of that `service` inherits the restriction;
- A `message` then all of the `fields`, `enums` and `sub messages` in the message inherits the restriction.

To restrict visibility of an entire package requires slightly more work since there does not exist any visibility restriction tags on a package level. To achieve this, one would have to specify visibility restrictions on all of the highest level parts of the package.
I.e. any: `Services`; `Messages`; `Enums`; and `Oneofs`.

[//]: # (TODO: Insert a table to show external/internal protobufs etc...)

In the following section, a tutorial is provided on how to implement these restrictions.

## Implementing visibility restrictions

Firstly, import the `visibility.proto` package in the proto you are working in:
```
import "google/api/visibility.proto";
```

Assign the relevant visibility restriction option tags to the parts of the proto that require it. Example implementations of these are shown below.

### Service Visibility Restriction

The entire `BooksService` is set to `“INTERNAL”`, therefore all methods (_Get_ and _Create_) part of the `BooksService` will also be internal.

```
service BooksService {
	option (google.api.api_visibility) = {
		restriction: "INTERNAL",
	};
	// Create a book.
	rpc CreateBook(CreateBookRequest) returns (Book) {
			option (google.api.http) = {
			post: "/resources/store/v1/books"
			body: "book"
		};
		option (google.api.method_signature) = "book";
	}
	// Get a book.
	rpc GetBook(GetBookRequest) returns (Book) {
			option (google.api.http) = {
			get: "/resources/store/v1/{name=books/*}"
		};
		option (google.api.method_signature) = "name";
	}
}
```

### Method Visibility Restriction

The `CreateBook` method will be set to have an `“INTERNAL”` restriction but the `GetBook` method will be publicly visible.

```
service BooksService {
	// Create a book.
	rpc CreateBook(CreateBookRequest) returns (Book) {
		option (google.api.http) = {
			post: "/resources/store/v1/books"
			body: "book"
		};
		option (google.api.method_signature) = "book";
		option (google.api.method_visibility) = {
			restriction: "INTERNAL"
		};
	}
	// Get a book.
	rpc GetBook(GetBookRequest) returns (Book) {
			option (google.api.http) = {
			get: "/resources/store/v1/{name=books/*}"
		};
		option (google.api.method_signature) = "name";
	}
}
```

### Message Visibility Restriction

The `CreateBookRequest` message has an `“INTERNAL”` restriction and therefore its fields (`book`) will also be restricted to `“INTERNAL”` visibility.

::: warning **Note**
It is important to note that this DOES NOT set the `Book` resource to `“INTERNAL”` , but simply the field in this message.
:::

```
message CreateBookRequest {
	option (google.api.message_visibility) = {
		restriction: "INTERNAL",
	};
	// The book to create
	Book book = 1 [(google.api.field_behavior) = REQUIRED];
}

message Book {
	//Name of the book in the format: books/{book}.
	string name = 1 [(google.api.field_behavior) = REQUIRED];
	//The display name of the book.
	string display_name = 2 [(google.api.field_behavior) = REQUIRED];
	//The authors of the book.
	repeated string authors = 3 [(google.api.field_behavior) = REQUIRED];
}
```

### Message Field Visibility Restriction

The `Book` resource is publicly visible but the `name` field of the Book will be restricted to `“INTERNAL”` visibility.

```
message Book {
	//Name of the book in the format: books/{book}.
	string name = 1 [(google.api.field_visibility) = {
		restriction: "INTERNAL",
	}];
	//The display name of the book.
	string display_name = 3 [(google.api.field_behavior) = REQUIRED];
	//The authors of the book.
	repeated string authors = 4 [(google.api.field_behavior) = REQUIRED];
}
```

### Enum Visibility Restriction

The entire `BookCategory` enum is restricted to `“INTERNAL”` visibility, therefore all of its values will also be restricted to `“INTERNAL”` visibility.

```
enum BookCategory {
	option (google.api.enum_visibility) = {
		restriction: "INTERNAL",
	};
	// Unknown
	UNKNOWN = 0;
	// Fiction
	FICTION = 1;
	// Non-fiction
	NON_FICTION = 2;
}
```

### Enum Value Visibility Restriction

The `BookCategory` enum is publicly visible but the `UNKNOWN` value is restricted to `“INTERNAL”` visibility.

```
enum BookCategory {
	// Unknown
	UNKNOWN = 0 [(google.api.value_visibility) = {
		restriction: "INTERNAL",
	}];
	// Fiction
	FICTION = 1;
	// Non-fiction
	NON_FICTION = 2;
}
```


