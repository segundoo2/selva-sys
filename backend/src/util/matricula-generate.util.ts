/**
 * Gera um número inteiro aleatório de 6 dígitos.
 * O intervalo é de 100.000 (mínimo, inclusive) a 999.999 (máximo, inclusive).
 * Isso garante que o número gerado sempre terá exatamente 6 dígitos.
 * * @returns {number} Matrícula gerada como um número.
 */
export const generateMatricula = (): number => {
  const min = 100000;
  const max = 999999;
  
  // Fórmula para gerar um número inteiro no intervalo [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
};