import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation, jsx } from '../../scripts/scripts.js';

export default async function decorate(block) {
	block.classList.add('is-json');
	block.classList.add('cards');

	const ul = document.createElement('ul');
	const link = block.querySelector('p > a');

	const response = await fetch(link?.href);
		if (!response.ok) {
			return 'an error occurred';
		}

		const jsonData = await response.json();
		const cardData = jsonData.data;
	  
		cardData.forEach((item) => {
			const picture = createOptimizedPicture(item.image, item.title, false, [{ width: 320 }]);
			picture.lastElementChild.width = '320';
			picture.lastElementChild.height = '180';

			const createdCard = document.createElement('li');
			// moveInstrumentation(item, createdCard);
			
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

			console.log(createdCard)
			ul.append(createdCard);
		})

//   ul.querySelectorAll('picture > img').forEach((img) => {
//     const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
//     moveInstrumentation(img, optimizedPic.querySelector('img'));
//     img.closest('picture').replaceWith(optimizedPic);
//   });

  block.textContent = '';
  block.append(ul);
}