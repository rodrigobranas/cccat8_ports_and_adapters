import Purchase from "../../src/2/Purchase";
import Invoice from "../../src/3/Invoice";

test("Deve testar a fatura", function () {
	const purchases = [
		new Purchase("1234", 100, "USD"),
		new Purchase("1234", 30, "BRL"),
		new Purchase("1234", 10, "BRL")
	];
	const invoice = new Invoice(3);
	invoice.setPurchases(purchases);
	const total = invoice.getTotal();
	expect(total).toBe(340);
});
