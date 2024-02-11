import fs from "fs";

function getFileNameAndExtensionFromPath(address) {
    const lastDotIndex = address.lastIndexOf(".");
    const lastSlashIndex = address.lastIndexOf("/");
    const fileName = address.slice(lastSlashIndex === -1 ? 0 : lastSlashIndex, lastDotIndex);
    const extension = address.slice(lastDotIndex + 1);
    return { fileName, extension };
}

function decodeChar(char, prevChar) {
    const key = `${char}`;
    const complexKey = `${prevChar}:${char}`;
    const byte2String = {
        "0": "\n",
        "1": "f",
        "12": "◢\n",
        "13": "\n",
        "14": "->",
        "15": "ϵ",
        "16": "≤",
        "17": "≠",
        "18": "≤",
        "19": "⇒",
        "20": "f_1",
        "21": "f_2",
        "22": "f_3",
        "23": "f_4 ",
        "32": " ",
        "35": "",
        "40": "(",
        "41": ")",
        "44": ",",
        "60": "<",
        "62": ">",
        "129": "sin ",
        "130": "cos ",
        "131": "tan ",
        "133": "ln ",
        "134": "√",
        "135": "‒",
        "137": "+",
        "139": "²",
        "184": "xROOT",
        "149": "log ",
        "187": "ꜚ",
        "146": "cos^-1 ",
        "153": "-",
        "156": "°",
        "157": "▼",
        "165": "e^",
        "168": "^",
        "169": "×",
        "185": "÷",
        "194": "x̄",
        "193": "Ran# ",
        "208": "π",
        "205": "r",
        "206": "θ",
        "218": "Deg",
        "219": "Rad",
        "209": "Cls",
        "226": "Lbl ",
        "236": "Goto ",
        "233": "Isz ",
        "232": "Dsz",
        "237": "Prog",
        "231": "[SML]",
        "126": "~",
        "192": "Ans",
        "123": "{",
        "125": "}",
        "151": "Abs ",
        "224": "Plot ",
        "217": "Norm ",
        "166": "Int ",
        "235": "ViewWindow ",
        "247": "",
        "127": "",
        "249": "",
        "0:247": "\n",
        "34:230": "",
        "13:238": "Graph Y=",
        "127:45": "Min(",
        "127:32": "Max(",
        "230:71": "θ",
        "230:64": "α",
        "230:81": "δ",
        "127:1": "",
        "127:176": " And ",
        "127:177": " Or ",
        "247:165": "Text ",
        "247:0": "If ",
        "247:1": "Then ",
        "247:2": "Else ",
        "247:3": "IfEnd",
        "247:4": "For ",
        "247:5": " To ",
        "247:6": " Step ",
        "247:7": "Next ",
        "247:8": "While ",
        "247:9": "WhileEnd",
        "247:16": "Locate ",
        "247:10": "Do",
        "247:11": "LpWhile ",
        "247:12": "Return",
        "247:13": "Break",
        "247:14": "Stop",
        "247:158": "Menu ",
        "247:24": "ClrText",
        "247:25": "ClrGraph",
        "247:26": "ClrList ",
        "249:30": "ClrMat ",
        "249:62": "ClrVct ",
        "249:140": "BinomialPD(",
        "249:141": "BinomialCD(",
        "127:143": "GetKey",
        "230:151": "🡥",
        "230:150": "🡤",
        "230:146": "🡡",
        "230:164": "●",
        "127:80": "ℹ",
        "127:64": "Mat ",
        "127:70": "Dim  ",
        "247:194": "AxesOn",
        "247:210": "AxesOff",
        "247:212": "LabelOff",
        "247:168": "PlotOn ",
        "247:169": "PlotOff ",
        "247:170": "PlotChg ",
        "127:81": "List ",
        "247:167": "F-Line ",
        "127:74": "List->Mat(",
        "127:75": "Mat->List(",
        "127:65": "Trn ",
        "247:171": "PxlOn ",
        "127:36": "ReP ",
        "127:37": "ImP ",
        "247:23": "DrawStat",
        "127:76": "",
        "76:127": "Sum ",
        "35:127": "Conjg ",
        "247:120": "BG-None",
        "127:0": "Xmin",
        "127:1": "Xmax",
        "127:4": "Ymin",
        "127:5": "Ymax",
    }
    try {
        return byte2String[complexKey] ?? byte2String[key] ?? String.fromCharCode(char);
    } catch (e) {
        console.log("Caught exception", e);
        throw new Error("Could not convert byte");
    }
}

const [arg] = process.argv.slice(2);
const { fileName } = getFileNameAndExtensionFromPath(arg);
const file = fs.readFileSync(`${arg}`);
const fileArray = Array.from(file);
const shiftedFileArray = [undefined, ...fileArray]
const decompiledFile = [];
fileArray.forEach((char, i) => {
    const prevChar = shiftedFileArray[i];
    // if (i >= 0 && i <= 800) console.log(`> ${i}, (${prevChar} : ${char})| ${decodeChar(char, prevChar)}`);
    decompiledFile.push(decodeChar(char, prevChar));
})
const dir = "./casio_decompiled";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
fs.writeFileSync(`${dir}/${fileName}.decompiled.g1m`, decompiledFile.join(""));

