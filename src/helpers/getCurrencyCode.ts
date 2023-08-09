export default function getCurrencyCode(currency: string): string | null {
    // * income string 'UAH | Ukranian grivna'
    const trimedStr: string = currency.trim();
    let currencyCode: string;

    for (let i = 0; i < trimedStr.length; i++) {
        const char = trimedStr[i];

        if (char === '|') {
            currencyCode = trimedStr.slice(0, trimedStr.indexOf(char));
            return currencyCode;
        }

    }

    return null;
}
