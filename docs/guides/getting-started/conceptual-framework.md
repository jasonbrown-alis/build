---
title: Core Concepts

---

# Conceptual framework

The Alis Build platform leverages a collection of resources that follow the best practices of resource-oriented design.
These resources are used to elegantly integrate the cloud technologies that make up the platform.

The three major resources can be communicated together as an `organisation` having one or more `product`,
consisting of one or more `protocol buffer`, which is implemented in a `neuron`. Additionally, `products` have `deployments`, which consists of all, or a subset, of the
`neurons`.

## Organisation

An `organisation` represents the top-level resource on the platform.

- _Conceptually_, all `products` built on the platform belong to a specific `organisation`.
- _Practically_, an `organisation`:
	- Is responsible for billing.
	- Owns and manages users in the organisation along with access management.
	- Has a monorepo in which all resource and service definitions as well as infrastructure specification is contained.

## Product

A `product` resource represents a digital product built on the platform. The majority of these adopt an [API-first strategy](https://swagger.io/resources/articles/adopting-an-api-first-approach/).

- _Conceptually_, a `product` is the thing which is offered to the world, whether for usage within an `organisation` or
  as a B2B/B2C product.
- _Practically_, the `product`:
	- Has its own Google Cloud project.
	- Has a repo in which the source code for the `product` is contained.
	- Consists of a group of developers.
	- Can have one or more deployments of the `product`.
	- Manages access to the deployments of the `product`. This may be on an individual or group level.
	- Will specify the various APIs and infrastructure required by the children `neurons` through using [Terraform](https://www.terraform.io/docs).

Example `products` built by [Alis Alpha OS](https://alpha.alisx.com/products) include:
- `DE`: _Data Engineering_, responsible for synchronising data from external sources.
- `CP`: _Compliance_, a fast and flexible framework for accurate portfolio compliance at scale.

Furthermore, the Alis Build platform delivers its value by leveraging other products
such as `OS`, the _operating system_ facilitating the management of all the resources on the platform; and `CL`, the
_command-line interface_ which provides a means to interact with `OS` from your terminal.

## Protocol buffer

Everything in our worlds starts with a `protocol buffer`, also referred to as a _proto_. This resource leverages the original
Protocol Buffers design by Sanjay Ghemawat, Jeff Dean, and others (see [Protocol buffers](/guides/references/core-technologies#protocol-buffers) in our _further reading_).

The proto is used to clearly define all the functionality and data structures of the services you want to build out. You therefore
own your definitions and workflows, whether it is in building out in-house services our integrating with third-party products.

This definition first approach forms the foundation of ensuring the consistency and simplicity across the entire Alis ecosystem.
It is further leveraged by our platform to offer a range of features, including:
- Auto-generating internal and client facing client libraries for a range of supported languages (currently Go, Python and JavaScript). This allows for easy implementation of the methods and allows clients to easily consume your services in their own development environment.
- Autoconfiguring API gateways for the services specified in the protos. This provides HTTP endpoints for the gRPC methods, allowing for traditional REST calls to be made to the endpoints.
- [Auto-generating documentation](../how-to-guides/auto-generated-docs) for your product directly from your proto definitions.

::: details Everything is a proto
Everything in our world has a definition in a proto, including the resources discussed in this section!

Below are examples of the Alis Build resource definitions.

```
// A Organisation resource represents the
// top-level resource reflecting an organisation
message Organisation {
  // The Organisation resource name
  // Format: organisations/{organisation}
  string name = 1;
  // Display name
  string display_name = 2;
  ...
}

// A Product resource represents a product on
// the Alis Build platform.
message Product {
  // Product resource name
  // Format: organisations/{organisation}/products/{product}
  string name = 1;
  // Display name
  string display_name = 2;
  ...
}

// A Protocol Buffer resource.
//
// In the beginning there was a Proto. And the Proto was good.
// Everything in our worlds starts with a Proto. Based on original Protocol Buffers design
// by Sanjay Ghemawat, Jeff Dean, and others.
message ProtocolBuffer {
  // The ProtoPackage resource name
  // The resourceID refers to the 'package' defined in the .proto file.
  // Format: protocolBuffers/{resourceID}
  string name = 1;
  // State of the ProtocolBuffer.
  State state = 2;
  // The ProtocolBuffer State options
  enum State {
    // User did not specify state
    STATE_UNSPECIFIED = 0;
    // Active state
    ACTIVE = 1;
    // Failed
    FAILED = 2;
  }
  ...
}
```
:::

## Neuron

A `neuron` resource represents the _unit of compute_, i.e. the infrastructure and code that executes the logic, used by the parent `product`. Each `neuron` is either a
_resource_ type or a _service_ type. The collection of `neurons` in a `product` - i.e. the resources,
<a href="https://cloud.google.com/apis/design/standard_methods#:~:text=This%20chapter%20defines%20the%20concept%20of%20standard%20methods%2C%20which%20are%20List%2C%20Get%2C%20Create%2C%20Update%2C%20and%20Delete" target="_blank">
methods on the resources</a> and the services (typically following <a href="https://cloud.google.com/apis/design/custom_methods" target="_blank">
custom methods</a>) - provide all the functionality that a `product` requires to provide its offering.

::: info **Interesting Fact**
The word **neuron** was inspired by the neurons which exist in our brain. Like the billions of neurons in our brain, which all work independently in this complex network to achieve a single goal,
the alis neurons all work together independently in a network of microservices to achieve the goal of their product and organisation.
:::

## Deployments

A _deployment_ refers to an operational instance of a `product` on the cloud which clients would interact with. Under the hood this consists of both
`product deployments` and `neuron deployments`.

### Product deployment

A `product deployment` refers to the hardware infrastructure aspect of the product. As explained in the
[product section](/guides/getting-started/conceptual-framework.html#product), the
organisation's `proto` repository contains a directory for each product, in which the infrastructure requirements used
within the neurons are specified.

Before _deploying_ a `product`, it first needs to be _released_ (see `alis product release -h`), which increments the
semantic versioning and applies the **product level** (i.e. not those within the `neurons`) Terraform specification
within the `product` Google Cloud project.

When a `product` is _deployed_ (see `alis product deploy -h`), the **product level** (i.e. not those within the `neurons`)
Terraform files are used to apply the infrastructure specification, the end `product` being the deployment environment
reflecting the specification in the `*.tf` files. Once deployed, each `product deployment` has its own _Google Cloud
project_.

### Neuron deployment

A `neuron deployment` refers to a specific version of a `neuron` that is operational within a specific `product deployment`,
thereby being a _child resource_ of a `product deployment`.

Before _deploying_ a `neuron`, it first needs to be _released_ (see `alis neuron release -h`). During the build process,
the semantic versioning is incremented and deployment package is created from the source code and the Terraform specification:
1. The hash of the latest commit is captured such as to have a snapshot of the Terraform specification at the
   point in time the `build` was called.
2. The Dockerfile(s) in the `neuron` repo is executed on _[Cloud Build](https://cloud.google.com/build)_ to build the
   images from the `neuron` source code, which is stored in the _[Artifact Registry](https://cloud.google.com/artifact-registry)_.

When the `neuron` is _deployed_ to a specific `product deployment` (see `alis neuron deploy -h`), the `neuron` level
Terraform specification is applied in the _Google Cloud project_ of the respective `product deployment`. This
specification will typically contain services which point to the image in the artifact registry that was built when
running `alis neuron build ...`.

A `product deployment` may consist of all the `neurons` within a `product` or a subset thereof. Common patterns
have emerged from builders on the Alis Build platform which are discussed in the following section.

## Common deployment patterns

To demonstrate the three most typical deployment patterns, consider the example, depicted in the image, of a `product`
consisting of three `neurons`.

::: warning **We do apologise**
We are busy updating our diagrams and have temporarily removed this image.
:::

### Pattern 1: Full product deployment

The first pattern is where a `product` is deployed having all the `neurons`. This is typically used where a `product` provided
to clients is required to have all the functionality across all the `neurons` and be independent of other `neuron
deployments`.

::: warning **We do apologise**
We are busy updating our diagrams and have temporarily removed this image.
:::

### Pattern 2: Limited features product deployment

The second pattern is where a `product` is deployed having a subset of `neurons`. This is typically used where a `product`
may have a range of features that may individually be purchased by clients and therefore want to limit those available
in a given `product deployment`.

The image depicts an example where two clients have access to two different `product deployments`. The `product` having the
core functionality as part of `Neuron 1` and additional features being available with the other `neurons`. In the first case,
the client would have the functionality provided by the core `Neuron 1` and the extended functionality of `Neuron 2`.
In the second case, the client would have the functionality provided by the core `Neuron 1` and the extended
functionality of `Neuron 3`.

::: warning **We do apologise**
We are busy updating our diagrams and have temporarily removed this image.
:::

[//]: # (### Pattern 3: Interdependent neurons product deployment)

[//]: # ()
[//]: # (The final pattern is where multiple `product deployments` may have the need to access a single `neuron` version. This)

[//]: # (may be due to various use cases including:)

[//]: # (- The shared `neuron` containing a common data set that all `product deployements` are dependent on.<br />)

[//]: # (  _Example_: A common set of core financial instrument resources.)

[//]: # (- Architecturally, deciding to use a single Google Cloud product instance to perform the logic of the neuron.<br />)

[//]: # (  _Example_: A <a href="https://cloud.google.com/bigtable/docs/overview" targer="_blank">Cloud BigTable</a> instance)

[//]: # (  that is shared by other services to store information. <br />)

[//]: # (  The reasoning being that each BigTable instance is billed.)

[//]: # (  Therefore, using a single, shared instance with tight access control provides the same functionality but at a much)

[//]: # (  lower cost.)

[//]: # ()
[//]: # (The image depicts an example where `neuron deployments` of multiple `product deployments` make use of an individual,)

[//]: # (shared `neuron deployment`.)

[//]: # ()
[//]: # ()
[//]: # (![]&#40;../.vuepress/public/assets/images/ExchangeConceptsProductNeuronPattern3.svg&#41;)
