---
title: Command Line Interface
---

# Alis CLI Installation

The **Build OS** command-line interface (CLI) is a powerful tool for managing resources on **Build OS**.  You can use this tool to perform many common platform tasks either from the command line or in scripts and other automations. Some example use cases for the CLI:

- Create a new product / organisation;
- Deploy new versions of your product;
- Manage the build and deploy steps of your services; and
- Auto-generate infrastructure and implementation code.

## Install Prerequisites

Before you install the **Build OS** CLI, install the following prerequisites:

### Google Cloud SDK

The CLI makes use of Google Cloud SDK authentication to seamlessly authenticate your requests to **Build OS**.

1. Install the latest version of Cloud SDK for your device by following the [instructions](https://cloud.google.com/sdk/docs/install).
2. Run `gcloud auth login` from your terminal to authenticate your local environment with Google user account via a web-based authorization flow.
    *NOTE* Ensure that you login using your account associated with alis.exchange.
3. Run `gcloud auth application-default login` to acquire new user credentials to use for Application Default Credentials ([ADC](https://developers.google.com/identity/protocols/application-default-credentials)). These are used in calling Google APIs.


### Git

Git may already be installed on your device. Check by running `git --version`. A successful response should look similar to `git version 2.30.0`. If the command was not found, follow the [installation instructions](https://www.atlassian.com/git/tutorials/install-git).

### Connect Git with Google Cloud

Your Git needs to be configured with Google Cloud Source repositories. Credential helper scripts provide the information that Git needs to connect securely to Cloud Source Repositories using your Google Account credentials.

1. Access [this link](https://source.developers.google.com/auth/start?scopes=https://www.googleapis.com/auth/cloud-platform&state=) and log in with your Google credentials
2. Copy the relevant script into your terminal

::: tip **Check success**
Check if this was successful by opening the `.gitcookies` file in Vim: `vim ~/.gitcookies`. If successful, the file should contain a `source.developers.google.com` entry.
:::

##  Installation

<tabs>
<tab name="macOS/Linux">

1. Run the following command to create a folder in your home directory **alis.exchange** with a sub-folder _cli_.

```bash
mkdir -p ~/alis.exchange/cli
```

2. Add this folder to your `$PATH`:

```bash
echo 'export PATH=$PATH:~/alis.exchange/cli' >> ~/.zshrc
```

3. Download the latest version of the CLI for your operating system (OS) and architecture (ARCH).

::: tip
Not sure what your OS or ARCH is? Run `uname -a` to find out.
:::

### List of available CLI binaries

| macOS        | Linux  |
   | ------ | -----|
|   | [Linux Arm](https://files.cli.alis.services/linux/arm/latest/alis) |
| [Darwin Arm64 (M1)](https://files.cli.alis.services/darwin/arm64/latest/alis) | [Linux Arm64](https://files.cli.alis.services/linux/arm64/latest/alis) |
| [Darwin Amd64](https://files.cli.alis.services/darwin/amd64/latest/alis) | [Linux Amd64](https://files.cli.alis.services/linux/arm64/latest/alis) |

4. Place the file in your _alis.exchange/cli_ folder. Run the following command to give it execute permission:

```bash
chmod a+x $HOME/alis.exchange/cli/alis
```

5. Close and restart all currently open terminal windows, including IDEs, such that the configurations of the paths can take place.

::: warning **Unidentified developer error?**
For macOS, open the CLI by right-clicking on the file and open. This will prompt you _The application is from an unidentified developer. Are you sure you want to open it?_.

Select open. This will allow macOS permission to always run the CLI, and therefore you only have to do it with your initial installation.
:::

You have successfully installed the **alis.exchange** CLI!
</tab>
<tab name="Windows">

1. Open command prompt as administrator.
2. Run the following command to create a folder in your home directory **alis.exchange** with a sub-folder _cli_.

```
md %HOMEPATH%\alis.exchange\cli
```

3. Add this folder to your `$PATH`:

```
setx PATH "%PATH%;%PATH%;%HOMEPATH%\alis.exchange\cli" /m
```

4. Download the latest version of the CLI for your operating system (OS) and architecture (ARCH).

::: tip
Not sure what your OS or ARCH is? Run `set PROCESSOR` to find out.
:::

### List of available CLI binaries

| Windows                                                                        |
   | ------- |
| [Windows Arm](https://files.cli.alis.services/windows/arm/4.0.96/alis.exe)     |
| [Windows Arm64](https://files.cli.alis.services/windows/arm64/4.0.96/alis.exe) |
| [Windows Amd64](https://files.cli.alis.services/windows/amd64/4.0.96/alis.exe) |

5. Place the file in your _alis.exchange/cli_ folder. Ensure the file name and extension is `alis.exe`.

6. Close and restart all currently open terminal windows, including IDEs, such that the configurations of the paths can take place.

</tab>
</tabs>



You have successfully installed the **alis.exchange** CLI!



### Try out alis_ CLI

```bash
# Show help
alis -h

# list the products for your organisation
alis product list {yourOrg}
```
