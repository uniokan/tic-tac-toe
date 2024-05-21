// Das Array, das den Zustand des Spielfelds enthält
    let fields = [
        null,
        'circle',
        null,
        null,
        'cross',
        null,
        null,
        null,
        null,
    ];

    function init(){
        render();
    }

    function render(){

      const container = document.getElementById('content');

      let html = '<table class="border-none">';
  
      for (let i = 0; i < 3; i++) {
          html += '<tr>';
          for (let j = 0; j < 3; j++) {
              const index = i * 3 + j;
              let cellContent = '';
              if (fields[index] === 'circle') {
                  cellContent = 'O';
              } else if (fields[index] === 'cross') {
                  cellContent = 'X';
              }
              html += `<td class="cell-content">${cellContent}</td>`;
          }
          html += '</tr>';
      }
  
      html += '</table>';
      container.innerHTML = html;
  }
