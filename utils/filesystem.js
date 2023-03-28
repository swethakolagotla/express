import fs from "fs" ;

const readFile = (pathname) => {
  return new Promise((res, rej) => {
    fs.readFile(pathname, "utf-8", (err, data) => {
      if (err) {
        return rej("File doesn't exist !");
      }

      res(data);
    });
  });
};
export {readFile}