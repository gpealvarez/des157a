(function () {
	'use strict';

	const captions = [
		'',
		'',
		'<img src="images/ntowern.jpg" alt="ntower">',
		'<img src="images/banpon.jpg" alt="banpobridge">',
		'<img src="images/slibraryn.jpg" alt="starfieldlibrary">',
		'<img src="images/lotteworldn.jpg" alt="lotteworld">'
	];

	let figCaption = document.querySelector('figcaption');

	figCaption.innerHTML = captions[1];

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;
		let exitDirection;
		let enterDirection;

		resetPagePosition();

		window.addEventListener('scroll', function () {
			pageTop = window.pageYOffset + 300;

			if (pageTop > postTops[counter]) {
				counter++;
				console.log(`scrolling down ${counter}`);
			} else if (counter > 1 && pageTop < postTops[counter - 1]) {
				counter--;
				console.log(`scrolling up ${counter}`);
			}

			if (counter != prevCounter) {
				document.querySelector('figure img').className = 'sect' + counter;

				if (counter > prevCounter) {
					exitDirection = 'animate exitup';
					enterDirection = 'animate enterup';
				}
				else {
					exitDirection = 'animate exitdown';
					enterDirection = 'animate enterdown';
				}

				figCaption.className = exitDirection;
				figCaption.addEventListener('animationend', function () {
					let newCaption = document.querySelector('figcaption').cloneNode(true);
					figCaption.remove();
					newCaption.className = enterDirection;
					newCaption.innerHTML = captions[counter];
					document.querySelector('figure').appendChild(newCaption);
					figCaption = document.querySelector('figcaption');
				});

				prevCounter = counter;
			}

		});

		window.addEventListener('resize', function () {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function () {

				resetPagePosition();

			}, 500);
		});

		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); 

})();