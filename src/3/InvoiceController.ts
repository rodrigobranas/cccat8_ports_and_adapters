import express from "express";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import InvoiceServiceImpl from "./InvoiceServiceImpl";
import PurchaseRepositoryDatabase from "./PurchaseRepositoryDatabase";
const app = express();

app.get("/cards/:cardNumber/invoices", async function (req, res) {
	const purchaseRepository = new PurchaseRepositoryDatabase();
	const currencyGateway = new CurrencyGatewayHttp();
	const invoiceService = new InvoiceServiceImpl(purchaseRepository, currencyGateway);
	const total = await invoiceService.calculateInvoice(req.params.cardNumber, 9, 2022);
	res.json({
		total
	});
});

app.listen(3001);
