export default async function decorate(block) {
	  const logoPic = block.querySelector('div > picture');
	  const anchorTag = block.querySelector('a');

	  console.log(anchorTag, logoPic)
	  block.innerHTML = `
	  	<a class="" href=${anchorTag.href} title="home">
			${logoPic.outerHTML}
		</a>`;

		anchorTag.textContent = '';
  }