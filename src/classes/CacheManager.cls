public class CacheManager {
	public static DTO_InvestmentsPreview getInvestmentPreviewDTO(String bpid) {
		DTO_InvestmentsPreview rv;
        if (String.isNotBlank(bpid)) {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Portal360');
            rv = (DTO_InvestmentsPreview)sessionPartition.get(InvestmentsPreviewCache.class, bpid);
        }
        return rv;
	}
}