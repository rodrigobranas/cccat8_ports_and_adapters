import axios from "axios";
import CurrencyGateway from "./CurrencyGateway";

export default class CurrencyGatewayHttp implements CurrencyGateway {

	async getCurrency(): Promise<number> {
		const response = await axios.get("http://localhost:3000/currencies");
		const currency = response.data;
		return currency.amount;
	}

}