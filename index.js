const fetch = require('node-fetch');
const fs = require('fs-extra')
const Downloader = require('nodejs-file-downloader');
const cliProgress = require('cli-progress');
const chalk = require('chalk');
const { PythonShell } = require('python-shell');
const moment = require('moment');
const ZIP = require('zip-lib');
const path = require("path")
const { exec } = require('child_process');
const sizeOf = require('image-size');
require('dotenv').config();
moment.locale('en');

const config  = require("./config.json")
const defaultLanguage = "en";

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
    return `^${inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`;
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
    atmoDebug.log(fs.readFileSync("./logo.txt").toString())

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
    var PACK_VERSION = "vTest"

    if (process.env.PACK_NAME)
        PACK_NAME = process.env.PACK_NAME;

    if (process.env.PACK_VERSION)
        PACK_VERSION = process.env.PACK_VERSION;

    if (process.env.REPO_LINK)
        config.repoLink = process.env.REPO_LINK;
    
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

    if (config.pythonDependencies.length > 0) {
        exec(`python -m pip install ${config.pythonDependencies.join(" ")}`)
    }

    async function getRelease(link, desiredFiles) {
        try {
            let release = await fetch(`https://api.github.com/repos/${link}/releases`, { headers: { Authorization: `token ${GITHUB_TOKEN}` } });
    
            if (release.status === 404) {
                atmoDebug.logError(9, link);
            } else if (release.headers.get('x-ratelimit-limit') == 60) {
                atmoDebug.logError(10);
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
                    const newExp = new RegExp(exp);
                    if (newExp.test(name) && name.replace(name.match(newExp)[0], '') == '') {
                        desiredFilesArray.push({ name: filename, url: browser_download_url, version: release.tag_name, directory: directory });
                        break;
                    };
                };
            };

            atmoDebug.logSuccess(32, colors.default(`${repoName} (${release.tag_name})`));
    
            return desiredFilesArray;
        } catch (e) {
            atmoDebug.logError(13, e);
            process.exit(1);
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
        }];

    if(config.useAIO) {
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
    
    if(config.onlineFiles && config.onlineFiles.length > 0) {  
        for(let f of config.onlineFiles) {
            files.push(f)
        }
    }

    files.map(f => {
        if(f.version == null) f.version = "unknown";
    })

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
            atmoDebug.logError(17, colors.default(name), e)
        };
    };

    atmoDebug.logSuccess(18);
    atmoDebug.logWarn(19);
    let zipFiles = await fs.readdir(output_folder).then(files => { return files.filter(f => f.endsWith('.zip')) });

    for (let zip of zipFiles) {
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

        if(config.useAIO) {
            if (!fs.existsSync("./SD/config")) fs.mkdir("./SD/config")
            if (!fs.existsSync("./SD/config/aio-switch-updater")) fs.mkdir("./SD/config/aio-switch-updater")
            const settings = `{"ams": {"${PACK_NAME}": "https://github.com/${config.repoLink}/releases/latest/download/${PACK_NAME.replaceAll(" ", ".")}.zip"}}`
            fs.writeFile("./SD/config/aio-switch-updater/custom_packs.json", settings)

            atmoDebug.logSuccess(24)
        }

        fs.writeFileSync("./SD/pack.txt", `${PACK_NAME} ${PACK_VERSION}\n\nContent: \n${files.map(f => `${f.name} (${f.version})`).join("\n")} \n\n\nCreated With AtmoPackMaker : https://github.com/Kiriox94/AtmoPackMaker.`)
        fs.writeFileSync("./content.md", `# ${PACK_NAME} ${PACK_VERSION}\n\n## Content: \n${files.map(f => `- ${f.name} (${f.version})`).join("\n")} \n\n\n**Created With [AtmoPackMaker](https://github.com/Kiriox94/AtmoPackMaker)**.`)

        if (config.pythonScripts.length > 0) atmoDebug.logWarn(25);

        let promises = []
        config.pythonScripts.forEach(s => {
            let scriptPath = path.join("python", s.filename)
            if (fs.existsSync(scriptPath)) promises.push(PythonShell.run(scriptPath, {args: s.args}))
            else atmoDebug.logError('Python script "{0}" cannot be found.', scriptPath)      
        });

        Promise.all(promises).then(async () => {
            if(promises.length > 0) atmoDebug.logSuccess(26, promises.length);

            atmoDebug.logWarn(27)
            await ZIP.archiveFolder('./SD', "./pack.zip");
    
            atmoDebug.logSuccess(28);
            for (let file of files) {
                const { name, version } = file;
                console.log(colors.default(`${name} (${version})`));
            };
    
            fs.emptyDir('./temp/', { recursive: true });
            fs.emptyDir('./SD/', { recursive: true });
            atmoDebug.logWarn(29, colors.default('temp'), colors.default('SD'))
            atmoDebug.logSuccess(30, colors.default("(pack.zip)"))
        })
    } catch (e) {
        atmoDebug.logError(31, e);
        // process.exit(1);
    };
})();
