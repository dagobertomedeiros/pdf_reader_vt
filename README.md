# pdf_reader_vt
## Leitura de relatório PDF com saldo de cartões para Central VT

Utilizar o código do arquivo read_pdf_pdf-parse.js.
Existe dependência da biblioteca "pdf-parse" e do node.js. Para instalar a bilbiote basta digitar

### npm install pdf-parse

Orientações gerais:

O script faz a leitura de um arquivo pdf com caracteristícas textuais únicas, ou seja, por mais que o script rode com outros arquivos PDF a saída será sempre falsa. Assim, recomenda-se incorporar o script ao código do projeto observando a saída de rua principal função "read_pdf_balance_value", que recebe apenas 1 parâmetro, que é a localização do arquivo no computador do usuário.
Todo o código é executado muito rapidamente, todavia, se o arquivo for muito grande pode haver uma percepção maior do tempo transcorrido, mas, sem grandes demoras. 
O script grava "object" e um arquivo "json", recomenda-se que pode ser utilizado para inserir as informações no bancop de dados. Importante, como trata-se de funções de leitura e escrita de arquivos é bom fazer uso de recursos de programação assíncrona.
Por fim, o script devolve como informação dados importantes extraídos do relatório de saldo PDF, são eles: código e nome da empresa, uma lista de todos os cartões listados no arquivo e, para cada cartão um lista das cargas com código da carga, data da carga, validade da carga, valor de carga, valor utilizado e saldo.

IMPORTANTE: Qualquer alteração no layout do relatório, pode eventualmente exigir ajustes no script. Além disso, apesar de projetado a partir de um relatório de saldo da Tacom em Salvador, o script funcionário muito bem com outros relatíorios de saldo de outras praças que sejam da Tacom e possuam o mesmo layout.
