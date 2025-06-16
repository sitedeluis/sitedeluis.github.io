// Versión optimizada para Dark Poole
if (!window.codeButtonsAdded) {
  window.codeButtonsAdded = true;

  function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('.highlight:not(.highlight .highlight), .language-plaintext');

    codeBlocks.forEach(block => {
      if (block.querySelector('.code-copy-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3m4 4v6a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>
        </svg>
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = block.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.classList.add('copied');
          btn.innerHTML = '✓';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3m4 4v6a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>
              </svg>
            `;
          }, 2000);
        });
      });

      block.style.position = 'relative';
      block.appendChild(btn);
    });
  }

  // Esperar a que Jekyll termine de renderizar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    setTimeout(initCopyButtons, 500);
  }
}
