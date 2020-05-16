import Dinero from 'dinero.js'

export function formatCurrency ( value ) {
  if (!value) return ''
  return Dinero({ amount: value, currency: 'GBP' }).toFormat()
}
