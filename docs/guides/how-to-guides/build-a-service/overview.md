---
title: Setting up a gRPC server
---

# Tutorial overview

:::tip
It is highly recommended that you first read the overview of the [developer flow](../../getting-started/developer-flow)
before getting started with this example.
:::

In this tutorial, the entire [developer flow](../../getting-started/developer-flow) is demonstrated with a `Book` example.
The tutorial is broken into three parts:
1. **Design** - the design of the service usign protocol buffers;
2. **Implement** - the implementation of the business logic and infrastructure requirements; and
3. **Deploy** - the deployment of the service to serve traffic.

## Prerequisites

This tutorial assumes a conceptual understanding of both [protocol buffers](/guides/references/core-technologies.html#grpc) and [gRPC](/guides/references/core-technologies.html#grpc).

Furthermore, to follow in your own development environment, ensure that you have:
1. Ensure you have installed and set up the [Alis CLI](../../getting-started/command-line-interface);
2. An existing [product](/guides/getting-started/conceptual-framework.html#product) that you are able to build in.