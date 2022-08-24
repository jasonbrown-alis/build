# Configuring your device 🧑‍💻

> 👉 In this section, we aim to provide you with all the resources to configure your developer environment to start building on **alis.exchange**.

If you face any difficulties in the process, check out the community Q&A and feel free to ask if your issue has not been dealt with yet.

## Command-line Interface
The `alis` CLI was adopted as a core tool to manage all **alis.exchange** resources, which will be unpacked in the following onboarding section 🤓.
All you need to do at this stage is to install the CLI by following the <a href="https://github.com/alis-x/cli" target="_blank">process described in the CLI repo</a>.

## Jetbrains GoLand
The <a href="https://www.jetbrains.com/go/" target="_blank">GoLand</a> integrated development environment (IDE) is the best supported IDE within the **alis.exchange** community and
various plugins have been adopted and built to aid the developer experience on **alis.exchange**.

1. Follow the relevant <a href="https://www.jetbrains.com/go/download/" target="_blank">installation instructions</a> for your device.
_**NOTE:** Start off using the trial version. Notify your organisation to purchase a license for your account if this was not yet provided._
2. In the IDE, open the _Preferences..._ and navigate to _Plugins_. In the marketplace, search for and install the latest versions of the following plugins:
    - EnvFile - _Borys Pierov_<br />
      <img src="img/envFile.png" height="80">
    - .env files support - _Adel F_<br />
         <img src="img/envFileSupport.png" height="80">
    - GitToolBox - _Lukasz Zielinski_<br />
      <img src="img/gitToolBox.png" height="80">
    - Terraform and HCL - _Jetbrains_<br />
         <img src="img/Terraform.png" height="80">
    - AIP Linter - _alis\_ - AI Driven Investments_<br />
      <img src="img/aipLinter.png" height="80">

### Plugin Configuration

#### AIP Linter Plugin
The AIP linter plugin requires the installation of the executable file built by <a href="https://linter.aip.dev/" target="_blank">Google</a>. This can be done by running:
```shell
go install github.com/googleapis/api-linter/cmd/api-linter@latest
```
Once this is installed, you will need to point the plugin to this downloaded `api-linter.exe` file.
In _Preferences/Tools/AIP Linter_ set the `api_linter_executable` to the downloaded executable. This should be in the
_/Users/{{YourUsername}}/go/bin_ directory.

The `Import Paths` are used to find imported `*.proto` files. At this stage, we will simply add the Google protos.<br />
_❗ Ensure that you have run the command `alis org get google` from your terminal to get the relevant protos downloaded locally._

Unselect the option to `Configure automatically` and add the path to the Google proto directory, _/Users/{YourUsername}/alis.exchange/google/proto_,
to the `Import Paths`.

Your final configuration should look similar to the image below. <br />
<img src="img/aipLinterPreferences.png" height="360">

Once you start coding, you will need to add all of the proto `Import Paths` that are being used by the protos you are working on. Using the example of an organisation `foo`, the import path would be _/Users/{YourUsername}/alis.exchange/foo/proto_

### Protocol Buffers Plugin

Similar to the AIP Linter Plugin, the Protocol Buffers Plugin requires a specification of the directories where imported
protos can be found. At this stage, we will simply add the Google protos.

Add the path to the Google proto directory, _/Users/{YourUsername}/alis.exchange/google/proto_, to the `Import Paths`.

Your final configuration should look similar to the image below. <br />
<img src="img/protocolBufferPreferences.png" height="360">

Once you start coding, you will need to add all of the proto `Import Paths` that are being used by the protos you are working on. Using the example of an organisation `foo`, the import path would be _/Users/{YourUsername}/alis.exchange/foo/proto_

## End 🏁

You are all set up and ready to start building. But before we get there, we need to first establish the most
essential concepts on **alis.exchange**

> 👟 **Up next:** _[alis.exchange core concepts 🚀](/ExchangeConcepts.md)_

**Already have an understanding of the concepts?**
> _[Build your first product](/HelloWorldBuild)_ 👷‍