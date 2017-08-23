public class IGClientProfile {
	public IGClientProfile() {
		this.contacts = new ContactInfo();
		this.preferences = new PreferencesInfo();
	}
	public String businessPartnerId {get; set;}
	public ContactInfo contacts {get; set;}
	public PreferencesInfo preferences {get; set;}

	public class ContactInfo {
		public ContactInfo(){}
		public string firstName {get; set;}
		public string lastName {get; set;}
		public string emailPersonal {get; set;}
		public string emailBusiness {get; set;}
		public string phoneMobile {get; set;}
		public string phoneHome {get; set;}
		public string phoneBusiness {get; set;}
		public string addressStreet {get; set;}
		public string addressCity {get; set;}
		public string addressProvince {get; set;}
		public string addressPostalCode {get; set;}
		public string addressCountry {get; set;}	
	}

	public class PreferencesInfo {
		public PreferencesInfo(){}
	}
	
}