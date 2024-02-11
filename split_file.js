import fs from "fs";
const [file2split] = process.argv.slice(2);
const SPLIT_STRING = /PROGRAM$/gm;

function getFileNameFromFile(file) {
  return file.slice(21, 29);
}

function processFile(file) {
  return file.slice(40);
}

try {
  const dir = "./casio_splitted";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const data = fs.readFileSync(file2split, "utf8");
  const [_, ...splitFiles] = data.split(SPLIT_STRING);
  splitFiles.forEach((fileStr, i) => {
    const fileName = getFileNameFromFile(fileStr);
    const processedFile = processFile(fileStr);
    fs.writeFileSync(
      `${dir}/${fileName}_decompiled.g1m`,
      processedFile
    );
  });
} catch (err) {
  console.error(err);
}
