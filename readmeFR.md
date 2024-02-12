This file is also available in [English](/readme.md).

# Description
AtmoPackMaker est un projet ayant pour but de permettre à n'importe qui de créer son propre pack Atmosphere custom se mettant automatiquement à jour.

# Installation
## Fork
Pour vous permettre d'avoir votre pack en vous basant sur ce modèle, j'utilise [le système de fork de GitHub](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo). Pour créer votre fork, [allez ici](https://github.com/Kiriox94/AtmoPackMaker/fork), et remplissez les différentes options comme il vous conviendra. Assurez-vous de laisser coché "Copy the main branch only". Maintenant que vous avez votre propre fork du projet, je vous recommande de suivre la suite du tutoriel depuis celui-ci.

### Astuce
Pour toujours avoir la dernière version du projet, pensez à cliquer de temps en temps sur le bouton "Sync fork" pour voir s'il y a des nouveautés.\
![sync_fork_button](/.github/sync_fork_button.png)

## Configuration

### PACK_NAME
Pour sélectionner le nom de votre pack, il faut passer par [le système de variable de GitHub](https://docs.github.com/fr/actions/learn-github-actions/variables). Pour cela, [allez ici](/settings/variables/actions/new), et dans le champ `name`, mettez `PACK_NAME`, puis mettez le nom que vous voulez donner à votre pack dans le champ `value`.

### localFiles
Si vous voulez inclure dans votre pack des fichiers qui n'ont pas besoin d'être téléchargés, vous pouvez simplement les placer dans le dossier [`localFiles`](/localFiles), dont le contenu sera copié à la racine de la carte SD.

### config.json
La configuration principale se fait avec le fichier [`config.json`](/config.json), qui permet de paramétrer plusieurs choses.

- `language` représente la langue que vous voulez utiliser pour afficher les logs de la console (liste de toutes les langues disponibles accessible [ici](/translation.csv)).

- `repoLink` représente le chemin d'accès à votre repository sur lequel est le projet, par exemple `Kiriox94/AtmoPackMaker` (si votre pack est sur une autre branche que la principale, précisez-le ainsi : `Kiriox94/AtmoPackMaker/tree/Eevee-Pack`). Par défaut, cette valeur est récupérée automatiquement, il ne sert donc à rien de la spécifier sauf cas particulier (si votre pack est sur une autre branche que la principale, par exemple).

- `useAIO` représente si vous voulez inclure [aio-switch-updater](https://github.com/HamletDuFromage/aio-switch-updater) dans le pack, vous permettant ainsi de mettre à jour le pack directement depuis votre switch.

- `startuplogoPath` représente le chemin vers un fichier `.png` de taille 308x350 qui remplace le logo Nintendo Switch au démarrage de la console (laissez vide si vous ne voulez pas remplacer l'icône de démarrage).

- `splashscreenPath` représente le chemin vers un fichier `.png` de taille 1280x720 qui remplace le splashscreen Atmosphere au lancement du payload `fusee.bin` (laissez vide si vous ne voulez pas remplacer le splashscreen de `fusee.bin`).

- `githubFiles` représente les fichiers dont vous voulez que la dernière version soit téléchargée directement depuis GitHub. Chaque élément de l'array représente un repo GitHub différent, et chacun doit avoir ces propriétés :
    - `link` représente le chemin GitHub du repository, par exemple pour GoldLeaf : `XorTroll/Goldleaf`
    - `desiredFiles` est aussi un array qui représente tous les fichiers que vous voulez télécharger depuis la dernière release du repo. Voici les propriétés disponibles :
        - `filename` représente le nom que le fichier aura une fois téléchargé.
        - `directory` représente le chemin sur la carte SD où vous voulez que votre fichier soit placé. Par exemple, pour un homebrew, il suffit de mettre `switch` pour que ce soit placé dans le bon dossier (laissez vide si vous voulez que ce soit placé à la racine).
        - `exp` représente le nom du fichier que vous voulez récupérer depuis la release sous forme d'[expression régulière](https://www.empirik.fr/nos-ressources/article/expressions-regulieres-ou-regex-definition-cas-dusages-et-exemples/), bien pratique si le nom du fichier change en fonction des versions. Par exemple, pour télécharger le bon fichier sur la release d'Atmosphere : `/^atmosphere-(\d+(\.\d+))((\.\d+))-[a-zA-Z]+-[a-zA-Z0-9]+\+hbl-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\+hbmenu-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\.zip$/` (si rien n'est spécifié, elle sera générée automatiquement à partir de la propriété `filename`).

- `onlineFiles` représente les fichiers que vous voulez télécharger via un lien. Chaque élément de l'array représente un fichier différent, et chacun doit avoir ces propriétés :
    - `name` représente le nom que le fichier aura une fois téléchargé.
    - `url` représente l'URL depuis laquelle votre fichier sera téléchargé.
    - `directory` représente le chemin sur la carte SD où vous voulez que votre fichier soit placé. Par exemple, pour un homebrew, il suffit de mettre `switch` pour que ce soit placé dans le bon dossier (laissez vide si vous voulez que ce soit placé à la racine).
         
# Compilation
Pour pouvoir facilement compiler le pack, j'utilise [le système de workflow de GitHub](https://docs.github.com/fr/actions/using-workflows/about-workflows). Pour l'activer, rendez-vous dans [la section `actions`](/actions) de votre repository, et cliquez sur le bouton bleu.\
![actions](/.github/actions.png)

## Automatique
Permet de déclencher la compilation du pack directement depuis votre switch. Cette option est encore en développement, veuillez vous référer au système manuel en attendant.

## Manuel
### Compile And Release
`Compile And Release` permet de compiler le pack puis de le publier dans une release. Pour cela, rendez-vous [ici](/actions/workflows/releaseOnTag.yml) et cliquez sur `Run workflow`. Ensuite, précisez le numéro de version que vous voulez pour votre release (attention, deux releases ne peuvent pas avoir le même numéro de version, cela créerait une erreur). Enfin, cliquez sur le bouton bleu `Run workflow`. Il ne vous reste plus qu'à attendre la fin du processus.
### Just Compile
`Just Compile` permet de compiler le pack sans publier de release après. Il peut être pratique si vous voulez voir si votre configuration fonctionne bien sans pour autant en faire une version. Pour cela, rendez-vous [ici](/actions/workflows/node.js.yml) et cliquez sur `Run workflow`, puis encore une fois sur `Run workflow`. Il ne vous reste plus qu'à attendre la fin du processus. 

# Remerciements
- Lunyx, Zoria et Murasaki pour [AtmosphereVanillaFetcher](https://github.com/Lunyyx/AtmosphereVanillaFetcher-cli)
- Zoria pour [AtmoPack-Vanilla](https://github.com/THZoria/AtmoPack-Vanilla)
- HamletDuFromage pour [aio-switch-updater](https://github.com/HamletDuFromage/aio-switch-updater)
