export default async function decorate(block) {
	  const logoPic = block.querySelector('div > picture');
	  const anchorTag = block.querySelector('a');

	  block.innerHTML = `
	  	<a class="" href=${anchorTag.href} title="home">
			${logoPic.outerHTML}
		</a>`;

		anchorTag.textContent = '';
  }