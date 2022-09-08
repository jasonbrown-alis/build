---
title: Resource Oriented Design
next: /references/core-concepts.html
---

# Resource Oriented Design

## Introduction

One of the biggest challenges faced within and across organisations is standards in terms of communication. Adopting a
resource-oriented design paradigm as a core part of **alis.exchange** has helped to establish a consistent standard of
communication across everything that happens on the exchange.

## Important resources

Google has two detailed resources that should be read to get a baseline understanding of this paradigm.<br />

- [Resource-oriented design](https://cloud.google.com/apis/design/resources)
- [AIP-121: Resource-oriented design](https://google.aip.dev/121)

The latter resource is part of Google's API Improvement Proposal, which is _"a design document providing high-level,
concise documentation for API development"_. These AIPs provide clear guidelines how to go about the design of resources
on **alis.exchange** and may be of useful to spend some time in once you start building. Additionally, we have built IDE plugins
for these AIPs to help enforce best practices while you design.

## Protocol buffers

Resource-oriented design is established on **alis.exchange** by the usage of protocol buffers, commonly referred to as
_protos_, as the interface definition language. This technology is core to all things **alis.exchange**.

> _"Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured
> data... You define how you want your data to be structured once, then you can use special generated source code to
> easily write and read your structured data to and from a variety of data streams and using a variety of languages."_ -
> <a href="https://developers.google.com/protocol-buffers" target="_blank">Source</a>

The protos becomes the golden source of truth of anything we do on the exchange. Having this, one can eliminate
common developer toil by:
- [Auto-generating documentation](/guides/how-to-guides/auto-generated-docs) for APIs;
- Auto-generating source code for the majority of popular languages including Go, Java, Python and more;
- Auto-generating equivalent REST endpoints for gRPC services;
- Setting API behaviour; and
- Permissions on a service level.

Additionally, having a clear structure that enforces standards of naming and defining everything you build, and
use to build, overcomes several organisational friction points in communicating what it is that anyone is busy with
at any point in time.

### Additional resources

- <a href="https://www.youtube.com/watch?v=ZEw9YryQotE" target="_blank">How is Protocol Buffer used?</a>
- <a href="https://developers.google.com/protocol-buffers">Protocol buffers documentation</a>
