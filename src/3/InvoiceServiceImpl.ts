import CurrencyGateway from "./CurrencyGateway";
import Invoice from "./Invoice";
import InvoiceService from "./InvoiceService";
import PurchaseRepository from "./PurchaseRepository";

export default class InvoiceServiceImpl implements InvoiceService {

	constructor (readonly purchaseRepository: PurchaseRepository, readonly currencyGateway: CurrencyGateway) {
	}

	async calculateInvoice(cardNumber: string, month: number, year: number): Promise<number> {
		const purchases = await this.purchaseRepository.getPurchases(cardNumber, month, year);
		const currencyAmount = await this.currencyGateway.getCurrency();
		// application
		const invoice = new Invoice(currencyAmount);
		invoice.setPurchases(purchases);
		const total = invoice.getTotal();
		return total;
	}

}