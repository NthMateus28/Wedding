function atualizarTotal() {
  const valorAdulto = 56;  // Valor por adulto
  const valorCrianca6_12 = 28;  // Valor por criança de 6 a 12 anos

  const numAdultos = parseInt(document.querySelector('input[name="familia"]:checked').value);
  const numCrianca6_12 = parseInt(document.querySelector('input[name="crianca_6_12"]:checked').value);
  const numCrianca0_6 = parseInt(document.querySelector('input[name="crianca_0_6"]:checked').value);
          
                  // Calcula o total
  const total = (numAdultos * valorAdulto) + (numCrianca6_12 * valorCrianca6_12);
          
                  // Atualiza o valor exibido no rodapé
  document.getElementById('total-a-pagar').textContent = `R$ ${total.toFixed(2)}`;
}
          
              // Adicione um ouvinte de evento para cada vez que uma seleção for alterada
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(input => {
  input.addEventListener('change', atualizarTotal);
});
          
              // Chame a função para calcular o total inicial

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  if (form) {
      const handleSubmit = (event) => {
          event.preventDefault();

          const selectedName = document.querySelector('input[name="nomes"]:checked').value;
          const selectedPaymentMethod = document.querySelector('input[name="forma_pagamento"]:checked').value;
          const selectedFamilySize = document.querySelector('input[name="familia"]:checked').value;
          const selectedChildren6_12 = document.querySelector('input[name="crianca_6_12"]:checked').value;
          const selectedChildren0_6 = document.querySelector('input[name="crianca_0_6"]:checked').value;

          const totalPayment = document.getElementById('total-a-pagar').textContent;

          const data = {
              name: selectedName,
              paymentMethod: selectedPaymentMethod,
              familySize: selectedFamilySize,
              children6_12: selectedChildren6_12,
              children0_6: selectedChildren0_6,
              totalPayment: totalPayment
          };

          fetch('https://api.sheetmonkey.io/form/eSUWp2NVwCT5VD4VV1Au74', {
              method: 'post',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          .then(response => {
              if (response.ok) {
                  alert('Dados enviados com sucesso para a planilha!');
                  
                  // Recarrega a página
                  window.location.reload();
              } else {
                  alert('Erro ao enviar dados para a planilha.');
              }
          })
          .catch(error => {
              console.error('Erro ao enviar dados:', error);
              alert('Erro ao enviar dados para a planilha.');
          });
      }

      form.addEventListener('submit', handleSubmit);
  }
});

atualizarTotal();
