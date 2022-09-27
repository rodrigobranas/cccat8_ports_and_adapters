import Purchase from "./Purchase";

export default interface PurchaseRepository {
	getPurchases (cardNumber: string, month: number, year: number): Promise<Purchase[]>;
}
