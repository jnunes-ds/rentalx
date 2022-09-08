import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepositoy";

interface MulterFile extends Express.Multer.File {}

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categorieRepository: ICategoriesRepository) {}

  loadloadCategories(file: MulterFile): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
      return categories;
    });
  }

  async execute(file: MulterFile): Promise<void> {
    const categories = await this.loadloadCategories(file);

    categories.map((category) => {
      const { name, description } = category;

      const existCategory = this.categorieRepository.findByName(name);

      if (!existCategory)
        this.categorieRepository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
