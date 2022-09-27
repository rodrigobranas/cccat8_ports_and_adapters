import Purchase from "./Purchase";

export default class Invoice {
	purchases: Purchase[];

	constructor (readonly currencyAmount: number) {
		this.purchases = [];
	}

	setPurchases (purchases: Purchase[]) {
		this.purchases = purchases;
	}

	getTotal () {
		let total = 0;
		for (const purchase of this.purchases) {
			if (purchase.currency === "USD") {
				total += purchase.amount * this.currencyAmount;
			} else {
				total += purchase.amount;
			}
		}
		return total;
	}
}