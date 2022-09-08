import fs from "fs";
import { parse as csvParse } from "csv-parse";

interface MulterFile extends Express.Multer.File {}

class ImportCategoryUseCase {
  execute(file: MulterFile): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
