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
const connection_1 = __importDefault(require("../../config/connection"));
const getpurchaseProductreport = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(product);
    let sql = `SELECT  product_master.Product_Name,product_master.sku_id as Product_Skuid,sum(purchase_products.quantity) as Total_Products ,avg(purchase_products.unit_price) as Product_BuyPrice FROM product_master left join purchase_products on product_master.id =purchase_products.product_id left join products_details on product_master.id =products_details.product_id `;
    // console.log(sql);
    if (storage) {
        return yield connection_1.default.execute(`${sql} where products_details.storage_id=? group by product_master.id  order by Total_Products DESC;`, [storage]);
    }
    else {
        return yield connection_1.default.execute(`${sql} group by product_master.id  order by Total_Products DESC;`);
    }
    return yield connection_1.default.execute(sql, [storage]);
});
exports.default = getpurchaseProductreport;
