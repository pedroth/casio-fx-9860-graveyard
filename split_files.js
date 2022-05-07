const fs = require("fs");
const [file2split] = process.argv.slice(2);
const splitString = "PROGRAM[U+0001]system";
const getFileNameFromFile = (file, n) => {
  if (n === 0) return file.split("[")[0].split(": ")[2];
  console.log("get fileName from file", file, n);
  return file.split("[")[0];
};
const processFile = (file, n) => {
  if (n === 0) return file.split("[U+0000][U+0000]")[1];
  const split = file.split(/\[U\+[0-9a-zA-Z]{4}\]*/g);
  console.log("process file", file);
  return split
    .filter((x) => x !== "")
    .slice(1)
    .join("");
};
try {
  const dir = "src/casio_splitted";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const data = fs.readFileSync(file2split, "utf8");
  splitFiles = data.split(splitString);
  splitFiles.forEach((fileStr, i) => {
    const fileName = getFileNameFromFile(fileStr, i);
    const processedFile = processFile(fileStr, i);
    fs.writeFileSync(
      `src/casio_splitted/${fileName}.decompiled.g1m`,
      processedFile
    );
  });
} catch (err) {
  console.error(err);
}
