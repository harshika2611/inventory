"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const portfinder_1 = __importDefault(require("portfinder"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logs_1 = require("./logs");
const route_1 = __importDefault(require("./routes/route"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./middleware/auth");
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const uploadsFolder = path_1.default.join(__dirname, `./public/uploads/`);
const csvFileFolder = path_1.default.join(__dirname, `./public/uploads/csvFiles`);
const pdfFileFolder = path_1.default.join(__dirname, `./public/uploads/pdfFiles`);
if (!fs_1.default.existsSync(uploadsFolder)) {
    fs_1.default.mkdirSync(uploadsFolder);
}
if (!fs_1.default.existsSync(csvFileFolder)) {
    fs_1.default.mkdirSync(csvFileFolder);
}
if (!fs_1.default.existsSync(pdfFileFolder)) {
    fs_1.default.mkdirSync(pdfFileFolder);
}
// Socket IO
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
// const {
//   getAllNotifications,
//   readNotifications,
// } = require('./service/notification/index.js');
// const {
//   unlinkProductPdf,
// } = require('./controller/commonFunctions/commonFunctions.js');
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// io.on('connection', async (socket) => {
//   const results = await getAllNotifications();
//   io.emit('notifications', results);
//   socket.on('readyForNotifications', async () => {
//     const results = await getAllNotifications();
//     io.emit('notifications', results);
//   });
//   socket.on('markAsRead', async () => {
//     await readNotifications();
//   });
//   socket.on('unlinkProductPdf', (req) => {
//     unlinkProductPdf(req);
//   });
// });
app.use(passport_1.default.initialize());
(0, auth_1.auth)(passport_1.default);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//middleware
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/css', express_1.default.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express_1.default.static('./node_modules/bootstrap/dist/js'));
app.use('/charts', express_1.default.static(path_1.default.join(__dirname, 'node_modules/apexcharts/dist')));
app.use('/sweetalert2', express_1.default.static(path_1.default.join(__dirname, '/node_modules/sweetalert2/dist')));
//ejs file render we need to set path of located files
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, cookie_parser_1.default)());
//routes
app.use(route_1.default);
portfinder_1.default.getPort(function (err, port) {
    try {
        if (err)
            throw err;
        server.listen(port, () => {
            logs_1.logger.info('Server Listen At ' + port);
        });
    }
    catch (err) {
        (0, logs_1.logError)('Error In Server Listen: ' + err);
    }
});
app.use('*', (req, res) => {
    // res.send({ message: 'Not Found' });
    return res.render('components/errorPage');
});
