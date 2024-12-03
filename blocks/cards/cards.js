import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
	const isIconCards = block.classList.contains('is-icon');
	const isArticleCards = block.classList.contains('is-json');

	async function fetchJson(link) {
		const response = await fetch(link?.href);
	
		if (response.ok) {
		  const jsonData = await response.json();
		  const data = jsonData?.data;
		  return data;
		}
		return 'an error occurred';
	}
	
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
  } else if (isArticleCards) {
	const link = block.querySelector('a');
	console.log(link);
	const cardData = fetchJson(link);
  
  cardData.forEach((item) => {
      const picture = createOptimizedPicture(item.image, item.title, false, [{ width: 320 }]);
      picture.lastElementChild.width = '320';
      picture.lastElementChild.height = '180';
      const createdCard = document.createElement('li');
	  moveInstrumentation(item, createdCard);
      createdCard.innerHTML = `
        <div class="cards-card-image">
          <div data-align="center">${picture.outerHTML}</div>
        </div>
        <div class="cards-card-body">
          <h5>${item.title}</h5>
          <p class="button-container">
            <a href="${item.url}" aria-label="${item['anchor-text']}" title="${item['anchor-text']}" class="button">
              Read more 
              <span class="card-arrow">
                <img class="icon" src="/icons/chevron.svg" />
              </span>
            </a>
          </p>
        </div>
      `;
      ul.append(createdCard);
    });
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
	});
  }

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
