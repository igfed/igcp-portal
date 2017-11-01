public class InvestmentsPreviewCache implements Cache.CacheBuilder {

	public Object doLoad(String clientBPID) {
		DTO_InvestmentsPreview in_previewDTO = IGClientService.getInvestmentsPreview(clientBPID);
		return in_previewDTO;
	}
}