import multer from 'multer';
import path from 'path';
import xlsx from 'xlsx';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

export const uploadFile = upload.single('file');

export const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

  try {
    const stats = await fs.stat(filePath);
    console.log(`File uploaded successfully: ${filePath}`);
    console.log(`File size: ${stats.size} bytes`);

    if (stats.size === 0) {
      console.error('Uploaded file is empty.');
      return res.status(400).send('Uploaded file is empty.');
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log('Extracted data:', data);

    const documents = data.map(item => ({
      email: item.email,
      password: item.password
    }));

    const invalidDocuments = documents.filter(doc => !doc.email || !doc.password);
    if (invalidDocuments.length > 0) {
      console.error('Invalid documents:', invalidDocuments);
      return res.status(400).send('Some records have missing email or password fields.');
    }

    await User.insertMany(documents);
    res.send(`${documents.length} records inserted.`);

    await fs.unlink(filePath);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Failed to process file.');

    try {
      await fs.unlink(filePath);
    } catch (unlinkError) {
      console.error('Failed to delete uploaded file:', unlinkError);
    }
  }
};
