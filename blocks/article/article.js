/**
 * loads and decorates the article block
 * @param {Element} block The article block element
 */

export default async function decorate(block) {
	const firstChild = block.children[0];
	firstChild.className = 'article-content-wrapper';
  
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';
	sidebar.innerHTML = `
	  <h3>LEARN ABOUT U.S. BANK</h3>
	  <a class="sidebar-link" href="https://www.usbank.com/credit-cards.html">Visit usbank.com</a>
	  <a class="sidebar-link" href="tel:8008722657">800-872-2657</a>
	`;
	block.append(sidebar);
  }
  