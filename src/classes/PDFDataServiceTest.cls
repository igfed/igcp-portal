public class PDFDataServiceTest {
     private transient ContentVersion cv;
    
    public PDFDataServiceTest(){
        Id cvid = Apexpages.CurrentPage().getParameters().get('id');
        List<ContentVersion> cvs = [select id, Title, FileType , ContentSize, VersionData FROM ContentVersion where contentdocumentid=:cvid];
        if(!cvs.isEmpty()) cv = cvs.get(0);
    }
    public String getFileType(){
        if(null==cv) return 'No Type';
        return cv.FileType;
    }
    public String getFileName(){
        if(null==cv) return 'No Name';
        return cv.Title;    
    }
    public String getFileContents(){
        if(null==cv) return 'No Content';
        return EncodingUtil.base64Encode(cv.VersionData);   
    }
}