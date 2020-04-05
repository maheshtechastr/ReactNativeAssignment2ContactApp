
const ContactSchema = {
	  name: 'Contact',
	  properties: {
		id:     'string',
		name:     'string',
		phNumber: 'string?', //optional property
		mobNumber: 'string', // required property
		photo:  'string?',  // optional property
		isFavorite:  'bool',  //  property
	  }
	};