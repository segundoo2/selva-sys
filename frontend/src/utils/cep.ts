// utils/cep.ts

interface CepData {
  logradouro: string; // Rua
  bairro: string;
  localidade: string; // Cidade
  uf: string; // Estado
}

/**
 * Busca dados de endereço pelo CEP usando a API ViaCEP.
 * @param cep - O CEP a ser consultado (pode estar formatado ou não).
 * @returns Promessa com os dados do endereço ou null em caso de erro.
 */
export async function fetchAddressByCep(
  cep: string
): Promise<CepData | null> {
  const cleanedCep = cep.replace(/\D/g, ""); // Remove pontos e hífens

  if (cleanedCep.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    
    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
        console.error("Erro na requisição ViaCEP:", response.statusText);
        return null;
    }

    const data = await response.json();

    // ViaCEP retorna { erro: true } se o CEP não for encontrado
    if (data.erro) {
      return null;
    }

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
    
  } catch (error) {
    console.error("Erro ao buscar endereço pelo CEP:", error);
    return null;
  }
}