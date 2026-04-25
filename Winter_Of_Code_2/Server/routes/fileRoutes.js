import express from 'express'
import { getfiles, readfile, writefile } from '../controllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/get-files', getfiles)
fileRouter.post('/write', writefile)
fileRouter.post('/read', readfile)

export default fileRouter