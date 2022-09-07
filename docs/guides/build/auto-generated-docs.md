---
title: Using Auto-generated Docs
sidebarDepth: 2
next: "Consume: Quick start"
---

# How to use Auto-generated Product Documentation

Poor documentation is bad for everyone:
- Boring and laboursome for those who maintain it
- Frustrating for clients if not well maintained
- Hinders the internal team who need docs to accelerate dev and integration

We believe that documentation should be generated, and not maintained. It should be easy to change and add to. And it should be seamless and fast in making updates available to clients.

Achieving this entails:
- bringing the lifecycle surrounding docs creation and publication as close to the development process as possible, to eliminate toil in its maintenance
- providing tooling which allows developers to rapidly write docs and publish them without having to spend hours beautifying and figuring out how to host them

Alis Build OS takes an approach to documentation where all you have to do is maintain your protos, write some user guides and offer code samples in the form of Markdown files and we’ll take care of the rest.

## Before you begin
1. Download and install the Alis Build OS CLI.
2. Ensure you have created an organisation on Build OS. TODO: some link to tutorial on creating an organisation
3. Docs exist at the product level, so ensure you have created a product under your organisation. TODO: some link to a tutorial on creating a product
4. Fetch your organisation via the CLI with `alis org get {orgID}`
5. Fetch the product of interest via the CLI with `alis product get {orgID}.{productID}`

## Understanding the documentation service
Product docs on Build OS are generated using 2 sources:
1. The .proto files which exist within your organisations `proto` repo, for the product of interest.
2. The custom markdown files contained within the `docs` folder, which exist within your organisations `proto` repo, for the product of interest.
```
proto
├──{orgID}
│   └── {productID}
│       ├── docs/*.md
│       ├── resources/*.proto
│       └── services/*.proto
└── {productID_2}/
```
From these files, the documentation which is generated is broken up into 2 parts:
1. Custom Documentation: these are the guides and code samples written by the user and contained within the `docs` folder.
2. Reference documentation: this is generated directly from the contents of the `.proto` files, as they existed at the latest `alis proto release` command, and is used for documenting the APIs offered by the product.

Once a user is happy with the state of their markdown files for custom documentation, these should be pushed to the master branch of the proto repo as this is the source of truth for generating custom documentation. They should also be satisfied with the state of the currently released protos as these are the source of truth for reference docs. The user can then run `alis docs release {orgID}.{productID}` to publish the documentation for external use.

The documentation will be available at: [https://{orgID}.{productID}.{orgDomain}]()

## Writing custom documentation
To be able to write custom documentation, one must confirm the following
1. If a docs folder does not exist for the product within the proto repo, create it.
2. This docs folder must then have, as a minimal starting point, the `guides`, `reference`  and ‘samples’ sub-directories as well as an index.md at each level as indicated below
```
docs
├── index.md
├── guides
│   └──index.md
├── reference
│   └── index.md
└── samples
└── index.md
```

Once completing the above, the user can proceed to write and customise the docs as they please.

You can customise the index.md for each section as you’d like, including the index.md at the root of the docs folder which is the landing page for your docs. You can create any subdirectories you desire within the provided `guides`, `reference` and `samples` subdirectories. The generated docs will then provide sections and pages that directly reflect your folder structure and markdown files. For example:

```text
.
├── guides
│   ├── how-to-guides
│   │   ├── first_screening.md
│   │   └── getting_started.md
│   ├── index.md
│   ├── quick-starts
│   │   └── some_lekker_quick_start.md
│   ├── some-cool-directory
│   │   └── cool-content.md
│   └── tutorials
│       ├── advanced
│       │   ├── sub_file1.md
│       │   └── sub_file2.md
│       ├── main_file.md
│       └── sub_file1.md
├── index.md
├── reference
│   └── index.md
└── samples
├── code_sample_1.md
└── index.md
```
![](./img/docs-folder-structure.png)

An important thing, to note however, is that the title of the individual markdown files does not map to the name of the .md file. It rather makes use of the YAML Frontmatter defined in the .md file. In `first_screening.md` for example, the YAML Frontmatter would be:
```yaml
---
title: Conduct your first screening
---
```
And the content of the article would follow afterwards. Since our documentation makes use of Vitepress behind the scenes, you can get more information about YAML Frontmatter and Vitepress at https://vitepress.vuejs.org

## Writing reference documentation

The reference documentation component is generated from the .proto files. All you need to do is simply maintain your protos by writing detailed comments above the various services, methods, messages and fields. These comments are then propagated into the reference documentation for the APIs.

An important issue to note, however, is that the use of certain Markdown syntax in your comments may result in invalid Markdown syntax in the generated documentation, causing the build of your documentation to fail. In general, try to steer clear of reserved symbols, such as “|” in your documentation comments.

## Deploying your documentation
1. Once you are happy with the state of your markdown files in the docs folder, push your changes to master.
2. Ensure you have released the most up-to-date protos in terms of their content and commentary
3. Run `alis docs release {orgID}.{productID}`
4. The documentation will be available at: [https://{orgID}.{productID}.{orgDomain}]()
