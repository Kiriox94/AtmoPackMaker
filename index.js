const fetch = require('node-fetch');
const fs = require('fs-extra')
const Downloader = require('nodejs-file-downloader');
const cliProgress = require('cli-progress');
const chalk = require('chalk');
const { PythonShell } = require('python-shell');
const moment = require('moment');
const qoa = require('qoa');
const ZIP = require('zip-lib');
const path = require("path")
const { exec } = require('child_process');
const sizeOf = require('image-size');
require('dotenv').config();
moment.locale('fr');

const config  = require("./config.json")
const defaultLanguage = "en";

const useStartuplogo = config.startuplogoPath !== null && config.startuplogoPath !== ""
const useSplashscreen = config.splashscreenPath !== null && config.splashscreenPath !== ""

const colors = {
    'default': (text) => { return chalk.hex('#2C3579')(text); },
    'success': (text) => { return chalk.hex('#076A00')(text); },
    'warning': (text) => { return chalk.hex('#FF7400')(text) },
    'error':(text) => { return chalk.hex('#BC0101')(text); },
};

async function checkKey(key) {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const test = await fetch('https://api.github.com/', { headers: { Authorization : `token ${key}` } });
        if (test.headers.get('x-ratelimit-limit') == 60)
            return false;
        return true;
    } catch(e) {
        atmoDebug.logError(0, e);
        process.exit(1);
    }
};

