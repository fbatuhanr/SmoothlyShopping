const priceFormat = (price: number) => {

    const result = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return result;
}

export default priceFormat