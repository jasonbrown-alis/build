---
title: Setting up a gRPC server
---

# Setting up a gRPC server

This tutorial will provide an overview of setting up a gRPC server in your language of choice and will offer instructions ***specific to Alis Build***. You will learn how to:
- create and populate the  `.proto` file
- release a protobuf package
- implement the business logic behind your methods
- generate the client and server side protobuf stubs
- deploy the neuron to serve traffic

For a more general tutorial on setting up gRPC servers and clients, please refer to [the official
gRPC documentation](https://grpc.io/docs/languages/).

::: info Before you begin
This guide assumes the user has an understanding of the [programming language](https://grpc.io/docs/languages/) they wish to implement the server in, as well
as an understanding of [protocol buffers](/guides/references/core-technologies.html#grpc) and [gRPC](/guides/references/core-technologies.html#grpc).
:::

## Prerequisites
To get started with this tutorial, there are a couple things you need to have done as an Alis Builder:

1. Ensure you have installed and set up the [Alis CLI](../getting-started/command-line-interface.md)
2. Ensure you have [created a product on Alis Exchange](../getting-started/conceptual-framework.md)


## The Proto Definition: defining our example service
For this example, we will use the simple "Books" service as specified in the [consumer experience docs](../getting-started/consumer-experience.md)
and used extensively throughout Google's [API Improvement Proposals(AIPs)](https://google.aip.dev/). The definitions here differ
slightly from the AIPs for simplicity's sake.

The `.proto` file for the Books service consists of a service and methods, and the various messages as specified below:
```
// The BooksService
service BooksService {
  // Get a specific book.
  rpc GetBook(GetBookRequest) returns (Book) {
    option (google.api.http) = {
      get: "/resources/books/v1/{name=books/*}"
    };
    option (google.api.method_signature) = "name";
  }
  // List all available books.
  rpc ListBooks(ListBooksRequest) returns (ListBooksResponse) {
    option (google.api.http) = {
      get: "/resources/books/v1/books"
    };
  }
  // Create a book
  rpc CreateBook(CreateBookRequest) returns (Book) {
    option (google.api.http) = {
      post: "/resources/books/v1/books"
      body: "book"
    };
    option (google.api.method_signature) = "book,book_id";
  }
}

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

// Request message for the GetBook method
message GetBookRequest {
  // The name of the book to retrieve.
  // Format: books/{book}
  string name = 1 [
    (google.api.field_behavior) = REQUIRED,
    (google.api.resource_reference) = {
      type: "library.googleapis.com/Book"
    }];
}

// Request message for the ListBooks method
message ListBooksRequest {
  // The maximum number of books to return. The service may return fewer than
  // this value.
  // If unspecified, at most 50 books will be returned.
  // The maximum value is 1000; values above 1000 will be coerced to 1000.
  int32 page_size = 1;

  // A page token, received from a previous `ListBooks` call.
  // Provide this to retrieve the subsequent page.
  //
  // When paginating, all other parameters provided to `ListBooks` must match
  // the call that provided the page token.
  string page_token = 2;
}
// Response message for the ListBooks method
message ListBooksResponse {
  // The books from the specified publisher.
  repeated Book books = 1;

  // A token, which can be sent as `page_token` to retrieve the next page.
  // If this field is omitted, there are no subsequent pages.
  string next_page_token = 2;
}
```

### On Alis Build
To create a new proto on Alis Exchange run `alis proto create {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}`
(e.g. `alis proto create xmpl.br.resources-books-v1`).

:::tip
Throughout this example, we will use the "Example Organisation" (with id `xmpl`), the "Books repository"
product (with id `br`) and neuron `resources-books-v1`. The domain for this organisation is "example.services" -
please be sure to adapt the example commands to your organisation and product.
:::

This will create a new `.proto` file, which you will then populate with the services, methods and messages you require.
This file will be located in the `alis.exchange` directory at `alis.exchange/{orgID}/proto/{orgID}/{productID}/{resources|services}/{neuronName}/{neuronVersion}`


## Publishing the initial protobuf package
Once you are happy with your proto definition, run `alis proto release {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}`. This will
publish the protobuf package in various languages, for use by clients, and will be used for code generation when commencing server implementation.

::: warning
The Alis OS generates boilerplate code to kick of your server implementation based off of the contents of your `.proto` files. By putting effort into deciding on a robust API definition up-front,
it helps the Alis Build platform to relieve you of redundant tasks.
:::


## Implementing the server
Once you have released your protos, implementation of the server can begin. This is done by creating a new [neuron](../getting-started/conceptual-framework.md) on Alis Exchange. To create a new neuron,
run `alis neuron create {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` (e.g. `alis neuron create xmpl.br.resources-books-v1`).
Upon creating a neuron, you will be prompted whether you would like boilerplate code. Type `y` and select the language which you would like to implement the server in.

The boilerplate code that is given to you will look something like this:

### Server
The `server` is responsible for registering your implementation of the service interface (as implemented in the `methods`) with the gRPC server and makes this available to serve traffic
on the specified port (the default port for cloud run).

<tabs>
<tab name="Go">

```go
package main

import (
	"log"
	"net"
	"os"

	"cloud.google.com/go/firestore"
	"google.golang.org/grpc"
)

// client is a global client, initialized once per cloud run instance.
var (
	firestoreClient  *firestore.Client
)

func init() {

	// Pre-declare err to avoid shadowing.
	var err error

	// Disable log prefixes such as the default timestamp.
	// Prefix text prevents the message from being parsed as JSON.
	// A timestamp is added when shipping logs to Cloud Logging.
	log.SetFlags(0)

	// Ensure required envs are set.
	if os.Getenv("ALIS_OS_PROJECT") == "" {
		log.Fatal("ALIS_OS_PROJECT env not set.")
	}

	// TODO: add/remove required clients.
	// Initialise Firestore client
	firestoreProject, err = firestore.NewClient(context.Background(), projectID)
	if err != nil {
		log.Fatalf("firestore.NewClient: %v", err)
	}

}

func main() {
	log.Println(&Entry{Message: "starting server...", Severity: LogSeverity_NOTICE})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Println(&Entry{Message: "Defaulting to port " + port, Severity: LogSeverity_WARNING})
	}

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("net.Listen: %v", err)
	}

	grpcServer := grpc.NewServer(grpc.UnaryInterceptor(serverInterceptor))
	pb.RegisterServiceServer(grpcServer, &myService{})

	if err = grpcServer.Serve(listener); err != nil {
		log.Fatal(err)
	}
}

// serverInterceptor is an example of a Server Interceptor which could be used to 'inject'
// for example logs and/or tracing details to incoming server requests.
// Add this method to your grpc server connection, for example
// grpcServer := grpc.NewServer(grpc.UnaryInterceptor(serverInterceptor))
//	pb.RegisterServiceServer(grpcServer, &myService{})
func serverInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

	// Calls the handler
	h, err := handler(ctx, req)
	if err != nil {
		log.Println(&Entry{Message: fmt.Sprintf("%v", req), Severity: LogSeverity_DEBUG, Trace: getTrace(ctx)})
		log.Println(&Entry{
			Message:  err.Error(),
			Severity: LogSeverity_WARNING,
			Trace:    getTrace(ctx),
		})
	}
	return h, err
}
```

</tab>
<tab name="Python">

```python
from concurrent import futures
import grpc
import logging

# import methods for service
import methods

# protobuf imports

from xmpl.br.resources.books.v1 import books_pb2_grpc as books_pb_grpc


MAX_MESSAGE_SIZE = 2000000000

def serve():
    # creates a Server with which RPCs can be serviced
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10), options=[
        # ('grpc.max_send_message_length', MAX_MESSAGE_LENGTH),
        ('grpc.max_receive_message_length', MAX_MESSAGE_SIZE)
    ])


    books_pb_grpc.add_BooksServiceServicer_to_server(methods.BooksService(), server)


    # open an insecure port for accepting RPCs
    server.add_insecure_port('0.0.0.0:8080')

    # start the server
    server.start()

    logging.info("Listening on %s.", '0.0.0.0:8080')

    # block current thread until the server stops
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    try:
        # begin serving traffic
        serve()
    except BaseException as e:
        logging.error(stacklevel=logging.INFO, msg=str(e))
        raise Exception(str(e))

```

</tab>
</tabs>

### Methods
The `methods` is where we implement the service interface and write the business logic that sits behind our methods.

<tabs>
<tab name="Go">

```go
package main

import (
    "context"

	"google.golang.org/genproto/googleapis/longrunning"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"

	pb "go.protobuf.example.domain/xmpl/br/resources/books/v1"
)

// Create a Service object which we'll register with the Server
type myService struct {
    pb.UnimplementedBooksServiceServer
}

func (s *myService) GetBook(ctx context.Context, req *pb.GetBookRequest) (*pb.Book, error) {
    //TODO: Implement logic here.
    return &pb.Book{}, nil
}

func (s *myService) ListBooks(ctx context.Context, req *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
    //TODO: Implement logic here.
    return &pb.ListBooksResponse{}, nil
}

func (s *myService) CreateBook(ctx context.Context, req *pb.CreateBookRequest) (*pb.Book, error) {
    //TODO: Implement logic here.
    return &pb.Book{}, nil
}

```

</tab>
<tab name="Python">

```python
import grpc
import logging

# import alis_ os module and attaches the cloud logging handler to the python logging if run in production.
# from alis.os import os as alis_os
# alis_os = alis_os.Os(org_project="alis-os", org_domain="alis.capital", log_level="DEBUG")

# protobuf imports

from xmpl.br.resources.books.v1 import books_pb2_grpc as books_pb_grpc
import google.cloud.firestore as firestore

firestore_client = firestore.Client(project=os.getenv('ALIS_OS_PROJECT'))


class BooksService(books_pb_grpc.BooksService):

    def __init__(self):
            logging.basicConfig(level=logging.INFO)


    def GetBook(self, request:books_pb.GetBookRequest, context: grpc.ServicerContext, **kwargs) \
            -> return books_pb.Book
          # TODO: implement logic here.
          return books_pb.Book()


    def ListBooks(self, request:books_pb.ListBooksRequest, context: grpc.ServicerContext, **kwargs) \
            -> return books_pb.ListBooksResponse
          # TODO: implement logic here.
          return books_pb.ListBooksResponse()


    def CreateBook(self, request:books_pb.CreateBookRequest, context: grpc.ServicerContext, **kwargs) \
            -> return books_pb.Book
          # TODO: implement logic here.
          return books_pb.Book()
```

</tab>
</tabs>

### Test
The `test` is where we call the methods as specified in the `methods` to ensure they behave as we expect them to.

<tabs>
<tab name="Go">

```go
package main

import (
	"context"
	"fmt"
	"log"
	"testing"

	pb "go.protobuf.example.domain/xmpl/br/resources/books/v1"
)

// Simulate a client object
var client myService

// This init() function will only run when running Go tests.
func init() {
	// Include a link to the file location of where the log originated from
	log.SetFlags(log.Lshortfile)

	client = myService{}
}

func TestMyService_GetBook(t *testing.T) {
	// Construct a request message
	req := pb.GetBookRequest{}

	// Run a method
	res, err := client.GetBook(context.Background(), &req)
	if err != nil {
		t.Error(err)
	}

	fmt.Println(res)
}

func TestMyService_ListBooks(t *testing.T) {
	// Construct a request message
	req := pb.ListBooksRequest{}

	// Run a method
	res, err := client.ListBooks(context.Background(), &req)
	if err != nil {
		t.Error(err)
	}

	fmt.Println(res)
}

func TestMyService_CreateBook(t *testing.T) {
	// Construct a request message
	req := pb.CreateBookRequest{}

	// Run a method
	res, err := client.CreateBook(context.Background(), &req)
	if err != nil {
		t.Error(err)
	}

	fmt.Println(res)
}


```

</tab>
<tab name="Python">

```python
import unittest
from grpc import StatusCode
import grpc_testing

# protobuf imports

from xmpl.br.resources.books.v1 import books_pb2_grpc as books_pb_grpc



class BooksServiceTest(unitbooks.TestCase):

    def setUp(self):
            self._real_time = grpc_booksing.strict_real_time()
            descriptors_to_servicers = {
                books_pb.DESCRIPTOR.services_by_name['BooksService']: methods.BooksService()
            }
            self.books_server = grpc_booksing.server_from_dictionary(descriptors_to_servicers, self._real_time)


    def books_get_book(self):
          # TODO: add custom logic here
          request = books_pb.GetBookRequest()
          rpc = self.books_server.invoke_unary_unary(
              books_pb.DESCRIPTOR.services_by_name['BooksService'].methods_by_name['GetBook'],
              invocation_metadata={},
              request=request, timeout=None
          )
          response, metadata, code, details = rpc.termination()
          self.assertIs(code, StatusCode.OK)


    def books_list_books(self):
          # TODO: add custom logic here
          request = books_pb.ListBooksRequest()
          rpc = self.books_server.invoke_unary_unary(
              books_pb.DESCRIPTOR.services_by_name['BooksService'].methods_by_name['ListBooks'],
              invocation_metadata={},
              request=request, timeout=None
          )
          response, metadata, code, details = rpc.termination()
          self.assertIs(code, StatusCode.OK)


    def books_create_book(self):
          # TODO: add custom logic here
          request = books_pb.CreateBookRequest()
          rpc = self.books_server.invoke_unary_unary(
              books_pb.DESCRIPTOR.services_by_name['BooksService'].methods_by_name['CreateBook'],
              invocation_metadata={},
              request=request, timeout=None
          )
          response, metadata, code, details = rpc.termination()
          self.assertIs(code, StatusCode.OK)

```

</tab>
</tabs>

### Dockerfile
The `Dockerfile` is where we containerize our application/server to be deployed to the cloud. At Alis, we make use of cloud run, which is why it is the terraform
spec that comes as boilerplate code for deploying our Docker images to the cloud.

<tabs>
<tab name="Go">

```docker
FROM golang:1.17-buster as gobuilder

# We use the cloud-sdk image since it already has the correct git credential helper setup.
# Since go mod download uses git, this ensures that the go mod download finds our private repos stored on
# Google Source Repository
FROM gcr.io/google.com/cloudsdktool/cloud-sdk as builder
COPY --from=gobuilder /usr/local/go/ /usr/local/go/
ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /app

# Retrieve application dependencies.
# This allows the container build to reuse cached dependencies.
# Expecting to copy go.mod and if present go.sum.
# The .${_ORG}.dev packages are all private.  Configure GOPRIVATE as per:
#   https://tip.golang.org/cmd/go/#hdr-Configuration_for_downloading_non_public_code
RUN go env -w GOPRIVATE=go.protobuf.example.domain
COPY go.* ./
RUN go mod download

# Copy local code to the container image.
COPY . ./

# Build the binary.
RUN go build -mod=readonly -v -o server

# Use the official Debian slim image for a lean production container.
# https://hub.docker.com/_/debian
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM debian:buster-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy the binary to the production image from the builder stage.
COPY --from=builder /app/server /app/server

# Run the web service on container startup.
CMD ["/app/server"]
```

</tab>
<tab name="Python">

```docker
FROM python:3.8-slim

RUN apt-get update && apt-get upgrade -y && apt-get install -y git
RUN apt-get install -y sudo && apt-get install -y build-essential
RUN sudo apt-get install manpages-dev

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . .

# Install production dependencies.
RUN pip3 install --upgrade setuptools

#RUN pip3 install other dependencies
RUN pip3 install -r requirements.txt --no-cache

# Install the keyring library provides applications with a way to access keyring backends, meaning operating system
# and third-party credential stores, and install the Artifact Registry backend.
RUN pip3 install keyring
RUN pip3 install keyrings.google-artifactregistry-auth

# install Alis Exchange protobufs
RUN pip3 install --index-url https://europe-west1-python.pkg.dev/exmpl-org-projectid/protobuf-python/simple/ example-domain-protobuf

EXPOSE 8080

CMD ["python", "server.py"]
```

</tab>
</tabs>

### Terraform
Upon neuron creation, some boilerplate terraform is added to the proto repo at the neuron level. This includes:
1. `cloudrun.tf`
2. `variables.tf`
3. `main.tf`

## Local development and testing
To generate stubs locally, [install the `protoc` compiler](https://grpc.io/docs/protoc-installation/) and then install the language specific plugins:

<tabs>
<tab name="Go">

1. Ensure you have [Go installed](https://go.dev/doc/install)
2. Install the Go protoc plugins:
```shell
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
```
3. Update your PATH so that the protoc compiler can find the plugins: `export PATH="$PATH:$(go env GOPATH)/bin"`

</tab>
<tab name="Python">

1. Ensure you `python3.5` or higher installed and `pip` version 9.0.1 or higher
2. Upgrade pip if necessary: `python -m pip install --upgrade pip`
3. Install gRPC and the python gRPC tools for interacting with the protoc compiler:
```shell
python -m pip install grpcio
python -m pip install grpcio-tools
```

</tab>
</tabs>

To generate the client and server stubs for local testing and development run `alis gen protobuf --{language} {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` - this will generate the stubs
and store them at `alis.exchange/{orgID}/protobuf/{language}/{orgID}/{productID}/{resources|services}/ {neuronName}/{neuronVersion}`

Under the hood, the Alis CLI runs a `protoc` command and facilitates the routes to the destination of your source protos and the destination
to which the stubs should be output.

::: tip
For more information on which programming languages are currently supported run `alis gen protobuf --help`.
:::

After generating your protobufs locally, to import them and use them for development purposes:

<tabs>
<tab name="Go">

1. Uncomment the line `//replace go.protobuf.example.domain => ../../../../../../xmpl/protobuf/go` in your `go.mod`
2. Delete the import for `go.protobuf.example.domain` if it exists
3. Run `go mod tidy`

</tab>
<tab name="Python">

1. Uncomment the line `# ../../../../../protobuf/python` in your requirements.txt
2. Run `pip install -r requirements.txt`

</tab>
</tabs>

Otherwise, to make use of the protobufs as published in your protobuf package

<tabs>
<tab name="Go">

1. Add "go.protobuf.example.domain" to your GOPRIVATE environment variable, where example.domain will
be replaced by your organisations domain
```shell
go env -w GOPRIVATE=$(go env GOPRIVATE),go.protobuf.example.domain
 ```
2. Comment out the line `replace go.protobuf.example.domain => ../../../../../../xmpl/protobuf/go` in your `go.mod`
2. Delete the import for `go.protobuf.example.domain` if it exists
3. Run `go mod tidy`

</tab>
<tab name="Python">

1. Comment out the line `../../../../../protobuf/python` in your requirements.txt
2. Run the following commands:
```shell
pip3 install keyring &&
pip3 install keyrings.google-artifactregistry-auth &&
pip3 install --index-url https://europe-west1-python.pkg.dev/uni-org-zkw/protobuf-python/simple/ alis-university-protobuf
```

</tab>
</tabs>

## Implementing the methods
Below is an example implementation which integrates with FireStore

<tabs>
<tab name="Go">

```go
package main

import (
	"context"
	pb "go.protobuf.alis.university/uni/bb/services/test/v1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Create a Service object which we'll register with the Server
type myService struct {
	pb.UnimplementedBooksServiceServer
}

func (s *myService) GetBook(ctx context.Context, req *pb.GetBookRequest) (*pb.Book, error) {
	// validate arguments
	if req.GetName() == "" { // requires a name
		return nil, status.Errorf(codes.InvalidArgument, "name is a required field but was not provided")
	}

	// retrieve the object from firestore
	object, err := firestoreClient.Doc(req.GetName()).Get(ctx)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "book (%s) not found", req.GetName())
	}

	// the Book message to return
	book := &pb.Book{}
	err = object.DataTo(book)
	if err != nil { // handle the error
		return nil, status.Errorf(codes.AlreadyExists, "err writing firestore data to book: %s", err)
	}

	return book, nil
}

func (s *myService) ListBooks(ctx context.Context, req *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
	// obtain the books collection object
	objects, err := firestoreClient.Collection("users").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	// the User message to return
	booksResponse := &pb.ListBooksResponse{
		Books: nil,
	}
	for i := 0; i < len(objects) || i < req.GetPageSize(); i++ {
		book := &pb.Book{}
		err = objects[i].DataTo(book)
		booksResponse.Books = append(booksResponse.GetBooks(), book)
	}

	// TODO: this does not implement pagination

	return booksResponse, nil
}

func (s *myService) CreateBook(ctx context.Context, req *pb.CreateBookRequest) (*pb.Book, error) {
	// validate arguments
	if req.GetBookId() == "" { // requires a userId
		return nil, status.Errorf(codes.InvalidArgument, "book_id is a required field but was not provided")
	}
	if req.GetBook() == nil { // requires a user object
		return nil, status.Errorf(codes.InvalidArgument, "book is a required field but was not provided")
	}

	// set the resource name of the user
	req.GetBook().Name = "books/" + req.GetBookId()

	_, err := firestoreClient.Doc(req.GetBook().GetName()).Create(ctx, req.GetBook())
	if err != nil {
		if status.Code(err) == codes.AlreadyExists {
			return nil, status.Errorf(codes.AlreadyExists, "the book (%s) already exists", req.GetBookId())
		}
		return nil, status.Errorf(codes.AlreadyExists, "failed to create book")
	}

	return req.GetBook(), nil
}

```

</tab>
<tab name="Python">

::: info
Coming soon
:::

</tab>
</tabs>

## Deploying your server
The `methods` is where your custom logic lives. Once you have populated the methods and response messages, we can release and deploy our neuron to serve traffic.

On Alis Build, run `alis neuron release {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` to create a new neuron version. We can then deploy
this version by running `alis neuron release {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` and selecting the product deployment of choice
or creating a new deployment if one does not exist.

::: tip
Note that some of the clients you would like to create (like a Firestore client) require a google project id with
the Firestore API enabled. In this case, you will only be able to test your methods after first creating a neuron deployment
as the neuron deployment will set up the google project under which the Firestore will exist.
:::

Your server will now be available to serve traffic on cloud run. Navigate to the product deployment Google project
on [cloud console](https://console.cloud.google.com) to view the cloud run service.
