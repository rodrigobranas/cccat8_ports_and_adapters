import pgp from "pg-promise";
import Purchase from "./Purchase";
import PurchaseRepository from "./PurchaseRepository";

export default class PurchaseRepositoryDatabase implements PurchaseRepository {

	async getPurchases(cardNumber: string, month: number, year: number): Promise<Purchase[]> {
		const connection = pgp()("postgres://postgres:123546@localhost:5432/app");
		const purchasesData = await connection.query("select * from branas.purchase where card_number = $1 and extract(month from date)::integer = $2 and extract(year from date)::integer = $3", [cardNumber, month, year]);
		const purchases = [];
		for (const purchaseData of purchasesData) {
			purchases.push(new Purchase(purchaseData.card_number, parseFloat(purchaseData.amount), purchaseData.currency));
		}
		await connection.$pool.end();
		return purchases;
	}

}