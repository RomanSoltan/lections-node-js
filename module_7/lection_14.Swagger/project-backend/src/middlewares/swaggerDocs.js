import { readFileSync } from 'node:fs';
import swaggerUI from 'swagger-ui-express';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  // щоб функція не зламалась, якщо не зможемо прочитати json, то
  // огорнемо у try/catch
  try {
    const swaggerDoc = JSON.parse(readFileSync(SWAGGER_PATH).toString());
    // інструкція створює мідлвару
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res) => {
      res.status(500).json({
        messagge: "Can't load swagger docs",
      });
    };
  }
};
