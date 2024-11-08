Ce fichier est aussi disponible en [Français](/readmeFR.md).

# Description
AtmoPackMaker is a project aimed at enabling anyone to create their own custom Atmosphere pack that updates automatically.

# Installation
## Fork
To allow you to have your pack based on this template, I use [GitHub's fork system](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo). To create your fork, [go here](https://github.com/Kiriox94/AtmoPackMaker/fork), and fill in the various options as you see fit. Make sure to leave "Copy the main branch only" checked. Now that you have your own fork of the project, I recommend you follow the rest of the tutorial from there.

### Tip
To always have the latest version of the project, remember to click on the "Sync fork" button from time to time to check for updates.\
![sync_fork_button](/.github/sync_fork_button.png)

## Configuration

### PACK_NAME
To select the name of your pack, you need to use [GitHub's variable system](https://docs.github.com/en/actions/learn-github-actions/variables). To do this, [go here](../../settings/variables/actions/new), and in the `name` field, put `PACK_NAME`, then put the name you want to give to your pack in the `value` field.

### localFiles
If you want to include files in your pack that don't need to be downloaded, you can simply place them in the [`localFiles`](/localFiles) folder, the contents of which will be copied to the root of the SD card.

### config.json
The main configuration is done with the [`config.json`](/config.json) file, which allows you to configure several things.

- `language` represents the language you want to use to display console logs (list of all available languages accessible [here](/translation.csv)).

- `repoLink` represents the path to your repository where the project is, for example `Kiriox94/AtmoPackMaker`. By default, this value is automatically retrieved, so there is no need to specify it unless there is a special case.

- `branch` represents the branch of your repository on which the pack is located (to be indicated only if it's on a branch other than main).

- `useAIO` represents whether you want to include [aio-switch-updater](https://github.com/HamletDuFromage/aio-switch-updater) in the pack, allowing you to update the pack directly from your switch.

- `startuplogoPath` represents the path to a `.png` file of size 308x350 that replaces the Nintendo Switch logo at startup (leave blank if you don't want to replace the startup icon).

- `splashscreenPath` represents the path to a `.png` file of size 1280x720 that replaces the Atmosphere splash screen when launching the `fusee.bin` payload (leave blank if you don't want to replace the `fusee.bin` splash screen).

- `githubFiles` represents the files you want to have the latest version downloaded directly from GitHub. Each element of the array represents a different GitHub repo, and each must have these properties:
    - `link` represents the GitHub path of the repository, for example, for GoldLeaf: `XorTroll/Goldleaf`
    - `desiredFiles` is also an array representing all the files you want to be downloaded from the latest release of the repo. Here are the available properties:
        - `filename` represents the name the file will have once downloaded.
        - `directory` represents the path on the SD card where you want your file to be placed. For  a homebrew, just put `switch` to place it in the right folder (leave blank if you want it placed at the root).
        - `exp` represents the name of the file you want to retrieve from the release in the form of a [regular expression](https://www.regular-expressions.info/), handy if the filename changes with versions. For example, to download the correct file on the Atmosphere release: `/^atmosphere-(\d+(\.\d+))((\.\d+))-[a-zA-Z]+-[a-zA-Z0-9]+\+hbl-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\+hbmenu-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\.zip$/` (if nothing is specified, it will be generated automatically from the `filename` property).

- `onlineFiles` represents the files you want to download via a link. Each element of the array represents a different file, and each must have these properties:
    - `name` represents the name the file will have once downloaded.
    - `url` represents the URL from which your file will be downloaded.
    - `directory` represents the path on the SD card where you want your file to be placed. For example, for a homebrew, just put `switch` to place it in the right folder (leave blank if you want it placed at the root).
         
# Compilation
To easily compile the pack, I use [GitHub's workflow system](https://docs.github.com/en/actions/using-workflows/about-workflows). To enable it, go to [the actions section](../../actions) of your repository, and click on the blue button.\
![actions](/.github/actions.png)

## Manual
### Build And Release
Build And Release allows you to compile the package and then publish it in a release. To do this, go to [here](../../actions/workflows/release.yml) and click on `Run workflow`. Next, specify the version number you want for your release (note that two releases cannot have the same version number, as this would create an error). Finally, click on the blue `Run workflow` button. Now all you have to do is wait for the process to finish.
### Just Build
Just Build allows you to compile the package without publishing a release afterwards. This can be useful if you want to see how well your configuration works without actually making a release. To do this, go to [here](../../actions/workflows/build.yml) and click on `Run workflow`, then again on `Run workflow`. Now all you have to do is wait for the process to finish.

# Acknowledgments
- Lunyx, Zoria, and Murasaki for [AtmosphereVanillaFetcher](https://github.com/Lunyyx/AtmosphereVanillaFetcher-cli)
- Zoria for [AtmoPack-Vanilla](https://github.com/THZoria/AtmoPack-Vanilla)
- HamletDuFromage for [aio-switch-updater](https://github.com/HamletDuFromage/aio-switch-updater)