function stringToRegex(inputString) {
    return new RegExp(`^${inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}

function formatString(template, args) {
    return template.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
}

function csvToJSON(csv){
    csv = csv.replaceAll("\r", "");
    var lines = csv.split("\n");
  
    var result = [];
    var headers = lines[0].split(";");
  
    for(var i=1; i < lines.length; i++){
        var obj = {};
        lines[i] = lines[i].replaceAll("\\j", "\n");
        var currentline = lines[i].split(";");
  
        for(var j=0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
    }
  
    return result;
}

const atmoDebug = {
    "log": (message, params = [], color = colors.default) => {
        if(typeof message === "number") {
            message = translation[message][config.language]
        }
    
        if(params !== null && params.length !== 0) {
            message = formatString(message, params)
        }
    
        console.log(color(message))
    },
    "logError": (message, ...params)=> {atmoDebug.log(message, params, colors.error)},
    "logSuccess": (message, ...params)=> {atmoDebug.log(message, params, colors.success)},
    "logWarn": (message, ...params)=> {atmoDebug.log(message, params, colors.warning)}
}

const translationFile = fs.readFileSync("./translation.csv").toString()
var translation = csvToJSON(translationFile);

(async () => {
    console.clear();
    atmoDebug.log(`
  ___  _                             _          ✢         _   _             _ _ _      ______   _       _               ✢
 / _ \\| |             ✢             | |                  | | | |           (_) | |     |  ___| | |     | |              
/ /_\\ \\ |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ ___ | | | | __ _ _ __  _| | | __ _| |_ ___| |_ ___| |__   ___ _ __ 
|  _  | __| '_ \` _ \\ / _ \\/ __| '_ \\| '_ \\ / _ \\ '__/ _ \\| | | |/ _\` | '_ \\| | | |/ _\` |  _/ _ \\ __/ __| '_ \\ / _ \\ '__|
| | | | |_| | | | | | (_) \\__ \\ |_) | | | |  __/ | |  __/\\ \\_/ / (_| | | | | | | | (_| | ||  __/ || (__| | | |  __/ |   
\\_| |_/\\__|_| |_| |_|\\___/|___/ .__/|_| |_|\\___|_|  \\___| \\___/ \\__,_|_| |_|_|_|_|\\__,_\\_| \\___|\\__\\___|_| |_|\\___|_|   
                              | |                                                                                       
                              |_|      ✢                     ✢                        v2.0.3 By Lunyx, Zoria & Murasaki.    ✢                                                               
`);

    let tmpTranslation = translationFile.replaceAll("\r", "")
    let tmpLines = tmpTranslation.split("\n");

    const disponibleLanguages = tmpLines[0].split(";")
    if(!disponibleLanguages.includes(config.language)) {
        let oldLang = config.language
        config.language = defaultLanguage
        atmoDebug.logWarn(1, oldLang, defaultLanguage)
    }

    var GITHUB_TOKEN = '';
    var PACK_NAME = "Vanilla Pack"
    var PACK_VERSION = "v1.0.0"

    if (process.env.PACK_NAME)
        PACK_NAME = process.env.PACK_NAME;

    if (process.env.PACK_VERSION)
        PACK_NAME = process.env.PACK_NAME;
    
    if (process.env.GITHUB_TOKEN)
        GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    else {
        atmoDebug.logError(2)
        process.exit(1)
    }

    const output_folder = './temp';
    const final_folder = './SD';
    const python_folder = './python';
    let hekate_version = '';

    if(!fs.existsSync(output_folder)) {
        await fs.mkdir(output_folder);
        atmoDebug.logWarn(3)
    };
    
    if(!fs.existsSync(final_folder)) {
        await fs.mkdir(final_folder);
        atmoDebug.logWarn(4)
    };

    if(!fs.existsSync(python_folder)) {
        await fs.mkdir(python_folder);
        atmoDebug.logWarn(5)
    };

    if(useStartuplogo) {
        exec("python -m pip install Pillow")
        exec("python -m pip install ips.py")

        atmoDebug.logSuccess(6)
    }else if(useSplashscreen) {
        exec("python -m pip install Pillow")

        atmoDebug.logSuccess(6)
    }

    if(useStartuplogo) {
        let dimensions = sizeOf(config.startuplogoPath)
        
        if(dimensions.width != 308 || dimensions.height != 350) {
            atmoDebug.logError(7)
            useStartuplogo = false;
        }
    }
    if(useSplashscreen) {
        let dimensions = sizeOf(config.splashscreenPath)
        
        if(dimensions.width != 1280 || dimensions.height != 720) {
            if (dimensions.width != 720 || dimensions.height != 1280) {
                atmoDebug.logError(8);
                useSplashscreen = false;
            }

        }
    }

    async function getRelease(link, desiredFiles) {
        try {
            let release = await fetch(`https://api.github.com/repos/${link}/releases`, { headers: { Authorization: `token ${GITHUB_TOKEN}` } });
    
            if (release.status === 404) {
                atmoDebug.logError(9, link);
            } else if (release.headers.get('x-ratelimit-limit') == 60) {
                atmoDebug.logError(10);
                if (fs.existsSync('./.env'))
                    await fs.unlink('./.env');
                if (fs.existsSync('./key.txt'))
                    await fs.unlink('./key.txt');
                process.exit(1);
            } else if (release.headers.get('x-ratelimit-remaining') == 0) {
                atmoDebug.logError(11);
                process.exit(1);
            };
    
            release = await release.json();
            release = release[0];
    
            let repoName = release.url.replace('https://api.github.com/repos', '').replace(`/releases/${release.id}`, '').split('/')[2];
    
            const { assets } = release;
            if (assets.length === 0) {
                atmoDebug.logError(12, repoName)
            };
    
            const desiredFilesArray = [];
    
            for (let asset of assets) {
                const { name, browser_download_url } = asset;
                for (let file of desiredFiles) {
                    const { exp, filename, directory } = file;
                    if (exp.test(name) && name.replace(name.match(exp)[0], '') == '') {
                        desiredFilesArray.push({ name: filename, url: browser_download_url, version: release.tag_name, directory: directory });
                        break;
                    };
                };
            };

            atmoDebug.logSuccess(32, colors.default(`${repoName} (${release.tag_name})`));
    
            return desiredFilesArray;
        } catch (e) {
            atmoDebug.logError(13, e);
        };
    };
    process.setMaxListeners(0);
    const desiredReleases = 
        [{ 
            link: 'CTCaer/hekate', desiredFiles: [{ 
                exp: /^hekate_ctcaer_[0-9]*\.[0-9]+[0-9]*\.[0-9]+_[a-zA-Z]+_[0-9]*\.[0-9]+[0-9]*\.[0-9]+\.zip$/, filename: 'hekate.zip' 
            }]
        }, 
        {
            link: 'Atmosphere-NX/Atmosphere', desiredFiles: [{ 
                exp: /^atmosphere-(\d+(\.\d+))((\.\d+))-[a-zA-Z]+-[a-zA-Z0-9]+\+hbl-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\+hbmenu-[0-9]*\.[0-9]+[0-9]*\.[0-9]+\.zip$/, filename: 'atmosphere.zip' 
            }, 
            { 
                exp: /^fusee\.bin$/, filename: 'fusee.bin' , directory: "bootloader/payloads"
            }] 
        }, 
        { 
            link: 'ITotalJustice/sys-patch', desiredFiles: [{ 
                exp: /^sys-patch\.zip$/, filename: 'sys-patch.zip' 
            }] 
        }];

    if(config.includeUpdateKit) {
        desiredReleases.push({
            link: 'HamletDuFromage/aio-switch-updater', desiredFiles: [{ 
                exp: /^aio-switch-updater\.zip$/, filename: 'aio-switch-updater.zip' 
            }] 
        })
    }

    for(let repo of config.githubFiles) {
        const { link, desiredFiles } = repo;
        desiredFiles.map(f => f.exp = (f.exp == null || "") ? stringToRegex(f.filename) : f.exp)
        desiredReleases.push({link: link, desiredFiles: desiredFiles})
    }

    let files = [];

    atmoDebug.logWarn(14);

    for (let desiredRelease of desiredReleases) {
        const { link, desiredFiles } = desiredRelease;
        let release = await getRelease(link, desiredFiles);
        files = files.concat(release);
    };

    files.push( 
        { name: "exosphere.ini", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/exosphere.ini", version: "latest" }, 
        { name: "repair.ini", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/repair.ini", version: "latest", directory: "bootloader/ini" }, 
        { name: "sysmmc.txt", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/sysmmc.txt", version: "latest", directory: "atmosphere/hosts" }, 
        { name: "emummc.txt", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/emummc.txt", version: "latest", directory: "atmosphere/hosts" },
        { name: "boot.ini", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/boot.ini", version: "latest" }, 
        { name: "boot.dat", url: "https://raw.githubusercontent.com/THZoria/AtmoPack-Vanilla/main/download/boot.dat", version: "latest" }
    )

    if(useStartuplogo) files.push({ name: "gen_patches.py", url: "https://raw.githubusercontent.com/friedkeenan/switch-logo-patcher/master/gen_patches.py", version: "latest", directory: "../python"});
    if(useSplashscreen) files.push({ name: "insert_splash_screen.py", url: "https://github.com/Atmosphere-NX/Atmosphere/raw/master/utilities/insert_splash_screen.py", version: "latest", directory: "../python"});
    
    if(config.onlineFiles.length > 0) {    
        config.onlineFiles.map(f => {
            if(f.version == null) f.version = "latest";
            files.push(f)
            return f;
        })
    }

    atmoDebug.logWarn(15);

    for (let file of files) {
        const { name, url, version } = file;
        let bar;

        if (name == 'hekate.zip')
            hekate_version = version.replace('v', '');
        let downloader = new Downloader({ url: url, directory: output_folder, filename: name, cloneFiles: false, maxAttempts: 3,
            onBeforeSave: () => {
                atmoDebug.logWarn(33, name, version);
                bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
                bar.start(100, 0);
            },   
            onProgress: async function(percentage){
                await bar.update(Math.round(percentage));
            }        
        });
        
        try {
            await downloader.download();
            bar.stop();
            atmoDebug.logSuccess(16, colors.default(name))
        } catch (e) {
            if (bar)
                bar.stop();
            atmoDebug.logSuccess(17, colors.default(name), e)
        };
    };

    atmoDebug.logSuccess(18);
    atmoDebug.logWarn(19);
    let zip_temp_files = await fs.readdir(output_folder).then(files => { return files.filter(f => f.endsWith('.zip')) });

    for (let zip of zip_temp_files) {
        let extractFolder = zip.replace('.zip', '')
        if(!fs.existsSync(`./temp/${extractFolder}`))
            await fs.mkdir(`./temp/${extractFolder}`);
        else {
            await fs.rm(`./temp/${extractFolder}`, { recursive: true });
            await fs.mkdir(`./temp/${extractFolder}`);
        };
        await ZIP.extract(`./temp/${zip}`, `./temp/${extractFolder}`);
        await fs.rm(`./temp/${zip}`)
        atmoDebug.logSuccess(20, colors.default(zip));

        let fileIndex = files.findIndex((f) => f.name == zip)
        files[fileIndex].name = extractFolder
    };

    fs.rename(`./temp/hekate/hekate_ctcaer_${hekate_version}.bin`, './temp/hekate/hekate_ctcaer.bin', () => {
        atmoDebug.logWarn(21, colors.default(`hekate_ctcaer_${hekate_version}.bin`), colors.default('hekate_ctcaer.bin'));
    });

    try {
        for (let file of files) {
            const destination = (typeof file.directory === "string") ? file.directory : "";

            const stat = await fs.lstat(path.join("./temp", file.name));

            if(stat.isFile()) {
                await fs.copy(path.join("./temp", file.name), path.join("./SD", destination, file.name))
            }else if(stat.isDirectory()) {
                await fs.copy(path.join("./temp", file.name), path.join("./SD", destination))
            }

            atmoDebug.logSuccess(22, colors.default(`temp/${file.name}`), colors.default(`SD/${destination}`));
        }

        await fs.copy('./temp/hekate/hekate_ctcaer.bin', './SD/payload.bin');
        atmoDebug.logSuccess(22, colors.default('temp/hekate/hekate_ctcaer.bin'), colors.default('SD (payload.bin)'));
        await fs.copy('./temp/hekate/hekate_ctcaer.bin', './SD/atmosphere/reboot_payload.bin');
        atmoDebug.logSuccess(22, colors.default('temp/hekate/hekate_ctcaer.bin'), colors.default('SD/atmosphere (reboot_payload.bin)'));

        if(fs.existsSync("./localFiles")) {
            await fs.copy("./localFiles", "./SD")
            atmoDebug.logSuccess(23)
        }

        if(config.includeUpdateKit) {
            if(fs.existsSync("./homebrewsConfig/aio-switch-updater")) await fs.copy("./homebrewsConfig/aio-switch-updater", "./SD/config/aio-switch-updater")
            const settings = `{"ams": {"${PACK_NAME}": "https://github.com/${config.repoLink}/releases/latest/download/${PACK_NAME}.zip"}}`
            fs.writeFile("./SD/config/aio-switch-updater/custom_packs.json", settings)

            atmoDebug.logSuccess(24)
        }

        fs.writeFileSync("./SD/version.txt", `- ${PACK_NAME} ${PACK_VERSION} -\n\n\n\nCreated With AtmoPackMaker : https://github.com/Kiriox94/AtmoPackMaker`)

        atmoDebug.logWarn(25);

        let promises = []
        if(useStartuplogo) promises.push(PythonShell.run('./python/gen_patches.py', {args: ["./SD/atmosphere/exefs_patches/startup_logo", config.startuplogoPath]}))
        if(useSplashscreen) promises.push(PythonShell.run('./python/insert_splash_screen.py', {args: [config.splashscreenPath, "./SD/atmosphere/package3"]}))

        Promise.all(promises).then(async () => {
            atmoDebug.logSuccess(26, promises.length);

            atmoDebug.logWarn(27)
            await ZIP.archiveFolder('./SD', `./${PACK_NAME}.zip`);
    
            atmoDebug.logSuccess(28);
            for (let file of files) {
                const { name, version } = file;
                console.log(colors.default(`${name} (${version})`));
            };
    
            await fs.emptyDir('./temp/', { recursive: true });
            await fs.emptyDir('./SD/', { recursive: true });
            atmoDebug.logWarn(29, colors.default('temp'), colors.default('SD'))
            atmoDebug.logSuccess(30, colors.default(`(${PACK_NAME}.zip)`))
        })
    } catch (e) {
        atmoDebug.logError(31, PACK_NAME, e);
        process.exit(1);
    };
})();
