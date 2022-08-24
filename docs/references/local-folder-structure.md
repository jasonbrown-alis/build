> `/api` [_Currently unused_] <br />
   > `/product` [_This will only be created once you `get` or `create` a product_] - This contains multiple directories,
   > one for each `product`. These individual `product` directories is a git repo where the source code for a `product`
   > lives. <br />
   > `/proto` - This directory contains all the product definitions, both the `*.proto` files - which contain the service
   >  definitions - and the various `*.tf` files - which define the infrastructure requirements at both a `product` and
   > `neuron` level. A git repo sits at this level.<br />
   > `/protobuf` - Contains the _server skeleton_ which and _client stub_ for the protos in the various languages
   > available. The _server skeleton_ is used for the implementation of the <a href="https://grpc.io/docs/what-is-grpc/core-concepts/#:~:text=On%20the%20server%20side%2C%20the%20server%20implements%20the%20methods%20declared%20by%20the%20service%20and%20runs%20a%20gRPC%20server%20to%20handle%20client%20calls.%20The%20gRPC%20infrastructure%20decodes%20incoming%20requests%2C%20executes%20service%20methods%2C%20and%20encodes%20service%20responses." target="_blank">
   > server</a>. The _client stub_ is used on the <a href="https://grpc.io/docs/what-is-grpc/core-concepts/#:~:text=On%20the%20client%20side%2C%20the,server%E2%80%99s%20protocol%20buffer%20response(s)." target="_blank">
   > client side</a> to programmatically call the APIs.<br />