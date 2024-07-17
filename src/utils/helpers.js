export const formatNumber = (number) => {
  
    return parseFloat(parseFloat(number || 0).toFixed(2)).toLocaleString(
        'en-IN',
        {
            useGrouping: true
        }
    )
}