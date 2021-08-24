# _[ - Hack Switch Tutorial - ]_

__EN__ tutorial will be available in French and English __FR__ Ce tutoriel sera disponible en français et en anglais

## EN

__Formatting an SD in Nintendo Switch OFW mode :__

Follow the steps below:
From the HOME menu, select "Console Settings".
Scroll to the left and select "Console".
Scroll to the right and select "Reset Options".
If necessary, enter the parental control PIN.
Select "Format microSD card" and then "Continue".

__Set up RCM mode and AtmoPack-Vanilla or AtmoPack-Full :__

__Free method :__ 

- At first you will have to install the software "TegraRcmGUI" once done select "settings" then "install drivers" : [TegraRCMGui](https://github.com/eliboa/TegraRcmGUI/releases/download/2.6/TegraRcmGUI_v2.6_Installer.msi)
- Once done, download the latest version of my pack : [AtmoPack-Vanilla](https://github.com/THZoria/AtmoPack-Vanilla/releases/latest) or [AtmoPack-Full](https://github.com/Pikatsuto/AtmoPack-Full/releases/latest)
- Then go back to the "payload" tab, copy the pack files to the root of the Micro SD 
- Once done the console must be turned off and plugged into a USB port on your PC
- The goal is simple the method is to remove the right joycon of your switch you will see small metal pins called "PIN"

## FR

__Formater une SD en mode OFW Nintendo Switch__

Suivez les étapes ci-dessous :
Depuis le menu HOME, sélectionnez "Paramètres de la console".
Faites défiler les options sur la gauche et sélectionnez "Console".
Faites défiler les options sur la droite et sélectionnez "Options de réinitialisation".
Si nécessaire, saisissez le code secret du contrôle parental.
Sélectionnez "Formater la carte microSD" puis "Continuer".

__Mettre en place le mode RCM et le AtmoPack-Vanilla ou AtmoPack-Full :__

__Méthode gratuit :__ 
- Dans un premier temps il vous faudra installer  le logiciel "TégraRcmGUI" une fois fait sélectionnez "settings" puis "install drivers" :
[TegraRCMGui](https://github.com/eliboa/TegraRcmGUI/releases/download/2.6/TegraRcmGUI_v2.6_Installer.msi)
- Une fois fait téléchargez la dernière version de mon pack : [AtmoPack-Vanilla](https://github.com/THZoria/AtmoPack-Vanilla/releases/latest) ou [AtmoPack-Full](https://github.com/Pikatsuto/AtmoPack-Full/releases/latest)
- Ensuite retournez sur l'onglet "payload", copié les fichier du pack à la racine de la Micro SD 
- Une fois fait la console doit être éteinte et branchée sur un port USB de votre pc
- Le but est simple la méthode consiste à enlever le joycon droit de votre switch vous y apercevrez des petites broches métalliques appelés "PIN"

![unknown](https://user-images.githubusercontent.com/50277488/118039934-2e09c280-b371-11eb-907e-9dec4d27a2d2.png)

## EN
- You will have to use a metal object, such as a paper clip, to press the first and the last PIN gently at the same time while pressing the volume + button and then POWER
- If you succeeded in the manipulation the red light on Tegra will turn green and the following message will be written in the software console: "RCM Device detected".
- If you failed the manipulation your switch will light up normally and nothing will happen you can try again
- On the Tegra software double click on "hekate_ctcear_5.0.0.bin" and the payload will be launched on your switch
__Paid method :__ 
- You can also replace the paper clip or metal object by an object designed spatially for the RCM mode this object is called "JIG RCM" and you can find it on the internet for less than 1€.

## FR
- Il vous faudra à l'aide d'un objet métallique, type trombone ou autre, appuyer sur le premier et le dernier PIN délicatement en même temps tout en restant appuyé sur le bouton volume + et enfin POWER
- Si vous avez réussi la manipulation le voyant rouge sur Tegra passera au vert et il sera écrit dans la console du logiciel le message suivant : "RCM Device detected"
- Si vous avez raté la manipulation votre switch s'allumera normalement et rien ne se passera vous pouvez essayez de recommencer
- Sur le logiciel Tegra double cliqué sur " hekate_ctcear_5.0.0.bin" et le payload se lancera sur votre switch
__Méthode Payante :__ 
- Vous pouvez aussi remplacer le trombone ou objet métallique par un objet conçu spatialement pour la mise en mode RCM cette objet se nomme "JIG RCM" et vous pourrez en trouvez sur internet pour moins de 1€

![Jig-de-remplacement-pour-Nintendo-Switch-GBA-FBA-outil-de-remplacement-RCM-pour-modification-de-fichiers](https://user-images.githubusercontent.com/50277488/118040253-9ce71b80-b371-11eb-95f1-f69fd596b6bb.jpg)

## EN
- You can replace Tegra with an object called "RCM loader" you can find on the internet for about 15€.

## FR
- Vous pouvez remplacer Tégra par un objet qui se nomme "RCM loader" vous en trouverez sur internet pour à peu près 15€

![rcmloader-2-pour-ns-switch-console-sx-pro-adaptate](https://user-images.githubusercontent.com/50277488/118040298-a6708380-b371-11eb-9776-e55c77e9ab72.jpg)

## EN
Create an __emuMMC / emuNAND :__

To avoid to brick this console or to be banned we make what we call an emuNAND, that create a copy of the OS of the console in the SD untied of this last one, of this way Nintendo can't banish you
As a reminder an emuNAND is a copy of the NAND stored in the micro SD
It can be stored in 2 possible ways.

- By __File__
- By __Partition__
The most reliable method is by __Partition__.
❕ It is necessary to have a minimum 64GB SD and 128 to 256GB recommended.

1️⃣ Create the partition
- Switch to RCM mode and inject the Hekate payload

Translated with www.DeepL.com/Translator (free version)

## FR
__Créer un emuMMC / emuNAND :__

Pour évité de bricker ça console ou de ce faire bannir on fait ce que l'on appel un emuNAND, cela créer une copie de l'OS de la console dans la SD délié de cette dernière, de cette façons Nintendo ne peu pas vous bannir
Pour rappel un emuNAND est une copie de le NAND stocker dans la micro SD
Elle peut être stockée de 2 manières possibles.

- Par __Fichier__
- Par __Partition__
La méthode la plus fiable et la méthode par __Partition__
❕ Il est nécessaire d'avoir une SD de minimum 64Go et de 128 à 256Go recommandé.

1️⃣ Créer la partition
- Passer en mode RCM et injecter le payload Hekate

![01](https://user-images.githubusercontent.com/50277488/118040566-fc452b80-b371-11eb-936a-7c5511b752a2.png)

## EN
II. Select the __Tools__ menu of Hekate

## FR
II. Sélectionner le menu __Tools__ d'Hekate

![02](https://user-images.githubusercontent.com/50277488/118041001-94431500-b372-11eb-9c39-1a73ebc63e78.png)

## EN
III. Select __Archive bit AutoRCM Touch Tuning__

## FR
III. Sélectionner __Archive bit  AutoRCM  Touch Tuning__

![03](https://user-images.githubusercontent.com/50277488/118041032-9b6a2300-b372-11eb-8f77-722cc0bf6895.png)

## EN
IV. Select the Partition SD Card option (Be careful to check AutoRCM off)

## FR
IV. Sélectionner l'option Partition SD Card (Faite attention à bien cocher AutoRCM en off)

![04](https://user-images.githubusercontent.com/50277488/118041052-a1600400-b372-11eb-878d-70ca8ca4e1ae.png)

## EN
⛔ regarding __AutoRCM__ Important risk for the console, do not use it or you will be __banned from Nintendo's servers__ or potentially __destroy the battery__ of your console
V. If Hekate does a good backup of the partitions management, you can continue the tutorial otherwise you will have to follow another tutorial for your Micro SD

## FR
⛔ concernant __l'AutoRCM__ Risque important pour la console, à ne pas utilisé sous peine d'être __bannis des serveurs de Nintendo__ ou de potentiellement __détruire la batterie__ de votre console
V. Si Hekate fait bien une Backup de la gestion des partitions, vous pouvez continué le tutoriel sinon vous devrez suivre un autre tutoriel pour votre Micro SD

![05](https://user-images.githubusercontent.com/50277488/118041142-b9378800-b372-11eb-8d4a-b13ae3bb94a1.png)

## EN
VI. Drag the slider of the __emuMMC RAW__ option to 29GB, then press __Next Step__ on the bottom right.

## FR
VI. Faite glisser le curseur de l'option __emuMMC RAW__ jusqu'à 29Go, puis appuyer en bas à droite sur __Next Step__

![06](https://user-images.githubusercontent.com/50277488/118041165-c18fc300-b372-11eb-8dcc-5795fbb17674.png)

## EN
VII. Hekate will give you a warning, do __Start__ to create the partition

## FR
VII. Hekate vous fera un avertissement, faite __Start__  pour créer la partition

![07](https://user-images.githubusercontent.com/50277488/118041197-cbb1c180-b372-11eb-9720-daa454323d9d.png)

## EN
2️⃣ Create __the emuNAND / emuMMC__
I. Go back to the __HOME__ tab of Hekate, in Hekate go to the __emuMMC__ option.

## FR
2️⃣ Créer __l'emuNAND / emuMMC__
I. Retourner dans l'onglet __HOME__  de Hekate, dans Hekate allez dans l'option __emuMMC__

![08](https://user-images.githubusercontent.com/50277488/118041250-dbc9a100-b372-11eb-819f-332e36a5d6c0.png)

## EN
II. Press __Create emuMMC__.

## FR
II. Appuyer sur __Create emuMMC__

![09](https://user-images.githubusercontent.com/50277488/118041279-e1bf8200-b372-11eb-96fc-9aa41fad1a9d.png)

## EN
III. Press __SD Partition__ and press __Part 1__.

## FR
III. Appuyer sur __SD Partition__ et appuyer sur __Part 1__

![10](https://user-images.githubusercontent.com/50277488/118041305-ea17bd00-b372-11eb-818f-b832007befda.png)

![11](https://user-images.githubusercontent.com/50277488/118041317-eedc7100-b372-11eb-84cf-62f499771188.png)

## EN
IV. The creation of the emuNAND takes between 10 to 30 minutes are the speed of the Micro SD, once finished press __CLOSE__ in the upper right

## FR
IV. La création de l'emuNAND prend entre 10 à 30 minute sont la rapidité de la Micro SD, une fois terminé appuyer sur __CLOSE__ en haut a droite

![12](https://user-images.githubusercontent.com/50277488/118041356-fb60c980-b372-11eb-8c85-8b8d4e471031.png)

## EN
V. Check if in the tab __emuMMC__ Info & Selection__ it is written ✅ __Enabled!__

❕ If not, press __Change emuMMC__ then __RAW1__

## FR
V. Vérifier si dans l'onglet __emuMMC Info & Selection__ il est bien écrit ✅ __Enabled!__

❕ Si ce n'est pas le cas, appuyer sur __Change emuMMC__ puis __RAW1__

![13](https://user-images.githubusercontent.com/50277488/118041385-03b90480-b373-11eb-8746-f6c4f712e8bd.png)

## EN
You just have to do Launch then CFW - Atmosphere so that the console

## FR
Vous n'avez plus qu'a faire Launch puis CFW - Atmosphère pour que la console





