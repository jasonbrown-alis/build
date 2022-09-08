[//]: # (---)

[//]: # (title: Build your first product)

[//]: # (sidebarDepth: 0)

[//]: # (---)

[//]: # ()
[//]: # (# Build your first product)

[//]: # ()
[//]: # (> 👉 In this section, you will build your first product on **alis.exchange** to get a feel for how everything you have installed and read comes together. )

[//]: # ()
[//]: # (A few final things before we get started. This section assumes you have successfully [installed the CLI]&#40;../../configuration/command-line-interface.md&#41; and [set up your IDE]&#40;../../configuration/set-up-your-favourite-IDE.md&#41;.)

[//]: # ()
[//]: # (The purpose of this is to get you building. The story and everything around it is fictitious and very obviously flawed in business logic. We put a story around it for it to flow, please don't try and reason out the story.)

[//]: # ()
[//]: # (This example attempts to structure content in a way that provides:<br>)

[//]: # (    🎥 **Context** - the story we are following and what we aim to achieve.<br>)

[//]: # (    🏃‍♂ **Execution** - the actual things that you will need to do.<br>)

[//]: # (    🤓 **Breakdown** - a high-level explanation of what you did and what happened in the background.)

[//]: # ()
[//]: # (Let's go!)

[//]: # ()
[//]: # (## Help Play grow 10x)

[//]: # ()
[//]: # (### 🎥 Story time)

[//]: # ()
[//]: # (A group of friends decided to start a company called `Play` after a discovery in their parents' cupboard led to a set of)

[//]: # (business ideas. Two of the founders were unpacking a cupboard when they came across an external hard drive that contained)

[//]: # (a large number of eBooks their parents purchased in the mid 2000s. Mike, who always seems to come up with an idea of)

[//]: # (making money, suggested that they could start some online store with these books and acquire additional books as time)

[//]: # (goes on.)

[//]: # ()
[//]: # (Having some experience in software, James suggested that they build out a set of products, each trying to provide a)

[//]: # (well-defined value offering and solving specific problems. Having previously built on **alis.exchange**, it was an)

[//]: # (obvious decision to register their new-found company, Play, on the exchange. They decided to start by creating a book)

[//]: # (repository product,`ME`, which defines a `book` resource and keeps track of all the books that they have available. This is the product considered in the [make a request to a product guide]&#40;/docs/guides/consume/make-your-first-request.md&#41;.)

[//]: # ()
[//]: # (At this point in time, they already have an organisation on **alis.exchange** with their core product `ME`. They have given)

[//]: # (their employees freedom to experiment with products, simply ignore these in the repos.)

[//]: # ()
[//]: # (### 🏃‍♂ Ex 1: Orientate yourself)

[//]: # ()
[//]: # (Since the organisation and product already exists, you will need to `get` these on your device.)

[//]: # ()
[//]: # (1. From your terminal, run `alis org get play`.)

[//]: # ()
[//]: # (    > 🤓 This adds the `play` directory into the `alis.exchange` folder in your `HOME` directory. You can open this to)

[//]: # (    > see the various directories that become available. Check out the explanation of how the [alis.exchange folder hierarchy is set up]&#40;/docs/references/local-folder-structure.md&#41; to understand what the purpose of each directory is.)

[//]: # (   )
[//]: # (2. Open the `/proto` directory in your IDE.)

[//]: # (3. Navigate to `proto/play/br/resources/books/v1/` to see the definition of the `book` resource and all the methods available for the API.)

[//]: # ()
[//]: # (### 🎥 The design requirements)

[//]: # ()
[//]: # (The founders at `Play` have decided to create a new Administrative product, `ad`, that coordinates the loans of books by various users.)

[//]: # ()
[//]: # (The product has already been created on **alis.exchange** and simply requires you to build it out. If you are interested in the process around how a product is created, open the section below.)

[//]: # ()
[//]: # (:::details 🤓 ad product creation on alis.exchange)

[//]: # ()
[//]: # (The process of creating a product is facilitated through the **alis.exchange** CLI. The following sections breaks down the actions that was followed by `play` to create a product and a brief overview of what happened in the background.)

[//]: # ()
[//]: # (#### Actions executed)

[//]: # ()
[//]: # (1. In the terminal, the command `alis product create play.ad` was run. You can run `alis product create -h` to get information on the command)

[//]: # (2. The prompts were followed that required the user to specify:)

[//]: # (    - Display name for the product)

[//]: # (    - Owner of the product)

[//]: # (    - Product description)

[//]: # (    - Billing account for the product)

[//]: # (3. To initialise the product repo, a simple `.gitignore` file was commited and pushed.)

[//]: # ()
[//]: # (Simple right? In the background, a lot of heavy lifting was done. The following section provides an overview thereof.)

[//]: # ()
[//]: # (#### 🤓 Overview of background processes)

[//]: # ()
[//]: # (While the CLI was displaying a spinner:)

[//]: # ()
[//]: # (- A Google Cloud project that hosts the product was created within the play organisation.)

[//]: # (- An empty Google Cloud Source Repository was created for the `ad` product.)

[//]: # (- Various permissions was added for the specified owner of the product in order to control access for clients and developers.)

[//]: # (- Various Terraform template files was added within `$HOME/alis.exchange/play/proto/play/ad` that are used to manage the cloud infrastructure of your product. These Terraform files collectively specifies all the cloud infrastructure that needs to be configured for your product to work, such as enabling various APIs &#40;Cloud Run, Firestore, etc.&#41; and creating permission groups.)

[//]: # (:::)

[//]: # ()
[//]: # (In order to coordinate the loans of books by various users, they firstly require a `receipt` resource.)

[//]: # ()
[//]: # (The use case is as follows: when a client takes out one or more books, a receipt is created that keeps track of various)

[//]: # (information such as who client is, which books were borrowed, the date the books were borrowed and the required return date.)

[//]: # ()
[//]: # (Knowing that people often forget when books are due for return, they also require a `notification` service which sends)

[//]: # (a reminder to clients about the books required for return, at the specified date.)

[//]: # ()
[//]: # (As part of this example, we will be a `receipt` resource neuron within a new product along with and a `notification` service.)

[//]: # (neuron.)

[//]: # ()
[//]: # (:::details 🤓 What is a neuron?)

[//]: # (A neuron is a collection of one or more APIs that performs a well defined function, such as interacting with a resource, executing a service or handling an event, by leveraging a collection of cloud resources.)

[//]: # ()
[//]: # (In the case of our `receipt` neuron, the neuron will be providing an API to perform actions &#40;create, update, get&#41; on a `receipt` resource by leveraging cloud resources including Google Cloud Run, Firestore and IAM.)

[//]: # ()
[//]: # (<!-- Find out more by reading the article.... -->)

[//]: # (:::)

[//]: # ()
[//]: # (### 🏃‍♂ Overview of the process)

[//]: # ()
[//]: # (The common process followed when building out new aspects of a product is depicted below)

[//]: # (<!-- Add a diagram  -->)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (### 🏃‍♂ Create resource neuron)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 2: Create resource neuron using terminal)

[//]: # ()
[//]: # (Creating a neuron requires the specification of a resource ID, which follows the convention:)

[//]: # (    - `resources-{resourceName}-{majorVersion} for resources)

[//]: # (    - `services-{serviceName}-{majorVersion} for services)

[//]: # ()
[//]: # (In our example, we would usually have specified the `receipts` resource as `resources-receipts-v1`. However, since we are reusing this product as a playground for multiple users, we ask that you add a unique ending to the resource, such as adding your initials. e.g. `resources-receipts-v1`.)

[//]: # ()
[//]: # (1. From your terminal, run the command `alis neuron create play.ad.{{yourResourceID}}`, specifying your unique resource ID.)

[//]: # ()
[//]: # (> 🤓 In the background, the CLI created neuron directories with various template files. These will make more sense as we start using them but to know at this stage:<br>)

[//]: # (> - Inside the `$HOME/alis.exchange/play/proto/play/ad/resources/{resourceName}/v1` directory, a `service.proto` and various Terraform &#40;`*.tf`&#41; files were added;)

[//]: # (> - Inside the `$HOME/alis.exchange/play/products/ad/resources/{resourceName}/v1` directory, various Go &#40;`*.go`&#41; template files were added that will be used for implementing the code as well as a Dockerfile that is used to containerize your source code.)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 3: Define the resource and methods)

[//]: # ()
[//]: # (<!-- TODO: Add link for understanding proto file -->)

[//]: # (> 🤓 A high-level understanding of the proto file structure and the comments on the various aspects of the file content)

[//]: # (> should be sufficient to orientate you around the following steps.)

[//]: # ()
[//]: # (‼️ The full proto used in this example can be [found in the repo]&#40;/docs//guides//build-your-first-product/src/receipts/receipts.proto&#41;. Be careful when copying over content that you **DO NOT** change the `package` name &#40;yours should be `package play.ad.resources.{yourResourceName}.v1;`&#41; or the `option go_package` specification &#40;yours should be `option go_package = "go.protobuf.play.alis.exchange/play/ad/resources/{yourResourceName}/v1";`&#41;)

[//]: # ()
[//]: # (The following steps will run through some important aspects of the proto.)

[//]: # ()
[//]: # (1. Ensure that the following _imports_ are included at the top of the proto:)

[//]: # (    )
[//]: # (    import "google/protobuf/empty.proto";)

[//]: # (    import "google/api/resource.proto";)

[//]: # (    import "google/api/field_behavior.proto";)

[//]: # (    import "google/api/client.proto";)

[//]: # (    import "google/api/annotations.proto";)

[//]: # (    import "google/protobuf/timestamp.proto";)

[//]: # (    import "google/protobuf/field_mask.proto";)

[//]: # (    import "google/type/date.proto";)

[//]: # (    ```)

[//]: # ()
[//]: # (    > 🚩 If your IDE cannot find the imports, ensure that you:)

[//]: # (    > - Have run `alis org get google`; and)

[//]: # (    > - [Configured your plugins correctly]&#40;../../configuration/set-up-your-favourite-IDE.md&#41;.)

[//]: # ()
[//]: # (2. In `receipts.proto`, define the `Receipt` resource:)

[//]: # (    )
[//]: # (    //A receipt resource)

[//]: # (    message Receipt {)

[//]: # ()
[//]: # (        //Name of the resource in the format:)

[//]: # (        //receipts/{receipt})

[//]: # (        string name = 1 [&#40;google.api.field_behavior&#41; = OUTPUT_ONLY];)

[//]: # ()
[//]: # (        //The email of the client.)

[//]: # (        //Example: bar@play.com)

[//]: # (        string client = 2 [&#40;google.api.field_behavior&#41; = REQUIRED];)

[//]: # ()
[//]: # (        //The full names of the books taken out by the client.)

[//]: # (        //Format: books/{book})

[//]: # (        repeated string books = 3 [&#40;google.api.field_behavior&#41; = REQUIRED];)

[//]: # ()
[//]: # (        //The date the book was borrowed by the client.)

[//]: # (        google.type.Date borrow_date = 4 [&#40;google.api.field_behavior&#41; = OUTPUT_ONLY];)

[//]: # ()
[//]: # (        // The date the book&#40;s&#41; is required to be returned)

[//]: # (        google.type.Date required_return_date = 5 [&#40;google.api.field_behavior&#41; = REQUIRED];)

[//]: # ()
[//]: # (        // The date the book&#40;s&#41; was actually returned)

[//]: # (        google.type.Date actual_return_date = 6;)

[//]: # (    })

[//]: # (    ```)

[//]: # ()
[//]: # (3. Now that we have defined the resource, we will add the <a href="https://google.aip.dev/131" target="_blank">)

[//]: # (    standard methods</a> on the resource.)

[//]: # (    > 🤓 <a href="https://google.aip.dev/131" target="_blank"> The AIP documentation on the standard methods</a> provide)

[//]: # (   > an in-depth explanation of the best practices. <br />)

[//]: # (   > 🚩 Note that we will only be implementing the `create` and `get` methods in this example.)

[//]: # ()
[//]: # (    Replace the `service Service{...}` section with the following:)

[//]: # ()
[//]: # (    )
[//]: # (	////  The receipt service)

[//]: # (   //)

[//]: # (   // The idea behind the service is that when a client takes out one)

[//]: # (   // or more books, a receipt is created that keeps track of)

[//]: # (   // various information.)

[//]: # (    service ReceiptsService {)

[//]: # (        // Create a new receipt)

[//]: # (           // See: https://google.aip.dev/133)

[//]: # (        rpc CreateReceipt &#40;CreateReceiptRequest&#41; returns &#40;Receipt&#41; {)

[//]: # (            option &#40;google.api.http&#41; = {)

[//]: # (                post: "/resources/receipts/v2/receipts")

[//]: # (                body: "receipt")

[//]: # (            };)

[//]: # (            option &#40;google.api.method_signature&#41; = "receipt";)

[//]: # (        })

[//]: # (        // Get an receipt)

[//]: # (           // See: https://google.aip.dev/131)

[//]: # (        rpc GetReceipt &#40;GetReceiptRequest&#41; returns &#40;Receipt&#41; {)

[//]: # (            option &#40;google.api.http&#41; = {)

[//]: # (                get: "/resources/receipts/v2/{name=receipts/*}")

[//]: # (            };)

[//]: # (            option &#40;google.api.method_signature&#41; = "name";)

[//]: # (        })

[//]: # (    })

[//]: # (    ```)

[//]: # ()
[//]: # (4. Define the `Request` messages:)

[//]: # ()
[//]: # (    )
[//]: # (    // Request message for CreateReceipt.)

[//]: # (    message CreateReceiptRequest {)

[//]: # (        // The Receipt to create)

[//]: # (        Receipt receipt = 1 [&#40;google.api.field_behavior&#41; = REQUIRED];)

[//]: # (    })

[//]: # ()
[//]: # (    // Request message for GetReceipt)

[//]: # (    message GetReceiptRequest {)

[//]: # (        // The receipt name is the unique identifier across organisations.)

[//]: # (        // Format: receipts/{receipt})

[//]: # (        string name = 1 [&#40;google.api.field_behavior&#41; = REQUIRED];)

[//]: # (    })

[//]: # (    ```)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 4: Define the Cloud Infrastructure requirements)

[//]: # ()
[//]: # (Terraform is used to specify the infrastructure required for your neuron. **alis.exchange** provides various `*.tf` file templates that are preconfigured for the majority of use cases. This includes the specifications of:)

[//]: # ()
[//]: # (- Cloud Run: Which is used to run the container of your neuron. The configuration includes the scaling specifications, naming of the instance, traffic and which container to run. )

[//]: # (- Identity and Access Managament &#40;IAM&#41;: Which is used to restrict access to the neuron)

[//]: # (- Variables: Various environmental variables that are used to facilitate multiple deployment environments and dependencies on other products.)

[//]: # ()
[//]: # (> 💡 **Tip:** Scan through the `*.tf` files along with the [Terraform Documentation]&#40;https://www.terraform.io/intro&#41; and the [Google documentation on Terraform Registry]&#40;https://registry.terraform.io/providers/hashicorp/google/latest/docs&#41; to understand what is being configured.)

[//]: # ()
[//]: # (When building your own neurons, you may bulk up your neurons with additional functionality by simply adding the Terraform specification for what you are trying to achieve. Examples may be adding:)

[//]: # ()
[//]: # (- A [Cloud Spanner Instance]&#40;https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/spanner_instance&#41;;)

[//]: # (- [Defining a Workflow]&#40;https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/workflows_workflow&#41;; and)

[//]: # (- [Creating]&#40;https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/pubsub_topic&#41; or [subscribing]&#40;https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/pubsub_subscription&#41; to a PubSub topic.)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 5: Compile the proto files locally)

[//]: # ()
[//]: # ( > 🤓 In order to implement the gRPC server, or programmatically use the API, the `.proto` files are compiled into files containing the service and message definitions for a specified language. In this example, we will be focussing on the implementation in Go.)

[//]: # ()
[//]: # ( In your terminal, run the following command, specifying your neuron name:)

[//]: # ( ```bash)

[//]: # ( $ alis neuron genprotobuf play.ad.resources-{uniqueNeuronName}-v1)

[//]: # ( ```)

[//]: # ()
[//]: # ( This commands generates `.pb.go` files locally in the `$HOME/alis.exchange/play/protobuf/go/*` directory, following the path of the Neuron. The contents of these files are not necessary to understand, other than knowing that they contain the definitions for the Go language.)

[//]: # ()
[//]: # ( > 🤓 Once we have finished implementing our API we will push these files to make them available for others to use.)

[//]: # ()
[//]: # (<!-- TODO: This will be updated if we can get the CLI alis neuron gen commands flying -->)

[//]: # ( #### 🏃‍♂ Ex 6: Update dependencies required to implement the services)

[//]: # (When you ran `alis neuron create ...` command, various template files were also added to the `ad` product directory. These will make sense as we implement the server.)

[//]: # ()
[//]: # (1. To find the definitions for your service, it is required to import the definitions which are specified with the `go.mod` file. These imports, similar to other go packages, are pulled from an online environment. Since we are still building out the services, and have not yet pushed these definitions to an online environment &#40;this will be done in step _______&#41;, we will use a `replace` statement to point to the locally compiled files from the previous step.)

[//]: # ()
[//]: # (In your `go.mod`, uncomment the line similar to the one below:)

[//]: # (```)

[//]: # (replace go.protobuf.play.alis.exchange => ../../../../../../play/protobuf/go)

[//]: # (```)

[//]: # (2. Ensure that your terminal is open in the `v1` directory containing the `go.mod` file and run the command `go mod tidy` to sync the dependencies.)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 7: Implement the services)

[//]: # ()
[//]: # (> 🤓 In the `server.go` file, we establish client connections with Google and other **alis.exchange** products during initialisation &#40;`init&#40;&#41;`&#41; to make them accessible during run time. In the `main&#40;&#41;` section, we create and serve a gRPC server which implements the methods &#40;done in `methods.go`&#41; which were defined in the proto and was translated into the `.pb.go` files.)

[//]: # ()
[//]: # (1. **Establishing client connection during `init&#40;&#41;`** )

[//]: # ()
[//]: # (The init section contains various boilerplate code, of which we can remove that which is not necessary, and add further connections. We want to create a connection with Firestore, which will store the details of our `receipts`, as well as to the `play.br` product in order to get various book defintions.)

[//]: # ()
[//]: # (Ensure that the section above your `main.go` looks exactly like code below:)

[//]: # ()
[//]: # (```go)

[//]: # (package main)

[//]: # ()
[//]: # (import &#40;)

[//]: # (	"context")

[//]: # (	"log")

[//]: # (	"net")

[//]: # (	"os")

[//]: # ()
[//]: # (	"cloud.google.com/go/firestore")

[//]: # (	"google.golang.org/grpc")

[//]: # ()
[//]: # (	pbBooks "go.protobuf.play.alis.exchange/play/br/resources/books/v1")

[//]: # (	pb "go.protobuf.play.alis.exchange/play/ad/resources/receipts/v1")

[//]: # (&#41;)

[//]: # ()
[//]: # (// client is a global client, initialized once per cloud run instance.)

[//]: # (var &#40;)

[//]: # (	firestoreClient    *firestore.Client)

[//]: # (	booksClient       pbBooks.BooksServiceClient)

[//]: # (&#41;)

[//]: # ()
[//]: # (ffunc init&#40;&#41; {)

[//]: # ()
[//]: # (	// Pre-declare err to avoid shadowing.)

[//]: # (	var err error)

[//]: # ()
[//]: # (	// Disable log prefixes such as the default timestamp.)

[//]: # (	// Prefix text prevents the message from being parsed as JSON.)

[//]: # (	// A timestamp is added when shipping logs to Cloud Logging.)

[//]: # (	log.SetFlags&#40;0&#41;)

[//]: # ()
[//]: # (	// Retrieve project id from the environment.)

[//]: # (	projectID := os.Getenv&#40;"ALIS_OS_PROJECT"&#41;)

[//]: # (	if projectID == "" {)

[//]: # (		log.Fatal&#40;"ALIS_OS_PROJECT env not set."&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	// Initialise Firestore client)

[//]: # (	firestoreClient, err = firestore.NewClient&#40;context.Background&#40;&#41;, projectID&#41;)

[//]: # (	if err != nil {)

[//]: # (		log.Fatalf&#40;"firestore.NewClient: %v", err&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	// Retrieve ME cloud run hash from the environment.)

[//]: # (	brHash := os.Getenv&#40;"ALIS_OS_ME_CLOUDRUNHASH"&#41;)

[//]: # (	if brHash == "" {)

[//]: # (		log.Fatal&#40;"ALIS_OS_PROJECT env not set."&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	// Create a connection with the gRPC server hosted on Cloud Run)

[//]: # (	// The URI of these services follows a consistent pattern:)

[//]: # (	// {NeuronName}-{GoogleProjectCloudRunHash}-{region}.a.run.app:443)

[//]: # (	// )

[//]: # (	// The {GoogleProjectCloudRunHash} is not preemptable but is the same for all neurons)

[//]: # (	// of a specific product deployment, ie. the same for all Cloud Run services in a Google Project.)

[//]: # (	// This therefore requires you to obtain the hash from the product that you are making use of.)

[//]: # (	//)

[//]: # (	// The {region} is the region in which the service is hosted. The default region)

[//]: # (	// on alis.exchange is `ew`, ie. Europe-West. For more information on regions,)

[//]: # (	// see: __________.)

[//]: # (	if conn, err := NewConn&#40;context.Background&#40;&#41;, "resources-books-v1-" + brHash + "-ew.a.run.app:443", false&#41;; err != nil {)

[//]: # (		log.Fatalf&#40;"booksClient new connection: %v", err&#41;)

[//]: # (	} else {)

[//]: # (		// If the connection was succesfully established, instantiate a new)

[//]: # (		// client for the BooksService. This client will be used to make the)

[//]: # (		// appropriate calls to the BooksService methods.)

[//]: # (		booksClient = pbBooks.NewBooksServiceClient&#40;conn&#41;)

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (> 🚩 If your IDE is giving any import errors, rerun `go mod tidy`.)

[//]: # ()
[//]: # (2. **Configure your environmental variables**)

[//]: # ()
[//]: # (In the above code, there are two usages of `os.Getenv&#40;...&#41;`. This is used to obtain environmental variables, which simplifies having multiple deployment environments by allowing us to declare these variables on deployment. )

[//]: # ()
[//]: # (<!-- TODO: add more detail/write an article about ENVs, their usage and utility -->)

[//]: # ()
[//]: # (For the production environment, we will specify these when deploying. For the local environment, we make use of the `local.env` file in the product &#40;`ad`&#41; directory. To ensure that your IDE is able to find the values in the `local.env`, ensure that you have [installed and configured the correct plugins]&#40;&#41;.)

[//]: # ()
[//]: # (The `local.env` should contain the following content:)

[//]: # ()
[//]: # (```yaml)

[//]: # (# this file is used for local development purposes only)

[//]: # (# and should be used in conjunction with your IDE.)

[//]: # ()
[//]: # (# Specifies the type of environment: 'development' or 'production')

[//]: # (#)

[//]: # (# In the production environment this is automatically added to)

[//]: # (# The Cloud Run service through the specification in the `cloudrun.tf`)

[//]: # (ALIS_OS_ENV=development)

[//]: # ()
[//]: # (# The Google Project ID where the neuron will be hosted. This)

[//]: # (# is a product deployment and therefore requires a product deployment)

[//]: # (# to exist before it can be declared.)

[//]: # (#)

[//]: # (# This can be found be running `alis product tree play.ad` and selecting)

[//]: # (# a deployment ID. We typically use a dev environment for local development)

[//]: # (# and testing.)

[//]: # (ALIS_OS_PROJECT=play-ad-dev-....)

[//]: # ()
[//]: # (# The Cloud Run hash of the br product deployment)

[//]: # (# that we have access to.)

[//]: # (#)

[//]: # (# For your own products, you can find this hash by opening)

[//]: # (# a Cloud Run instance and checking the URL.)

[//]: # (ALIS_OS_ME_CLOUDRUNHASH=z5x5ywf7za)

[//]: # (```)

[//]: # (<!-- TODO: NB make sure we can't generate service account keys in the Play org using the CLI -->)

[//]: # ()
[//]: # (3. **Implement the gRPC server** )

[//]: # ()
[//]: # (The `main&#40;&#41;` section in your `server.go` contains all of the boilerplate code you require to simply run the server. Check that your `main&#40;&#41;` contains the exact following: )

[//]: # ()
[//]: # (```go)

[//]: # (func main&#40;&#41; {)

[//]: # (	log.Println&#40;&Entry{Message: "starting server...", Severity: LogSeverity_NOTICE}&#41;)

[//]: # ()
[//]: # (	port := os.Getenv&#40;"PORT"&#41;)

[//]: # (	if port == "" {)

[//]: # (		port = "8080")

[//]: # (		log.Println&#40;&Entry{Message: "Defaulting to port " + port, Severity: LogSeverity_WARNING}&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	listener, err := net.Listen&#40;"tcp", ":"+port&#41;)

[//]: # (	if err != nil {)

[//]: # (		log.Fatalf&#40;"net.Listen: %v", err&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	grpcServer := grpc.NewServer&#40;grpc.UnaryInterceptor&#40;serverInterceptor&#41;&#41;)

[//]: # (	pb.RegisterServiceServer&#40;grpcServer, &myService{}&#41;)

[//]: # ()
[//]: # (	if err = grpcServer.Serve&#40;listener&#41;; err != nil {)

[//]: # (		log.Fatal&#40;err&#41;)

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (At this stage, your IDE might show an error for the section `pb.RegisterReceiptsServiceServer&#40;grpcServer, &myService{}&#41;`. Navigate to the `methods.go` file and ensure that the defintion for `myService` is exactly the same as the following:)

[//]: # ()
[//]: # (```go)

[//]: # (// Create a Service object which we'll register with the Server)

[//]: # (type myService struct {)

[//]: # (	pb.UnimplementedReceiptsServiceServer)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # ()
[//]: # (4. **Write tests for the methods**)

[//]: # ()
[//]: # (It is good practice to write tests prior to implementing code. In the `methods_test.go` file, copy over the following code for us to test whether the implementation of the methods are behaving as expected.)

[//]: # ()
[//]: # (```go)

[//]: # (package main)

[//]: # ()
[//]: # (import &#40;)

[//]: # (	"context")

[//]: # (	"fmt")

[//]: # (	"log")

[//]: # (	"testing")

[//]: # ()
[//]: # (	pb "go.protobuf.play.alis.exchange/play/ad/resources/receipts/v1")

[//]: # (	"google.golang.org/genproto/googleapis/type/date")

[//]: # (&#41;)

[//]: # ()
[//]: # (// Simulate a client object)

[//]: # (var client myService)

[//]: # ()
[//]: # (// This init&#40;&#41; function will only run when running Go tests.)

[//]: # (func init&#40;&#41; {)

[//]: # (	// Include a link to the file location of where the log originated from)

[//]: # (	log.SetFlags&#40;log.Lshortfile&#41;)

[//]: # ()
[//]: # (	client = myService{})

[//]: # (})

[//]: # ()
[//]: # (func TestReceiptService_CreateReceipt&#40;t *testing.T&#41; {)

[//]: # ()
[//]: # (	// You can run)

[//]: # ()
[//]: # (	// Construct a request message)

[//]: # (	req := pb.CreateReceiptRequest{Receipt: &pb.Receipt{)

[//]: # (		Client: "test@play.bar",)

[//]: # (		Books:  []string{"books/{book1}", "books/{book2}"},)

[//]: # (		RequiredReturnDate: &date.Date{)

[//]: # (			Year:  2023,)

[//]: # (			Month: 12,)

[//]: # (			Day:   01,)

[//]: # (		},)

[//]: # (	}})

[//]: # ()
[//]: # (	// Run a method)

[//]: # (	res, err := client.CreateReceipt&#40;context.Background&#40;&#41;, &req&#41;)

[//]: # (	if err != nil {)

[//]: # (		t.Error&#40;err&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	fmt.Println&#40;res&#41;)

[//]: # (})

[//]: # ()
[//]: # (func TestReceiptService_GetReceipt&#40;t *testing.T&#41; {)

[//]: # ()
[//]: # (	// Construct a request message)

[//]: # (	req := pb.GetReceiptRequest{Name: "receipts/{insertReceiptID}"})

[//]: # ()
[//]: # (	// Run a method)

[//]: # (	res, err := client.GetReceipt&#40;context.Background&#40;&#41;, &req&#41;)

[//]: # (	if err != nil {)

[//]: # (		t.Error&#40;err&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	fmt.Println&#40;res&#41;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # ()
[//]: # (5. **Implement the methods**)

[//]: # ()
[//]: # (We will now implement the two methods for the `ReceiptService`.)

[//]: # ()
[//]: # (> 🤓 The code itself provides the detailed logic about what happens but the typical body of a method will include:)

[//]: # (> 1. Some validation of the request arguments)

[//]: # (> 2. Some interaction with APIs to obtain data, such as reading from a database or hitting another product's API.)

[//]: # (> 3. Wrangling/use/update the obtained data based on the request arguments)

[//]: # (> 4. Calling additional APIS with the wrangled data, such as to store the updated data.)

[//]: # (> 5. Return a response)

[//]: # ()
[//]: # (The code in `methods.go` should be:)

[//]: # ()
[//]: # (```go)

[//]: # (package main)

[//]: # ()
[//]: # (import &#40;)

[//]: # (	"context")

[//]: # (	"regexp")

[//]: # (	"time")

[//]: # ()
[//]: # (	"github.com/google/uuid")

[//]: # (	pbBooks "go.protobuf.play.alis.exchange/play/br/resources/books/v1")

[//]: # (	pb "go.protobuf.play.alis.exchange/play/ad/resources/receipts/v1")

[//]: # (	"google.golang.org/genproto/googleapis/type/date")

[//]: # (	"google.golang.org/grpc/codes")

[//]: # (	"google.golang.org/grpc/status")

[//]: # (&#41;)

[//]: # ()
[//]: # (// Create a Service object which we'll register with the Server)

[//]: # (type myService struct {)

[//]: # (	pb.UnimplementedReceiptsServiceServer)

[//]: # (})

[//]: # ()
[//]: # (func &#40;s *myService&#41; CreateReceipt&#40;ctx context.Context, req *pb.CreateReceiptRequest&#41; &#40;*pb.Receipt, error&#41; {)

[//]: # (	// validate that the requested books exist)

[//]: # (	for _, book := range req.GetReceipt&#40;&#41;.GetBooks&#40;&#41; {)

[//]: # (		_, err := booksClient.GetBook&#40;ctx, &pbBooks.GetBookRequest{Name: book}&#41;)

[//]: # (		if err != nil {)

[//]: # (			return nil, status.Errorf&#40;codes.InvalidArgument, "books %v not found.", book&#41;)

[//]: # (		})

[//]: # (	})

[//]: # ()
[//]: # (	// Validate that the return date was specified)

[//]: # (	if req.GetReceipt&#40;&#41;.GetRequiredReturnDate&#40;&#41; == nil {)

[//]: # (		return nil, status.Errorf&#40;codes.InvalidArgument, "return date must be specified."&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	// Generate name for the receipt)

[//]: # (	req.GetReceipt&#40;&#41;.Name = "receipts/" + uuid.New&#40;&#41;.String&#40;&#41;[:6])

[//]: # (	// Generate the borrow date)

[//]: # (	req.GetReceipt&#40;&#41;.BorrowDate = &date.Date{)

[//]: # (		Year:  int32&#40;time.Now&#40;&#41;.Year&#40;&#41;&#41;,)

[//]: # (		Month: int32&#40;time.Now&#40;&#41;.Month&#40;&#41;&#41;,)

[//]: # (		Day:   int32&#40;time.Now&#40;&#41;.Day&#40;&#41;&#41;,)

[//]: # (	})

[//]: # ()
[//]: # (	_, err := firestoreClient.Doc&#40;req.GetReceipt&#40;&#41;.GetName&#40;&#41;&#41;.Create&#40;)

[//]: # (		ctx,)

[//]: # (		req.GetReceipt&#40;&#41;,)

[//]: # (	&#41;)

[//]: # (	if err != nil {)

[//]: # (		return nil, status.Errorf&#40;codes.Internal, "firestore related error: %v", err&#41;)

[//]: # (	})

[//]: # ()
[//]: # (	return req.GetReceipt&#40;&#41;, nil)

[//]: # (})

[//]: # ()
[//]: # (func &#40;s *myService&#41; GetReceipt&#40;ctx context.Context, req *pb.GetReceiptRequest&#41; &#40;*pb.Receipt, error&#41; {)

[//]: # (	//validate request)

[//]: # (	err := validateArgument&#40;"name", req.GetName&#40;&#41;, `receipts\/&#40;[0-9]&#41;{21}`&#41;)

[//]: # (	if err != nil {)

[//]: # (		return nil, err)

[//]: # (	})

[//]: # ()
[//]: # (	// get data for the receipt)

[//]: # (	var res pb.Receipt)

[//]: # (	docSnap, err := firestoreClient.Doc&#40;req.GetName&#40;&#41;&#41;.Get&#40;ctx&#41;)

[//]: # (	if status.Code&#40;err&#41; == codes.NotFound {)

[//]: # (		return nil, status.Errorf&#40;codes.NotFound, "resource &#40;%s&#41; not found", req.GetName&#40;&#41;&#41;)

[//]: # (	} else if err != nil {)

[//]: # (		return nil, err)

[//]: # (	})

[//]: # ()
[//]: # (	err = docSnap.DataTo&#40;&res&#41;)

[//]: # (	if err != nil {)

[//]: # (		return nil, status.Errorf&#40;codes.Internal, "GetReceipt: %v", err&#41;)

[//]: # (	})

[//]: # (	return &res, nil)

[//]: # (})

[//]: # ()
[//]: # (// validateArgument validates an argument and returns an error if not valid.)

[//]: # (//)

[//]: # (// Good practice is to have separate files with utility functions such as this)

[//]: # (// but is added here for the sake of the example.)

[//]: # (func validateArgument&#40;name string, value string, regex string&#41; error {)

[//]: # (	// validate the Name field using regex)

[//]: # (	validateName := regexp.MustCompile&#40;regex&#41;)

[//]: # (	validatedName := validateName.MatchString&#40;value&#41;)

[//]: # (	if !validatedName {)

[//]: # (		return status.Errorf&#40;)

[//]: # (			codes.InvalidArgument,)

[//]: # (			"%s &#40;%s&#41; is not of the right format: %s", name, value, regex&#41;)

[//]: # (	})

[//]: # (	return nil)

[//]: # (})

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (6. **Run the tests**)

[//]: # ()
[//]: # (> 🚩 Before running the test, ensure that your build configuration is using the `.env` file.)

[//]: # ()
[//]: # (... Should pass.)

[//]: # ()
[//]: # (Now that we know that things are working, we need to make some final tweaks before we can build and deploy.)

[//]: # ()
[//]: # (7. **Finishing touches**)

[//]: # ()
[//]: # (As we have noted, running `alis neuron genproto` WITHOUT the `-p` generates the definitions locally. We need to push these to the global definitions managed by **alis.exchange**.)

[//]: # ()
[//]: # (- **Remove local files**)

[//]: # ()
[//]: # (The locally compiled files need to be removed such as to not cause version control conflicts. In your terminal, navigate to the neuron's protobuf files by running)

[//]: # ()
[//]: # (```bash)

[//]: # (cd ~/alis.exchange/play/protobuf/go/play/ad/resources/receipts/v1/)

[//]: # (```)

[//]: # ()
[//]: # (Check that you are in the correct directory by running `ls`. The response should contain two files with `.pb.go` ending.)

[//]: # ()
[//]: # (Remove these files by runing `rm *`. Select yes if prompted whether to delete all the files.)

[//]: # ()
[//]: # (- **Generate the definitions and push to repo**)

[//]: # ()
[//]: # (To compile the the proto and push it to the repo managed by **alis.exchange** run the following command from your terminal, inserting your resource name:)

[//]: # ()
[//]: # (```bash)

[//]: # (alis neuron genproto play.ad.resources-{yourResource}-v1 -p)

[//]: # (```)

[//]: # ()
[//]: # (- **Update Go mod to point to global definitions**)

[//]: # ()
[//]: # (In your `go.mod` file, remove all the content such that the file looks similar to the example below)

[//]: # ()
[//]: # (```go )

[//]: # (module play.lb.resources.receipts.v1)

[//]: # ()
[//]: # (go 1.17)

[//]: # ()
[//]: # (require &#40;)

[//]: # (&#41;)

[//]: # ()
[//]: # (```)

[//]: # (If successful, your `go.mod` should contain a `go.protobuf.play.alis.exchange` entry under `require`. )

[//]: # ()
[//]: # (:::details Troubleshooting errors)

[//]: # ()
[//]: # (Two common errors that users get at this stage are:)

[//]: # ()
[//]: # (1. **Module does not contain package**)

[//]: # ()
[//]: # (Typically follows the error message:)

[//]: # ()
[//]: # (``` )

[//]: # (... module go.protobuf.play.alis.exchange@latest found &#40;...&#41;, but does not contain package go.protobuf.play.alis.exchange/play/ad/resources/receipts/v1)

[//]: # (```)

[//]: # ()
[//]: # (This means that your previous step of pushing the definitions to the repo was not successful. Perform the action in 2. again and retry running `go mod tidy`)

[//]: # ()
[//]: # (2. **Unrecognized import path**)

[//]: # ()
[//]: # (Run the following command from the terminal and attempt `go mod tidy` again.)

[//]: # ()
[//]: # (go env -w GOPRIVATE=go.protobuf.play.alis.exchange)

[//]: # (:::)

[//]: # ()
[//]: # (We are now ready to build and deploy)

[//]: # ()
[//]: # (- **Configure environmental variables**)

[//]: # ()
[//]: # (In the code, we have used various `os.Getenv&#40;&#41;` statements. In the production environment, these need to be available within the container at run time. To do this we need to:)

[//]: # ()
[//]: # (- *Declare the variable in Terraform*)

[//]: # (In the neuron's directory within the `proto` repo, we need to add variables to the `variables.tf` file. This file contains variables that are automatically added and managed by **alis.exchange** as well as a set of custom, user defined variables. Add the following variables to the file:)

[//]: # ()
[//]: # (```hcl)

[//]: # (# Custom neuron specific ENVS:)

[//]: # (variable "ALIS_OS_ME_CLOUDRUNHASH" {})

[//]: # (```)

[//]: # ()
[//]: # (- *Add the variable to the container*)

[//]: # (In the `cloudrun.tf` file check that the `containers` section contains the following specification:)

[//]: # ()
[//]: # (```hcl)

[//]: # (resource "google_cloud_run_service" "default" {)

[//]: # (	//Other content)

[//]: # (	containers {)

[//]: # (		image = "europe-west1-docker.pkg.dev/${var.ALIS_OS_PRODUCT_PROJECT}/neurons/${var.ALIS_OS_NEURON}:${var.ALIS_OS_NEURON_VERSION_COMMIT_SHA}")

[//]: # (		env {)

[//]: # (			name = "ALIS_OS_PROJECT")

[//]: # (			value = var.ALIS_OS_PROJECT)

[//]: # (		})

[//]: # (		env {)

[//]: # (			name = "ALIS_OS_ENV")

[//]: # (			value = "production")

[//]: # (		})

[//]: # (		env {)

[//]: # (			name = "ALIS_OS_PROJECT")

[//]: # (			value = var.ALIS_OS_PROJECT)

[//]: # (		})

[//]: # (		env {)

[//]: # (			name = "ALIS_OS_ME_CLOUDRUNHASH")

[//]: # (			value = var.ALIS_OS_ME_CLOUDRUNHASH)

[//]: # (		})

[//]: # (		resources {)

[//]: # (			limits = {)

[//]: # (			cpu: "1000m")

[//]: # (			memory: "2Gi")

[//]: # (			})

[//]: # (		})

[//]: # (	})

[//]: # (	//Other content)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 8: Release the neuron)

[//]: # ()
[//]: # (1. Ensure that all files in both the `proto` and `products/ad` have been added to Git.)

[//]: # (2. Commit and push all files that you have worked on in the neuron.)

[//]: # (3. **Release the neuron**)

[//]: # ()
[//]: # (In your terminal, run the following command, specifying your neuron name:)

[//]: # ()
[//]: # (```bash)

[//]: # (alis neuron release play.ad.resources-{yourResource}-v1)

[//]: # (```)

[//]: # ()
[//]: # (> 🤓 In the background, **alis.exchange** performs various actions:<br>)

[//]: # (> - A tag is added to the latest commit in the `proto` repo. This is used to know what the state of the proto and infrastructure was when the `release` took place.<br>)

[//]: # (> - The CLI looks for one or more *Dockerfile* in the `products/ad/resources/.../v1` directory.<br>)

[//]: # (> - If these files are present, these are executed within the *product project* &#40;play-lb-product-msc6ohw&#41; [Cloud Build]&#40;https://console.cloud.google.com/cloud-build/builds?project=play-ad-product-msc6ohw&#41;, which builds the container images and places these on )

[//]: # ([Artifact Registry]&#40;https://cloud.google.com/artifact-registry&#41; within the *product project* &#40;play-lb-product-msc6ohw&#41;.<br>)

[//]: # (> - Updates the resources in the **alis.exchange** operating system such as to reflect the changes. )

[//]: # ()
[//]: # (At this stage, the image has been created but it is not yet available for usage by anyone. To make it accessible, it needs to be deployed to a `product deployment`.)

[//]: # ()
[//]: # (#### 🏃‍♂ Ex 9: Deploy the neuron)

[//]: # ()
[//]: # (From the terminal, run the following command, specifying your neuron name:)

[//]: # ()
[//]: # (```bash)

[//]: # (alis neuron deploy play.ad.resource-{yourResource}-v1 -e)

[//]: # (```)

[//]: # ()
[//]: # (The `-e` is added to specify environmental variables for the production environment. )

[//]: # ()
[//]: # (- Follow the prompts and deploy the neuron to the existing product deployment.)

[//]: # (- When asked to add an environmental variable, add `ALIS_OS_ME_CLOUDRUNHASH` with the value of `z5x5ywf7za`. The other environmental variables are added automatically by **alis.exchange**.)

[//]: # ()
[//]: # (> 🤓 In the background, **alis.exchange** retrieves the neuron's Terraform specification from the commit history at the point in time when the `release` was run and applies the specification from the *product project* &#40;play-lb-product-msc6ohw&#41;, which has the relevant permissions to manage deployments. This can also be viewed in the [Cloud Build logs]&#40;https://console.cloud.google.com/cloud-build/builds?project=play-ad-product-msc6ohw&#41;.<br>)

[//]: # (> Scan throught the `*.tf` files to see what all is performed. It is valuable to know that in the `cloudrun.tf` a new Cloud Run service is created and the container built in the previous step is managed by the Cloud Run.)

[//]: # ()
[//]: # (Once the deployment has taken place, your neuron is in production 🚀)

[//]: # ()
[//]: # (<!-- TODO: Add a way for users to hit the product -->)

[//]: # (<!-- ### 🙋🏾‍♀️ FAQ)

[//]: # ()
[//]: # (- How do I know when to run `release` and `deploy` for a `product` or `neuron`?)

[//]: # ( -->)
