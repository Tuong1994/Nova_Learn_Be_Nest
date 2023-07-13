import multer, { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

const acceptFileType = ['image/png', 'image/jpg', 'image/jpeg'];

export const multerOption = (destination: string): multer.Options => {
  return {
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter(req, file, callback) {
      if (file && acceptFileType.includes(file.mimetype)) return callback(null, true);

      callback(null, false);

      return callback(
        new HttpException(
          `Only accept file type ${acceptFileType.join(' ')}`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    },
    storage: diskStorage({
      destination(req, file, callback) {
        callback(null, destination);
      },
      filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  };
};
