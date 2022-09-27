import CurrencyGatewayHttp from "../../src/2/CurrencyGatewayHttp";
import InvoiceServiceImpl from "../../src/2/InvoiceServiceImpl";
import PurchaseRepositoryDatabase from "../../src/2/PurchaseRepositoryDatabase";
import sinon from "sinon";
import axios from "axios";
import Purchase from "../../src/2/Purchase";

test.skip("Deve testar o cálculo da fatura usando stub", async function () {
	sinon.stub(Date.prototype, "getMonth").returns(6);
	sinon.stub(Date.prototype, "getFullYear").returns(2022);
	sinon.stub(CurrencyGatewayHttp.prototype, "getCurrency").resolves(3);
	// const purchaseRepositoryDatabaseStub = sinon.stub(PurchaseRepositoryDatabase.prototype, "getPurchases").resolves([new Purchase("1234123412341234", 100, "USD")]);
	const invoiceService = new InvoiceServiceImpl();
	const total = await invoiceService.calculateInvoice("1234123412341234");
	expect(total).toBe(600);
	sinon.restore();
});

test.skip("Deve testar o cálculo da fatura usando spy", async function () {
	sinon.stub(Date.prototype, "getMonth").returns(6);
	sinon.stub(Date.prototype, "getFullYear").returns(2022);
	const spy = sinon.spy(PurchaseRepositoryDatabase.prototype, "getPurchases");
	const invoiceService = new InvoiceServiceImpl();
	const total = await invoiceService.calculateInvoice("1234123412341234");
	expect(total).toBe(600);
	expect(spy.calledWith("1234123412341234", 7, 2022)).toBeTruthy();
	sinon.restore();
});

test.skip("Deve testar o cálculo da fatura usando mock", async function () {
	const axiosMock = sinon.mock(axios);
	axiosMock
		.expects("get")
		.withArgs("http://localhost:3000/currencies")
		.resolves({ data: { amount: 2 }});
	const invoiceService = new InvoiceServiceImpl();
	const total = await invoiceService.calculateInvoice("1234123412341234");
	expect(total).toBe(660);
	axiosMock.verify();
	sinon.restore();
});
