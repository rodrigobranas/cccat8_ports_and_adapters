import CurrencyGatewayHttp from "../../src/2/CurrencyGatewayHttp";
import PurchaseRepositoryDatabase from "../../src/2/PurchaseRepositoryDatabase";
import CurrencyGateway from "../../src/3/CurrencyGateway";
import InvoiceServiceImpl from "../../src/3/InvoiceServiceImpl";
import Purchase from "../../src/3/Purchase";
import PurchaseRepository from "../../src/3/PurchaseRepository";

test("Deve testar o cálculo da fatura usando fake", async function () {
	// fake
	const purchaseRepository: PurchaseRepository = {
		async getPurchases (cardNumber: string, month: number, year: number): Promise<Purchase[]> {
			return [
				new Purchase("1234123412341234", 100, "USD")
			];
		}
	}
	// fake
	const currencyGateway: CurrencyGateway = {
		async getCurrency (): Promise<number> {
			return 3;
		}
	}
	const invoiceService = new InvoiceServiceImpl(purchaseRepository, currencyGateway);
	// dummy
	const total = await invoiceService.calculateInvoice("1234", 6, 2022);
	expect(total).toBe(300);
});