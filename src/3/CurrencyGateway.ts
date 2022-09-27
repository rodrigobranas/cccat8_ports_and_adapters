export default interface CurrencyGateway {
	getCurrency (): Promise<number>;
}
