const finder = {
	activator: '[data-finder-activator]',

	content: '[data-finder-content]',

	wrapper: '[data-finder-wrapper]',

	scrollOffset: () => $(finder.wrapper).data('finderScrollOffset'),

	activate: () => {
		if (!$('#finder').length) {
			finder.createFinder();
		}
		setTimeout(function () {
			$('#finder').addClass('active');
			$('#finderInput').focus();
			if ($('#finderInput').val()) {
				finder.findTerm($('#finderInput').val());
			}
			$('#finderInput').on('input', function () {
				finder.findTerm($(this).val());
			});
		}, 50);
	},

	createFinder: () => {
		const finderElem = $('<div />')
			.attr({
				'id': 'finder',
				'class': 'finder'
			})
			.prependTo(finder.wrapper);

		$('<input />')
			.attr({
				'id': 'finderInput',
				'type': 'text',
				'class': 'finder-input',
			})
			.appendTo(finderElem);

		const prev = $('<button />')
			.attr({
				'id': 'finderPrev',
				'class': 'btn btn-finder btn-finder-prev',
			})
			.appendTo(finderElem);

		$('<i />')
			.attr({
				'class': 'fas fa-angle-up',
			})
			.appendTo(prev);

		const next = $('<button />')
			.attr({
				'id': 'finderNext',
				'class': 'btn btn-finder btn-finder-next',
			})
			.appendTo(finderElem);

		$('<i />')
			.attr({
				'class': 'fas fa-angle-down',
			})
			.appendTo(next);

		const close = $('<button />')
			.attr({
				'id': 'finderClose',
				'class': 'btn btn-finder btn-finder-close',
			})
			.appendTo(finderElem);

		$('<i />')
			.attr({
				'class': 'fas fa-times',
			})
			.appendTo(close);
	},

	closeFinder: () => {
		$('#finder').removeClass('active');
		$(finder.content).unhighlight();
	},

	resultsCount: 0,

	currentResult: 0,

	findTerm: (term) => {
		// highlight results
		$(finder.content).unhighlight();
		$(finder.content).highlight(term);

		// count results
		finder.resultsCount = $('.highlight').length;

		if (finder.resultsCount) {
			// there are results, scroll to first one
			finder.currentResult = 1;
			finder.scrollToCurrent();
		} else {
			// no results
			finder.currentResult = 0;
		}

		// term not found
		if (!finder.resultsCount && term) {
			$('#finderInput').addClass('not-found');
		} else {
			$('#finderInput').removeClass('not-found');
		}

		finder.updateCurrent();
	},

	scrollToCurrent: () => {
		let i = finder.currentResult - 1;
		$('.highlight').removeClass('active');
		$(`.highlight:eq(${i})`).addClass('active');

		let offsetTop = -100;
		if (finder.scrollOffset() !== null) {
			offsetTop = finder.scrollOffset() * -1;
		}

		$(finder.wrapper).scrollTo('.highlight.active', {
			offset: {
				left: 0,
				top: offsetTop,
			},
		});
	},

	prevResult: () => {
		if (finder.resultsCount) {
			if (finder.currentResult > 1) {
				finder.currentResult--;
			} else {
				finder.currentResult = finder.resultsCount;
			}
			finder.scrollToCurrent();
		}

		finder.updateCurrent();
	},

	nextResult: () => {
		if (finder.resultsCount) {
			if (finder.currentResult < finder.resultsCount) {
				finder.currentResult++;
			} else {
				finder.currentResult = 1;
			}
			finder.scrollToCurrent();
		}

		finder.updateCurrent();
	},

	updateCurrent: () => {
		if ($('#finderInput').val()) {
			if (!$('#finderCount').length) {
				$('<span />')
					.attr({
						'id': 'finderCount',
						'class': 'finder-count',
					})
					.insertAfter('#finderInput');
			}
			setTimeout(function () {
				$('#finderCount').text(finder.currentResult + ' / ' + finder.resultsCount);
			}, 50);
		} else {
			$('#finderCount').remove();
		}
	},
};

$(document).ready(function () {
	$(finder.activator).click(function() {
		finder.activate();
	});

	$(document).mousedown(function (event) {
		if (event.which === 1) {
			switch ($(event.target).attr('id') || $(event.target).parents().attr('id')) {
				case 'finderClose':
					finder.closeFinder();
					break;
				
				case 'finderPrev':
					finder.prevResult();
					break;

				case 'finderNext':
					finder.nextResult();
					break;
				
				default:
					return true;
			}
		}
	});
	
});
