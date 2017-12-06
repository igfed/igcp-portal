({
	onInit : function(cmp, evt, hlpr) {

		// Todo: Once Apex controller is complete, Get this data from the controller
		var clientInformation = {
			name: 'Rami Sedenco',
			clientNumber: '***438 (Investment), ***454 (Mortgage)',
			address: '388 Acme St. West, Unit 906 Toronto, ON, M5V5T5',
			phone: '416-555-1234'
		}
		var documents = {
			confirmations: 'Online',
			investmentStatements: 'Paper',
			taxDocuments: 'Paper',
			mortgageStatements: 'Online',
			insuranceStatements: 'Online'
		}
		var notification = {
			email: 'remi.sedenco@gmail.com',
			emailPromotions: 'Active',
			mobile: '905-555-4321',
			smsNotifications: 'Non Active',
			languagePreference: 'English'
		}
		var security = {
			password: '*******',
			questions: [
				'What is the name of your favourite sports team?',
				'What is the name of your favourite superhero',
				'What was your first job'
			]
		}

		cmp.set("v.clientInformation", clientInformation)
		cmp.set("v.documents", documents)
		cmp.set("v.notification", notification)
		cmp.set("v.security", security)
	}
})
