"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = exports.outOfStockProducts = exports.productReportGenerate = exports.reportPdfPage = void 0;
const logs_1 = require("../../logs");
const fs_1 = __importDefault(require("fs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const reportPdf_1 = require("../../service/report/reportPdf");
function reportPdfPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.render('reports/reportPdf', {
            data: req.user,
        });
    });
}
exports.reportPdfPage = reportPdfPage;
// async function generatePdf(req:Request,res:Response) {
//   const data = req.body;
//   // logger.info(data);
//   const templatePath = path.join(__dirname, '../../views/reports/pdfTemplate/productPdfTemplate.ejs');
//   // logger.info(templatePath);
//   const template = fs.readFileSync(templatePath, "utf8");
//   // console.log(template);
//   // console.log(data.productDetails);
//   // {
//   //   productData: data.productDetails,
//   //   storeDetails: []
//   // }
//   const html = ejs.render(template, { data: data });
//   // console.log(html);
//   let browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: 'load' });
//   // To reflect CSS used for screens instead of print
//   // await page.emulateMediaType('screen');
//   let pdfPath = path.join(__dirname, `../../public/uploads/pdfFile/${Date.now()}-ProductDetails.pdf`);  //path of pdf
//   await page.pdf({
//     path: pdfPath,
//     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     printBackground: true,
//     formate: 'A4'
//   });
//   await browser.close();
//   const pdfFile = fs.readFileSync(pdfPath);
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', `attachment; filename=ProductDetails.pdf`);
//   res.send(pdfFile);
//   // if (fs.existsSync(pdfPath)) {
//   //   const filename = pdfPath.split("/");
//   //   logger.info(req.origin);
//   //   return res.status(200).json({ pdfName: `${filename[filename.length - 1]}` });
//   // } else {
//   //   return res.status(500).json({ message: "Something Went Wrong...." });
//   // }
// }
function generatePdf(data, reportType) {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = path_1.default.join(__dirname, '../../views/reports/pdfTemplate/productPdfTemplate.ejs');
        const template = fs_1.default.readFileSync(templatePath, 'utf8');
        const html = ejs_1.default.render(template, { data: data });
        let browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setContent(html, { waitUntil: 'load' });
        // To reflect CSS used for screens instead of print
        // await page.emulateMediaType('screen');
        const fileName = `${Date.now()}-${reportType}.pdf`;
        const pdfPath = path_1.default.join(__dirname, `../../public/uploads/pdfFiles/${fileName}`); //path of pdf
        yield page.pdf({
            path: pdfPath,
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'a4',
        });
        yield browser.close();
        if (fs_1.default.existsSync(pdfPath)) {
            // const filename = pdfPath.split("/");
            return fileName;
        }
        else {
            return '';
        }
    });
}
exports.generatePdf = generatePdf;
function productReportGenerate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roleId = req.user.roleId;
            let storageId;
            if (roleId === 4) {
                storageId = req.body.selectStorageId;
            }
            else {
                storageId = req.user.storageId;
            }
            const productDetailsArray = yield (0, reportPdf_1.productGenerateReport)(req.body, storageId);
            const storageDetailsArray = yield (0, reportPdf_1.storageDetails)(storageId);
            if (productDetailsArray.length > 0 && storageDetailsArray.length > 0) {
                const productDetailsObject = {};
                productDetailsObject.productDetails = productDetailsArray;
                productDetailsObject.storeDetails = storageDetailsArray;
                productDetailsObject.categoryName = req.body.categoryName;
                productDetailsObject.reportType = req.body.reportType;
                const pdfFile = yield generatePdf(productDetailsObject, 'ProductDetails');
                if (!pdfFile) {
                    return res.status(500).json({ message: 'PDF Not Generate..' });
                }
                else {
                    return res.status(200).json({ pdfName: pdfFile });
                }
            }
            else {
                return res.status(404).json({ message: 'Products Not Found' });
            }
        }
        catch (error) {
            (0, logs_1.logError)('Product Generate Report: ' + error);
            return res.status(500).json({ message: 'Something Went Wrong..' });
        }
    });
}
exports.productReportGenerate = productReportGenerate;
function outOfStockProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            let storageId;
            const roleId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roleId;
            if (roleId === 4) {
                storageId = req.body.selectStorageId;
            }
            else {
                storageId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.storageId;
            }
            const productOutOfStockArray = yield (0, reportPdf_1.productOutOfStockGenerateReport)(req.body, storageId);
            const storageDetailsArray = yield (0, reportPdf_1.storageDetails)(storageId);
            if (productOutOfStockArray.length > 0 && storageDetailsArray.length > 0) {
                const productDetailsObject = {};
                productDetailsObject.productDetails = productOutOfStockArray;
                productDetailsObject.storeDetails = storageDetailsArray;
                productDetailsObject.categoryName = req.body.categoryName;
                productDetailsObject.reportType = req.body.reportType;
                productDetailsObject.maximumStockQunatity = req.body.maximumQunatity;
                const pdfFile = yield generatePdf(productDetailsObject, 'OutOfStockProducts');
                if (!pdfFile) {
                    return res.status(500).json({ message: 'PDF Not Generate..' });
                }
                else {
                    return res.status(200).json({ pdfName: pdfFile });
                }
            }
            else {
                return res.status(404).json({ message: 'Products Not Found' });
            }
        }
        catch (error) {
            (0, logs_1.logError)('Product Out Of Stock Report:' + error);
            return res.status(500).json({ message: 'Something Went Wrong..' });
        }
    });
}
exports.outOfStockProducts = outOfStockProducts;
