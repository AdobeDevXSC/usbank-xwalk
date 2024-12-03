import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation, jsx } from '../../scripts/scripts.js';

export default async function decorate(block) {
	const isIconCards = block.classList.contains('is-icon');
	
  // handles icon cards & regular cards (authored directly in UE) 
  /* change to ul, li */
  const ul = document.createElement('ul');

  if (isIconCards) {
	[...block.children].forEach((row) => {
		const anchor = document.createElement('a');
		anchor.href = '';
		
		const li = document.createElement('li');
		moveInstrumentation(row, li);

		while (row.firstElementChild) li.append(row.firstElementChild);
		[...li.children].forEach((div) => {
			if (div.children.length === 1 && div.querySelector('a')) {
				const linkURL = div.querySelector('a').innerHTML;
				anchor.href = linkURL;
				div.className = 'cards-hide-markdown';
			  } else if (div.children.length === 1 && div.querySelector('picture')) {
				div.className = 'cards-card-image';
			  } else {
				div.className = 'cards-card-body';
			  }
			});
		anchor.append(li);
		ul.append(anchor);
	})
  } else {
	[...block.children].forEach((row) => {
		const li = document.createElement('li');
		moveInstrumentation(row, li);
		while (row.firstElementChild) li.append(row.firstElementChild);
		[...li.children].forEach((div) => {
			if (div.children.length === 1 && div.querySelector('picture')) {
				div.className = 'cards-card-image';
			} else if (div.children.length === 1 && div.querySelector('span')) {
				div.className = 'cards-card-icon';
			} else {
				div.className = 'cards-card-body';
			}
		});
		ul.append(li);
	})
  }

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
