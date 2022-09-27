export default interface InvoiceService {
	calculateInvoice (cardNumber: string, month: number, year: number): Promise<number>;
}
