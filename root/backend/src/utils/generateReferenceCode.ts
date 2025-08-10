import crypto from 'crypto'

export function generateReferenceCode(): string {
  const prefix = 'APT';
  const date = new Date();
  
  // Format date as YYYYMMDD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  
  // Generate random alphanumeric suffix
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  return `${prefix}-${dateStr}-${randomSuffix}`;
}
