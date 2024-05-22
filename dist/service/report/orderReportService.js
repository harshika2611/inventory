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
exports.getOrderDayreportMonth = exports.getOrderDayreportDay = exports.getOrderreportBydate = exports.getApiordersProduct = exports.getOrderreport = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const getOrderreport = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(queryDate);
    let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Customer_Name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,order_date as Order_Time,sales_order.created_at as Created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id`;
    if (storage) {
        return yield connection_1.default.execute(`${sql} where storage_id=? order by Order_Time desc;`, [storage]);
    }
    else {
        return yield connection_1.default.execute(`${sql} order by Order_Time desc;`);
    }
});
exports.getOrderreport = getOrderreport;
const getApiordersProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT product_master.product_name as Product_Name,option_master.value as Category, product_master.cost as Product_Cost,sales_products.quantity as Quantity FROM sales_products left join sales_order on sales_products.order_id=sales_order.id left join product_master on sales_products.product_id=product_master.id left join option_master on product_master.category_id=option_master.id where sales_products.is_delete=0 and sales_order.id=?`;
    return yield connection_1.default.execute(sql, [id]);
});
exports.getApiordersProduct = getApiordersProduct;
const getOrderreportBydate = (fromDate, toDate, storage) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `	SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Customer_Name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,sales_order.order_date as Order_Time ,sales_order.created_at as Created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id where sales_order.order_date BETWEEN ? and ? `;
    // console.log(sql);
    if (storage) {
        return yield connection_1.default.execute(`${sql}  and storage_id=? order by Order_Time desc;`, [fromDate, toDate, storage]);
    }
    else {
        return yield connection_1.default.execute(`${sql} order by Order_Time desc;`, [
            fromDate,
            toDate,
        ]);
    }
});
exports.getOrderreportBydate = getOrderreportBydate;
const getOrderDayreportDay = (date, storage) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,
  customer_master.firstname as Customer_Name,
  option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,
  order_date,sales_order.order_date as Order_Time  FROM sales_order 
  left join customer_master on sales_order.customer_id=customer_master.id 
  left join option_master on sales_order.type=option_master.id
  left join option_master as pay on sales_order.payment_status=pay.id 
  where (sales_order.order_date > DATE(NOW()) - INTERVAL ? DAY) and sales_order.type=8 and sales_order.payment_status=11 `;
    if (storage) {
        return yield connection_1.default.execute(`${sql}  and storage_id=? order by Order_Time desc;`, [date, storage]);
    }
    else {
        return yield connection_1.default.execute(`${sql} order by Order_Time desc;`, [date]);
    }
});
exports.getOrderDayreportDay = getOrderDayreportDay;
const getOrderDayreportMonth = (month, storage) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Customer_Name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,sales_order.created_at,sales_order.order_date as Order_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id where month(sales_order.order_date)=? and sales_order.type=8 and sales_order.payment_status=11`;
    if (storage) {
        return yield connection_1.default.execute(`${sql}  and storage_id=? order by Order_Time desc;`, [month, storage]);
    }
    else {
        return yield connection_1.default.execute(`${sql} order by Order_Time desc;`, [month]);
    }
});
exports.getOrderDayreportMonth = getOrderDayreportMonth;
