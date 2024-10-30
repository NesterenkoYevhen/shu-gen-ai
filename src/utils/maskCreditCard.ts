export function maskCreditCard(cardNumber: string): string {
  const lastFour = cardNumber.slice(-4);
  return `****${lastFour}`;
}
