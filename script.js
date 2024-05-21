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
                  cellContent = generateAnimatedCircleSVG();
              } else if (fields[index] === 'cross') {
                  cellContent = generateAnimatedXSVG();
              }
              html += `<td class="cell-content">${cellContent}</td>`;
          }
          html += '</tr>';
      }
  
      html += '</table>';
      container.innerHTML = html;
  }

  function generateAnimatedCircleSVG() {
    const circleHTML = `
        <svg width="70" height="70">
            <circle cx="35" cy="35" r="0" fill="none" stroke="#00B0EF" stroke-width="9">
                <animate attributeName="r" from="0" to="30" dur="200ms" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;
    return circleHTML;
}

function generateAnimatedXSVG() {
    const xHTML = `
        <svg width="70" height="70">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FCC000" stroke-width="9">
                <animate attributeName="x2" from="10" to="60" dur="200ms" begin="0s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FCC000" stroke-width="9">
                <animate attributeName="x2" from="60" to="10" dur="200ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
    return xHTML;
}