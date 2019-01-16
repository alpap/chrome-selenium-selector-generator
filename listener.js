function getXPathForElement(element) {
	const idx = (sib, name) =>
		sib ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name) : 1;
	const segs = elm =>
		!elm || elm.nodeType !== 1
			? ['']
			: elm.id && document.querySelector(`#${elm.id}`) === elm
			? [`id("${elm.id}")`]
			: [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
	return segs(element).join('/');
}

var CreateName = element => {
	return (
		'public string ' +
		(
			document.title.split('|')[0] +
			element.tagName.toLowerCase()[0].toUpperCase() +
			element.tagName.toLowerCase().substring(1) +
			element.innerText
		).replace(/[^a-z]/gi, '') +
		' = @"'
	);
};

var AddToClip = (name, path) => {
	console.log(name + path + '";');
};

const listener = document.querySelector('BODY');
listener.addEventListener('click', e => {
	AddToClip(CreateName(e.target), getXPathForElement(e.target));
});
