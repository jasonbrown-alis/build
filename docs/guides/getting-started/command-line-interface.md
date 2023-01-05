---
title: Command Line Interface
---

# Alis CLI Installation

The Alis command-line interface (CLI) is a powerful tool for managing resources on the Alis Build platform.  You can use this tool to perform many common platform tasks either from the command line or in scripts and other automations. Some example use cases for the CLI:

**Build Lite**
- Initialise new protos;
- Auto-generate language-specific types; and
- Auto-generate server and client code.

**Build Premium**
- Create a new product;
- Deploy new versions of your product;
- Manage the build and deploy steps of your services; and
- Auto-generate infrastructure and implementation code.

##  Installation

<tabs>
<tab name="macOS/Linux">

1. Run the following command to create an _alis.exchange_ folder in your home directory with a sub-folder _cli_.

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

```bash
md %HOMEPATH%\alis.exchange\cli
```

3. Add this folder to your `$PATH`:

```bash
setx PATH "%PATH%;%PATH%;%HOMEPATH%\alis.exchange\cli" /m
```

4. Download the latest version of the CLI for your operating system (OS) and architecture (ARCH).

::: tip
Not sure what your OS or ARCH is? Run `set PROCESSOR` to find out.
:::

### List of available CLI binaries

| Windows                                                                        |
| ------- |
| [Windows Arm](https://files.cli.alis.services/windows/arm/latest/alis.exe)     |
| [Windows Arm64](https://files.cli.alis.services/windows/arm64/latest/alis.exe) |
| [Windows Amd64](https://files.cli.alis.services/windows/amd64/latest/alis.exe) |

5. Place the file in your _alis.exchange/cli_ folder. Ensure the file name and extension is `alis.exe`.

6. Close and restart all currently open terminal windows, including IDEs, such that the configurations of the paths can take place.

</tab>
</tabs>

You have successfully installed the Alis CLI!

:::tip

If you are a Build Premium or Enterprise user, you will need to ensure the following:

1. **Ensure Git is installed**

Git may already be installed on your device. Check by running `git --version`. A successful response should look similar to `git version 2.30.0`.

If the command was not found, follow the [installation instructions](https://www.atlassian.com/git/tutorials/install-git).

2. **Connect the CLI with Google Cloud and Google Cloud Source Repositories**

From your terminal, run `alis login`. This will open your browser and require you to grant access to the Alis Exchange CLI to manage your Google Cloud.

Once you have granted access, you will be redirected to a similar login page for Google Cloud Source Repositories. Granting access allows for the CLI
to manage your repositories. Once you have logged in, follow the instructions in copying the relevant script into your terminal.
:::

### Try out alis_ CLI

```bash
# Show help
alis -h

# list the products for your organisation
alis product list {yourOrg}
```
