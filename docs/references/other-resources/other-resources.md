---
title: Other Resources
---
# Other Resources

## Protocol buffers
Protocol buffers, commonly referred to as _protos_, provide the interface definition language.

Protos are the golden source of truth of anything we do on the **alis.exchange**. Starting with protos eliminates common sources of developer toil by:
- Auto-generating documentation for APIs
- Auto-generating source code for the majority of popular languages including Go, Java, Python and more
- Auto-generating equivalent REST endpoints for gRPC services

Further reading on protos:
- [Protocol buffers documentation](https://developers.google.com/protocol-buffers)

## gRPC
gRPC is the primary inter-process communication protocol used on **alis.exchange** and is widely adopted by large companies
such as [Google, Netflix and Square](https://grpc.io/about/#whos-using-grpc-and-why").
As explained in the excellent book [gRPC: Up & Running](https://www.amazon.com/gRPC-Running-Building-Applications-Kubernetes/dp/1492058335)
(pages 10-13):

> Modern software applications rarely operate in isolation. Rather, they are connected with each other through computer
> networks and communicate and coordinate their actions by passing messages to one another. Therefore, a modern software
> system is a collection of distributed software applications that are running at different network locations and
> communicate with each other with message passing using different communication protocols.
>
> Inter-process communications are usually implemented using message passing with a synchronous request-response style
> or asynchronous event-driven styles.
>
> When it comes to building synchronous request-response style communication for modern cloud native applications and
> microservices, the most common and conventional approach is to build them as RESTful services ...
> however, for most use cases RESTful services are quite bulky,

More on gRPC:
- [gRPC documentation](https://grpc.io/docs/)
## Terraform
Terraform is an open-source infrastructure as code (IaC) software framework.
Terraform codifies cloud APIs into declarative configuration files. On **alis.exchange** this means we never spend time tinkering with infrastructure in a console.
- [Terraform documentation](https://www.terraform.io/intro)
- [Terraform in 100 Seconds](https://www.youtube.com/watch?v=tomUWcQ0P3k)
- [Terraform Explained](https://www.youtube.com/watch?v=HmxkYNv1ksg)


## Git
On **alis.exchange**, we use Git as the version control system and integrate with it to control builds of your products
and neurons. We are pattern agnostic, so whether you use a _feature branch_ workflow, _trunk-based development_ or any
other pattern, you will be able to develop on **alis.exchange** as long as Git is used.

If you are not familiar with Git, you can check out the <a href="https://www.youtube.com/watch?v=hwP7WQkmECE" target="_blank">
_Git Explained in 100 Seconds_ </a> video by Fireship.

- [Github documentation](https://docs.github.com/en)

## Google Cloud Platform

Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, Google Drive, and YouTube. Alongside a set of management tools, it provides a series of modular cloud services including computing, data storage, data analytics and machine learning.

Check out [_Essentials of GCP_ ](https://www.youtube.com/watch?v=4D3X6Xl5c_Y) for an overview of their services.

- [Google Cloud documentation](https://cloud.google.com/docs)

## Go
Go is an open source programming language supported by Google.
The language is a great place for building _"fast, reliable, and efficient software at scale"_.

The highlights of Go are that it's easy to learn, strongly typed and makes concurrency simple to implement.

Note worthy resources:

- [Go documentation](https://go.dev/doc/)
- [Go playground](https://go.dev/play/)
- [What is Go? An intro to Google’s Go programming language](https://acloudguru.com/blog/engineering/what-is-go-an-intro-to-googles-go-programming-language-aka-golang)
- [The Go Programming Language book](https://www.gopl.io/)
