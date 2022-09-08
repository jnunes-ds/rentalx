import { Express } from "express";

interface MulterFile extends Express.Multer.File {}

class ImportCategoryUseCase {
  execute(file: MulterFile): void {
    console.log(file);
  }
}

export { ImportCategoryUseCase };
