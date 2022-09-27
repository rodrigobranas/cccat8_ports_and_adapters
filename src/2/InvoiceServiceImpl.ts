import CurrencyGateway from "./CurrencyGateway";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import InvoiceService from "./InvoiceService";
import PurchaseRepository from "./PurchaseRepository";
import PurchaseRepositoryDatabase from "./PurchaseRepositoryDatabase";

export default class InvoiceServiceImpl implements InvoiceService {
	purchaseRepository: PurchaseRepositoryDatabase;
	currencyGateway: CurrencyGatewayHttp;

	constructor () {
		this.purchaseRepository = new PurchaseRepositoryDatabase();
		this.currencyGateway = new CurrencyGatewayHttp();
	}

	async calculateInvoice(cardNumber: string): Promise<number> {
		const date = new Date();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const purchases = await this.purchaseRepository.getPurchases(cardNumber, month, year);
		const currencyAmount = await this.currencyGateway.getCurrency();
		// application
		let total = 0;
		for (const purchase of purchases) {
			if (purchase.currency === "USD") {
				total += purchase.amount * currencyAmount;
			} else {
				total += purchase.amount;
			}
		}
		return total;
	}

}