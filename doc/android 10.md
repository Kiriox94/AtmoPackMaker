```diff
- Tutoriel | Installation Android 10 -
```
__I. Ce dont vous aurez besoin :__
- Une console Switch exploitable RCM. Vérifiez ici si votre appareil est exploitable. Si vous avez un appareil plus récent, un exploit peut être possible sur les anciens firmwares, mais si vous ne l'avez pas déjà configuré, vous avez probablement déjà mis à jour une version trop nouvelle. En savoir plus ici. (pour les appareils exploitables non-RCM)
- Un gabarit ou une autre méthode de déclenchement de RCM. Voici quelques méthodes. Des gabarits prédéfinis peuvent être trouvés en ligne.
- Un ordinateur.
- Un bon câble USB-C qui peut se connecter à votre PC et Switch.
- Une carte microSD haute vitesse et de haute qualité d'au moins 16 Go.
- Un moyen de lire les cartes microSD sur votre PC.
```
- Sachez que si vous avez déjà installé Android Oreo sur votre carte SD, vos anciennes données Android seront effacées , alors sauvegardez-les. Cela ne peut être évité!
- Si vous avez une installation Q existante, assurez-vous qu'elle a été créée avec hekate v5.5.3, tout le reste aura des OTA cassés en raison d'une partition MSC manquante.
- Assurez-vous que votre carte SD est au format FAT32, ce guide ne fonctionnera pas avec les cartes SD EXFAT.
```
__II. Préparation de la SD :__
- Télécharger la version [Tablette](https://download.switchroot.org/android-10/icosa-tab-20210510-rel.zip)
- Décompressé le contenue de l'archive `icosa-tablet-20210510-rel.zip`
- Copié les dossier bootloader et switchroot a la racine de la SD, de même pour l'archive `lineage-17.1-20210205-UNOFFICIAL-foster_tab-signed.zip`
- Télécharger les [GAPPS](https://sourceforge.net/projects/opengapps/files/arm64/20210825/open_gapps-arm64-10.0-nano-20210825.zip/download)

⚠️ Si les liens ont des soucis / down, dite le moi dans #hack_switch et je le corrigerais

- Copié l'archive `open_gapps-arm64-10.0-nano-20210206` a la racine de la SD

__III. Installation :__
- Démarrer votre Nintendo Switch sur `Hekate` et aller dans l'onglet `"tools"`.

![01](https://user-images.githubusercontent.com/50277488/130580202-9842693f-b59a-411a-b18e-40ab23497ebd.png)

- Une fois sur l'écran `"Tools"`, sélectionnez `"Arch bit / RCM / Touch / Partitions"`. 

![02](https://user-images.githubusercontent.com/50277488/130580411-bc4dece9-b5e0-4897-a8e5-65b260d0b535.png)

- Sélectionnez `«Partition SD Card»` dans la rubrique `"Others"`.

![03](https://user-images.githubusercontent.com/50277488/130580475-a1d597fc-653c-43ca-a140-13fb0300e62d.png)

- L'état actuel de la partition de la carte microSD sera affiché. Cliquez sur **"OK"** pour le fermer.

![04](https://user-images.githubusercontent.com/50277488/130580538-fc4b758b-3439-4479-9a74-f223cb4b58ac.png)

- Faites glisser la quatrième barre de défilement **(Android (USER))** vers la droite pour définir la capacité allouée à Android (si la partition allouée est trop petite, Android ne s'installe pas, mettait donc environ 8 gb), le contenu de la carte microSD restera, mais il est préférable de le déplacer vers le PC.
- Lorsque vous avez décidé de l'espace que vous souhaitez allouer à Android, sélectionnez `"next step"`.

![05](https://user-images.githubusercontent.com/50277488/130580647-17690e0c-a631-420c-9a1e-c71460954dfa.png)

- Sélectionnez `"Start"` pour démarrer le partitionnement. Attendez que ça se finisse sans éteindre la console.

![06](https://user-images.githubusercontent.com/50277488/130580758-5940c2d8-a120-482c-b1cd-daffc1a28395.png)

- La création de la partition est terminée lorsque `"Status: Done!"` S'affiche.
- Lorsque la création de partition est terminé, sélectionnez **"Flash Android"**.

![07](https://user-images.githubusercontent.com/50277488/130580853-d76c47c1-a0a0-4a80-835b-7c4cb6d6c7db.png)

- Appuyez sur `"Continue"` pour installer les fichiers `"Kernel"`, `"TWRP"` et `"DTB"` sur la partition Android.

![08](https://user-images.githubusercontent.com/50277488/130580928-05d764f3-068d-4264-ba34-e4908c347a3e.png)

- Lorsque `"Success"` s'affiche pour les trois, vous pouvez appuyer sur `"Continue"` pour démarrer sur **TWRP** (`le Recovery`).

![09](https://user-images.githubusercontent.com/50277488/130581035-fcccb830-fd6a-4dc9-af91-3fbe7e729658.png)

- Lorsque **TWRP** est lancé, faites glisser votre doigt sur la droite pour autoriser les modifications.

![10](https://user-images.githubusercontent.com/50277488/130581067-162a89ec-2165-4ab9-b55e-c577e102177a.png)

- Sélectionnez `"Install"`.

![11](https://user-images.githubusercontent.com/50277488/130581101-36e1b54e-b13e-4040-aba4-36866a7564c4.png)

- Sélectionnez `"(Select Storage)"` et choisir la carte SD.
- Sélectionnez `lineage-17.1-20210205-UNOFFICIAL-foster_tab-signed.zip`.

![13](https://user-images.githubusercontent.com/50277488/130581668-807123cc-36b8-4df7-9d24-78f909b6a482.png)

- Faites glisser votre doigt vers la droite pour confirmer le Flash et installer Android sur la microSD.

![14](https://user-images.githubusercontent.com/50277488/130581693-ce506550-6cf8-49e5-9421-99211fd65b8d.png)

ℹ️ Diverses erreurs vont apparaitre, ce qui est normal, lorsque `"Succesful"` est affiché en haut à gauche l'installation est terminée.
- Revenez en arrière est installer `open_gapps-arm64-10.0-nano-20210825.zip`.
- Une fois terminé faite `"Reboot System"`.
ℹ️ Le premier démarrage devrait prendre environ 3 minutes.

![15](https://user-images.githubusercontent.com/50277488/130581318-16cbd7a0-5cc1-479d-b46b-60a87d88ffcb.png)
