@isTest
private class CP_SCIMRestClientTest {
	
	@isTest static void test_method_one() {
		CP_SCIMRestClient restClient = new CP_SCIMRestClient();
		CP_SCIMRestClient.Response res = new CP_SCIMRestClient.Response();

		res = (CP_SCIMRestClient.Response) JSON.deserialize(restClient.RetrieveUser('harishusc1'), CP_SCIMRestClient.Response.class);

		System.assertEquals(true, res.success);

	}
	
	
}